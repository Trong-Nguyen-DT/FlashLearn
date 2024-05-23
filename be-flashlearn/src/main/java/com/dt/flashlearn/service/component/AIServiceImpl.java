package com.dt.flashlearn.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dt.flashlearn.model.request.VocabularyRequest;
import com.dt.flashlearn.model.response.AIResponse;

@Service
public class AIServiceImpl implements AIService {
    
    @Value("${ai.url}")
    private String apiUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public AIResponse generateSimilarWord(String word) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        VocabularyRequest input = new VocabularyRequest();
        input.setInput(word);
        HttpEntity<VocabularyRequest> requestEntity = new HttpEntity<>(input, headers);

        ResponseEntity<AIResponse> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                requestEntity,
                AIResponse.class
        );
        return responseEntity.getBody();
    }

    
}
