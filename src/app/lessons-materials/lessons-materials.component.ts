import { Component } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


interface UploadResponse {
  public_link: string;
}
interface Course {
  id: number;
  title: string;
  description: string;
}


@Component({
  selector: 'app-lessons-mateials',
  templateUrl: './lessons-materials.component.html',
  styleUrls: ['./lessons-materials.component.css']
})

export class LessonsMateialsComponent {
// Property to track the index of the currently hovered item
hoveredItemId: string | null = null;
 

update: boolean = false;
eval: boolean = false;
  selectedDocumentType: string | null = null;
  CourseId:any;
  material ={};
  lessons: any []=[];
  
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
materialForm: any;
selectedmatId: any;
myData$: any=[];
user!: any;
quizes: any[] =[];
  assignments: any[]=[];

  

  constructor(private MydataService:MydataService,private route: ActivatedRoute,private dialog: MatDialog) {
   
  }
  ngOnInit(): void {
    this.lessons=[]
    this.material ={}
    this.selectedLessonId=""
    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
      });
     this.get_quiz();
      this.user = localStorage.getItem("currentUser");
      this.user = JSON.parse(this.user);
      this.MydataService.getCourses(this.user.user_id).subscribe(
        (data: any[]) => {
          this.myData$ = data;
          console.log( "user",this.myData$)   
          
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
     this.get_assig();
 
      this.getCourselessons(this.CourseId);
    
      this.myform = new FormGroup({
        title: new FormControl(''),
        document_type: new FormControl(''),
        up_file: new FormControl('')
      });
       

  } 
 
  
  // Inside your component class
  enableLessonEdit(lesson: any) {
    lesson.isEditing = true;
    lesson.newTitle = lesson.title;
  }
  

  
 updateLessonTitle(lesson: any) {
    // Update the title in the lesson object
    lesson.title = lesson.newTitle;

    // Prepare the updated data object to be sent to the backend
    const updatedData = {
      title: lesson.newTitle,
      course: lesson.course, // Include the course field if required
      description: lesson.description // Include the description field if required
      // Add more fields as needed
    };

    // Call the updateLesson method of MydataService to update the lesson on the backend
    this.MydataService.updateLesson(lesson.id, updatedData).subscribe(
      () => {
        lesson.isEditing = false;
      },
      (error) => {
        // Handle error response if needed
        console.error('Error updating lesson:', error);
      }
    );

    // Reset editing mode
    lesson.isEditing = false;
}

  
  
 
  
  showInformation: boolean = true; // Show information section by default
  showContent: boolean = false;   // Hide content section by default


  getCourseTitleById(id: number) {
    for (let course of this.myData$) {
      if (course.id== id) {
    return  course.title ;
  }
}
  return "";
}
  
  // New function to get the description of the course by ID
  getCourseDescriptionById(id: number): string {
    for (let course of this.myData$) {
      if (course.id== id) {
  
    return course.description ;
   
  }
}
return ""; 
}
  

  // Function to toggle between information and content sections
  toggleSection(section: string) {
    if (section === 'information') {
      this.showInformation = true;
      this.showContent = false;
    } else if (section === 'content') {
      this.showInformation = false;
      this.showContent = true;
    }
  }
  getMaterialIcon(materialType: string): string {
    const materialTypeLowerCase = materialType.toLowerCase();
  
    switch (materialTypeLowerCase) {
      case 'pdf':
        return 'picture_as_pdf';
        case 'pptx':
          return 'slideshow';
      case 'video':
        return 'video_library';
      case 'image':
        return 'image';
      case 'youtube':
        return 'video_library';
        case 'video':
          return 'video_library';
      case 'quiz':
        return 'live_help';
      case 'exercise':
        return 'fitness_center';
      case 'docx':
        return 'description';
      default:
        return 'description'; // Default icon for unknown types
    }
  }

  get_quiz(){
    this.MydataService.getQuizByLesson(this.CourseId).subscribe((data: any[]) => {
      this.quizes = data;
      console.log("quiize",this.quizes)
    },
    (error: any) => {
      console.error('Error fetching quiz:', error);
    });
  }
  delete_quiz(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this quiz?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MydataService.deleteQuiz(id).subscribe(() => {
          console.log(`quiz with ID ${id} deleted successfully.`);
        this.get_quiz();
        });
      }
    });
    console.log(id);
  }
  get_assig(){
    this.MydataService.AssignmentsbyCourse(this.CourseId).subscribe( (data: any[]) => {
      this.assignments = data;
      console.log( "ass",this.assignments)   ;

    },
    (error: any) => {
      console.error('Error fetching users:', error);
    });
  }
  delete_assig(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this assignment?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MydataService.deleteAssignment(id).subscribe(() => {
          console.log(`Assignment with ID ${id} deleted successfully.`);
        this.get_assig();
        });
      }
    });
    console.log(id);
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
    console.log(id);
  }


  unlockNext(id:any){

    this.MydataService.unlock(id).subscribe();
    
    }

  lockUnlock(id:any){

    this.MydataService.unlockManually(id).subscribe();
  
  
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

  
allowedFileTypes: string = ''; // Initialize with an empty string
errorMessage: string = '';
onFileSelected(event: any): void {
  const file: File = event.target.files[0];

  // Reset any previous error messages
  this.errorMessage = '';

  if (!file) {
    this.noFileSelected = true;
    return;
  }

  this.noFileSelected = false;

  // Derive material type based on file extension
  const materialType = this.getMaterialTypeFromExtension(file.name);

  if (!materialType) {
    // Set the error message
    this.errorMessage = 'Invalid file type. Please choose a valid file.';
    // Log the error message to the console
    console.error(this.errorMessage);
    return;
  }

  // Specify the expected document type based on your application's logic
  const selectedDocumentType = this.myform.value['document_type'];
  const expectedDocumentType = this.getExpectedDocumentType(selectedDocumentType);

  // Check if the determined material type matches the expected document type
  if (!this.validateDocumentType(materialType, expectedDocumentType)) {
    // Set the error message
    this.errorMessage = `Invalid document type. Please choose a ${expectedDocumentType} file.`;
    // Log the error message to the console
    console.error(this.errorMessage);
    return;
  }

  // Continue with file upload
  const formData = new FormData();
  formData.append('file', file);

  this.MydataService.uploadFile(formData).subscribe(
    (response: UploadResponse) => {
      console.log('Public link:', response.public_link);
      this.uploadedLink = response.public_link;
    },
    (error) => {
      // Handle upload errors and set the error message
      this.errorMessage = 'Error uploading file. Please try again.';
      console.error(this.errorMessage, error);
    }
  );
}

getMaterialTypeFromExtension(fileName: string): string | null {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  
  // Add logic to determine material type based on file extension
  if (extension === 'pdf') {
    return 'pdf';
  } else if (extension === 'docx') {
    return 'docx';
  } else if (extension === 'pptx') {
    return 'pptx';
  } else {
    // Add more cases for other material types if needed
    return null;
  }
}

getExpectedDocumentType(selectedDocumentType: string): any{
  switch (selectedDocumentType) {
    case 'pdf':
      return 'pdf';
    case 'youtube':
      // Add logic for YouTube file types if needed
      break;
    case 'quiz':
      // Add logic for Quiz file types if needed
      break;
    case 'exercise':
      // Add logic for Exercise file types if needed
      break;
    case 'docx':
      return 'docx';
      case 'pptx':
        return 'pptx';
    default:
      return ''; // Default, allow all file types
  }
}

validateDocumentType(materialType: string, expectedDocumentType: string): boolean {
  return materialType === expectedDocumentType;
}



  onMouseEnter(itemId: string): void {
    this.hoveredItemId = itemId;
  }

  onMouseLeave(): void {
    this.hoveredItemId = null;
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

 

  UpdateMaterial(id: number){
    const formData = new FormData();
    if( this.myform.value['title'] !=''){ formData.append('title', this.myform.value['title']);}
    if( this.myform.value['document_type'] !=''){ formData.append('document_type', this.myform.value['document_type']);}
    if( this.uploadedLink!=''){ formData.append('content', this.uploadedLink); }
    this.MydataService.UpdateCourseMaterial(id,formData).subscribe(() => {
      this.getCourselessons(this.CourseId);
      this.closeMaterialModal();
    });
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
            this.getCourselessons(this.CourseId);
      this.closeMaterialModal();
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


  closeassModal(): void {
    this.getCourselessons(this.CourseId);
    const modal = document.getElementById('assModal');
   
    
    if (modal) {
      modal.style.display = 'none';
    }
   
  
   
  }
  
  
    openAssignmentModal(assId: any): void {
      
      const modal = document.getElementById('assModal');
      if (modal) {
        modal.style.display = 'block';
      }
    }

  openMaterialModal(lessonId: string, material: any, update: boolean, Eval: boolean): void {
  this.selectedLessonId = lessonId;
  this.selectedmatId=material.id
  const modal = document.getElementById('materialModal');
  if (modal) {
    modal.style.display = 'block';
  }
  
  this.update = update;
  console.log(this.selectedLessonId,this.selectedmatId,this.update);
  this.myform.value['title'] = material.title;
  this.myform.value['document_type'] = material.document_type;
  this.myform.value['content'] = material.content;
  this.uploadedLink=material.content;
}
openMaterialModaleval(id:string): void {
  const modal = document.getElementById('materialModaleval');
  this.selectedLessonId=id;
  
  if (modal) {
    modal.style.display = 'block';
  }
}
openMaterialModallesson(): void {
  const modal = document.getElementById('materialModallesson');
  if (modal) {
    modal.style.display = 'block';
  }
}
openMaterialModalpreview( material: any): void {
  this.selectedmatId=material.id
  const modal = document.getElementById('materialModalpreview');
  if (modal) {
    modal.style.display = 'block';
  }

  

}
closeMaterialModal(): void {
  this.getCourselessons(this.CourseId);
  const modal = document.getElementById('materialModal');
  const modal1 = document.getElementById('materialModallesson');
  this.update=false;
  
  if (modal) {
    modal.style.display = 'none';
  }
  if (modal1) {
    modal1.style.display = 'none';
  }
  this.newLessonTitle="";
  this.myform.value['title']="";
  this.myform.value['document_type']="";
  this.myform.value['content']="";
  this.uploadedLink="";
}



resetInput(input: NgModel) {
  console.log('Before reset:', input.value, input.control.value); // Log values before reset
  input.control.reset(); // Reset the form control
  input.reset(); // Reset the NgModel
  console.log('After reset:', input.value, input.control.value); // Log values after reset
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
      this.getCourselessons(this.CourseId);
      this.closeMaterialModal();

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


checkEval(id: string): void {
  this.eval=false;
  for ( let quiz of this.quizes) {
      if (quiz.lesson === id) {
          console.log(`Quiz found with lessonid ${id}`);
          this.eval=true;
          
      }
  }
  console.log("eval",this.eval);
}

}





