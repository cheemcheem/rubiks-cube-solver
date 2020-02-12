package com.cheemcheem.experimental.rubikscubesolver.service;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class MoveService {

  private final StateService stateService;

}
