import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { MydataService } from '../services/mydata.service';
import { Observable } from 'rxjs';
import { data } from 'jquery';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  uploadedLink: string |undefined;
  errorMessage: string | null = null;

  constructor(private MydataService:MydataService ) {}  

  ngOnInit(): void {
    // this.generateAndUploadCertificate('data ','ayoub ');
  }

  generateAndUploadCertificate(courseName: string, studentName: string): Observable<string> {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; //date
    const certificateContent = ` ${studentName}`; // nom de l'apprenant
    const course = ` ${courseName}`; // titre du cours

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    //image de background
    doc.addImage("assets/certificat.jpg", 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

    doc.setFont('font:', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);

    const textWidth = doc.getStringUnitWidth(certificateContent) * 18 / doc.internal.scaleFactor;
    const textX = (doc.internal.pageSize.width - textWidth) / 2;
    const textWidthCN = doc.getStringUnitWidth(course) * 18 / doc.internal.scaleFactor;
    const textXCN = (doc.internal.pageSize.width - textWidthCN ) / 2;
    const textWidthD = doc.getStringUnitWidth(formattedDate) * 18 / doc.internal.scaleFactor;
    const textD = (doc.internal.pageSize.width - textWidthD ) / 2;
    const textY = 95;

    doc.text(certificateContent, textX - 5, textY + 2);
    doc.text(course, textXCN-5, textY + 27);
    doc.text(formattedDate, textD + 58, textY + 65);
    const fileName = `${courseName}_Certificate.pdf`;





  
    // // Display the PDF to the user (optional)
    // const pdfDataUri = doc.output('datauristring'); // Generate data URI of the PDF
    // const iframe = `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`;
    
    // // Create a new window or use a modal to display the PDF content
    // const newWindow = window.open();
    // if (newWindow) {
    //   newWindow.document.write(iframe);
    // } else {
    //   alert('Please allow pop-ups for this site to view the certificate.');
    // }

    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append('file', pdfBlob, fileName);

    return new Observable<string>((observer) => {
      this.MydataService.uploadFile(formData).subscribe(
        (response: any) => {
          console.log('Public link:', response.public_link);
          this.uploadedLink = response.public_link;
          observer.next(this.uploadedLink);
          observer.complete();
        },
        (error) => {
          this.errorMessage = 'Error uploading file. Please try again.';
          console.error(this.errorMessage, error);
          observer.error(error);
        }
      );
    });
    
  }
  
}