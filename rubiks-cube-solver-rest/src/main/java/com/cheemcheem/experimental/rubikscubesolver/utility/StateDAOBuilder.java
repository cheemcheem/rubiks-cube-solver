package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.dao.StateDAO;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StateDAOBuilder {

  private static final Logger logger = LoggerFactory.getLogger(StateDAOBuilder.class);

  private List<String> colours;

  public StateDAOBuilder setState(State state) {
    this.colours = state.getColours().stream().map(Objects::toString).collect(Collectors.toList());
    return this;
  }

  public StateDAO createStateDAO() {
    return new StateDAO(this.colours);
  }
}
