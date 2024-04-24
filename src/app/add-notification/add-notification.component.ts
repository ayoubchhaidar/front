
import { Component, OnInit } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent {


  searchQuery: string = '';

  users: any[] = [];
  formateurs: any[] = [];
  apprenant: any[] = [];
  user:any;
  selectedUserIds: any[] = [];

checkbox: any;
showButton: any;
  filteredUsers: any[] = [];
selectedOption: string="tous";
  ngOnInit(): void {

    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);


    console.log(this.user.user_id);
    console.log("hhhhhhhhhhhh");

    this.getUsers().subscribe(() => {
    this.searchService.getSearchQuery().subscribe((query) => {
      this.filterData(query);
    });
  });
  }
  toggleButtonVisibility() {
    // Check if any user is checked
    this.showButton = this.users.some(user => user.checked);
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

  checkAllUsers(event: any) {
    for (let user of this.filteredUsers) {
        user.checked = event.target.checked;
        this.selectedUserIds.push(user.id);
       
    } 
    
    console.log(this.selectedUserIds)
}

addnoti() {
throw new Error('Method not implemented.');
}
  myform: FormGroup;
  constructor(private MydataService:MydataService,private AuthService: AuthService,private searchService: SearchService) {
    this.myform = new FormGroup({
      message: new FormControl(''),
      type: new FormControl(''),
      targeted_users:new FormControl(''),
    });}




sendNoti(){

const notificaton={
  sender_id:this.user.user_id,
  message:this.myform.value['message'],
  type:this.myform.value['type'],
  targeted_users:this.selectedUserIds,
}
const targetedUsersString = notificaton.targeted_users.join(',');
const formData = new FormData();
formData.append('sender_id', notificaton.sender_id);
formData.append('message', notificaton.message);

formData.append('type', notificaton.type);
formData.append('targeted_users', targetedUsersString);

this.MydataService.sendNoti(formData).subscribe();


}
getUsers(){
  this.AuthService.getAllUsers().subscribe(
    (data: any[]) => {
      this.users = data;
      console.log( this.users)

     
      this.apprenant=this.users.filter(user => user.is_active==true && user.is_staff==false && user.is_superuser==false);
      console.log(this.apprenant);
    
      this.formateurs=this.users.filter(user => user.is_staff==true  && user.is_active==true  && user.is_superuser==false);
        console.log(this.formateurs);
   
    },
   
    (error: any) => {
      console.error('Error fetching users:', error);
    }
  );
return this.AuthService.getAllUsers();
}
filterData(query: string, ) {
  console.log('Query:', query);
  console.log('Selected Option:', this.selectedOption);
  console.log('All Users:', this.users);

  if (query === '' && this.selectedOption === 'tous') {
    this.filteredUsers = this.users;
    return;}
  else if (query === '' && this.selectedOption === 'formateur') {
    this.filteredUsers = this.users.filter(user => user.is_staff==true  && user.is_active==true  && user.is_superuser==false);
      return;
  } 
  else if (query === '' && this.selectedOption === 'apprenant') {
    this.filteredUsers =this.users.filter(user => user.is_active==true && user.is_staff==false && user.is_superuser==false);
    return;
} else {
    // If there is a query, apply the filtering logic based on the selected option
   
      this.filteredUsers = this.filteredUsers.filter((user) => {
        // Customize this logic based on your requirements
        const usernameMatch = user.username?.toLowerCase().includes(query.toLowerCase()) || false;
        const firstNameMatch = user.first_name?.toLowerCase().includes(query.toLowerCase()) || false;
        const lastNameMatch = user.last_name?.toLowerCase().includes(query.toLowerCase()) || false;
        const idMatch = user.id?.toString().includes(query) || false;
        const emailMatch = user.email?.toLowerCase().includes(query.toLowerCase()) || false;
        return usernameMatch || firstNameMatch || lastNameMatch || idMatch || emailMatch;
      });
    
  }
}

openMaterialModalup(): void {
  
  const modal = document.getElementById('materialModalup');

  if (modal) {
    modal.style.display = 'block';
  }

}
updateSearch() {
  console.log('Search query:', this.searchQuery);
  this.searchService.setSearchQuery(this.searchQuery);
}

closeMaterialModalup(): void {
  
  const modal = document.getElementById('materialModalup');

  if (modal) {
    modal.style.display = 'none';
  }

}
}
