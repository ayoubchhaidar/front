// import { Block } from '@angular/compiler';
// import { Component, Input ,ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MydataService } from 'src/app/services/mydata.service';

// @Component({
//   selector: 'app-generate-course',
//   templateUrl: './generate-course.component.html',
//   styleUrls: ['./generate-course.component.css']
// })
// export class GenerateCourseComponent implements OnInit {

//   @Input() courseId!: string;
//   @Input() title!: string;

//   lessonss : any;

//   constructor(private MydataService:MydataService) { }
//   ngOnInit(): void {
// console.log('titre',this.title);
// console.log('id',this.courseId);
// this.MydataService.courseStructure(this.title).subscribe(

//   (response: any) => {
//     this.lessonss=response
//    console.log( this.lessonss);
  
//   },
//   (error: any) => {
//     console.error('Error material:', error);
//   }

  
// );



//   }

//   // @Input() 
//   //  lessonss= { "lessons": [ { "title": "Introduction to ERP", "description": "Overview of Enterprise Resource Planning (ERP) systems and their importance in modern businesses.", "material": { "title": "ERP_Introduction.pdf", "typeoffile": "pdf" } }, { "title": "ERP Implementation Process", "description": "Key steps involved in implementing an ERP system in an organization.", "material": { "title": "ERP_Implementation_Process.docx", "typeoffile": "docx" } }, { "title": "ERP Modules and Functionalities", "description": "Exploration of different modules and functionalities commonly found in ERP systems.", "material": { "title": "ERP_Modules_Overview.pdf", "typeoffile": "pdf" } }, { "title": "ERP Benefits and Challenges", "description": "Understanding the potential benefits and challenges of using an ERP system in a business environment.", "material": { "title": "ERP_Benefits_and_Challenges.pdf", "typeoffile": "pdf" } }, { "title": "ERP Case Studies", "description": "Analysis of real-world examples of successful ERP implementations and their impact on organizations.", "material": { "title": "ERP_Case_Studies.pdf", "typeoffile": "pdf" } } ] }
   
  
  
//   // {
//   //   "lessons": [
//   //   {
//   //   "title": "Introduction to Software Engineering",
//   //   "description": "Overview of software engineering, its importance, principles, and best practices."
//   //   },
//   //   {
//   //   "title": "Software Development Life Cycle",
//   //   "description": "Understanding the various phases of the software development life cycle including planning, analysis, design, implementation, testing, and maintenance." },
//   //   {
//   //   "title": "Agile Methodology",
//   //   "description": "Exploration of agile methodology in software development, including scrum, kanban, and lean practices."
//   //   },
//   //   {
//   //   "title": "Software Testing",
//   //   "description": "Importance of software testing, types of testing methods, test-driven development (TDD), and continuous integration/continuous deployment (CI/CD)."     
//   //   },
//   //   {
//   //   "title": "Software Architecture and Design Patterns",
//   //   "description": "Overview of software architecture principles and common design patterns used in software development."
//   //   }
//   //   ]
//   //  }




//    addLesson(): void {
//       for (let i=0 ;i<this.lessonss.lessons.length;i++ ){
//       const newLesson = {
//         course: this.courseId, 
//         description: this.lessonss.lessons[i].description, 
//         title:  this.lessonss.lessons[i].title,  
//       };
  
//       this.MydataService.addLesson(newLesson).subscribe(
//         (addedLesson: any) => {
//           console.log('Lesson added successfully:', addedLesson);
          
//           addedLesson.id
//           const formData: FormData = new FormData();
//           formData.append('title', this.lessonss.lessons[i].material.title );
//           formData.append('document_type',  this.lessonss.lessons[i].material.typeoffile );
//           formData.append('lesson', addedLesson.id);




//           this.MydataService.addCourseMaterial( addedLesson.id, formData).subscribe(
//             (response: any) => {
//               console.log('Material added successfully:', response);
//               },
//             (error: any) => {
//               console.error('Error adding material:', error);
//             }
//           );

  
//         },
//         (error: any) => {
//           console.error('Error adding lesson:', error);
//         }
//       );


//     }
//   }

//   getMaterialIcon(materialType: string): string {
//     const materialTypeLowerCase = materialType.toLowerCase();
  
//     switch (materialTypeLowerCase) {
//       case 'pdf':
//         return 'picture_as_pdf';
//         case 'pptx':
//           return 'slideshow';
//       case 'video':
//         return 'video_library';
//       case 'image':
//         return 'image';
//       case 'youtube':
//         return 'video_library';
//         case 'video':
//           return 'video_library';
//       case 'quiz':
//         return 'live_help';
//       case 'exercise':
//         return 'fitness_center';
//       case 'docx':
//         return 'description';
//       default:
//         return 'description'; // Default icon for unknown types
//     }
//   }











// }



import { Component, Input ,ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-generate-course',
  templateUrl: './generate-course.component.html',
  styleUrls: ['./generate-course.component.css']
})
export class GenerateCourseComponent implements OnInit {
  @Input() courseId!: string;
 @Input() title!: string;
mssg="Generation de la structure";
  lessonss : any;
  msg: string='w8';
  constructor(private MydataService:MydataService,private router: Router) {}
  ngOnInit(): void {

console.log('titre',this.title);
console.log('id',this.courseId);
this.MydataService.courseStructure(this.title).subscribe(

  (response: any) => {
    
    this.lessonss=JSON.parse(response)
    if (Object.keys( this.lessonss).length === 0){console.log('nom invalides.')
        this.msg='nom invalides.'

    }
    else {
      this.msg=' '
    }
   console.log( this.lessonss);
  
  },
  (error: any) => {
    console.error('Error material:', error);
  }

  
);



  }


  @Input() 
  //  lessonss= {
  //   "lessons": [
  //     {
  //       "title": "Introduction � l'ERP",
  //       "description": "Aper�u des syst�mes de Planification des Ressources d'Entreprise (ERP).",
  //       "material": {
  //         "title": "Introduction_ERP.pdf",
  //         "typeoffile": "pdf"
  //       }
  //     },
  //     {
  //       "title": "Processus de Mise en �uvre de l'ERP",
  //       "description": "�tapes cl�s impliqu�es dans la mise en �uvre d'un syst�me ERP.",
  //       "material": {
  //         "title": "Processus_Mise_en_Oeuvre_ERP.docx",
  //         "typeoffile": "docx"
  //       }
  //     },
  //     {
  //       "title": "Modules et Fonctionnalit�s de l'ERP",
  //       "description": "Exploration des diff�rents modules et fonctionnalit�s dans les syst�mes ERP.",
  //       "material": {
  //         "title": "Aper�u_Modules_ERP.pdf",
  //         "typeoffile": "pdf"
  //       }
  //     }
  //   ]
  // }
  
   
  
  
  // {
  //   "lessons": [
  //   {
  //   "title": "Introduction to Software Engineering",
  //   "description": "Overview of software engineering, its importance, principles, and best practices."
  //   },
  //   {
  //   "title": "Software Development Life Cycle",
  //   "description": "Understanding the various phases of the software development life cycle including planning, analysis, design, implementation, testing, and maintenance." },
  //   {
  //   "title": "Agile Methodology",
  //   "description": "Exploration of agile methodology in software development, including scrum, kanban, and lean practices."
  //   },
  //   {
  //   "title": "Software Testing",
  //   "description": "Importance of software testing, types of testing methods, test-driven development (TDD), and continuous integration/continuous deployment (CI/CD)."     
  //   },
  //   {
  //   "title": "Software Architecture and Design Patterns",
  //   "description": "Overview of software architecture principles and common design patterns used in software development."
  //   }
  //   ]
  //  }




   addLesson(): void {
      for (let lesson of this.lessonss.lessons ){
      const newLesson = {
        course: this.courseId, 
        description: lesson.description, 
        title: lesson.title,  
      };
  
      this.MydataService.addLesson(newLesson).subscribe(
        (addedLesson: any) => {
          console.log('Lesson added successfully:', addedLesson);
          
          addedLesson.id
          const formData: FormData = new FormData();
          formData.append('title',lesson.material.title );
          formData.append('document_type', lesson.material.typeoffile );
          formData.append('lesson', addedLesson.id);




          this.MydataService.addCourseMaterial( addedLesson.id, formData).subscribe(
            (response: any) => {
              console.log('Material added successfully:', response);
              },
            (error: any) => {
              console.error('Error adding material:', error);
            }
          );

  
        },
        (error: any) => {
          console.error('Error adding lesson:', error);
        }
      );


    }
    // this.router.navigate(['/dashboard/lesoon?CourseId='+this.courseId]);
    window.location.reload();
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











}