import { Component, OnInit } from '@angular/core';


import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css']
})
export class ViewSubmissionsComponent implements OnInit {
 
  submissions :any []=[];
  grades :any []=[];
  content=''
  myform: FormGroup;
  signeduser: any;
  myData$: any;
  Assignment: any[]=[];
  

  constructor(private MydataService:MydataService, private route: ActivatedRoute){

    this.myform = new FormGroup({
      note: new FormControl(''),
      remarque: new FormControl(''),

    });
   }
  ngOnInit(): void {

    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);

    this.MydataService.get_tutor_assignment(this.signeduser.user_id).subscribe( (data: any[]) => {
      this.Assignment=data; 
      console.log("ass",this.Assignment);
    },
    (error: any) => {
      console.error('Error fetching materials for lesson', ':', error);
    });
  

 
   
    this.MydataService.getTutorCourses(this.signeduser.user_id).subscribe( (data: any[]) => {
      this.myData$ = data;
      console.log(this.myData$);
  },
  (error: any) => {
      console.error('Error fetching users:', error);
  }
);  
    }



    getGradeBySt(assignmentId: number):any{
      const gradeObj = this.grades.find(grade => grade.student === assignmentId);
      if (gradeObj) {     return gradeObj.grade;  }
      else {
        return '';
      }
    
    }
    getF(assignmentId: number):any{
      const gradeObj = this.grades.find(grade => grade.student === assignmentId);
      if (gradeObj) {    return gradeObj.feedback;   }
      else {
        return '';
      }
      
    }


visible:boolean=false;
    formVisibility = new Map<string, boolean>();

    // Function to toggle the visibility of the input forms
    toggleForm(studentId: string, assignmentId: string) {
      const key = `${studentId}-${assignmentId}`;
      this.formVisibility.set(key, !this.formVisibility.get(key));
    
    }
  
    // Function to check if the form is visible for a specific student and assignment
    isFormVisible(studentId: string, assignmentId: string): boolean {
      const key = `${studentId}-${assignmentId}`;
      return this.formVisibility.get(key) || false;
    }


    selectedmatId:any;
    openMaterialModalpreview( material: any): void {
      this.content=material;
      const modal = document.getElementById('materialModalpreview');
      if (modal) {
        modal.style.display = 'block';
      }
      
      
     
    
    }

    openMaterialModal(id:number): void {
      this.MydataService.gradeByAssig(id).subscribe( (data: any[]) => {
        this.grades=data; 
        console.log(this.grades);
      },
      (error: any) => {
        console.error('Error fetching materials for lesson', ':', error);
      });

      this.MydataService.SubmissionsByAssignment(id).subscribe( (data: any[]) => {
        this.submissions=data; 
        console.log(this.submissions);
      },
      (error: any) => {
        console.error('Error fetching materials for lesson', ':', error);
      });


      const modal = document.getElementById('materialModal');
      if (modal) {
        modal.style.display = 'block';
      }
      
      
     
    
    }
    closeMaterialModal(): void {
      const modal = document.getElementById('materialModalpreview');
     
      this.content='';

      if (modal) {
        modal.style.display = 'none';
      }
   
    
     
    }
    closeMaterialModal1(): void {
      const modal = document.getElementById('materialModal');;
      if (modal) {
        modal.style.display = 'none';
      }

    }
    downloadDocument() {
      const link = document.createElement('a');
      link.href = 'https://drive.google.com/uc?export=download&id=1wfZ06NVWEPmRLDn3C4L0WZaWUqf2OYk2';
      link.download = 'document'; // You can set a default filename here
      link.click();
    }
submitgrade(studId:any,assId:any){

  const formData = new FormData();
          formData.append('student',studId );
          formData.append('assignment', assId);
          formData.append('grade',this.myform.value['note'] );
          formData.append('feedback',this.myform.value['remarque']  );



this.MydataService.addGrade(formData).subscribe(response => {
  this.toggleForm(studId, assId);
this.getF(assId);
this.getGradeBySt(assId);

this.openMaterialModal(assId);
this.myform.reset();
},
error => {
  console.error('Error updating grade', error);
}
);


}

updateGrade(studId:any,assId:any){

  const formData = new FormData();
          formData.append('student',studId );
          formData.append('assignment', assId);
          formData.append('grade',this.myform.value['note'] );
          formData.append('feedback',this.myform.value['remarque']  );



this.MydataService.updateGrade(formData).subscribe(response => {
  this.toggleForm(studId, assId);
this.getF(assId);
this.getGradeBySt(assId);

this.openMaterialModal(assId);
this.myform.reset();
},
error => {
  console.error('Error updating grade', error);
}
);


}


}
