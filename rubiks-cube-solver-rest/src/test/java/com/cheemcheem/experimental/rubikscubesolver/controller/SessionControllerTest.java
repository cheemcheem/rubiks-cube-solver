package com.cheemcheem.experimental.rubikscubesolver.controller;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties.Jedis;
import org.springframework.boot.test.web.client.TestRestTemplate;

class SessionControllerTest {

  private Jedis jedis;
  private TestRestTemplate testRestTemplate;
  private TestRestTemplate testRestTemplateWithAuth;
  private String testUrl = "http://localhost:8080/";

  @BeforeAll
  public void clearRedisData() {
    testRestTemplate = new TestRestTemplate();
    testRestTemplateWithAuth = new TestRestTemplate("admin", "password", null);

//    jedis =
  }
}