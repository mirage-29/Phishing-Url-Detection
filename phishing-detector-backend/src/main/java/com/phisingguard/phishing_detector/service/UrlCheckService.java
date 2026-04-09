package com.phisingguard.phishing_detector.service;


import com.phisingguard.phishing_detector.model.PhishingUrl;
import com.phisingguard.phishing_detector.repository.PhishingUrlRepository;
import com.phisingguard.phishing_detector.dto.UrlResponse;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UrlCheckService {

    private final PhishingUrlRepository repo;
    private final GoogleSafeBrowsingService googleService;
    private final RiskAnalysisService riskService;
    private final DomainAnalysisService domainService;

    public UrlCheckService(
            PhishingUrlRepository repo,
            GoogleSafeBrowsingService googleService,
            RiskAnalysisService riskService,
            DomainAnalysisService domainService) {

        this.repo = repo;
        this.googleService = googleService;
        this.riskService = riskService;
        this.domainService = domainService;
    }

    public UrlResponse checkUrl(String url) {

        int risk = riskService.calculateRisk(url);

        String domain = domainService.getDomain(url);
        int subs = domainService.subdomainCount(url);

        boolean exists = repo.existsByUrl(url);

        if (exists) {
            return new UrlResponse("PHISHING", "LOCAL_DATABASE", risk, domain, subs);
        }

        boolean flagged = googleService.checkUrl(url);

        String status = flagged ? "PHISHING" : "SAFE";
        String source = flagged ? "GOOGLE_API" : "NONE";

        PhishingUrl scan = new PhishingUrl();
        if (flagged) {
            risk = 100;
        }
        scan.setUrl(url);
        scan.setStatus(status);
        scan.setSource(source);
        scan.setRiskScore(risk);
        scan.setScannedAt(java.time.LocalDateTime.now());

        repo.save(scan);

        return new UrlResponse(status, source, risk, domain, subs);
    }
}