package com.example.backendtodoappapi.generalexception;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GeneralExceptionResponse {
    private final ErrorType errorType;
    private final String errorMessage;
    private final int statusCode;

    public GeneralExceptionResponse(ErrorType errorType, String errorMessage, int statusCode) {
        this.errorType = errorType;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }

}

