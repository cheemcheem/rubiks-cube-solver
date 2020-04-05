package com.cheemcheem.experimental.rubikscubesolver.service;


import com.cheemcheem.experimental.rubikscubesolver.utility.CubeValidator;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ValidatorService {

  private static final Logger logger = LoggerFactory.getLogger(ValidatorService.class);

  private final StateService stateService;

  /**
   * Checks that all of the colours of the cube are in valid positions.
   * I.e. all of the pieces of a normal rubiks cube are present in this cube.
   * <p>
   * Transactional annotation required due to lazy loading of state.get().
   *
   * @param stateId State ID to retrieve state from StateService.
   * @return Optional.empty() if no State exists for stateId. Optional.of(true) if valid, Optional.of(false) if invalid.
   */
  @Transactional
  public Optional<Boolean> validateState(Long stateId) {
    var optionalState = stateService.getStateById(stateId);

    if (logger.isDebugEnabled()) {
      if (optionalState.isPresent()) {
        logger.debug("State found '{}' for id '{}'.", optionalState, stateId);
      } else {
        logger.debug("State not found for id '{}'.", stateId);
      }
    }

    if (optionalState.isEmpty()) {
      return Optional.empty();
    }

    var state = optionalState.get();
    var cubeValidator = new CubeValidator(state);
    var valid = cubeValidator.validateCube();

    logger.info("Validated cube.");
    logger.debug("Valid: '{}'.", valid);
    return Optional.of(valid);
  }

}
