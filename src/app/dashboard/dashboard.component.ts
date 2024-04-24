import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from '../search.service';
import { MydataService } from '../services/mydata.service';
import Pusher from 'pusher-js'

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  realtimenoti: any [] = [];
  searchQuery: string = '';
  userNoti: any[] = [];
  signeduser!:any;
  user ={"id":null,
  "password": null,
  "username": null,
  "first_name": null,
  "last_name": null,
  "email":null,
  "is_active": null,
  "is_superuser": null,
  "is_staff": null,
  "date_joined": null,
  "last_login": null,
  "image": null,}

  scrollTop!: number;
  nb: number=0;
  
  constructor(private AuthService: AuthService,private router: Router,private searchService: SearchService,private MydataService:MydataService) {}
  ngOnInit(): void {
    this.initializeScript();
    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);
    const userId = 10; // Replace with the actual user ID you want to retrieve
    this.AuthService.getUserProfile(this.signeduser.user_id).subscribe(user => {
      this.user = user;
    });
    this.getNotifications();
    Pusher.logToConsole = true;

    var pusher = new Pusher('90f0597aabf866e92325', {
      cluster: 'eu'
    });
  
    var channel = pusher.subscribe('chat');
    channel.bind('notifications', (data: any) => {
      console.log(data);
        if (data.targeted_users.includes(this.signeduser.user_id)) {
        this.nb++;
        this.showNotification(data.message, data.type); 
       return this.realtimenoti.push(data);
      }
       else return 0;});  
  }
  updateSearch() {
    console.log('Search query:', this.searchQuery);
    this.searchService.setSearchQuery(this.searchQuery);
  }
  

  search() {
    // Perform search if needed
  }
  private initializeScript(): void {
    "use strict";

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', (e: any) => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(() => {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      }

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', (e: any) => {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on('scroll', () => {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', (e: any) => {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });
  }

 
  
  reloadPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard','users', 'Formateurs']);
    });
  }
  reloadPage1(): void {
   
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard','users', 'Apprenants']);
    });
  }
  reloadPage2(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard','users', 'Administraeurs']);
    });
  }
  reloadPage3(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard','users', 'notVerified']);
    });
  }
  logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCart");
   
    this.router.navigate(['']);
  }
  seen() {

    this.nb=0;
    this.MydataService.seen(this.signeduser.user_id).subscribe();
    for (let noti of this.realtimenoti) {
  }
  
  }
  getNotifications(){

    this.MydataService.getUserNoti(this.signeduser.user_id).subscribe(
        (data: any[]) => {
          this.userNoti = data;
          console.log( this.userNoti);
    
          this.nb= this.userNoti.filter(noti => noti.is_read==false).length; 
     this.userNoti.sort((a, b) => {
      // Convert timestamps to Date objects for comparison
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
    
      // Compare timestamps
      if (dateA > dateB) return -1; // Sort descending (newest first)
      if (dateA < dateB) return 1;
      return 0;
    });
          console.log(this.nb);
          console.log( this.userNoti);
    
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    
    }


  showNotification(message: string, type: string): void {
    const alertClass: { [key: string]: string } = {
        'success': 'alert-success',
        'info': 'alert-info',
        'warning': 'alert-warning',
        'danger': 'alert-danger',
        'primary': 'alert-primary'
    };

    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        console.error('Notification container not found');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `alert fade alert-simple ${alertClass[type]} alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show`;
    notification.setAttribute('role', 'alert');
    
    notification.innerHTML = `
        <button type="button" class="close font__size-18" data-dismiss="alert">
            <span aria-hidden="true">
                <i class="fa fa-times"></i>
            </span>
            <span class="sr-only">Close</span>
        </button>
        <i class="start-icon ${this.getIconClass(type)}"></i>
        <strong class="font__weight-semibold">${this.getTitle(type)}</strong> ${message}
    `;

    notificationContainer.appendChild(notification);

    // Automatically remove the notification after 10 seconds
    setTimeout(() => {
        notification.remove();
    }, 10000);
}


getIconClass(type: string): string {
    switch (type) {
        case 'success':
            return 'far fa-check-circle faa-tada animated';
        case 'info':
            return 'fa fa-info-circle faa-shake animated';
        case 'warning':
            return 'fa fa-exclamation-triangle faa-flash animated';
        case 'danger':
            return 'far fa-times-circle faa-pulse animated';
        case 'information':
            return 'fa fa-thumbs-up faa-bounce animated';
        default:
            return '';
    }
}

 getTitle(type: string): string {
    switch (type) {
        case 'success':
            return 'Well done!';
        case 'info':
            return 'Heads up!';
        case 'warning':
            return 'Warning!';
        case 'danger':
            return 'Oh snap!';
        case 'information':
            return 'Well done!';
        default:
            return '';
    }
}
}
