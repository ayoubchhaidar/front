import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verif-setup',
  templateUrl: './verif-setup.component.html',
  styleUrls: ['./verif-setup.component.css']
})
export class VerifSetupComponent implements OnInit {
  ngOnInit(): void {
  
    this.authService.getVerifStatus().subscribe(
      (data: boolean) => {
      
        this.userr.checked =data; // Set checkbox status based on verification status
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    
  }
  constructor(private authService: AuthService) {
  
  }
  userr = { checked: false }; 
  changeVerificationStatus(newStatus: boolean){

    this.authService.changeVerificationStatus(newStatus).subscribe();
  }


}
