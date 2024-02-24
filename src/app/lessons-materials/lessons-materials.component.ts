import { Component } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lessons-mateials',
  templateUrl: './lessons-materials.component.html',
  styleUrls: ['./lessons-materials.component.css']
})
export class LessonsMateialsComponent {
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

  selectedLessonId!: string;

 


  
lessonCount = 0;
selectedFile!: File;

  constructor(private MydataService:MydataService,private route: ActivatedRoute) {
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
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
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

openMaterialModal(lessonId: string): void {
  this.selectedLessonId = lessonId;
  const modal = document.getElementById('materialModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

closeMaterialModal(): void {
  const modal = document.getElementById('materialModal');
  if (modal) {
    modal.style.display = 'none';
  }
}
AddMaterial(lessonId: string): void {
  if (lessonId !== null) {
  const formData: FormData = new FormData();
  formData.append('title', this.myform.value['title']);
  formData.append('document_type', this.myform.value['document_type']);
  formData.append('content', this.selectedFile);
  formData.append('lesson', lessonId);

  this.MydataService.addCourseMaterial(lessonId, formData).subscribe(
    (response: any) => {
      console.log('Material added successfully:', response);

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