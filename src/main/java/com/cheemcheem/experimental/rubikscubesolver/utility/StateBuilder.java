package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.BLUE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.GREEN;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.ORANGE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.RED;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.WHITE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.YELLOW;

@Component
public class StateBuilder {

  private static final Logger logger = LoggerFactory.getLogger(StateBuilder.class);

  private List<Colour> colours;
  private List<Move> history;

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

  public StateBuilder setHistory(List<Move> history) {
    this.history = history;
    return this;
  }

  public State createState() {
    if (this.colours == null) {
      this.colours = colours();
    }
    if (this.history == null) {
      this.history = new ArrayList<>();
    }
    var state = new State();
    state.setColours(new ArrayList<>(this.colours));
    state.setHistory(new ArrayList<>(this.history));
    return state;
  }
}
