import { StatusType } from './../../../core/enums/common.enum';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BadgesComponent implements OnInit {
  @Input() statusName: string = '';
  statusType = StatusType;

  constructor() {}

  ngOnInit(): void {}
}
