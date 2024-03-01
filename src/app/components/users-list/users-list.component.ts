import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/search.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {


  paramValue :any;
  listeDe : string='';
  speceficUsers:any[] = [];
  filteredUsers: any[] = [];
 


  
deleteAll() {

for(let i=0;i<this.selectedUserIds.length;i++){
  this.deleteUser(this.selectedUserIds[i]);


}


}
selectedUserIds: any[] = [];
users: any[] = [];
checkbox: any;
showButton: any;
constructor (private AuthService: AuthService,private route: ActivatedRoute,private searchService: SearchService){
  
  this.paramValue=this.route.snapshot.params;
  this.listeDe= this.paramValue.param;
}
ngOnInit(): void {
  this.getAllUsers().subscribe(() => {
    this.searchService.getSearchQuery().subscribe((query) => {
      this.filterData(query);
    });
  });
}





toggleButtonVisibility() {
  // Check if any user is checked
  this.showButton = this.users.some(user => user.checked);
}

getAllUsers(){
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
  return this.AuthService.getAllUsers();
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
filterData(query: string) {
  console.log('Query:', query);
  console.log('speceficUsers:', this.speceficUsers);

  if (query==='') {
    this.filteredUsers = this.speceficUsers;
    return ;
  }  else {
    // If there is a query, apply the filtering logic
    this.filteredUsers = this.speceficUsers.filter((user) => {
      // Customize this logic based on your requirements
      const usernameMatch = user.username?.toLowerCase().includes(query.toLowerCase()) || false;
      const firstNameMatch = user.first_name?.toLowerCase().includes(query.toLowerCase()) || false;
      const lastNameMatch = user.last_name?.toLowerCase().includes(query.toLowerCase()) || false;
      const idMatch = user.id?.toString().includes(query) || false;
      const emailMatch= user.email?.toLowerCase().includes(query.toLowerCase()) || false;
      return usernameMatch || firstNameMatch || lastNameMatch || idMatch || emailMatch;
    });
  }

  console.log('filteredUsers:', this.filteredUsers);
}

}

