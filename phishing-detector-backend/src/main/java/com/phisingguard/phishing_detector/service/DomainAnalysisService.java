package com.phisingguard.phishing_detector.service;


import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class DomainAnalysisService {

    public String getDomain(String url) {

        try{
            URI uri = new URI(url);
            return uri.getHost();
        }
        catch(Exception e){
            return "Invalid URL";
        }

    }

    public int subdomainCount(String url) {

        try {
            URI uri = new URI(url);
            String host = uri.getHost();

            if (host == null) return 0;

            String[] parts = host.split("\\.");

            if (parts.length <= 2)
                return 0;

            return parts.length - 2;

        } catch (Exception e) {
            return 0;
        }
    }
}