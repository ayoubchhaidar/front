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

  addCourses(obj: any): Observable<any> {
    debugger;
    return this.http.post<any>(this.api_url+'palteforme/courses/',obj) ;
  }

  getTutorCourses(id: number): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/tutor-courses/' + id + '/');
  }

  getCourses(): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/courses/');
  }
  

  getCourseMaterial(id: number): Observable<any> {
    debugger;
    return this.http.get(this.api_url + 'palteforme/materials/course/' + id + '/');
  }

  addCourseMaterial(id: number,obj: any): Observable<any> {
    debugger;
    return this.http.post<any>(this.api_url+'palteforme/materials/course/'+id+'/',obj) ;
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
