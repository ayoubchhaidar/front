import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from '../search.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchQuery: string = '';

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
  
  constructor(private AuthService: AuthService,private router: Router,private searchService: SearchService) {   
  }
  ngOnInit(): void {
    this.initializeScript();
    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);
    const userId = 10; // Replace with the actual user ID you want to retrieve
    this.AuthService.getUserProfile(this.signeduser.user_id).subscribe(user => {
      this.user = user;
    });
    
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
}
