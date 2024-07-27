import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  msg: string | undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.authService.confirmEmail(username).subscribe(
        response => {
          console.log(response);  // Handle confirmation response
          this.msg = response.message;  // Assuming response has a message field
        },
        error => {
          console.error('Confirmation failed:', error);
          this.msg = 'Email confirmation failed. Please try again later.';
        }
      );
    });
  }
}
