import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/model/user';
import { UserService } from '@app/services/user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuOpen = true;
  currentUser: User | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
    this.loadCurrentUser();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }

  loadCurrentUser(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }
}
