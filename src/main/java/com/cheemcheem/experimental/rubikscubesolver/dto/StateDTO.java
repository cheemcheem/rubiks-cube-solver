package com.cheemcheem.experimental.rubikscubesolver.dto;

import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class StateDTO {
  @NonNull
  private List<String> colours;
}
