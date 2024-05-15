import { Component, OnInit,ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';
import {  ReminderComponent} from '../reminder/reminder.component';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent  implements OnInit {
  scriptElement:HTMLScriptElement;
  scriptElement1:HTMLScriptElement;

  course_counts:any = {};
  userCounts: any = {};
  top_courses:any=[];
  new_courses:any=[];
  new_users:any=[];
  reminders:any=[];


  courseTitles: string[] =[];
enrollmentCounts: number[] =[];
  constructor(private MydataService:MydataService,private http: HttpClient,public elementRef: ElementRef,public dialog: MatDialog) {
 this.scriptElement=document.createElement("script");
 this.scriptElement1=document.createElement("script");




  }


  private options = {};
  private readonly isAsync = true;

  
  ngOnInit(): void {
    this.fetchUserCounts();
    this.topCourses();
   

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '600px', // Adjust the width as needed
      data: JSON.stringify({ hh: this.pieChart }) // Convert to JSON format
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      width: '600px', // Adjust the width as needed
      data: JSON.stringify({ hh: this.pieChart }) // Convert to JSON format
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(ReminderComponent, {
      width: '600px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

deleteReminder(id:any){
this.MydataService.deleteremind(id).subscribe();
const index = this.reminders.findIndex((reminder: { id: any; }) => reminder.id === id);
this.reminders.splice(index, 1);



}

  reminder() {
    this.http.post('http://127.0.0.1:8000/palteforme/sendhh/',{}).subscribe(
      (data) => {
        this.ngOnInit();
        
        },
        (error) => {
          console.error('Error remind:', error);
        }
      
    );
  }


//   reminderss(){

// this.MydataService.reminders().subscribe(
//   (data) => {
//   this.reminders=data;
  
//   },
//   (error) => {
//     console.error('Error remind:', error);
//   }


// );

//   }
  topCourses(): void {

    this.http.get<any>('http://127.0.0.1:8000/palteforme/top_courses/').subscribe(
      (data) => {
        this.top_courses = data;
        console.log(this.top_courses);
        this.courseTitles  = this.top_courses.map((course: { title: any; }) => course.title);
        this.enrollmentCounts = this.top_courses.map((course: { enrollment_count: any; }) => course.enrollment_count);
        this.spiderweb(  this.courseTitles ,this.enrollmentCounts);
      },
      (error) => {
        console.error('Error fetching user counts:', error);
      }
    );

    this.http.get<any>('http://127.0.0.1:8000/palteforme/course_counts/').subscribe(
        (data) => {
          this.course_counts = data;
        },
        (error) => {
          console.error('Error fetching user counts:', error);
        }
      );

      this.http.get<any>('http://127.0.0.1:8000/palteforme/new_courses/').subscribe(
        (data) => {
          this.new_courses = data;
        },
        (error) => {
          console.error('Error fetching user counts:', error);
        }
      );

  }






  fetchUserCounts(): void {

    this.http.get<any>('http://127.0.0.1:8000/accounts/api/user-counts/').subscribe(
      (data) => {
        this.userCounts = data;
        console.log(this.userCounts);
        console.log( (this.userCounts.formatteurs_count /this.userCounts.total_users)*100);
        this.updatePieChart();
      },
      (error) => {
        console.error('Error fetching user counts:', error);
      }
    );
    this.http.get<any>('http://127.0.0.1:8000/accounts/api/recent_users/').subscribe(
        (data) => {
          this.new_users = data;
        },
        (error) => {
          console.error('Error fetching user counts:', error);
        }
      );
  }
  updatePieChart(): void {
    const totalUsers = this.userCounts.total_users || 1; // Avoid division by zero
    const adminsPercentage = ((this.userCounts.admins_count || 1) / totalUsers) * 100;
    const formatteursPercentage = ((this.userCounts.formatteurs_count || 1) / totalUsers) * 100;
    const apprenantsPercentage = ((this.userCounts.apprenants_count || 1) / totalUsers) * 100;

    // Update the pie chart data
  this.piechart(adminsPercentage,formatteursPercentage,apprenantsPercentage);


    // Redraw the chart to reflect the updated data
  }
 HighCharts=Highcharts;
  pieChart:any;
  spiderWeb:any;
piechart(admin:number,formatteur:number,apprenant:number){
 this.pieChart ={
    chart: {
        type: 'pie'
    },
    title: {
        text: 'actual users'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        'Source:'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Admin',
                    y: admin
                },
                {
                    name: 'Formatteur',
                    sliced: true,
                    selected: true,
                    y: formatteur
                },
                {
                    name: 'Apprenant',
                    y: apprenant
                },
                
            ]
        }
    ]
}
}
spiderweb(courses:any=[],count:any=[]){
this.spiderWeb= {

    chart: {
        polar: true,
        type: 'line'
    },

    accessibility: {
        description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
        text: '',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: courses,
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} enrollment(s)</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    series: [{
        name: 'Enrollement By Course',
        data: count,
        pointPlacement: 'on'
    }, ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                pane: {
                    size: '70%'
                }
            }
        }]
    }

}

}
Dashboards:any;




}