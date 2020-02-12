package com.cheemcheem.experimental.rubikscubesolver.dao;

import java.util.List;
import lombok.Data;
import lombok.NonNull;

@Data
public class StateDAO {

  @NonNull
  private List<String> colours;
}
