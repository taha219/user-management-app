import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, NgxPaginationModule, CommonModule, HeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = false;
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage).subscribe(data => {
      if (data) {
        this.users = data['data'];
        this.totalPages = data['total_pages']; // Adjust based on your API response
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers(); 
  }
}
