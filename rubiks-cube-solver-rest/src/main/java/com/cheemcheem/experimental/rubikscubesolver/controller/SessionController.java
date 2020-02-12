package com.cheemcheem.experimental.rubikscubesolver.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

  @RequestMapping("/api/authentication")
  public String helloAdmin() {
    return "hello admin";
  }

}
