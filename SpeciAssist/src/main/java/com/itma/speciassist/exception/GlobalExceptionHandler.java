package com.itma.speciassist.exception;

/*
 * import org.springframework.http.HttpStatus;
 * 
 * import org.springframework.http.ResponseEntity; import
 * org.springframework.web.bind.annotation.ExceptionHandler; import
 * org.springframework.web.bind.annotation.RestControllerAdvice;
 * 
 *///@RestControllerAdvice
/*public class GlobalExceptionHandler {

	 @ExceptionHandler(RuntimeException.class)
	    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
	        if (ex.getMessage().contains("Too many requests to OpenAI API")) {
	            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
	                    .body("Too many requests to OpenAI API. Please try again later.");
	        }
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("An error occurred: " + ex.getMessage());
	    }
}
*/