package com.dt.flashlearn.converter;

import com.dt.flashlearn.entity.LearningHistoryEntity;
import com.dt.flashlearn.model.LearningHistory;

public class LearningConverter {
    public static LearningHistory convertToLearningHistoryEntity(LearningHistoryEntity entity) {
        LearningHistory learningHistory = new LearningHistory();
        learningHistory.setId(entity.getId());
        learningHistory.setLearnAt(entity.getLearnAt());
        learningHistory.setExperience(entity.getExperience());
        learningHistory.setLearnType(entity.getLearnType());
        return learningHistory;
    }
}
