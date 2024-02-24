import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  paramValue :any;
  listeDe : string='';
  speceficUsers:any[] = [];


deleteAll() {

for(let i=0;i<this.selectedUserIds.length;i++){
  this.deleteUser(this.selectedUserIds[i]);


}


}
selectedUserIds: any[] = [];
users: any[] = [];
checkbox: any;
showButton: any;
constructor (private AuthService: AuthService,private route: ActivatedRoute){

  this.paramValue=this.route.snapshot.params;
  this.listeDe= this.paramValue.param;
}
ngOnInit(): void {
this.getAllUsers();


}
toggleButtonVisibility() {
  // Check if any user is checked
  this.showButton = this.users.some(user => user.checked);
}

getAllUsers(): void {
  this.AuthService.getAllUsers().subscribe(
    (data: any[]) => {
      this.users = data;
      console.log( this.users)

      if(this.listeDe==='Apprenants'){
      this.speceficUsers=this.users.filter(user => (user.is_active==true  && user.is_staff==false) &&!user.is_superuser);
      console.log(this.speceficUsers);}
      else if(this.listeDe=='Formateurs'){
        this.speceficUsers=this.users.filter(user => (user.is_staff==true  && user.is_active==true) &&!user.is_superuser);
        console.log(this.speceficUsers);}
      else if(this.listeDe=='Administraeurs'){
          this.speceficUsers=this.users.filter(user => user.is_superuser==true);
          console.log(this.speceficUsers);}
      else if(this.listeDe=='notVerified'){
        this.speceficUsers=this.users.filter(user => user.is_active==false);
        console.log(this.speceficUsers);}

    },
    (error: any) => {
      console.error('Error fetching users:', error);
    }
  );
}

deleteUser(ID: number) {
  this.AuthService.deleteUser(ID).subscribe(data=>{
  console.log(data);
  this.getAllUsers();
  });

}

addToTable(userId: string, isChecked: boolean) {
  if (isChecked) {
      this.selectedUserIds.push(userId);
  } else {
      const index = this.selectedUserIds.indexOf(userId);
      if (index !== -1) {
          this.selectedUserIds.splice(index, 1);
      }
  }

  console.log(  this.selectedUserIds)
}
verify(userId: number) {

  this.AuthService.verifyUser(userId).subscribe();
  location.reload();


}


}

