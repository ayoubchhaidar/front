    import { Component, OnInit } from '@angular/core';
    import { FormControl, FormGroup } from '@angular/forms';
    import { Observable, tap } from 'rxjs';
    import { MydataService } from 'src/app/services/mydata.service';
    import { ActivatedRoute, Router } from '@angular/router';
    import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
    import { MatDialog } from '@angular/material/dialog';
    import { AuthService } from 'src/app/services/auth.service';
    import { SearchService } from 'src/app/search.service';
import { CertificationComponent } from 'src/app/certification/certification.component';
    @Component({
      selector: 'app-courses',
      templateUrl: './courses.component.html',
      styleUrls: ['./courses.component.css']
    })
    export class CoursesComponent implements OnInit {
      
      myData$: any []=[];
      myData2$: any []=[];
      enrollments$: any []=[];
      myform: any = {
        value: {
          title: '',
          description: '',
          image:'',
          enrollment_capacity:'',
        }
      };
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
      SelectedCourseID: any;
      selectedFile!: File;
      noFileSelected = true;

      constructor(private MydataService:MydataService,private dialog: MatDialog,private route: ActivatedRoute,private auth:AuthService ,private searchService: SearchService){ }
    
      ngOnInit(): void {
        this.myform = new FormGroup({
          title: new FormControl(''),
          document_type: new FormControl(''),
          up_file: new FormControl('')
        });
        this.user = localStorage.getItem("currentUser");
        this.user = JSON.parse(this.user);
         this.MydataService.getTutorCourses(this.user.user_id).subscribe( (data: any[]) => {
          this.myData$ = data;
          
      },
      (error: any) => {
          console.error('Error fetching users:', error);
      }
  );     
        this.auth.getAllUsers().subscribe(
            (data: any[]) => {
                this.myData3$ = data;
                console.log('users',this.myData3$)
            },
            (error: any) => {
                console.error('Error fetching users:', error);
            }
        );
    

        this.route.paramMap.subscribe(params => {
          this.verifiedCourses = [];
          this.unverifiedCourses = [];
          this.ICourses = [];
          this.WCourses = [];
          this.specificEnrollmentsW = [];
          this.specificEnrollmentsI = [];
          this.enrollments = [];
          this.filteredCourses = [];
          this.type = params.get('type')!;
          this.MydataService.getCourses(this.user.user_id).subscribe(
            (data: any[]) => {
                this.myData2$ = data;
                console.log(this.myData2$)
                this.GetEnrollments(this.user.user_id);
                this.filterenrollment(this.user.user_id);
            },
            (error: any) => {
                console.error('Error fetching users:', error);
            }
        );     
          this.searchService.getSearchQuery().subscribe((query) => {             
              this.filterData(query);
                 
          });
          
      });
       
  
    
        console.log(this.enrollments);
    
        this.MydataService.AllEnrollments().subscribe(
            (data: any[]) => {
                this.enrollments$ = data;
                console.log(this.enrollments$)
            },
            (error: any) => {
                console.error('Error fetching users:', error);
            }
        );
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
       
        this.filteredCourses = [];
        
      
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
      
        console.log('us',user.full_name);
      }
      return null;
    }

      getUsernameByid(id: number): String | null{
        for (let user of this.myData3$) {
          if (user.id == id) {
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
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: { message: 'Est-ce que vous souhaitez vraiment Verifier ce cour?' }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
        this.MydataService.verifyCourse(id).subscribe(() => {
        const formData = new FormData();
        
        formData.append('sender_id', this.user.user_id,);
        formData.append('message', "Ce cours : '"+title+"' est vérifié par l'administrateur.");
        
        formData.append('type','success');
        formData.append('targeted_users', tutor.toString());
        
        this.MydataService.sendNoti(formData).subscribe();
        this.ngOnInit() ;
      });
      }
    });
  
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


    delete_course_Admin(id:number,tutor:number,title:string){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: 'Est-ce que vous souhaitez vraiment supprimer ce cour?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.MydataService.deleteCourse(id).subscribe(() => {
            const formData = new FormData();
        
            formData.append('sender_id', this.user.user_id,);
            formData.append('message', "Ce cours : '"+title+"' a été supprimer par l'administrateur");
            
            formData.append('type','danger');
            formData.append('targeted_users', tutor.toString());
            this.MydataService.sendNoti(formData).subscribe();
            
            
            console.log(`lesoon with ID ${id} deleted successfully.`);
          this.ngOnInit() ;
          });
        }
      });
    
    }
    delete_course_Tutor(id:number,tutor:number,title:string){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: 'Est-ce que vous souhaitez vraiment supprimer ce cour?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.MydataService.deleteCourse(id).subscribe(() => {
           
            console.log(`lesoon with ID ${id} deleted successfully.`);
          this.ngOnInit() ;
          });
        }
      });
    
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
      formData.append('message', "L’utilisateur : '"+this.user.username+"'  souhaite rejoindre le cours : '"+title+"'");
      formData.append('type','information');
      formData.append('targeted_users', tutorId.toString());
      this.MydataService.sendNoti(formData).subscribe();
    this.ngOnInit();
    }

    verifEnrollment(id:number,accepted :boolean,enrolStudent:string,titre:any){


      this.MydataService.verifyEnrollment({'accepted':accepted},id).subscribe(() => {
        this.ngOnInit();
        this.filterenrollment(this.user.user_id);
        if(accepted==true){

          const formData = new FormData();
          formData.append('sender_id', this.user.user_id,);
          formData.append('message', "La demande d’inscription au cours : '"+this.getcoursetitleByid(titre)+"' a été acceptée.");
          formData.append('type','information');
          formData.append('targeted_users', enrolStudent);
          this.MydataService.sendNoti(formData).subscribe();
        }
        else {  
    
          const formData = new FormData();
          formData.append('sender_id', this.user.user_id,);
          formData.append('message', "Demande d’inscription au cours : '"+this.getcoursetitleByid(titre)+"' a été refusée");
          formData.append('type','warning');
          formData.append('targeted_users', enrolStudent);
          this.MydataService.sendNoti(formData).subscribe();
    
        }
      });

   

    this.ngOnInit();
    this.filterenrollment(this.user.user_id);
 
    }

    onFileChange(event: any) {
      if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.noFileSelected = false;
    }}
    openMaterialModalupdate(Id: string, course: any): void {
      this.SelectedCourseID=Id;
        const modal = document.getElementById('materialModallesson');
        if (modal) {
          modal.style.display = 'block';
        }
 
        this.myform.value['title'] = course.title;
        this.myform.value['description'] = course.description;
        this.myform.value['enrollment_capacity'] = course.enrollment_capacity;
       
     
      }
    closeMaterialModalupdate(): void {
     
      const modal = document.getElementById('materialModal');

      if (modal) {
        modal.style.display = 'none';
      }  
    }
    Update_course(id: number){
      const formData = new FormData();
      if( this.myform.value['title'] !=''){ formData.append('title', this.myform.value['title']);}
      if( this.myform.value['description'] !=''){ formData.append('description', this.myform.value['description']);}
      if( this.myform.value['enrollment_capacity'] !=''){ formData.append('enrollment_capacity', this.myform.value['enrollment_capacity']);}
      if( this.noFileSelected===false){     formData.append('image', this.selectedFile); }
      this.MydataService.update_Course(id,formData).subscribe(() => {
        this.ngOnInit();
        this.closeassModal();
      });
    }
    closeassModal(): void {
 
      const modal = document.getElementById('materialModallesson');
     
      
      if (modal) {
        modal.style.display = 'none';
      }
     
    
     
    }
   
    certif(id: any) {
     
      const username = this.getUserInfoById(this.user.user_id)?.username as string;
      const course = this.getcoursetitleByid(id) as string;
  
      const certificationComponent = new CertificationComponent(this.MydataService);
  
      certificationComponent.generateAndUploadCertificate(course, username).subscribe(
        (uploadedLink: string) => {
          console.log('Uploaded Link:', uploadedLink);
         const link = uploadedLink; // Save the uploaded link
          this.submitCertificateData(id, uploadedLink);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    submitCertificateData(courseId: any, uploadedLink: string) {
      const formData = new FormData();
      formData.append('content', uploadedLink);
      formData.append('user', this.user.user_id);
      formData.append('course', courseId);
  
      this.MydataService.certif(courseId, this.user.user_id, formData).subscribe(
        (response) => {
          console.log('Certificate data submitted successfully', response);
        },
        (error) => {
          console.error('Error submitting certificate data', error);
        }
      );
    }
  }