package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.dao.StateDAO;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.repository.StateRepository;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateBuilder;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateDAOBuilder;
import java.util.Optional;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Data
@Service
public class StateService {

  private static final Logger logger = LoggerFactory.getLogger(StateService.class);
  private final StateRepository stateRepository;

  public Optional<StateDAO> getStateDAOById(Long id) {
    logger.info("StateService.getStateDAOById");
    logger.debug("Find state with id = " + id);
    var state = this.stateRepository.findById(id);
    logger.debug("Find by id complete.");
    if (state.isPresent()) {
      var builder = new StateDAOBuilder();
      var stateDAO = builder.setState(state.get()).createStateDAO();
      logger.debug("Found state = " + state);
      return Optional.of(stateDAO);
    }

    logger.debug("Did not find state with id = {}", id);
    return Optional.empty();
  }

  public Long newState() {
    logger.info("StateService.newState");

    var builder = new StateBuilder();
    var state = builder.createState();
    logger.debug("Created new state = {}", state);

    var savedState = this.stateRepository.save(state);
    logger.debug("Saved state with id = {}", savedState.getId());

    return savedState.getId();
  }

  public Optional<State> getStateById(Long id) {
    return this.stateRepository.findById(id);
  }
}
