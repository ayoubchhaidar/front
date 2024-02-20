import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploadpdf',
  templateUrl: './uploadpdf.component.html',
  styleUrls: ['./uploadpdf.component.css']
})
export class UploadpdfComponent {
  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    
    this.http.post('http://127.0.0.1:8000/accounts/api/upload/', formData).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }

}
