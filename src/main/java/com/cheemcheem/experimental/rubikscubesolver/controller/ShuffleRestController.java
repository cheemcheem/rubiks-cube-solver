package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.service.ShufflerService;
import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/shuffle")
@RequiredArgsConstructor
@RestController
public class ShuffleRestController {
  private static final Logger logger = LoggerFactory.getLogger(ShuffleRestController.class);

  private final ShufflerService shufflerService;

  /**
   * Allows a user to shuffle their Rubik's cube.
   *
   * @param stateId State ID of user's Rubik's cube, added to request attributes by StateCreatedInterceptor.
   * @return Status 204 if user had a state.  Not found if no state exists for user.
   */
  @PutMapping
  public ResponseEntity<?> shuffle(
          @RequestAttribute(Constants.STATE_ATTRIBUTE_KEY) Long stateId
  ) {
    logger.info("ShuffleRestController.shuffle");
    this.shufflerService.shuffle(stateId);
    logger.info("Shuffled cube.");
    return ResponseEntity.noContent().build();
  }
}

