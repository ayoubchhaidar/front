import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getRole() {
    throw new Error('Method not implemented.');
  }
  api_url: string = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.api_url + 'accounts/api/auth/',
      { username, password }, httpOptions
    ).pipe( 
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  


  signup(username: string, full_name:string, email: string, password: string,is_active:boolean,is_superuser:boolean,is_staff:boolean){

    const formData = new FormData();
    formData.append('username', username);
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('is_active', String(is_active));
    formData.append('is_superuser', String(is_superuser));
    formData.append('is_staff', String(is_staff));


     this.http.post<any>(  this.api_url + 'accounts/api/signup/', formData).subscribe(
      response => {
        console.log('sign in uploaded successfully:', response);
      },
      error => {
        console.error('Error :', error);
      }
    );
  }
  
  changePw(obj:any) {
    return this.http.post<any>(this.api_url + 'accounts/api/change_password/', obj);
  }


  confirmEmail(username: string) {
    return this.http.post<any>(this.api_url + 'accounts/api/confirm_email/' + username + '/', {});
  }
  get_user_messages(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}palteforme/get_user_messages/${userId}/`);
  }
  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}accounts/api/profile/${userId}/`);
  }
  updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.api_url}accounts/api/profile/${userId}/`, userData);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.api_url}accounts/api/profile/${userId}/`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}accounts/api/users/`);
  }

  getuserfreinds(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}accounts/api/user_freinds/${userId}/`);
  }
  getTutors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}accounts/api/tutors/`);
  }


  changeVerificationStatus(newStatus: boolean) {
    console.log(newStatus);
    const apiUrl = 'http://127.0.0.1:8000/palteforme/change_verification_status/';
    const postData = { new_status: newStatus };

    return this.http.post<any>(apiUrl, postData);
  }

 
  getVerifStatus(): Observable<boolean> {
    return this.http.get<{ needVerification: boolean }>('http://127.0.0.1:8000/palteforme/get_verif_status/')
      .pipe(map(response => response.needVerification));
  }


  verifyUser(userId: number): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/accounts/api/verifyUser/${userId}/`, {});
  }

  resetPw(resetData:{}): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/accounts/api/reset_password/`,resetData);
  }


}

