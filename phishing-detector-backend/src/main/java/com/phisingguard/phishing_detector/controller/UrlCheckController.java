package com.phisingguard.phishing_detector.controller;

import com.phisingguard.phishing_detector.dto.UrlRequest;
import com.phisingguard.phishing_detector.dto.UrlResponse;
import com.phisingguard.phishing_detector.model.PhishingUrl;
import com.phisingguard.phishing_detector.repository.PhishingUrlRepository;
import com.phisingguard.phishing_detector.service.UrlCheckService;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/url")
@CrossOrigin
public class UrlCheckController {

    private final UrlCheckService service;
    private final PhishingUrlRepository repo;

    public UrlCheckController(UrlCheckService service , PhishingUrlRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    @PostMapping("/check")
    public UrlResponse checkUrl(@RequestBody UrlRequest request) {

        return service.checkUrl(request.getUrl());

    }

    @GetMapping("/history")
    public List<PhishingUrl> history(){

        return repo.findAll();

    }
    @GetMapping("/stats")
    public Map<String,Long> stats(){

        long total = repo.count();

        long phishing = repo.findAll()
                .stream()
                .filter(p -> p.getStatus().equals("PHISHING"))
                .count();

        long safe = total - phishing;

        Map<String,Long> map = new HashMap<>();

        map.put("total",total);
        map.put("phishing",phishing);
        map.put("safe",safe);

        return map;
    }
}