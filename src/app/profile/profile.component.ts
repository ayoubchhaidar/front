import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
myform: FormGroup;
selectedFile!: File;
noFileSelected = true;
editMode: boolean = false;
onFileChange(event: any) {
  if (event.target.files.length > 0) {
  this.selectedFile = event.target.files[0];
  this.noFileSelected = false;

}
 
}
  signeduser!:any;

  user ={"id":null,
  "password": null,
  "username": null,
  "full_name": null,
  "email":null,
  "is_active": null,
  "is_superuser": null,
  "is_staff": null,
  "date_joined": null,
  "last_login": null,
  "image": null,}

  UpdatedUser={}

  constructor(private AuthService: AuthService) {   
    this.myform = new FormGroup({
    Username: new FormControl(''),
    full_name: new FormControl(''),
    email: new FormControl(''),
  });}

  ngOnInit(): void {


    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);






    const userId = 10; // Replace with the actual user ID you want to retrieve
    this.AuthService.getUserProfile(this.signeduser.user_id).subscribe(user => {
      this.user = user;
      console.log(this.user)
      this.myform.setValue({
        Username: this.user.username,
        full_name: this.user.full_name,     
        email: this.user.email,
      });

    });
 

  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  updateUserProfile(): void {
   

    const formData = new FormData();
    formData.append('username', this.myform.value['Username']);
    formData.append('full_name', this.myform.value['full_name']); 
    formData.append('email', this.myform.value['email']);
    if( this.noFileSelected===false){     formData.append('image', this.selectedFile); }





   
    this.AuthService.updateUserProfile(this.signeduser.user_id, formData)
      .subscribe(
        (data: any) => {
          console.log('User profile updated successfully:', data);
          window.location.reload();
          
        },
        (error: any) => {
          console.error('Error updating user profile:', error);
        }
      );
      this.editMode = false;
  }

  
}
