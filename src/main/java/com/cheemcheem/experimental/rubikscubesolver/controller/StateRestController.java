package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.dto.StateDTO;
import com.cheemcheem.experimental.rubikscubesolver.service.StateService;
import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.LongValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/state")
public class StateRestController {

  private static final Logger logger = LoggerFactory.getLogger(StateRestController.class);
  private final StateService stateService;

  @GetMapping("/get")
  public ResponseEntity<StateDTO> getStateForSession(@RequestAttribute(Constants.STATE_ATTRIBUTE_KEY) Long stateId) {
    logger.info("StateRestController.getStateById");

    var optionalState = stateService.getStateDTOById(stateId);
    if (logger.isDebugEnabled()) {
      if (optionalState.isPresent()) {
        logger.debug("State found '{}' for id '{}'.", optionalState, stateId);
      } else {
        logger.debug("State not found for id '{}'.", stateId);
      }
    }

    return ResponseEntity.of(optionalState);
  }

  @PostMapping("/new")
  public ResponseEntity<StateDTO> newState(HttpSession httpSession) {
    logger.info("StateRestController.newState");

    var sessionId = httpSession.getId();
    logger.debug("Session found '{}'.", sessionId);

    var oldStateId = httpSession.getAttribute(Constants.STATE_SESSION_KEY);
    if (oldStateId != null) {
      logger.debug("Session '{}' contains previous state with id '{}'. Proceeding to delete previous state.", sessionId, oldStateId);
      var oldStateIdLong = LongValidator.getInstance().validate(oldStateId.toString());
      if (oldStateIdLong == null) {
        logger.warn("Previous state id in session is not a valid Long '{}'.", oldStateId);
      }
      if (stateService.deleteState(oldStateIdLong)) {
        logger.debug("Deleted previous state with id '{}' for session '{}'.", oldStateId, sessionId);
      } else {
        logger.warn("Previous state id '{}' could not be found.", oldStateIdLong);
      }
    }

    var stateId = stateService.newState();
    logger.debug("State created with id '{}'.", stateId);

    httpSession.setAttribute(Constants.STATE_SESSION_KEY, stateId);
    logger.debug("Session '{}' now stores state id '{}'.", sessionId, stateId);
    return ResponseEntity.created(URI.create(("/api/state/get"))).build();
  }

}
