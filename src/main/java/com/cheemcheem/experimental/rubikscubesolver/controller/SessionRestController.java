package com.cheemcheem.experimental.rubikscubesolver.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionRestController {
  private static final Logger logger = LoggerFactory.getLogger(SessionRestController.class);

  @RequestMapping("/api/authentication")
  public ResponseEntity<?> authenticate() {
    logger.info("SessionRestController.authenticate");
    return ResponseEntity.noContent().build();
  }

}
