package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.dao.StateDAO;
import com.cheemcheem.experimental.rubikscubesolver.service.StateService;
import java.net.URI;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
@RequestMapping("/api/state")
public class StateRestController {

  private static final Logger logger = LoggerFactory.getLogger(StateRestController.class);
  private final StateService stateService;

  @GetMapping("/{id}")
  public ResponseEntity<StateDAO> getStateById(@PathVariable Long id) {
    logger.info("StateRestController.getStateById");
    logger.debug("Find state with id = {}", id);

    var optionalState = stateService.getStateDAOById(id);
    logger.debug("Found state = {}", optionalState);

    return ResponseEntity.of(optionalState);
  }

  @PostMapping("/new")
  public ResponseEntity<StateDAO> newState() {
    logger.info("StateRestController.newState");

    var id = stateService.newState();
    logger.debug("Created new state with id = {}", id);

    return ResponseEntity.created(URI.create(String.format("/api/state/%d", id))).build();
  }

}
