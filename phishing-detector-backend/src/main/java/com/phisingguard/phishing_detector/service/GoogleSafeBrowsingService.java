package com.phisingguard.phishing_detector.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GoogleSafeBrowsingService {

    private final WebClient webClient = WebClient.create();

    private final String API_KEY = "AIzaSyBfX6vs6sWsupKcyNTwaxnDHPmJKj72Vbw";

    public boolean checkUrl(String url) {

        String endpoint =
                "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + API_KEY;

        String body = """
        {
          "client": {
            "clientId": "phish-detector",
            "clientVersion": "1.0"
          },
          "threatInfo": {
            "threatTypes": ["MALWARE","SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [
              {"url": "%s"}
            ]
          }
        }
        """.formatted(url);

        String response = webClient.post()
                .uri(endpoint)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response != null && response.contains("matches");
    }
}
