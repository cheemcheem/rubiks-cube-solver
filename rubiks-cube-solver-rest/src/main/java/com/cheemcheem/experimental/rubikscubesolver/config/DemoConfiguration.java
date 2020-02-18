package com.cheemcheem.experimental.rubikscubesolver.config;

import com.cheemcheem.experimental.rubikscubesolver.service.SolverService;
import com.cheemcheem.experimental.rubikscubesolver.service.StateService;
import com.cheemcheem.experimental.rubikscubesolver.service.ValidatorService;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Data
@Profile({"demo"})
public class DemoConfiguration {

  private static final Logger logger = LoggerFactory.getLogger(DemoConfiguration.class);
  private final StateService stateService;

  /**
   * Runs a demo version of this application. For testing only.
   *
   * @param context Autowired ConfigurableApplicationContext to extract beans from.
   * @return CommandLineRunner
   */
  @Bean
  public CommandLineRunner demo(ConfigurableApplicationContext context) {
    return (args -> {
      var solver = context.getBean(SolverService.class);
      var validator = context.getBean(ValidatorService.class);

      var stateId = stateService.newState();
      var validBefore = validator.validateState(stateId);

      if (validBefore.isEmpty()) {
        logger.error("Newly created state does not exist.");
        context.stop();
        context.close();
        System.exit(1);
      }

      if (!validBefore.get()) {
        logger.error("Invalid start state.");
        context.stop();
        context.close();
        System.exit(1);
        return;
      }

      solver.solve();

      var validAfter = validator.validateState(stateId);

      if (validAfter.isEmpty()) {
        logger.error("Newly created state does not exist after solve.");
        context.stop();
        context.close();
        System.exit(1);
      }

      if (!validAfter.get()) {
        logger.error("Invalid end state.");
        context.stop();
        context.close();
        System.exit(1);
        return;
      }

      logger.info("Solution found.");
      context.stop();
      context.close();
      System.exit(0);
    });
  }
}
