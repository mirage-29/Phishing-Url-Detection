package com.phisingguard.phishing_detector.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class UrlResponse {

    private String status;

    private String source;

    private int riskScore;

    private String domain;

    private int subdomains;

}