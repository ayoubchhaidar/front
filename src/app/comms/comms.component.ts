import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, booleanAttribute } from '@angular/core';
import Pusher from 'pusher-js'
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comms',
  templateUrl: './comms.component.html',
  styleUrls: ['./comms.component.css']
})
export class CommsComponent  implements AfterViewChecked {
  @ViewChild('msgHistory') msgHistory!: ElementRef;
  currentDateTime: string | null ='';

  myform: FormGroup;
  signeduser!:any;
  users : any [] = [];
  usermessages: any [] = [];
  midmessages: any [] = [];
  selecteduserId: string | undefined;
  modalData = {
    name: 'Miro Badev',
    email: 'miro@badev@gmail.com',
    // other properties...
  };
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.msgHistory.nativeElement.scrollTop = this.msgHistory.nativeElement.scrollHeight;
    } catch(err) { }
  }
  submit() {

    const channelName = this.generatePrivateChannelName(this.signeduser.username, this.preusername);
    console.log(channelName);
    console.log(this.username);
    
    this.http.post('http://127.0.0.1:8000/palteforme/messages/',{
    
    channel:channelName,
    username:this.signeduser.username,
    message:this.message,
    receiver:this.preusername,
    
    }).subscribe(()=>this.message='')}
    
    
    generatePrivateChannelName(user1: string, user2: string): string {
      const sortedUsernames = [user1, user2].sort();
      return `private-chat.${sortedUsernames[0]}.${sortedUsernames[1]}`;
    }
      isVisible: boolean = true;
      paramValue :any;
      messages:any=[];
      message=''; username='';preusername='';
      constructor(private http:HttpClient,private route: ActivatedRoute,private service:AuthService,private location: Location,private router: Router,private cdr: ChangeDetectorRef) { 
        this.paramValue=this.route.snapshot.params;
        this.preusername= this.paramValue.param;
        
       
    
    
    
       this.myform = new FormGroup({
          message: new FormControl(''),});
        
        }
        updateDateTime() {
          this.currentDateTime =(new Date(), 'medium');
          console.log(this.currentDateTime);
        }
    
        reloadPage() {
          this.router.navigateByUrl('/comms', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
          });
        }
    
      pusher!: Pusher;  
      channel: any;
      ngOnInit(): void {
        
        this.signeduser = localStorage.getItem("currentUser");
        this.signeduser = JSON.parse(this.signeduser);
      
         this.getfreinds();
         this.getUserMessages();
    
         Pusher.logToConsole = true;
    
         this.pusher = new Pusher('90f0597aabf866e92325', {
          cluster: 'eu'
        });
    
        this.channel = this.pusher.subscribe('chat');
        this.channel.bind('message', (data: any) => {
          return this.midmessages.push(data); });  
       
    
        }
    
    
    
      toggleVisibility() {
        console.log('hh')
        this.isVisible = !this.isVisible;
      }
    
      getfreinds(): void {
        this.service.getuserfreinds().subscribe(
          (data: any[]) => {
            this.users = data;},
            (error: any) => {
              console.error('Error fetching users:', error);
            }
          );
    }
    selectedUser:any [] = [];
    specmessages :any [] = [];
    
    
    
    
    now: Date = new Date();
    
    
    
    openMaterialModalup(userId : string): void {
    
      this.pusher.disconnect();
      this.channel.unsubscribe();
    
      this.messages=  []
    
      this.preusername=userId;
      if (this.usermessages.length>=1){
    this.specmessages= this.usermessages.filter(msg => (msg.username== this.signeduser.user_id   && msg.receiver==this.getUserIdByUsername(this.preusername) )  || (msg.username==this.getUserIdByUsername(this.preusername) && msg.receiver== this.signeduser.user_id   )  );
    }
     console.log(this.users);
     console.log(this.getUserIdByUsername(this.preusername));
    console.log(this.specmessages);
    
    
    
     this.selectedUser= this.users.filter(user => user.username== this.preusername);
      const channelName = this.generatePrivateChannelName(this.signeduser.username, this.preusername);
      Pusher.logToConsole = true;
    
      var pusher = new Pusher('90f0597aabf866e92325', {
        cluster: 'eu'
      });
    
      var channel = pusher.subscribe('chat');
      channel.bind(channelName, (data: any) => {
       return this.messages.push(data); });  
    
    
       console.log(channelName);
       
    
    
      this.selecteduserId = userId;
      console.log(userId);
    
    
      const modal = document.getElementById('materialModalup');
    
      if (modal) {
        modal.style.display = 'block';
      }
    
      
    }
    closeMaterialModalup(): void {
    
    
    }
    reloadCurrentRoute() {

      this.messages=  []
     
      this.cdr.detectChanges();
    } 
    getUserMessages( ){
    
      this.service.get_user_messages(this.signeduser.user_id).subscribe(
    
        (data: any[]) => {
          this.usermessages = data;
        console.log(this.usermessages);
        
        },
    
          (error: any) => {
            console.error('Error fetching users:', error);
          }
      );
    
    }
    
     getUserIdByUsername(preusername: string): number | null {
      for (let user of this.users) {
        if (user.username === preusername) {
          return user.id;
        }
      }
      return null;
    }
    
    }