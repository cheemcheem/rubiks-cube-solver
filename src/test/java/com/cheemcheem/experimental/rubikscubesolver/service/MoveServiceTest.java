package com.cheemcheem.experimental.rubikscubesolver.service;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateBuilder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.BLUE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.GREEN;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.ORANGE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.RED;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.WHITE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.YELLOW;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class MoveServiceTest {


  private StateBuilder builder;

  @BeforeAll
  public static void beforeAll() {
    final Logger logger = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
    logger.setLevel(Level.OFF);
  }

  @BeforeEach
  public void setUp() {
    this.builder = new StateBuilder();
  }

  @DisplayName("givenStateExists_whenMoveIsMade_thenStateIsModified")
  @Test
  public void givenStateExists_whenMoveIsMade_thenStateIsModified() {
    var stateId = 0L;
    var state = this.builder.createState();

    var stateService = mock(StateService.class);
    when(stateService.getStateById(stateId)).thenReturn(Optional.of(state));
    doNothing().when(stateService).saveExistingState(isA(State.class));

    var moveService = new MoveService(stateService);
    moveService.makeMove(Move.X_LEFT_UP, stateId);

    verify(stateService, times(1)).getStateById(isA(Long.class));
    verify(stateService, times(1)).saveExistingState(isA(State.class));

    var expectedState = this.builder.setColours(List.of(ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, GREEN, WHITE, WHITE, GREEN, WHITE, WHITE, GREEN, WHITE, WHITE, RED, RED, RED, RED, RED, RED, RED, RED, RED, YELLOW, YELLOW, BLUE, YELLOW, YELLOW, BLUE, YELLOW, YELLOW, BLUE, WHITE, BLUE, BLUE, WHITE, BLUE, BLUE, WHITE, BLUE, BLUE, YELLOW, GREEN, GREEN, YELLOW, GREEN, GREEN, YELLOW, GREEN, GREEN)).createState();

    assertEquals(expectedState, state);

  }
}