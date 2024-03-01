import { Component, EventEmitter, Output } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface UploadResponse {
  public_link: string;
}
@Component({
  selector: 'app-lessons-mateials',
  templateUrl: './lessons-materials.component.html',
  styleUrls: ['./lessons-materials.component.css']
})
export class LessonsMateialsComponent {
// Property to track the index of the currently hovered item
hoveredItemId: string | null = null;
   options = [
    { value: 'pdf', label: 'PDF', icon: 'https://cdn.mycourse.app/v3.3.0/author/images/contents-pdf-dark.png' },
    { value: 'video', label: 'Video', icon: 'https://cdn.mycourse.app/v3.3.0/author/images/contents-yt-dark.png' },
    // Add more options as needed
  ];
  selectOption(value: string): void {
    console.log('Selected Document Type:', this.myform.value['document_type']);
  }
  materialTypeIcons: { [key: string]: string } = {
    'PDF': 'far fa-file-pdf',
    'Video': 'far fa-file-video',
    'Image': 'far fa-file-image',
    // Add more material types and their corresponding icons as needed
  };
  selectedDocumentType: string | null = null;
  CourseId:any;
  material ={}
  lessons: any []=[]
  
  newLessonTitle: string | null = null;
  myform: any = {
    value: {
      title: '',
      document_type: ''
    }
  };
  noFileSelected = true;
  selectedLessonId!: string;
public uploadedLink: string = '';
selectedFile: any;
  materials: any;
  

  constructor(private MydataService:MydataService,private route: ActivatedRoute,private dialog: MatDialog) {
    // Ensure 'this' is bound to the class methods

  }
  ngOnInit(): void {
    this.lessons=[]
    this.material ={}
    this.selectedLessonId=""
    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
      });
    
      this.getCourselessons(this.CourseId);
    
      this.myform = new FormGroup({
        title: new FormControl(''),
        document_type: new FormControl(''),
        up_file: new FormControl('')
      });
       

  }
    getMaterialIcon(materialType: string): string {
    const materialTypeLowerCase = materialType.toLowerCase();

    switch (materialTypeLowerCase) {
      case 'pdf':
        return 'icon fas fa-file-pdf';
      case 'video':
        return 'icon fas fa-video';
      case 'image':
        return 'icon fas fa-image';
      default:
        return 'far fa-file'; // Default icon class
    }
  }


  delete_lesson(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this lesson?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MydataService.deletelesson(id).subscribe(() => {
          console.log(`lesoon with ID ${id} deleted successfully.`);
          this.getCourselessons(this.CourseId);
        });
      }
    });
  }


  delete_mat(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this material?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MydataService.deletematerial(id).subscribe(() => {
          console.log(`Material with ID ${id} deleted successfully.`);
          this.getCourselessons(this.CourseId);
        });
      }
    });
  }

  

  onMouseEnter(itemId: string): void {
    this.hoveredItemId = itemId;
  }

  onMouseLeave(): void {
    this.hoveredItemId = null;
  }

  // Actions for material buttons
  previewMaterial(material: any): void {
  
  }
  
  

  deleteMaterial(material: any): void {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(`Are you sure you want to delete the material: ${material}?`);
  
    if (isConfirmed) {
      // Add logic for deleting material
      console.log('Delete Material:', material);
      // Add additional logic for actual deletion if needed
    } else {
      console.log('Deletion canceled by the user.');
      // Add any logic you want to execute if the user cancels deletion
    }
  }
  


  selectDocumentType(type: any): void {
    this.selectedDocumentType = type.name;
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.noFileSelected = false;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.MydataService.uploadFile(formData).subscribe((response: UploadResponse) => {
        console.log('Public link:', response.public_link);
        this.uploadedLink = response.public_link;
       
      });
     
    }
  }
  openMaterialModalup(lessonId: string, material:any): void {
    this.selectedLessonId = lessonId;
    const modal = document.getElementById('materialModalup');
    if (modal) {
      modal.style.display = 'block';
    }
    this.myform.value['title'] = material.title;
    this.myform.value['document_type'] =material.document_type;
  }
  UpdateMaterial(id: number){
    const formData = new FormData();
    if( this.myform.value['title'] !=''){ formData.append('title', this.myform.value['title']);}
    if( this.myform.value['document_type'] !=''){ formData.append('document_type', this.myform.value['document_type']);}
    if( this.uploadedLink!=''){ formData.append('content', this.uploadedLink); }
  
  
    this.MydataService.UpdateCourseMaterial(id,formData).subscribe();
  }
  

  getCourselessons(id:number){
  this.MydataService.getCourselessons(id).subscribe((data: any[]) => {
    this.lessons = data;
    console.log( this.lessons)
    for (let i = 0; i < this.lessons.length; i++) {
      const lesson = this.lessons[i]; 
  
      console.log('Lesson:', lesson);
  
      this.MydataService.getCourseMaterial(lesson.id).subscribe(
        (data: any[]) => {
          lesson.mateials = data; 
          console.log('Materials for lesson', lesson.id, ':', lesson.mateials);
        },
        (error: any) => {
          console.error('Error fetching materials for lesson', lesson.id, ':', error);
        }
      );
    }

  },
  (error: any) => {
    console.error('Error fetching users:', error);
  }
);

this.getmaterials();

}

getmaterials() {
  console.log('Starting getmaterials...');
  console.log(this.lessons);
  for (let i = 0; i < this.lessons.length; i++) {
    const lesson = this.lessons[i]; 

    console.log('Lesson:', lesson);

    this.MydataService.getCourseMaterial(lesson.id).subscribe(
      (data: any[]) => {
        console.log('Received data for lesson', lesson.id, ':', data);
        lesson.mateials = data; 
        console.log('Materials for lesson', lesson.id, ':', lesson.mateials);
      },
      (error: any) => {
        console.error('Error fetching materials for lesson', lesson.id, ':', error);
      }
    );
  }
  console.log('Finished getmaterials.');
}



addLesson(): void {
  // Add a new Lesson to the database

  this.newLessonTitle = prompt('Enter the title for the new lesson:');

  if (this.newLessonTitle) {
    const newLesson = {
      course: this.CourseId, // Replace with the actual course name or retrieve it from user input
      description: 'Lesson Description', // Replace with the actual lesson description or retrieve it from user input
      title: this.newLessonTitle,
      materials: []
    };

    // Update the frontend array
    this.lessons.push(newLesson);

    // Add the new lesson to the backend
    this.MydataService.addLesson(newLesson).subscribe(
      (addedLesson: any) => {
        console.log('Lesson added successfully:', addedLesson);

        // If the backend returns additional data, you can update the frontend array with it
        const index = this.lessons.findIndex(lesson => lesson.title === addedLesson.title);
        if (index !== -1) {
          this.lessons[index] = addedLesson;
        }

        // Load materials for the newly added lesson
        this.MydataService.getCourseMaterial(addedLesson.id).subscribe(
          (data: any[]) => {
            addedLesson.materials = data;
            console.log('Materials for the newly added lesson:', addedLesson.materials);
          },
          (error: any) => {
            console.error('Error fetching materials for the newly added lesson:', addedLesson.id, ':', error);
          }
        );
      },
      (error: any) => {
        console.error('Error adding lesson:', error);
      }
    );
  }
}
 showSublist(category: string): void {
    const sublists = document.querySelectorAll('.sublist');
    sublists.forEach(sublist => sublist.classList.remove('show'));

    const selectedSublist = document.getElementById(`sublist-${category}`);
    if (selectedSublist) {
      selectedSublist.classList.add('show');
    }
  }
openMaterialModal(lessonId: string): void {
  this.selectedLessonId = lessonId;
  const modal = document.getElementById('materialModal');
  if (modal) {
    modal.style.display = 'block';
  }
}


closeMaterialModal(): void {
  const modal = document.getElementById('materialModal');
  const modal1 = document.getElementById('materialModalup');
  if (modal) {
    modal.style.display = 'none';
  }
  if (modal1) {
    modal1.style.display = 'none';
  }
}
AddMaterial(lessonId: string): void {
  if (lessonId !== null) {
  const formData: FormData = new FormData();
  formData.append('title', this.myform.value['title']);
  formData.append('document_type', this.myform.value['document_type']);
  formData.append('content', this.uploadedLink);
  formData.append('lesson', lessonId);

  this.MydataService.addCourseMaterial(lessonId, formData).subscribe(
    (response: any) => {
      console.log('Material added successfully:', response);
      window.location.reload();

      // Update the materials for the corresponding lesson
      const lessonIndex = this.lessons.findIndex(lesson => lesson.id === lessonId);
      if (lessonIndex !== -1) {
        this.lessons[lessonIndex].materials.push(response);
      }
    },
    (error: any) => {
      console.error('Error adding material:', error);
    }
  );
}
}



toggleMaterials(lesson: any): void {
  lesson.showMaterials = !lesson.showMaterials;
}



// getmaterial(){

//   this.MydataService.getCourseMaterial(1).subscribe((data: any[]) => {

//     console.log( data);

//     this.material= data;
//     console.log(  this.material)

//   },
//   (error: any) => {
//     console.error('Error fetching users:', error);
//   }
// );

// }



}