package com.dt.flashlearn.service.component;

import com.dt.flashlearn.model.response.AIResponse;

public interface AIService {
    AIResponse generateSimilarWord(String word);
}
