import { AfterViewInit, Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Chart} from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements AfterViewInit {





  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                'red',
                'green',
                'grey'

            ],
        }
    ],
    labels: []
};



  constructor(public dataService : DataService) { }

  ngAfterViewInit(): void {



    //this.http.get('http://localhost:3000/budget')
    this.dataService.getData().subscribe((data) => {

      //console.log(res);
      console.log("mydata: ", data);
      console.log("mydatasource: ", this.dataSource);
      /*for (var i = 0; i < res.myBudget.length; i++){
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }*/
      let title1 = [];
      let budget1 = [];
      data.myBudget.map((item)=>{
        // console.log("item", item);
        title1.push(item.title);
        budget1.push(item.budget);
      })
      this.dataSource.datasets[0].data = budget1;
      this.dataSource.labels = title1;
      this.createChart();
      this.DrawD3Chart();

    });
  }


DrawD3Chart(){

  var svg = d3.select('#D3JS')
  .append('svg')
  .append('g')

        svg.append('g')
  .attr('class', 'slices');
        svg.append('g')
  .attr('class', 'labels');
        svg.append('g')
  .attr('class', 'lines');

        var width = 960,
    height = 450,
  radius = Math.min(width, height) / 2;

        var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

        var arc = d3.svg.arc()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

        var outerArc = d3.svg.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

        svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var key = function(d){ return d.data.label; };

        var color = d3.scale.ordinal()
  .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

this.change(this.randomData(), svg, color, arc, outerArc, pie, key, radius);
}

createChart() {
  var ctx = document.getElementById('myChart');
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });

}

randomData(){
  var labels = this.dataSource.labels;
  return labels.map(function(label){
    return { label: label, value: Math.random() }
  });
  }

change(data,svg,color,arc,outerArc,pie,key,radius) {

    /* ------- PIE SLICES -------*/
    var slice = svg.select('.slices').selectAll('path.slice')
      .data(pie(data), key);

    slice.enter()
      .insert('path')
      .style('fill', function(d) { return color(d.data.label); })
      .attr('class', 'slice');

    slice
      .transition().duration(1000)
      .attrTween('d', function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      })

    slice.exit()
      .remove();

    /* ------- TEXT LABELS -------*/

    var text = svg.select('.labels').selectAll('text')
      .data(pie(data), key);

    text.enter()
      .append('text')
      .attr('dy', '.35em')
      .text(function(d) {
        return d.data.label;
      });

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text.transition().duration(1000)
      .attrTween('transform', function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return 'translate('+ pos +')';
        };
      })
      .styleTween('text-anchor', function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? 'start':'end';
        };
      });

    text.exit()
      .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(data), key);

    polyline.enter()
      .append('polyline');

    polyline.transition().duration(1000)
      .attrTween('points', function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit()
      .remove();
    };





}
