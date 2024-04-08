import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent  implements OnInit {


  userCounts: any = {};
  top_courses:any=[];
  courseTitles: string[] =[];
enrollmentCounts: number[] =[];
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchUserCounts();
    this.topCourses()
  }

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
        text: 'Egg Yolk Composition'
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
        text: 'top 5 courses',
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
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
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

}








