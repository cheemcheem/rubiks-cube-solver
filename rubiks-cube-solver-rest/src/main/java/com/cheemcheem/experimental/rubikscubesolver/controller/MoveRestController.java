package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/move")
@RestController
public class MoveRestController {
    private static final Logger logger = LoggerFactory.getLogger(MoveRestController.class);

    @PutMapping("/{move}")
    public ResponseEntity<?> makeMove(
            @RequestAttribute(Constants.STATE_ATTRIBUTE_KEY) Long stateIdLong,
            @PathVariable Move move
    ) {
        logger.info("MoveRestController.makeMove");
        logger.info("Making move '{}' on state '{}'.", move, stateIdLong);

        return ResponseEntity.noContent().build();
    }
}
