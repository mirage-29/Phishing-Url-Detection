package com.phisingguard.phishing_detector.repository;

import com.phisingguard.phishing_detector.model.PhishingUrl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhishingUrlRepository extends JpaRepository<PhishingUrl, Long> {

    Optional<PhishingUrl> findByUrl(String url);

    boolean existsByUrl(String url);

}