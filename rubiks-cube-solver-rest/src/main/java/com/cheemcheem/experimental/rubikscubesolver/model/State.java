package com.cheemcheem.experimental.rubikscubesolver.model;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Data
@Entity
public class State {

  private static final Logger logger = LoggerFactory.getLogger(State.class);

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  /**
   * List of colours representing the state of the Rubik's cube.
   * See:
   * <pre>
   *              | 36 37 38 |
   *              | 39 40 41 |
   *              | 42 43 44 |
   *   |  0  1  2 |  9 10 12 | 18 19 20 | 27 28 29 |
   *   |  3  4  5 | 12 13 14 | 21 22 23 | 30 31 32 |
   *   |  6  7  8 | 15 16 17 | 24 25 26 | 33 34 35 |
   *              | 45 46 47 |
   *              | 48 49 50 |
   *              | 51 52 53 |
   * </pre>
   * <pre>
   *     |B|
   *   |O|W|R|Y|
   *     |G|
   * </pre>
   */
  @ElementCollection
  private List<Colour> colours;

  public Colour colourAt(int position) {
    return this.colours.get(position);
  }
}
