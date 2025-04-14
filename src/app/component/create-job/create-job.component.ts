
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss'
})
export class CreateJobComponent implements OnInit {
  
  ngOnInit(): void {
  }
 
}
