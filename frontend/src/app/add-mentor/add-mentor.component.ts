import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MentorService } from '@app/services/mentors.service';
import { UserService } from '@app/services/user-service.service';
import { Mentor } from '@app/model/mentor.model';
import { User } from '@app/model/user';

@Component({
  selector: 'app-add-mentor',
  templateUrl: './add-mentor.component.html',
  styleUrls: ['./add-mentor.component.scss']
})
export class AddMentorComponent implements OnInit {
  mentorForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddMentorComponent>
  ) {
    this.mentorForm = this.fb.group({
     // userId: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      specialite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
    if (this.mentorForm.valid) {
      const formValues = this.mentorForm.value;
  
      const newMentor: Mentor = {
        id: formValues.userId,
        nom: '',
        prenom: '',
        username: formValues.username,
        mail: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        role: formValues.role,
        editMode: false,
        status: true,
        specialite: formValues.specialite,
        active: true
      };
  
      this.mentorService.addMentor(newMentor).subscribe(
        response => {
          console.log('Mentor added successfully:', response);
          this.dialogRef.close(response); // Passez le nouveau mentor en tant que résultat
        },
        error => {
          console.error('Error adding mentor:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(false);
  }

 

  getErrorMessage(field: string): string {
    const control = this.mentorForm.get(field);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    } else if (control?.hasError('email')) {
      return 'Email invalide';
    }
    return '';
  }
}
