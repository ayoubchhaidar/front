import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, map } from 'rxjs';


interface UploadResponse {
  public_link: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class MydataService {
  private api__Url = 'http://localhost:8000/palteforme/upload/';
  api_url: string = 'http://127.0.0.1:8000/';
  private apiUrl = 'http://127.0.0.1:8000/palteforme/materials/course/';
  constructor(private http: HttpClient) { }




  generateQuiz(id:string): Observable<any> {
    return this.http.get(this.api_url + 'palteforme/generate_Quiz/' + id + '/');
  }
  addQuiz(obj:any): Observable<any> {
    return this.http.post(this.api_url + 'palteforme/quizzes/',obj);
  }
  
  track(obj:any): Observable<any> {
    return this.http.post(this.api_url + 'palteforme/track/',obj);
  }


  getQuizByCourse(id:number) :Observable<any> {

    return this.http.get(this.api_url + 'palteforme/quizzes/course/' + id+ '/');



  }

  getMaxidQuest(): Observable<number> {
    return this.http.get<{ max_id: number }>('http://127.0.0.1:8000/palteforme/questionsMaxid/')
      .pipe(map(response => response.max_id));
  }

  addQuestion(obj:any): Observable<any> {

    return this.http.post(this.api_url + 'palteforme/questions/',obj);
  }
  
  
  addChoices(obj:any): Observable<any> {

    return this.http.post(this.api_url + 'palteforme/choices/',obj);
  }
  StudentEnrollments(id: any): Observable<any> {
    return this.http.get<any>(this.api_url+'palteforme/enrollement-student/'+id+'/') ;
  }
 AllEnrollments(): Observable<any> {
    return this.http.get<any>(this.api_url+'palteforme/enrollments/') ;
  }


  EnrollInCourse(obj: any): Observable<any> {
    return this.http.post<any>(this.api_url+'palteforme/enrollments/',obj) ;

  }
  verifyEnrollment(obj: any,id:number): Observable<any> {
    return this.http.post<any>(this.api_url+'palteforme/verify_enrollment/'+id+'/',obj) ;
  }





  getNotVerifiedCourses(): Observable<any> {
    return this.http.get<any[]>(this.api_url + 'palteforme/notverified_course_list/');


  }
  verifyCourse(id: number): Observable<any> {
    debugger;
    return this.http.put<any>(this.api_url+'palteforme/verify_course/'+id+'/',{ }) ;
  }


  
  addLesson(newLesson: any): Observable<any> {
    return this.http.post<any>(this.api_url+'palteforme/add_lesson/',newLesson) ;    
  }
  addCourses(title:string,description:string,enrollment_capacity:string,tutor:string,image:File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('enrollment_capacity', enrollment_capacity);
    formData.append('tutor', tutor);
    formData.append('image', image);
    return this.http.post<any>(this.api_url+'palteforme/courses/',formData) ;



  }
  seen(userId: number){
    return this.http.post<any>(`http://127.0.0.1:8000/palteforme/seen/${userId}/`, {});
}
getUserNoti(id:any){
  return this.http.get<any[]>(this.api_url + 'palteforme/get_notifications_by_user/' + id + '/');
}
  sendNoti(obj:any){
    return this.http.post<any>(this.api_url+'palteforme/send_notification/',obj) ;
  }

  getTutorCourses(id: number): Observable<any> {
   
    return this.http.get(this.api_url + 'palteforme/tutor-courses/' + id + '/');
  }

  getCourses(id: number): Observable<any> {
    return this.http.get(this.api_url + 'palteforme/sc/' + id + '/');
  }
  

  // getCourses(id: number): Observable<any> {
  //   return this.http.get(this.api_url + 'palteforme/courses/');
  // }
  
  getCourseMaterial(id: number): Observable<any> {
    return this.http.get(this.api_url + 'palteforme/materials/course/' + id + '/');
  }
  getCourselessons(id: number): Observable<any> {

    return this.http.get(this.api_url + 'palteforme/lessons_by_course/' + id+'/');
  }

  
  addCourseMaterial(lessonId: string, formData: FormData): Observable<any> {
    // Assuming api_url is a property in your service
    const apiUrl = this.api_url + 'palteforme/materials/course/' + lessonId + '/';
    return this.http.post<any>(apiUrl, formData);
  }
  

  StudentEnrollment(obj: any): Observable<any> {
    debugger;
    return this.http.post<any>(this.api_url+'palteforme/enrollments/',obj) ;
  }
 
  UpdateCourseMaterial(id: number,obj: any): Observable<any> {
    debugger;
    return this.http.put<any>(this.api_url+'palteforme/materials/'+id+'/',obj) ;
  }
  updateLesson(id: number, formData: any): Observable<any> {
    return this.http.put<any>(this.api_url + 'palteforme/lesson/' + id + '/', formData);
  }
  
  
  
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/palteforme/courses/'+id+'/');
  }
  deletelesson(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/palteforme/lesson/'+id+'/');
  }
  deletematerial(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/palteforme/materials/'+id+'/');
  }
  
  // deleteCourse(id: number): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken': 'your-csrf-token-here', // Include your actual CSRF token here
  //   });
  
  //   return this.http.delete<any>(this.api_url + 'palteforme/courses/' + id, { headers });
  // }

  getTutorAssignments(id: number): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/tutor-assignment/' + id + '/');
  }

  getSubmissionAssignmentsByStudents(id: number): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/submission-assignment/' + id + '/');
  }


  GradeStudentAssignment(obj: any): Observable<any> {
    debugger;
    return this.http.post<any>(this.api_url+'palteforme/grades/',obj) ;
  }

  

  uploadFile(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>(this.api__Url, formData);
  }
  
  // getTutorCourses(id:number):Observable<any> {
  //   debugger;
  //   return this.http.get(this.api_url+'palteforme/courses/');
  // }
}

