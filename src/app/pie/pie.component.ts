import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

    public data = []

    private svg;
    private margin = 10;
    private width = 250;
    private height = 250;

    private radius = Math.min(this.width, this.height) / 2 - this.margin;
    private colors;
    public loggedInUserName:any

    constructor(public dataService : DataService, private http: HttpClient) { }

    ngOnInit(): void {
      /*if (this.dataService.dataSource.length > 0){
        this.data = this.dataService.dataSource;
        this.createSvg();
        this.createColors();
        this.drawChart();
      } else { */
      this.loggedInUserName = this.dataService.loggedInUserName;
      this.dataService.getData(this.loggedInUserName).subscribe((data: any) => {
        this.data = data;
        this.createSvg();
        this.createColors();
        this.drawChart();
      });
    }


    private createSvg(): void {
      this.svg = d3.select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
    }

    private createColors(): void {
      this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.budget.toString()))
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    }



    private drawChart(): void {

      const pie = d3.pie<any>().value((d: any) => Number(d.budget));


      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(50)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');


      const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.title)
      .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ")")
      .style('text-anchor', 'middle')
      .style('font-size', 15);
    }

 }
