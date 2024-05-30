package com.dt.flashlearn.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.converter.LearningConverter;
import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.LearningHistoryEntity;
import com.dt.flashlearn.entity.LearningVocabularyEntity;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Vocabulary.SentenceEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;
import com.dt.flashlearn.entity.Vocabulary.TypeLearn;
import com.dt.flashlearn.entity.Vocabulary.TypeQuestion;
import com.dt.flashlearn.model.request.LearnInput;
import com.dt.flashlearn.model.request.LearningVocabularyInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.learn.LearnResponse;
import com.dt.flashlearn.model.response.learn.QuestionLearn;
import com.dt.flashlearn.model.response.learn.VocabularyLearn;
import com.dt.flashlearn.repository.LearningHistoryRepository;
import com.dt.flashlearn.repository.LearningVocabularyRepository;
import com.dt.flashlearn.repository.StudentRepository;
import com.dt.flashlearn.service.LearnService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class LearnServiceImpl implements LearnService {

    private static final double INITIAL_EASINESS = 2.5;
    private static final int MIN_INTERVAL = 1;
    private static final double CONVERSION_RATE = 1.666666666666667;

    @Autowired
    private LearningVocabularyRepository learningVocabularyRepository;

    @Autowired
    private LearningHistoryRepository learningHistoryRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QueryService queryService;

    private Random random = new Random();

    @Override
    public ResponseData getVocabularyOfLessonLearn(Long lessonId, int studyCount) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        List<VocabularyOfLessonEntity> vocabularies = new ArrayList<>(lessonEntity.getVocabularies());
        int startIndex = (studyCount - 1) * 2;
        if (startIndex >= vocabularies.size() || vocabularies.isEmpty()) {
            return new ResponseData(new LearnResponse());
        }
        int endIndex = startIndex + 2;
        if (endIndex > vocabularies.size()) {
            endIndex = vocabularies.size();
        }
        List<VocabularyOfLessonEntity> selectedVocabularies = vocabularies.subList(startIndex, endIndex);
        LearnResponse learnResponse = new LearnResponse();
        learnResponse.setVocabularyNew(
                selectedVocabularies.stream().map(VocabularyConverter::vocabularyOfLessonToVocabularyReponse).toList());
        List<LearningVocabularyEntity> learningVocabularyEntities = queryService
                .getLearningVocabularyEntityByStudent(lessonEntity, 4 - selectedVocabularies.size());
        learnResponse.setVocabularyOld(learningVocabularyEntities.stream()
                .map(vocabulary -> VocabularyConverter.vocabularyOfLessonToVocabularyReponse(vocabulary.getVocabularyOfLesson()))
                .toList());
        learnResponse.setQuestions(createQuestionLearns(selectedVocabularies, learningVocabularyEntities));
        return new ResponseData(learnResponse);
    }

    private List<QuestionLearn> createQuestionLearns(List<VocabularyOfLessonEntity> vocabulariesNew,
            List<LearningVocabularyEntity> vocabulariesOld) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        for (VocabularyOfLessonEntity vocabulary : vocabulariesNew) {
            questionLearns.addAll(createQuestionLearnNew(vocabulary));
        }
        if (!vocabulariesOld.isEmpty()) {
            for (LearningVocabularyEntity vocabulary : vocabulariesOld) {
                questionLearns.addAll(createQuestionLearnNew(vocabulary.getVocabularyOfLesson()));
            }
        }
        Collections.shuffle(questionLearns);
        return questionLearns;
    }

    private List<QuestionLearn> createQuestionLearnNew(VocabularyOfLessonEntity entity) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.MULTIPLE_CHOICE.name(),
                entity.getVocabulary().getWord(),
                entity.getMeaning(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.MULTIPLE_CHOICE.name(),
                entity.getMeaning(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.LISTENING_TO_WORD.name(),
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.LISTENING_TO_WORD.name(),
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getMeaning(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.WORD_TO_LISTENING.name(),
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createQuestion(
                entity.getId(),
                TypeQuestion.MULTIPLE_CHOICE.name(),
                getRandomSentence(entity),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        return questionLearns;
    }

    // private List<QuestionLearn> createQuestionPractice(LearningVocabularyEntity entity, String typeLearn) {
    //     List<QuestionLearn> questionLearns = new ArrayList<>();
    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.MULTIPLE_CHOICE.name(),
    //             typeLearn,
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             entity.getVocabularyOfLesson().getMeaning(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             true));

    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.MULTIPLE_CHOICE.name(),
    //             typeLearn,
    //             entity.getVocabularyOfLesson().getMeaning(),
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             false));

    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.LISTENING_TO_WORD.name(),
    //             typeLearn,
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             false));

    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.LISTENING_TO_WORD.name(),
    //             typeLearn,
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             entity.getVocabularyOfLesson().getVocabulary().getMeaning(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             true));

    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.WORD_TO_LISTENING.name(),
    //             typeLearn,
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             false));

    //     questionLearns.add(createQuestion(
    //             entity.getId(),
    //             TypeQuestion.MULTIPLE_CHOICE.name(),
    //             typeLearn,
    //             getRandomSentence(entity.getVocabularyOfLesson()),
    //             entity.getVocabularyOfLesson().getVocabulary().getWord(),
    //             getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
    //             false));

    //     return questionLearns;
    // }

    private QuestionLearn createQuestion(
            Long id,
            String typeQuestion,
            String questionText,
            String correctAnswerText,
            List<SimilarWordEntity> similarWords,
            boolean isWordToMeaning) {
        QuestionLearn questionLearn = new QuestionLearn();
        questionLearn.setId(id);
        questionLearn.setTypeQuestion(typeQuestion);
        questionLearn.setQuestion(questionText);

        List<VocabularyLearn> answers = new ArrayList<>();
        answers.add(new VocabularyLearn(correctAnswerText, true));

        for (SimilarWordEntity similarWordEntity : similarWords) {
            String answerText = isWordToMeaning ? similarWordEntity.getMeaning() : similarWordEntity.getWord();
            answers.add(new VocabularyLearn(answerText, false));
        }

        questionLearn.setAnswers(answers);
        return questionLearn;
    }

    private List<SimilarWordEntity> getRandomSimilarWords(List<SimilarWordEntity> similarWords) {
        List<SimilarWordEntity> selectedWords = new ArrayList<>();
        Collections.shuffle(similarWords, random);
        for (int i = 0; i < 3; i++) {
            selectedWords.add(similarWords.get(i));
        }
        return selectedWords;
    }

    private String getRandomSentence(VocabularyOfLessonEntity vocabulary) {
        List<SentenceEntity> sentences = vocabulary.getVocabulary().getSentences();
        int randomIndex = random.nextInt(sentences.size());
        return sentences.get(randomIndex).getSentence() + " - " + sentences.get(randomIndex).getMeaning();
    }

    @Override
    public ResponseData learnVocabulary(Long lessonId, LearnInput input) {
        StudentEntity studentEntity = queryService.getStudentEntityByLesson(queryService.getLessonEntityById(lessonId));
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateExistStudent(lessonEntity.getCourse());
        return new ResponseData(
                LearningConverter.convertToLearningHistoryEntity(updateLearningVocabulary(input, studentEntity)));
    }

    private LearningHistoryEntity updateLearningVocabulary(LearnInput input, StudentEntity studentEntity) {
        double totalQuality = 0;
        for (LearningVocabularyInput learningVocabularyInput : input.getLearningVocabularies()) {
            VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService
                    .getVocabularyOfLessonEntityById(learningVocabularyInput.getId());
            LearningVocabularyEntity learningVocabularyEntity = queryService
                    .getLearningVocabularyEntityByStudentAndVocabularyOfLesson(studentEntity, vocabularyOfLessonEntity);
            if (learningVocabularyEntity == null) {
                createLearningVocabulary(vocabularyOfLessonEntity, studentEntity, learningVocabularyInput.getQuality());
            } else {
                updateLearningVocabulary(learningVocabularyEntity, studentEntity, learningVocabularyInput.getQuality());
            }
            totalQuality += learningVocabularyInput.getQuality();
        }
        return createLearningHistory(studentEntity, caculatorExperience(totalQuality), TypeLearn.LEARN_NEW.name());
    }

    private void createLearningVocabulary(VocabularyOfLessonEntity vocabularyOfLessonEntity, StudentEntity studentEntity, double quality) {
        LearningVocabularyEntity learningVocabularyEntity = new LearningVocabularyEntity();
        learningVocabularyEntity.setStudent(studentEntity);
        learningVocabularyEntity
                .setVocabularyOfLesson(vocabularyOfLessonEntity);
        updateLearning(learningVocabularyEntity, (int) Math.floor(quality));
    }

    private void updateLearningVocabulary(LearningVocabularyEntity learningVocabularyEntity, StudentEntity studentEntity, double quality) {
        updateLearning(learningVocabularyEntity, (int) Math.floor(quality));
    }

    private LearningVocabularyEntity updateLearning(LearningVocabularyEntity learningVocabularyEntity, int quality) {
        if (quality < 3) {
            learningVocabularyEntity.setRepetitions(0);
            learningVocabularyEntity.setReviewInterval(MIN_INTERVAL);
        } else {
            if (learningVocabularyEntity.getRepetitions() == 0) {
                learningVocabularyEntity.setReviewInterval(MIN_INTERVAL);
            } else if (learningVocabularyEntity.getRepetitions() == 1) {
                learningVocabularyEntity.setReviewInterval(6);
            } else {
                learningVocabularyEntity.setReviewInterval((int) Math
                        .round(learningVocabularyEntity.getReviewInterval() * learningVocabularyEntity.getEasiness()));
            }
            learningVocabularyEntity.setRepetitions(learningVocabularyEntity.getRepetitions() + 1);
        }
        double easiness = learningVocabularyEntity.getEasiness() != 0 ? learningVocabularyEntity.getEasiness()
                : INITIAL_EASINESS;
        easiness = Math.max(1.3, Math.min(2.5, easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

        easiness = Math.round(easiness * 10) / 10.0;

        learningVocabularyEntity.setEasiness(easiness);
        learningVocabularyEntity.setLastReview(LocalDate.now());
        learningVocabularyEntity.setNextReview(
                learningVocabularyEntity.getLastReview().plusDays(learningVocabularyEntity.getReviewInterval()));
        return learningVocabularyRepository.save(learningVocabularyEntity);
    }

    private Long caculatorExperience(double quality) {
        return Math.round(quality * 100 * CONVERSION_RATE);
    }

    private LearningHistoryEntity createLearningHistory(StudentEntity studentEntity, Long experience,
            String learnType) {
        LearningHistoryEntity learningHistoryEntity = new LearningHistoryEntity();
        learningHistoryEntity.setStudent(studentEntity);
        learningHistoryEntity.setExperience(experience);
        learningHistoryEntity.setLearnAt(LocalDate.now());
        learningHistoryEntity.setLearnType(learnType);

        int historyCount = studentEntity.getLearningHistories().size();
        long totalExperience = studentEntity.getExperienceStudent() * historyCount + experience;
        studentEntity.setExperienceStudent(historyCount > 0 ? totalExperience / (historyCount + 1) : experience);
        studentRepository.save(studentEntity);

        return learningHistoryRepository.save(learningHistoryEntity);
    }
}
