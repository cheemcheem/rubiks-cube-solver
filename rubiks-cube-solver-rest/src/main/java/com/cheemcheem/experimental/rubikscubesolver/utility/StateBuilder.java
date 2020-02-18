package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.*;

@Component
public class StateBuilder {

  private static final Logger logger = LoggerFactory.getLogger(StateBuilder.class);

  private List<Colour> colours;

  private List<Colour> colours() {
    var state = new ArrayList<Colour>();

    var index = 0;
    final var maxIndex = 53;
    final var colourOrder = List.of(ORANGE, WHITE, RED, YELLOW, BLUE, GREEN);
    while (index < maxIndex) {
      for (Colour colour : colourOrder) {
        for (int colourIndex = 0; colourIndex < 9; colourIndex++) {
          state.add(index++, colour);
        }
      }
    }

    logger.debug("New state = {}", state);

    return state;
  }

  public StateBuilder setColours(List<Colour> colours) {
    this.colours = colours;
    return this;
  }

  public State createState() {
    if (this.colours == null) {
      this.colours = colours();
    }
    var state = new State();
    state.setColours(colours);
    return state;
  }
}
