package com.phisingguard.phishing_detector.service;

import org.springframework.stereotype.Service;

@Service
public class RiskAnalysisService {

    public int calculateRisk(String url) {

        int score = 0;

        if(url.length() > 75)
            score += 20;

        if(url.contains("@"))
            score += 30;

        if(url.contains("login") || url.contains("verify") || url.contains("bank"))
            score += 25;

        if(url.split("\\.").length > 4)
            score += 15;

        if(url.matches(".*\\d+\\.\\d+\\.\\d+\\.\\d+.*"))
            score += 30;

        return Math.min(score,100);
    }
}