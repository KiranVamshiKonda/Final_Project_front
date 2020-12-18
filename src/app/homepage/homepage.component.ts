import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'
import * as D3 from 'd3';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public loggedInUserName:any;

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor : []
    }],

    labels: [

    ]
};

  constructor(private http: HttpClient, public dataService: DataService,private router:Router) { }

  ngOnInit(): void {

    this.dataService.getData(this.loggedInUserName).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.dataSource.datasets[0].data[i] = data[i].budget;
        this.dataSource.labels[i] = data[i].title;
        this.dataSource.datasets[0].backgroundColor[i] = data[i].color;
        this.createChart();
      }
    });

  }

  createChart() : void{
    var ctx : any = document.getElementById("myChart");
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data : this.dataSource
    });
}

AddBudget(){
  this.router.navigate(['/addbudget']);
}


}
