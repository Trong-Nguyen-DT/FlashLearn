package com.dt.flashlearn.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.LearningVocabularyEntity;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Vocabulary.SentenceEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.learn.LearnResponse;
import com.dt.flashlearn.model.response.learn.QuestionLearn;
import com.dt.flashlearn.model.response.learn.VocabularyLearn;
import com.dt.flashlearn.service.LearnService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class LearnServiceImpl implements LearnService {

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
                selectedVocabularies.stream().map(VocabularyConverter::vocabularyOfLessonToVocabulary).toList());
        List<LearningVocabularyEntity> learningVocabularyEntities = queryService.getLearningVocabularyEntityByStudent(lessonEntity, 4 - selectedVocabularies.size());
        learnResponse.setQuestions(createQuestionLearns(selectedVocabularies, learningVocabularyEntities));
        return new ResponseData(learnResponse);
    }

    private List<QuestionLearn> createQuestionLearns(List<VocabularyOfLessonEntity> vocabulariesNew, List<LearningVocabularyEntity> vocabulariesOld) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        for (VocabularyOfLessonEntity vocabulary : vocabulariesNew) {
            questionLearns.addAll(createQuestionLearnNew(vocabulary, "LEARN_NEW"));
        }
        if (!vocabulariesOld.isEmpty()) {
            for (LearningVocabularyEntity vocabulary : vocabulariesOld) {
                questionLearns.addAll(createQuestionPractice(vocabulary, "PRACTICE"));
            }
        }
        Collections.shuffle(questionLearns);
        return questionLearns;
    }

    private List<QuestionLearn> createQuestionLearnNew(VocabularyOfLessonEntity entity, String typeLearn) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                entity.getVocabulary().getWord(),
                entity.getMeaning(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                entity.getMeaning(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "LISTENING_TO_WORD",
                typeLearn,
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "LISTENING_TO_WORD",
                typeLearn,
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getMeaning(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "WORD_TO_LISTENING",
                typeLearn,
                entity.getVocabulary().getWord(),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                getRandomSentence(entity),
                entity.getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabulary().getSimilarWords()),
                false));

        return questionLearns;
    }

    private List<QuestionLearn> createQuestionPractice(LearningVocabularyEntity entity, String typeLearn) {
        List<QuestionLearn> questionLearns = new ArrayList<>();
        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                entity.getVocabularyOfLesson().getMeaning(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                entity.getVocabularyOfLesson().getMeaning(),
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "LISTENING_TO_WORD",
                typeLearn,
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "LISTENING_TO_WORD",
                typeLearn,
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                entity.getVocabularyOfLesson().getVocabulary().getMeaning(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                true));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "WORD_TO_LISTENING",
                typeLearn,
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                false));

        questionLearns.add(createMultipleChoiceQuestion(
                entity.getId(),
                "MULTIPLE_CHOICE",
                typeLearn,
                getRandomSentence(entity.getVocabularyOfLesson()),
                entity.getVocabularyOfLesson().getVocabulary().getWord(),
                getRandomSimilarWords(entity.getVocabularyOfLesson().getVocabulary().getSimilarWords()),
                false));

        return questionLearns;
    }

    private QuestionLearn createMultipleChoiceQuestion(
            Long id,
            String typeQuestion,
            String typeLearn,
            String questionText,
            String correctAnswerText,
            List<SimilarWordEntity> similarWords,
            boolean isWordToMeaning) {
        QuestionLearn questionLearn = new QuestionLearn();
        questionLearn.setId(id);
        questionLearn.setTypeQuestion(typeQuestion);
        questionLearn.setTypeLearn(typeLearn);
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
        return sentences.get(randomIndex).getSentence();
    }

}
