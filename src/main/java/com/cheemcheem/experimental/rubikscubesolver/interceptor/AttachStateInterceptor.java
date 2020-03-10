package com.cheemcheem.experimental.rubikscubesolver.interceptor;

import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.function.Predicate;
import java.util.regex.Pattern;


public class AttachStateInterceptor implements HandlerInterceptor {
  private static final Logger logger = LoggerFactory.getLogger(AttachStateInterceptor.class);
  private static final Predicate<String> excludedPaths
          = Pattern.compile("(/api/state(?!/new)(/.*)*)|(/api/move(/.*)*)|(/api/shuffle(/.*)*)").asMatchPredicate().negate();

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    logger.info("AttachStateInterceptor.preHandle");

    if (excludedPaths.test(request.getServletPath())) {
      logger.debug("Path '{}' does not require state, proceeding.", request.getServletPath());
      return true;
    }

    logger.debug("Path '{}' requires state.'", request.getServletPath());

    var session = request.getSession();
    var stateId = session.getAttribute(Constants.STATE_SESSION_KEY);

    if (stateId == null) {
      logger.warn("Interceptor failed. State id attached to session is null.");
      response.setStatus(404);
      return false;
    } else {
      logger.debug("State id '{}' attached to session '{}'.", stateId, session.getId());
    }

    var stateIdString = stateId.toString();
    var stateIdLong = NumberUtils.toLong(stateIdString, -1L);
    if (stateIdLong == -1L) {
      logger.warn("Interceptor failed. State id in session is not a valid Long '{}'.", stateIdString);
      response.setStatus(404);
      return false;
    }

    request.setAttribute(Constants.STATE_ATTRIBUTE_KEY, stateIdLong);
    logger.info("Attached state id to request.");
    logger.debug("Attached state id '{}' to request.", stateIdString);
    return true;

  }
}
