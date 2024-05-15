import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  
  ngOnInit(): void {
    this.generateCertificate('hehe');
  }
  



  generateCertificate(courseName: string): void {
    const certificateContent = `wallahy yatik essahaa ya dinaryyy .`;
  
    
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
   
  
    doc.addImage("assets/Certificate.jpg", 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
  
    doc.setFont('times', 'bold'); 
    doc.setFontSize(18); 
    doc.setTextColor(0, 0, 0); 
  
    // Calculate text width
    const textWidth = doc.getStringUnitWidth(certificateContent) * 18 / doc.internal.scaleFactor; 
  

    const textX = (doc.internal.pageSize.width - textWidth) / 2;
    const textY = 100; 
  
    doc.text(certificateContent, textX, textY);
  
  
    const fileName = `${courseName}_Certificate.pdf`;
  
    // Display the PDF to the user (optional)
    const pdfDataUri = doc.output('datauristring'); // Generate data URI of the PDF
    const iframe = `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`;
    
    // Create a new window or use a modal to display the PDF content
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(iframe);
    } else {
      alert('Please allow pop-ups for this site to view the certificate.');
    }
  

}
}