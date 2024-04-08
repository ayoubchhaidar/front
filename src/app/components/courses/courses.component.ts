import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/search.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  myData$: Observable<any> | undefined;
  myData2$: any []=[];
  enrollments$: any []=[];
  myform: FormGroup | undefined;
  user!:any;
  api_url: string = 'http://127.0.0.1:8000/';
    New_enrollement: any = {
      student: null , 
      course: null,
      enrollment_date: new Date().toISOString().split('T')[0],  // Set to the current date
    };
  type: string="";
  notVcourses$: any[]=[];
  verifiedCourses: any[] = [];
  unverifiedCourses: any[] = [];
  enrollments: any[]=[];
  specificEnrollmentsW: any[]=[];
  specificEnrollmentsI: any[]=[];
  inscritCourseIds:number [] =[];
  waitingCourseIds: number [] =[];
  inscrituserIds:number [] =[];
  waitinguserIds: number [] =[];
  ICourses: any[] = [];
  WCourses: any[] = [];
  specificEnrollments: any[]=[];
  myData3$: any[]=[];
  filteredCourses: any[]=[];

  constructor(private MydataService:MydataService,private dialog: MatDialog,private route: ActivatedRoute,private auth:AuthService ,private searchService: SearchService,private router: Router){ }
 
  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      this.type = params.get('type')!;  
      this.searchService.getSearchQuery().subscribe((query) => {
        this.verifiedCourses = [];
        this.unverifiedCourses = [];
        this.ICourses = [];
        this.WCourses = [];
        this.specificEnrollmentsW = [];
        this.specificEnrollmentsI = [];        
        this.enrollments = [];     
        this.filteredCourses=[];
        this.myData2$=[];
        this.MydataService.getCourses(this.user.user_id).subscribe(
          (data: any[]) => {
            this.myData2$ = data;
            console.log( this.myData2$)   
            this.GetEnrollments(this.user.user_id);     
            this.filterenrollment(this.user.user_id);
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
        this.filterData(query);  
      });    
    });
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.myData$ = this.MydataService.getTutorCourses(this.user.user_id);
    this.auth.getuserfreinds().subscribe(
      (data: any[]) => {
        this.myData3$ = data;
        console.log( this.myData3$)    
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
 
    
      console.log(this.enrollments);

  
    this.MydataService.AllEnrollments().subscribe(
      (data: any[]) => {
        this.enrollments$ = data;
        console.log( this.enrollments$)
      
       
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );

      
    console.log();
    
  }

filterData(query: string) {
  console.log('Query:', query);
  console.log('verifiedCourses:', this.verifiedCourses);
  if (query === '') {
    
    switch (this.type) {
      case 'Verifier':
        this.filteredCourses = this.verifiedCourses;
        break;
      case 'tutor':
        this.filteredCourses = this.verifiedCourses;
        break;
      case 'all':
        this.filteredCourses = this.verifiedCourses;
        break;
      case 'waiting':
        
        this.filteredCourses = this.WCourses
        break;
      case 'inscrit':
        
        this.filteredCourses = this.ICourses
        break;
      case 'En Attends':
        this.filteredCourses = this.unverifiedCourses
        break;
     case 'accepter':
          this.filteredCourses = this.specificEnrollments
          break;
      default:
        console.log('Invalid type');
        break;
    }
  

  
  } else {
   
    switch (this.type) {
      case 'Verifier':
        this.filteredCourses = this.verifiedCourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
      case 'tutor':
        this.filteredCourses = this.verifiedCourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
      case 'all':
        this.filteredCourses = this.verifiedCourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
      case 'waiting':
        this.filteredCourses = this.WCourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
      case 'inscrit':
        this.filteredCourses = this.ICourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
      case 'En Attends':
        this.filteredCourses = this. unverifiedCourses.filter((course) => {
          const titleMatch = course.title?.toLowerCase().includes(query.toLowerCase()) || false;
          const descriptionMatch = course.description?.toLowerCase().includes(query.toLowerCase()) || false;
          return titleMatch || descriptionMatch;
        });
        break;
        case 'accepter':
  this.filteredCourses = this.specificEnrollments.filter((enrollment) => {
    const titleMatch = this.getUsernameByid(enrollment.student)?.toLowerCase().includes(query.toLowerCase()) || false;
    const descriptionMatch = this.getcoursetitleByid(enrollment.course)?.toLowerCase().includes(query.toLowerCase()) || false;
    return titleMatch || descriptionMatch;
  });
  break;

      default:
        console.log('Invalid type');
        break;
    }
  }
  
  console.log('filteredCourses:', this.filteredCourses);
}

getUserInfoById(id: number): { username: string, image: string } | null {
  for (let user of this.myData3$) {
    if (user.id === id) {
      return { username: user.full_name, image: user.image };
    }
  }
  return null;
}

  getUsernameByid(id: number): String | null {
    for (let user of this.myData3$) {
      if (user.id === id) {
        return user.full_name;
      }
    }
    return null;
  }
  getcoursetitleByid(id: number): String | null {
    for (let course of this.myData2$) {
      if (course.id === id) {
      
        return course.title;
      }
    }
    return null;
  }

  

 
  filterenrollment(id:number){
    this.specificEnrollments = this.enrollments$.filter(
      enrollment => enrollment.tutor===id && !enrollment.accepted
    );
  }
  

  getNotVcourses(){
    this.MydataService.getNotVerifiedCourses().subscribe(
      (data: any[]) => {
        this.notVcourses$ = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  
  
  }
  verifyCourse(id:number,tutor:number,title:string){

    this.MydataService.verifyCourse(id).subscribe();
    const formData = new FormData();
    
    formData.append('sender_id', this.user.user_id,);
    formData.append('message', "this course '"+title+"' is accepted");
    
    formData.append('type','success');
    formData.append('targeted_users', tutor.toString());
    
    this.MydataService.sendNoti(formData).subscribe();

    }
//  getCourses(){
//   const courses: any[] = [];
//   this.MydataService.getTutorCourses(1).subscribe((data)=>{
//     for (let i=0;i<data.length;i++){
//         courses.push(data[i]);
//     }
//     });
//     return courses;
//  }

enrollInClass(courseid:number ){
  this.New_enrollement.student={};
  this.New_enrollement.course={};
  this.New_enrollement.student = this.user.user_id;
  this.New_enrollement.course = courseid ;
  console.log(this.New_enrollement);
  this.MydataService.StudentEnrollment(this.New_enrollement).subscribe();
}


delete_course(id:number,tutor:number,title:string){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: 'Are you sure you want to delete this lesson?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.MydataService.deleteCourse(id).subscribe(() => {
        console.log(`lesoon with ID ${id} deleted successfully.`);
       this.ngOnInit() ;
      });
    }
  });
  const formData = new FormData();
    
  formData.append('sender_id', this.user.user_id,);
  formData.append('message', "this course '"+title+"' was denied");
  
  formData.append('type','danger');
  formData.append('targeted_users', tutor.toString());
  this.MydataService.sendNoti(formData).subscribe();
  
  
}
GetEnrollments(id: number): void {
  
    console.log(this.enrollments);
    this.MydataService.StudentEnrollments(this.user.user_id).subscribe((data: any[]) => {
      this.enrollments = data;
     
   
    if (this.type === 'waiting') {
      this.specificEnrollmentsW = this.enrollments.filter(
        enrollment => !enrollment.accepted
      );
     this.waitingCourseIds = this.specificEnrollmentsW.map(enrollment => enrollment.course);
     this.waitinguserIds = this.specificEnrollmentsW.map(enrollment => enrollment.student);
      console.log('Waiting Course IDs:', this.waitingCourseIds,this.waitinguserIds);
     
      console.log(this.specificEnrollmentsW);
    } 
    if (this.type === 'inscrit') {
      this.specificEnrollmentsI = this.enrollments.filter(
        enrollment => enrollment.accepted
      );
     this.inscritCourseIds = this.specificEnrollmentsI.map(enrollment => enrollment.course);
     this.inscrituserIds = this.specificEnrollmentsI.map(enrollment => enrollment.student);
      console.log('Inscrit Course IDs:', this.inscritCourseIds);
     
      console.log(this.specificEnrollmentsI);
     
        }
        this.filterCourses();
  }, (error: any) => {
    console.error('Error fetching enrollments:', error);
  });
}
isUserAlreadyEnrolled(courseId: number): boolean {
  return this.enrollments.some(enrollment =>
    enrollment.student === this.user.user_id &&
    enrollment.course === courseId &&
    enrollment.accepted === true);
}
isUserAlreadyEnrolledW(courseId: number): boolean {
  return this.enrollments.some(enrollment =>
    enrollment.student === this.user.user_id &&
    enrollment.course === courseId &&
    enrollment.accepted === false);
}


filterCourses() {
  this.myData2$.forEach(course => {
   
    if (course.verified) {
   
      this.verifiedCourses.push(course);
      if (this.inscritCourseIds.includes(course.id)) {
        this.ICourses.push(course);
      }
      else if (this.waitingCourseIds.includes(course.id)) {
        this.WCourses.push(course);
      }
    } else {
      this.unverifiedCourses.push(course);
    }
  });

  console.log('Verified Courses:', this.verifiedCourses);
  console.log('waiting Courses:', this.WCourses);
  console.log('Unverified Courses:', this.unverifiedCourses);
}




EnrollInCourse(courseid:number,tutorId:number,title:string ){
  this.New_enrollement.student={};
  this.New_enrollement.course={};
  this.New_enrollement.student = this.user.user_id;
  this.New_enrollement.course = courseid ;
  this.New_enrollement.tutor = tutorId;
  console.log(this.New_enrollement);
  this.MydataService.EnrollInCourse(this.New_enrollement).subscribe();

  const formData = new FormData();
  formData.append('sender_id', this.user.user_id,);
  formData.append('message', "User '"+this.user.username+"' would like to join course '"+title+"'");
  formData.append('type','information');
  formData.append('targeted_users', tutorId.toString());
  this.MydataService.sendNoti(formData).subscribe();
this.ngOnInit();
}

verifEnrollment(id:number,accepted :boolean,enrolStudent:string){


  this.MydataService.verifyEnrollment({'accepted':accepted},id).subscribe();
if(accepted==true){

  const formData = new FormData();
  formData.append('sender_id', this.user.user_id,);
  formData.append('message', "Request to join course has been accepted .");
  formData.append('type','information');
  formData.append('targeted_users', enrolStudent);
  this.MydataService.sendNoti(formData).subscribe();
}
else {  

  const formData = new FormData();
  formData.append('sender_id', this.user.user_id,);
  formData.append('message', "Request to join course "+ +"has been deneid");
  formData.append('type','warning');
  formData.append('targeted_users', enrolStudent);
  this.MydataService.sendNoti(formData).subscribe();

}

this.filterenrollment(this.user.user_id);
}
}