import { UserType } from '../../../core/enums/common.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { AgencyDashboardComponent } from '../../agency/agency-dashboard/agency-dashboard.component';
import { EmployerDashboardComponent } from '../../employer/employer-dashboard/employer-dashboard.component';
import { WorkerDashboardComponent } from '../../worker/worker-dashboard/worker-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      AgencyDashboardComponent,
      EmployerDashboardComponent,
      WorkerDashboardComponent,
      NgxEchartsModule
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userType = UserType;
  currentUser:string = '';
  lineOption: EChartsOption = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1f2937' }
    },
    legend: {
      data: ['Revenue', 'Profit'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(87, 181, 231, 0.2)' },
              { offset: 1, color: 'rgba(87, 181, 231, 0.01)' }
            ]
          }
        },
        data: [12500, 15600, 14800, 17200, 18900, 21500, 22100, 24300, 25800, 27200, 28900, 32100],
        color: 'rgba(87, 181, 231, 1)'
      },
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(141, 211, 199, 0.2)' },
              { offset: 1, color: 'rgba(141, 211, 199, 0.01)' }
            ]
          }
        },
        data: [4200, 5300, 5100, 6100, 6800, 7900, 8200, 9100, 9800, 10400, 11200, 12800],
        color: 'rgba(141, 211, 199, 1)'
      }
    ]
  };

  barOption: EChartsOption = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1f2937' }
    },
    legend: {
      data: ['2023', '2024', '2025'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '2023',
        type: 'bar',
        barWidth: '20%',
        data: [32000, 39000, 36000, 42000],
        color: 'rgba(87, 181, 231, 1)',
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '2024',
        type: 'bar',
        barWidth: '20%',
        data: [42000, 49000, 47000, 53000],
        color: 'rgba(141, 211, 199, 1)',
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '2025',
        type: 'bar',
        barWidth: '20%',
        data: [54000, 61000, 58000, 68000],
        color: 'rgba(251, 191, 114, 1)',
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  pieOption: EChartsOption = {
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1f2937' }
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      data: ['Software', 'Hardware', 'Services', 'Consulting', 'Training']
    },
    series: [
      {
        name: 'Revenue Distribution',
        type: 'pie',
        radius: '70%',
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: '14', fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: 42, name: 'Software', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
          { value: 28, name: 'Hardware', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
          { value: 18, name: 'Services', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
          { value: 8, name: 'Consulting', itemStyle: { color: 'rgba(252, 141, 98, 1)' } },
          { value: 4, name: 'Training', itemStyle: { color: 'rgba(166, 216, 84, 1)' } }
        ]
      }
    ]
  };

  doughnutOption: EChartsOption = {
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1f2937' }
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      data: ['Digital', 'TV', 'Print', 'Events', 'Social Media']
    },
    series: [
      {
        name: 'Budget Allocation',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: '14', fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: 35, name: 'Digital', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
          { value: 20, name: 'TV', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
          { value: 15, name: 'Print', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
          { value: 15, name: 'Events', itemStyle: { color: 'rgba(252, 141, 98, 1)' } },
          { value: 15, name: 'Social Media', itemStyle: { color: 'rgba(166, 216, 84, 1)' } }
        ]
      }
    ]
  };

  polarAreaOption: EChartsOption = {
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1f2937' }
    },
    angleAxis: {
      type: 'category',
      data: ['Support', 'Usability', 'Features', 'Reliability', 'Value'],
      z: 10
    },
    radiusAxis: {
      axisLine: { show: false },
      axisTick: { show: false }
    },
    polar: {
      radius: '65%',
      center: ['50%', '50%']
    },
    series: [
      {
        name: 'Satisfaction Score',
        type: 'bar',
        coordinateSystem: 'polar',
        data: [88, 92, 86, 90, 85],
        itemStyle: {
          color: (params: any) => {
            const colors = [
              'rgba(87, 181, 231, 1)',
              'rgba(141, 211, 199, 1)',
              'rgba(251, 191, 114, 1)',
              'rgba(252, 141, 98, 1)',
              'rgba(166, 216, 84, 1)'
            ];
            return colors[params.dataIndex];
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };

    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Dashboard', active: true },
    ]);     
    this.singletonStoreService.selectedUserType.subscribe((user:string) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }


  ngOnDestroy() {
  }
}
