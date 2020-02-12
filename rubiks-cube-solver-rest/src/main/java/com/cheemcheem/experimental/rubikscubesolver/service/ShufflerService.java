package com.cheemcheem.experimental.rubikscubesolver.service;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class ShufflerService {

  private final StateService stateService;

  public void shuffle() {

  }
}
