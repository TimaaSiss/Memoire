import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '@app/services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        recipient: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        msgBody: this.contactForm.value.message
      };

      this.emailService.sendEmail(formData).subscribe(
        response => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
        },
        error => {
          console.error('Error sending email', error);
          alert('Error sending email');
        }
      );
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
