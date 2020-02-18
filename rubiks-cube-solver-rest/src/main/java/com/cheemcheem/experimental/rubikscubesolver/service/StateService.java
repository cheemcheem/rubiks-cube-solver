package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.dto.StateDTO;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.repository.StateRepository;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateBuilder;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateDTOBuilder;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Data
@Service
public class StateService {

  private static final Logger logger = LoggerFactory.getLogger(StateService.class);
  private final StateRepository stateRepository;
  private final StateDTOBuilder stateDTOBuilder;

  /**
   * Look up a State in the repository and return DTO representing it.
   * <p>
   * Transactional annotation required due to lazy loading of state.get().
   *
   * @param stateId State ID to look up in repository.
   * @return Optional containing DTO representing the found State, or Optional.empty() if not found.
   */
  @Transactional
  public Optional<StateDTO> getStateDTOById(Long stateId) {
    logger.info("StateService.getStateDTOById");
    logger.debug("Find state with id '{}'", stateId);

    var optionalState = this.stateRepository.findById(stateId);
    logger.debug("Find state by id complete.");

    if (optionalState.isPresent()) {
      logger.debug("Found state '{}' with id '{}'", optionalState.get(), stateId);
      var stateDTO = stateDTOBuilder.setState(optionalState.get()).createStateDTO();
      return Optional.of(stateDTO);
    }

    logger.debug("Did not find state with id '{}'.", stateId);
    return Optional.empty();
  }

  public Long newState() {
    logger.info("StateService.newState");

    var builder = new StateBuilder();
    var state = builder.createState();
    logger.debug("Created new state '{}'.", state);

    var savedState = this.stateRepository.save(state);
    logger.debug("Saved state with id '{}'.", savedState.getId());

    return savedState.getId();
  }

  /**
   * Look up a State in the repository and it.
   * <p>
   * Transactional annotation required due to lazy loading of state.get().
   *
   * @param stateId State ID to look up in repository.
   * @return Optional containing the found State, or Optional.empty() if not found.
   */
  @Transactional
  public Optional<State> getStateById(Long stateId) {
    logger.info("StateService.getStateById");
    logger.debug("Find state with id '{}'", stateId);
    var optionalState = this.stateRepository.findById(stateId);
    if (logger.isDebugEnabled()) {
      if (optionalState.isPresent()) {
        logger.debug("Found state '{}' with id '{}'.", optionalState.get(), stateId);
      } else {
        logger.debug("State not found for id '{}'.", stateId);
      }
    }
    return optionalState;
  }

  public boolean deleteState(Long stateId) {
    logger.info("StateService.deleteState");
    logger.debug("Deleting state with id '{}'.", stateId);

    var stateExists = this.stateRepository.existsById(stateId);

    if (stateExists) {
      logger.debug("Found state with id '{}'.", stateId);
      this.stateRepository.deleteById(stateId);
      logger.debug("Deleted state with id '{}'", stateId);
      return true;
    }

    logger.debug("Could not find state with id '{}'.", stateId);
    return false;
  }
}
