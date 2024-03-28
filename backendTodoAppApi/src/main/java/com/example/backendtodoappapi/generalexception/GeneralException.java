package com.example.backendtodoappapi.generalexception;

import org.springframework.http.HttpStatus;

public class GeneralException extends RuntimeException {
    private final ErrorType errorType;
    private final String errorMessage;
    private final HttpStatus httpStatus;

    public GeneralException(ErrorType errorType, String errorMessage, HttpStatus httpStatus) {
        super(errorMessage);
        this.errorType = errorType;
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }
    public ErrorType getErrorType() {
        return errorType;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}

