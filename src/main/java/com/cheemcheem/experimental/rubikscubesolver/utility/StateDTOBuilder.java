package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.dto.StateDTO;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class StateDTOBuilder {

  private static final Logger logger = LoggerFactory.getLogger(StateDTOBuilder.class);

  private List<String> colours;

  public StateDTOBuilder setState(State state) {
    logger.info("StateDTOBuilder.setState");
    logger.info("Setting state to be '{}' ", state);
    this.colours = state.getColours().stream().map(Objects::toString).collect(Collectors.toList());
    return this;
  }

  public StateDTO createStateDTO() {
    logger.info("StateDTOBuilder.createStateDTO");
    return new StateDTO(this.colours);
  }
}
