package com.cheemcheem.experimental.rubikscubesolver.repository;

import com.cheemcheem.experimental.rubikscubesolver.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

}
