import { Component, ViewChild } from '@angular/core';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer ,SafeResourceUrl } from '@angular/platform-browser';

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
  showChatbot: any;
  quizes: any[] =[];
  assignments: any[]=[];
  

  get embedUrl() {
    if (this.mattype === 'video') {
      return `https://drive.google.com/file/d/${this.extractDriveId(this.documentToShow)}/preview`;
    }
    return null;
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.lessons=[]
    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
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
    this.documentToShow = documentUrl;
    this.mattype=mattype
    this.showViewer = true;
    this.pdfID=this.extractDriveId(documentUrl);
    console.log(this.pdfID);
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
    this.MydataService.getCourselessons(id).subscribe((data: any[]) => {
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
