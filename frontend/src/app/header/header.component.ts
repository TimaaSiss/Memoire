import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/model/user';
import { UserService } from '@app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }
}
