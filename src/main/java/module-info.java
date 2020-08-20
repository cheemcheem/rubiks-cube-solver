module rubiks.cube.solver {
  requires com.fasterxml.classmate;
  requires com.fasterxml.jackson.core;
  requires com.fasterxml.jackson.databind;
  requires java.persistence;
  requires java.sql;
  requires java.transaction;
  requires net.bytebuddy;
  requires org.apache.commons.lang3;
  requires org.apache.tomcat.embed.core;
  requires org.slf4j;
  requires spring.beans;
  requires spring.boot;
  requires spring.boot.autoconfigure;
  requires spring.context;
  requires spring.data.jpa;
  requires spring.webmvc;
  requires spring.security.config;
  requires spring.security.core;
  requires spring.security.web;
  requires spring.session.core;
  requires spring.web;

  requires static lombok;

  opens com.cheemcheem.experimental.rubikscubesolver;
  opens com.cheemcheem.experimental.rubikscubesolver.config to spring.core, spring.beans, spring.context;
  opens com.cheemcheem.experimental.rubikscubesolver.controller to spring.beans, spring.web;
  opens com.cheemcheem.experimental.rubikscubesolver.dto to com.fasterxml.jackson.databind;
  opens com.cheemcheem.experimental.rubikscubesolver.interceptor to spring.beans;
  opens com.cheemcheem.experimental.rubikscubesolver.model to spring.core, spring.beans, spring.data.jpa, org.hibernate.orm.core;
  opens com.cheemcheem.experimental.rubikscubesolver.repository to spring.beans, spring.core;
  opens com.cheemcheem.experimental.rubikscubesolver.service;
  opens com.cheemcheem.experimental.rubikscubesolver.utility to spring.beans;

  exports com.cheemcheem.experimental.rubikscubesolver;

}