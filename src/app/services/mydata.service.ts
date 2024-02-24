import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, map } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class MydataService {

  api_url: string = 'http://127.0.0.1:8000/';
  private apiUrl = 'http://127.0.0.1:8000/palteforme/materials/course/';
  constructor(private http: HttpClient) { }

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

  getTutorCourses(id: number): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/tutor-courses/' + id + '/');
  }

  getCourses(): Observable<any> {
    return this.http.get(this.api_url + 'palteforme/courses/');


  }
  

  getCourseMaterial(id: number): Observable<any> {
    debugger;
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
 

  // deleteCourse(id: number): Observable<any> {
  //   return this.http.delete<any>('http://127.0.0.1:8000/palteforme/courses/'+id);
  // }
  
  deleteCourse(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': 'your-csrf-token-here', // Include your actual CSRF token here
    });
  
    return this.http.delete<any>(this.api_url + 'palteforme/courses/' + id, { headers });
  }

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

  
  
  // getTutorCourses(id:number):Observable<any> {
  //   debugger;
  //   return this.http.get(this.api_url+'palteforme/courses/');
  // }
}

