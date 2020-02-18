package com.cheemcheem.experimental.rubikscubesolver.interceptor;

import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import org.apache.commons.validator.routines.LongValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public class StateCreatedInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(StateCreatedInterceptor.class);
    private final Predicate<String> excludedPaths = Pattern.compile("(/api/state/new)|(/api/authentication)").asMatchPredicate();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        logger.info("StateCreatedInterceptor.preHandle");
        logger.debug("Path '{}'", request.getServletPath());
        if (excludedPaths.test(request.getServletPath())) {
            logger.info("Path does not require state, proceeding.");
            return true;
        }

        var session = request.getSession();
        var stateId = session.getAttribute(Constants.STATE_SESSION_KEY);

        if (stateId == null) {
            logger.error("Interceptor failed. State id attached to session is null.");
            return false;
        } else {
            logger.debug("State id '{}' attached to session '{}'.", stateId, session.getId());
        }

        var stateIdString = stateId.toString();
        var stateIdLong = LongValidator.getInstance().validate(stateIdString);
        if (stateIdLong == null) {
            logger.error("Interceptor failed. State id in session is not a valid Long '{}'.", stateIdString);
            return false;
        }

        request.setAttribute(Constants.STATE_ATTRIBUTE_KEY, stateIdLong);
        logger.info("Attached state id to request.");
        logger.debug("Attached state id '{}' to request.", stateIdString);
        return true;

    }
}
