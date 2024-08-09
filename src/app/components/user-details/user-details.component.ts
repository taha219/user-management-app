import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe(response => {
      this.user = response.data;
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
