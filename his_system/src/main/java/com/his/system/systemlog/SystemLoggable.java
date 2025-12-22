package com.his.system.systemlog;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SystemLoggable {

    SystemLogActionType action();

    int targetIndex() default -1;

    String description() default "";
}