FROM openjdk:13-jdk-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
COPY target/rubiks-cube-solver.jar rubiks-cube-solver.jar
EXPOSE 8080
# ENTRYPOINT exec java $JAVA_OPTS -jar rubiks-cube-solver.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar rubiks-cube-solver.jar