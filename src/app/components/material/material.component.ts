import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  myform: FormGroup;
  myData$: Observable<any> | undefined;
  user!:any;
  api_url: string = 'http://127.0.0.1:8000/';
  CourseId:any;
  do:any;
  file: File | null = null;
  courseIdd: number = 1; 
  title: string = '';
  documentType: string = '';

  New_Material: any = {
    title: "",
    document_type: "", 
    course:null,
    up_file:""
  };

  
  constructor(private MydataService:MydataService,private route: ActivatedRoute, private sanitizer: DomSanitizer,private http: HttpClient){
    this.myform = new FormGroup({
      title: new FormControl(''),
      document_type: new FormControl(''),
      up_file: new FormControl('')
    });
   }
  ngOnInit(): void {
   
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);

    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
      });

    this.route.queryParams.subscribe(params => {
        this.do = params['do'];
      });
    this.myData$ = this.MydataService.getCourseMaterial(this.CourseId);
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  sanitizePdfUrl(pdfUrl: string): any {
    // Sanitize the URL to prevent security issues
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  downloadPdf(Pdf_Link: string): void {
    Pdf_Link=this.getLastWordAfterSlash(Pdf_Link);
    const fileName = 'Chapitre-1.pdf';  // replace with the actual file name
    const apiUrl = `http://localhost:8000/palteforme/get_pdf/${Pdf_Link}/`;  

    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = Pdf_Link;
      link.click();
    });
  }

  getLastWordAfterSlash(inputString: string): string {
    const parts: string[] = inputString.split('/');
    return parts.pop() || '';  
  }

 

  uploadPdf(title: string, description: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pdf_file', file, file.name);
      formData.append('pdf_file', file, file.name);


      return this.http.post('http://127.0.0.1:8000/media/materials/', formData);
        }


      
  AddMaterial(){
    this.New_Material.course = {};
    this.New_Material.title = this.myform.value['title']; 
    this.New_Material.document_type = this.myform.value['document_type']; 
    this.New_Material.up_file = this.myform.value['up_file']; 
    this.New_Material.course = this.CourseId;
    console.log(this.New_Material);
    this.MydataService.addCourseMaterial(this.CourseId,this.New_Material).subscribe();
  }

  

  
  

}
