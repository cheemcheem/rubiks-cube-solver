package com.cheemcheem.experimental.rubikscubesolver.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.savedrequest.NullRequestCache;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
            .inMemoryAuthentication()
            .withUser("user").password("{noop}user").roles("USER")
            .and()
            .withUser("admin").password("{noop}admin").roles("ADMIN", "USER");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    //@formatter:off
    http
        .csrf()
          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
          .and()
        .exceptionHandling()
          .and()
        .authorizeRequests()
          .antMatchers("/").hasRole("USER")
          .anyRequest()
          .authenticated()
          .and()
        .requestCache()
            .requestCache(new NullRequestCache()) // stop auto redirect after auth
            .and()
        .formLogin()
          .loginProcessingUrl("/api/authentication")
          .and()
        .httpBasic();
    //@formatter:on
  }
}