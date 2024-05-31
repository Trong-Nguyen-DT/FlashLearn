package com.dt.flashlearn.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
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
import com.dt.flashlearn.exception.MessageException;
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
        if (vocabularies.isEmpty()) {
            throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
        }
        int startIndex = (studyCount - 1) * 2;
        if (startIndex >= vocabularies.size()) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        int endIndex = (startIndex + 2) > vocabularies.size() ? vocabularies.size() : startIndex + 2;

        List<VocabularyOfLessonEntity> selectedVocabularies = vocabularies.subList(startIndex, endIndex);
        LearnResponse learnResponse = new LearnResponse();
        learnResponse.setVocabularyNew(
                selectedVocabularies.stream().map(VocabularyConverter::vocabularyOfLessonToVocabularyReponse).toList());
        List<LearningVocabularyEntity> learningVocabularyEntities = queryService
                .getLearningVocabularyEntityByStudent(lessonEntity, 4 - selectedVocabularies.size());
        learnResponse.setVocabularyOld(learningVocabularyEntities.stream()
                .map(vocabulary -> VocabularyConverter
                        .vocabularyOfLessonToVocabularyReponse(vocabulary.getVocabularyOfLesson()))
                .toList());
        learnResponse.setQuestions(createQuestionLearns(selectedVocabularies, learningVocabularyEntities));
        return new ResponseData(learnResponse);
    }

    @Override
    public ResponseData getVocabularyOfLessonPractice(Long lessonId) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        List<LearningVocabularyEntity> learningVocabularyEntities = queryService
                .getLearningVocabularyEntityByStudent(lessonEntity, 4);
        LearnResponse learnResponse = new LearnResponse();
        learnResponse.setVocabularyOld(learningVocabularyEntities.stream()
                .map(vocabulary -> VocabularyConverter
                        .vocabularyOfLessonToVocabularyReponse(vocabulary.getVocabularyOfLesson()))
                .toList());
        learnResponse.setQuestions(createQuestionLearns(new ArrayList<>(), learningVocabularyEntities));
        return new ResponseData(learnResponse);
    }

    private List<QuestionLearn> createQuestionLearns(List<VocabularyOfLessonEntity> vocabulariesNew,
            List<LearningVocabularyEntity> vocabulariesOld) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        vocabulariesNew.forEach(vocabulary -> questionLearns.addAll(createQuestionLearnNew(vocabulary)));
        vocabulariesOld.forEach(
                vocabulary -> questionLearns.addAll(createQuestionLearnNew(vocabulary.getVocabularyOfLesson())));
        Collections.shuffle(questionLearns);
        return questionLearns;
    }

    private List<QuestionLearn> createQuestionLearnNew(VocabularyOfLessonEntity entity) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        questionLearns.add(createQuestion(entity, TypeQuestion.MULTIPLE_CHOICE.name(), entity.getVocabulary().getWord(),
                entity.getMeaning(), true));
        questionLearns.add(createQuestion(entity, TypeQuestion.MULTIPLE_CHOICE.name(), entity.getMeaning(),
                entity.getVocabulary().getWord(), false));
        questionLearns.add(createQuestion(entity, TypeQuestion.LISTENING_TO_WORD.name(),
                entity.getVocabulary().getWord(), entity.getVocabulary().getWord(), false));
        questionLearns.add(createQuestion(entity, TypeQuestion.LISTENING_TO_WORD.name(),
                entity.getVocabulary().getWord(), entity.getVocabulary().getMeaning(), true));
        questionLearns.add(createQuestion(entity, TypeQuestion.WORD_TO_LISTENING.name(),
                entity.getVocabulary().getWord(), entity.getVocabulary().getWord(), false));
        questionLearns.add(createQuestion(entity, TypeQuestion.MULTIPLE_CHOICE.name(), getRandomSentence(entity),
                entity.getVocabulary().getWord(), false));
        return questionLearns;
    }

    private QuestionLearn createQuestion(VocabularyOfLessonEntity entity, String typeQuestion, String questionText,
            String correctAnswerText, boolean isWordToMeaning) {
        QuestionLearn questionLearn = new QuestionLearn();
        questionLearn.setId(entity.getId());
        questionLearn.setTypeQuestion(typeQuestion);
        questionLearn.setQuestion(questionText);

        List<VocabularyLearn> answers = new ArrayList<>();
        answers.add(new VocabularyLearn(correctAnswerText, true));

        List<SimilarWordEntity> similarWords = getRandomSimilarWords(entity.getVocabulary().getSimilarWords());
        similarWords.forEach(similarWord -> answers
                .add(new VocabularyLearn(isWordToMeaning ? similarWord.getMeaning() : similarWord.getWord(), false)));

        Collections.shuffle(answers, random);
        questionLearn.setAnswers(answers);
        return questionLearn;
    }

    private List<SimilarWordEntity> getRandomSimilarWords(List<SimilarWordEntity> similarWords) {
        Collections.shuffle(similarWords, random);
        return similarWords.subList(0, Math.min(3, similarWords.size()));
    }

    private String getRandomSentence(VocabularyOfLessonEntity vocabulary) {
        List<SentenceEntity> sentences = vocabulary.getVocabulary().getSentences();
        SentenceEntity sentence = sentences.get(random.nextInt(sentences.size()));
        return sentence.getSentence() + " : " + sentence.getMeaning();
    }

    @Override
    public ResponseData learnVocabulary(Long lessonId, LearnInput input) {
        StudentEntity studentEntity = queryService
                .getStudentEntity(queryService.getLessonEntityById(lessonId).getCourse());
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateExistStudent(lessonEntity.getCourse());
        return new ResponseData(
                LearningConverter.convertToLearningHistoryEntity(updateLearningVocabulary(input, studentEntity)));
    }

    @Override
    public ResponseData practiceVocabulary(Long lessonId, LearnInput input) {
        StudentEntity studentEntity = queryService
                .getStudentEntity(queryService.getLessonEntityById(lessonId).getCourse());
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateExistStudent(lessonEntity.getCourse());
        return new ResponseData(
                LearningConverter.convertToLearningHistoryEntity(updateLearningVocabulary(input, studentEntity)));
    }

    private LearningHistoryEntity updateLearningVocabulary(LearnInput input, StudentEntity studentEntity) {
        double totalQuality = input.getLearningVocabularies().stream()
                .mapToDouble(learningVocabularyInput -> {
                    VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService
                            .getVocabularyOfLessonEntityById(learningVocabularyInput.getId());
                    LearningVocabularyEntity learningVocabularyEntity = queryService
                            .getLearningVocabularyEntityByStudentAndVocabularyOfLesson(studentEntity,
                                    vocabularyOfLessonEntity);
                    if (learningVocabularyEntity == null) {
                        createLearningVocabulary(vocabularyOfLessonEntity, studentEntity,
                                learningVocabularyInput.getQuality());
                    } else {
                        updateLearningVocabulary(learningVocabularyEntity, learningVocabularyInput.getQuality());
                    }
                    return learningVocabularyInput.getQuality();
                }).sum();

        return createLearningHistory(studentEntity, calculateExperience(totalQuality), TypeLearn.LEARN_NEW.name());
    }

    private void createLearningVocabulary(VocabularyOfLessonEntity vocabularyOfLessonEntity,
            StudentEntity studentEntity, double quality) {
        LearningVocabularyEntity learningVocabularyEntity = new LearningVocabularyEntity();
        learningVocabularyEntity.setStudent(studentEntity);
        learningVocabularyEntity.setVocabularyOfLesson(vocabularyOfLessonEntity);
        updateLearning(learningVocabularyEntity, (int) Math.floor(quality));
    }

    private void updateLearningVocabulary(LearningVocabularyEntity learningVocabularyEntity, double quality) {
        updateLearning(learningVocabularyEntity, (int) Math.floor(quality));
    }

    private LearningVocabularyEntity updateLearning(LearningVocabularyEntity learningVocabularyEntity, int quality) {
        int repetitions = learningVocabularyEntity.getRepetitions();
        double easiness = learningVocabularyEntity.getEasiness() != 0 ? learningVocabularyEntity.getEasiness()
                : INITIAL_EASINESS;

        if (quality < 3) {
            learningVocabularyEntity.setRepetitions(0);
            learningVocabularyEntity.setReviewInterval(MIN_INTERVAL);
        } else {
            int newInterval;
            if (repetitions == 0) {
                newInterval = MIN_INTERVAL;
            } else if (repetitions == 1) {
                newInterval = 6;
            } else {
                newInterval = (int) Math.round(learningVocabularyEntity.getReviewInterval() * easiness);
            }
            learningVocabularyEntity.setReviewInterval(newInterval);
            learningVocabularyEntity.setRepetitions(repetitions + 1);
        }

        easiness = Math.max(1.3, Math.min(2.5, easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
        learningVocabularyEntity.setEasiness(Math.round(easiness * 10) / 10.0);
        learningVocabularyEntity.setLastReview(LocalDate.now());
        learningVocabularyEntity.setNextReview(
                learningVocabularyEntity.getLastReview().plusDays(learningVocabularyEntity.getReviewInterval()));

        return learningVocabularyRepository.save(learningVocabularyEntity);
    }

    private long calculateExperience(double quality) {
        return Math.round(quality * 100 * CONVERSION_RATE);
    }

    private LearningHistoryEntity createLearningHistory(StudentEntity studentEntity, long experience,
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
