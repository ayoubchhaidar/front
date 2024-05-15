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

    this.MydataService.getTutorAssignments(this.signeduser.user_id).subscribe( (data: any[]) => {
      this.Assignment=data; 
      console.log(this.Assignment);
    },
    (error: any) => {
      console.error('Error fetching materials for lesson', ':', error);
    });
    this.MydataService.gradeByAssig(7).subscribe( (data: any[]) => {
      this.grades=data; 
      console.log(this.grades);
    },
    (error: any) => {
      console.error('Error fetching materials for lesson', ':', error);
    });

    this.MydataService.SubmissionsByAssignment(7).subscribe( (data: any[]) => {
      this.submissions=data; 
      console.log(this.submissions);
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






    selectedmatId:any;
    openMaterialModalpreview( material: any): void {
      this.content=material;
      const modal = document.getElementById('materialModalpreview');
      if (modal) {
        modal.style.display = 'block';
      }
      
      
     
    
    }


    closeMaterialModal(): void {
      const modal = document.getElementById('materialModalpreview');
      const modal1 = document.getElementById('materialModalpreview');
      this.content='';

      if (modal) {
        modal.style.display = 'none';
      }
      if (modal1) {
        modal1.style.display = 'none';
      }
    
     
    }
    
submitgrade(studId:any,assId:any){

  const formData = new FormData();
          formData.append('student',studId );
          formData.append('assignment', assId);
          formData.append('grade',this.myform.value['note'] );
          formData.append('feedback',this.myform.value['remarque']  );



this.MydataService.addGrade(formData).subscribe();


}
updateGrade(studId:any,assId:any){

  const formData = new FormData();
          formData.append('student',studId );
          formData.append('assignment', assId);
          formData.append('grade',this.myform.value['note'] );
          formData.append('feedback',this.myform.value['remarque']  );



this.MydataService.updateGrade(formData).subscribe();


}


}
