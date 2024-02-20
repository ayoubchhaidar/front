import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myform: FormGroup;

  constructor(private authService: AuthService) {
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.myform.controls;
  }

  onSubmit() {

    this.authService.login(this.myform.value['username'], this.myform.value['password']).pipe(first()).subscribe(data=>{
          console.log(data); 
          location.reload();
        },
        error => {
          console.error('Error occurred during login:', error);
        }
      );
  }


// logout(){
//     localStorage.removeItem("currentUser");
//     location.reload();
//   }

}
