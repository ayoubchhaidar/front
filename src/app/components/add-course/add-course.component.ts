import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  selectedFile!: File;
  myform: FormGroup;
  New_Course: any = {
    title: "",
    description: "",
    enrollment_capacity: null,
    tutor: null,
    image: null
  };
  user: any;
  imageError: boolean = false;

  constructor(private MydataService: MydataService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.myform = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageError = !this.selectedFile;  // Check if the file is selected
  }

  addCourse() {
    if (this.myform.invalid || !this.selectedFile) {
      this.myform.markAllAsTouched();
      this.imageError = !this.selectedFile;  // Display error if no file is selected
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Êtes-vous sûre de vouloir ajouter ce cours ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.New_Course.tutor = {};
        this.New_Course.title = this.myform.value['title'];
        this.New_Course.description = this.myform.value['desc']; // Changed from desc to description
        this.New_Course.enrollment_capacity = this.myform.value['capacity'];
        this.New_Course.tutor = this.New_Course.tutor.user_id = this.user.user_id;
        this.New_Course.image = this.selectedFile;
        console.log(this.New_Course);
        this.MydataService.addCourses(this.New_Course.title,this.New_Course.description,this.New_Course.enrollment_capacity,this.New_Course.tutor,this.New_Course.image).subscribe();
        this.myform = new FormGroup({
          title: new FormControl(''),
          desc: new FormControl(''),
          capacity: new FormControl('')
        });
        // Create an empty File object
  this.selectedFile = new File([], 'empty-file');
  
      }
    });
  }
}
