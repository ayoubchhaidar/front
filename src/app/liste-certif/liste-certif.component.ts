import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MydataService } from '../services/mydata.service';

@Component({
  selector: 'app-liste-certif',
  templateUrl: './liste-certif.component.html',
  styleUrls: ['./liste-certif.component.css']
})
export class ListeCertifComponent implements OnInit{
  @Input()
  certificationUrl: string="https://drive.google.com/file/d/1oksxyb762xKjfid2IUd7RWX4TxoEEn5F/view?usp=drive_link";
  user: any;
  myData: any[]=[];
  
  constructor(public sanitizer: DomSanitizer,private MydataService:MydataService) { }
  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
   this.MydataService.get_certif(this.user.user_id).subscribe((data: any[]) => {
    this.myData = data;
    
},
(error: any) => {
    console.error('Error fetching users:', error);
}
); 
  }

  downloadDocument(content: string) {
    const fileId = this.extractFileId(content);
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'document'; // You can set a default filename here
    link.click();
  }

  private extractFileId(url: string): string {
    const regex = /\/d\/(.*?)\//;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
}