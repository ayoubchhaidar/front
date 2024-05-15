import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options } from 'highcharts';
import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderComponent} from '../reminder/reminder.component';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-formateur-dashboard',
  templateUrl: './formateur-dashboard.component.html',
  styleUrls: ['./formateur-dashboard.component.css']
})
export class FormateurDashboardComponent implements OnInit {
  reminders:any=[]; 
  recentReq:any=[]
  signeduser:any;
  stats:any;
  nb=0;
  userNoti: any[]=[];
  constructor(private MydataService:MydataService,private http: HttpClient,public dialog: MatDialog, private route: ActivatedRoute) {
   
   
   
   
   
     }
     deleteReminder(id:any){
      this.MydataService.deleteremind(id).subscribe();
      const index = this.reminders.findIndex((reminder: { id: any; }) => reminder.id === id);
      this.reminders.splice(index, 1);
      
      
      
      }
      getNotifications(){

        this.MydataService.getUserNoti(this.signeduser.user_id).subscribe(
            (data: any[]) => {
              this.userNoti = data;
              console.log( this.userNoti);
        
              this.nb= this.userNoti.filter(noti => noti.is_read==false).length;        
        
    
     
            },
            (error: any) => {
              console.error('Error fetching users:', error);
            }
          );
        
        }
        getStat(){

          this.MydataService.tutorstat(this.signeduser.user_id).subscribe(
            (data) => {
              this.stats = data;
            },
            (error) => {
              console.error('Error fetching user counts:', error);
            }
          );
        }

        recReq(){
          this.MydataService.recReq(this.signeduser.user_id).subscribe(
            (data) => {
              this.recentReq=data;
              console.log(data) ;
            },
            (error) => {
              console.error('Error fetching user counts:', error);
            }
          );


          
        }
  ngOnInit(): void {


    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser); 
    this.MydataService.reminders(this.signeduser.user_id).subscribe(
      (data) => {
      this.reminders=data;
      console.log(this.reminders);
    
      },
      (error) => {
        console.error('Error remind:', error);
      }
    
    
    );
  this.getNotifications();
  this.getStat();
  
  this.recReq();
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(ReminderComponent, {
      width: '600px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}