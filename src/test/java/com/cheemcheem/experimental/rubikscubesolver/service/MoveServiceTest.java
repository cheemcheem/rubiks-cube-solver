package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.BLUE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.GREEN;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.ORANGE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.RED;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.WHITE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.YELLOW;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class MoveServiceTest {

  private final StateBuilder builder = new StateBuilder();
  private final long stateId = 0L;
  private State state;
  private StateService stateService;

  @BeforeEach
  public void setUp() {
    this.state = this.builder.createState();
    this.stateService = mock(StateService.class);
    when(stateService.getStateById(stateId)).thenReturn(Optional.of(state));
    doNothing().when(stateService).saveExistingState(isA(State.class));
  }

  private void makeMoveAndVerify(Move move, List<Colour> expectedColours) {

    var moveService = new MoveService(stateService);
    moveService.makeMove(move, stateId);

    verify(stateService, times(1)).getStateById(isA(Long.class));
    verify(stateService, times(1)).saveExistingState(isA(State.class));

    var expectedState = this.builder.setColours(expectedColours).setHistory(List.of(move)).createState();

    assertEquals(expectedState, state);
    assertArrayEquals(state.getColours().toArray(), expectedColours.toArray());
  }


  @Test
  public void givenStateExists_whenXLEFTUPMoveIsMade_thenStateIsModified() {
    var move = Move.X_LEFT_UP;
    var expectedColours = List.of(ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, GREEN, WHITE, WHITE, GREEN, WHITE, WHITE, GREEN, WHITE, WHITE, RED, RED, RED, RED, RED, RED, RED, RED, RED, YELLOW, YELLOW, BLUE, YELLOW, YELLOW, BLUE, YELLOW, YELLOW, BLUE, WHITE, BLUE, BLUE, WHITE, BLUE, BLUE, WHITE, BLUE, BLUE, YELLOW, GREEN, GREEN, YELLOW, GREEN, GREEN, YELLOW, GREEN, GREEN);

    makeMoveAndVerify(move, expectedColours);

  }

  @Test
  public void givenStateExists_whenXLEFTDOWNMoveIsMade_thenStateIsModified() {
    var move = Move.X_LEFT_DOWN;
    var expectedColours = List.of(ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, BLUE, WHITE, WHITE, BLUE, WHITE, WHITE, BLUE, WHITE, WHITE, RED, RED, RED, RED, RED, RED, RED, RED, RED, YELLOW, YELLOW, GREEN, YELLOW, YELLOW, GREEN, YELLOW, YELLOW, GREEN, YELLOW, BLUE, BLUE, YELLOW, BLUE, BLUE, YELLOW, BLUE, BLUE, WHITE, GREEN, GREEN, WHITE, GREEN, GREEN, WHITE, GREEN, GREEN);

    makeMoveAndVerify(move, expectedColours);
  }

  @Test
  public void givenAnyMoveAndAFreshState_whenTheMoveIsMadeFourTimes_thenTheStateIsStillFresh() {
    var moveService = new MoveService(stateService);
    for (Move move : Move.values()) {
      moveService.makeMove(move, stateId);
      assertNotEquals(this.state, this.builder.createState());
      moveService.makeMove(move, stateId);
      assertNotEquals(this.state, this.builder.createState());
      moveService.makeMove(move, stateId);
      assertNotEquals(this.state, this.builder.createState());
      moveService.makeMove(move, stateId);
      assertEquals(this.state, this.builder.createState());
    }
  }


}