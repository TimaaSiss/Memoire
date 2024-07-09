package  com.itma.speciassist.model;
// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor
 
// Class
public class Email{
 
    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
   
	
	
	 public String getRecipient() {
	        return recipient;
	    }

	    public String getMsgBody() {
	        return msgBody;
	    }

	    public String getSubject() {
	        return subject;
	    }

	
}