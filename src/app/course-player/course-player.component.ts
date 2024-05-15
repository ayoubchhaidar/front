import { Component, ViewChild } from '@angular/core';

import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer ,SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.css']
})
export class CoursePlayerComponent {
  
  lessons: any[]=[];
  CourseId: any;
  documentToShow: string="";
  mattype:string ="";
  showViewer: boolean = false;
  user: any;
  pdfID: any;
  showChatbot: boolean=false;
  quizes: any[] =[];
  assignments: any[]=[];
  title: string="";

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


  get embedUrl() {
    if (this.mattype === 'video') {
      return `https://drive.google.com/file/d/${this.extractDriveId(this.documentToShow)}/preview`;
    }
    return null;
  }

  ngOnInit(): void {
    this.initializeScript();
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.lessons=[]
    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
      this.title= params['title']
      });   
      this.getCourselessons(this.CourseId);
      this.get_assig();
      this.get_quiz();
  }
  constructor(private MydataService:MydataService,private route: ActivatedRoute,private dialog: MatDialog,private sanitizer: DomSanitizer) { }
  get_quiz(){
    this.MydataService.getQuizByLesson(this.CourseId).subscribe((data: any[]) => {
      this.quizes = data;
      console.log("quiize",this.quizes)
    },
    (error: any) => {
      console.error('Error fetching quiz:', error);
    });
  }
  get_assig(){
    this.MydataService.AssignmentsbyCourse(this.CourseId).subscribe( (data: any[]) => {
      this.assignments = data;
      console.log( "ass",this.assignments)   ;

    },
    (error: any) => {
      console.error('Error fetching users:', error);
    });
  }
  track(matId:any, userID:any) {
    const formData = new FormData();
    formData.append('user', userID);
    formData.append('material', matId);
    this.MydataService.track(formData).subscribe(); console.log("baaa");
  }
  showDocument(documentUrl: string, mattype: string) {
    if(mattype === 'pdf'){
    this.showChatbot=true;}
    else{
      this.showChatbot=false;
    }
    this.documentToShow = documentUrl;
    this.mattype=mattype
    this.showViewer = true;
    this.pdfID=this.extractDriveId(documentUrl);
    console.log(this.pdfID, "cht",this.showChatbot);
    
  }
  extractDriveId(link: string): string | null {
    const match = link.match(/(?:https?:\/\/)?drive.google.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    return match ? match[1] : null;
  }

  extractYoutubeId(link: string): string | null {
    const match = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }
  getSafeUrl(): SafeResourceUrl | null {
    if (this.mattype === 'video') {
   
        const videoId = this.extractDriveId(this.documentToShow);
        const url = `https://drive.google.com/file/d/${videoId}/preview`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else if (this.mattype==='youtube') {
        const videoId = this.extractYoutubeId(this.documentToShow);
        const url = `https://www.youtube.com/embed/${videoId}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    
    return null;
  }

  getMaterialIcon(materialType: string): string {
    const materialTypeLowerCase = materialType.toLowerCase();
  
    switch (materialTypeLowerCase) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'video':
        return 'video_library';
      case 'image':
        return 'image';
      case 'youtube':
        return 'video_library';
      case 'quiz':
        return 'live_help';
      case 'exercise':
        return 'fitness_center';
      case 'docx':
        return 'description';
      default:
        return 'description'; // Default icon for unknown types
    }
  }

  getCourselessons(id:number){
    this.MydataService.getCourselessonsS(id,this.user.user_id).subscribe((data: any[]) => {
      this.lessons = data;
      console.log( this.lessons)
      for (let i = 0; i < this.lessons.length; i++) {
        const lesson = this.lessons[i]; 
    
        console.log('Lesson:', lesson);
    
        this.MydataService.getCourseMaterial(lesson.id).subscribe(
          (data: any[]) => {
            lesson.mateials = data; 
            console.log('Materials for lesson', lesson.id, ':', lesson.mateials);
          },
          (error: any) => {
            console.error('Error fetching materials for lesson', lesson.id, ':', error);
          }
        );
      }
  
    },
    (error: any) => {
      console.error('Error fetching users:', error);
    }
  );
  
  this.getmaterials();
  
  }
  getmaterials() {
    console.log('Starting getmaterials...');
    console.log(this.lessons);
    for (let i = 0; i < this.lessons.length; i++) {
      const lesson = this.lessons[i]; 
  
      console.log('Lesson:', lesson);
  
      this.MydataService.getCourseMaterial(lesson.id).subscribe(
        (data: any[]) => {
          console.log('Received data for lesson', lesson.id, ':', data);
          lesson.mateials = data; 
          console.log('Materials for lesson', lesson.id, ':', lesson.mateials);
        },
        (error: any) => {
          console.error('Error fetching materials for lesson', lesson.id, ':', error);
        }
      );
    }
    console.log('Finished getmaterials.');
  }
  
}
