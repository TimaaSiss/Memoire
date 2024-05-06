package com.itma.speciassist.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itma.speciassist.dto.ErrorDto;
import com.itma.speciassist.exception.AppException;

@ControllerAdvice
public class RestExceptionHandler {
	
	@ExceptionHandler(value= {AppException.class})
	@ResponseBody
	
	public ResponseEntity<ErrorDto> HandleException(AppException ex){
		return ResponseEntity.status(ex.getHttpStatus())
				.body(new ErrorDto(ex.getMessage()));
	}
}
