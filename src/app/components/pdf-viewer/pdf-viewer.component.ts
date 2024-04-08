import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {

  name = "Angular" + VERSION.major;
  urlpdf = "https://drive.google.com/file/d/1uQbwO_2AmQsfJyoA2ExiNmSzFGui5wap/preview";
  urlsafe: SafeResourceUrl | undefined;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadDocument(this.urlpdf);
  }

  loadDocument(url: string) {
    this.urlsafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  selectDocumentType(type: any) {
    switch (type) {
      case "pdf":
        this.loadDocument(this.urlpdf);
        break;
    }
  }
}

