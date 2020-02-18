package com.cheemcheem.experimental.rubikscubesolver.config;

import com.cheemcheem.experimental.rubikscubesolver.interceptor.StateCreatedInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfiguration implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new StateCreatedInterceptor());
    }
}
