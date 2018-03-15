import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  isLoading = true;
  serverError: boolean;
  detailsDate: Date;
  jobs: Job[];
  days: number;
  dayCount = [0, 1, 2, 3 ,4 , 5, 6]
  weeks: number;
  weekCount = [];
  monthName: string;
  month = new Date(Date.now()).getMonth();
  year = new Date(Date.now()).getFullYear();
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.serverError = false;
    this.isLoading = true;
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.isLoading = false;
    },
        error => {this.serverError = true;});
    let currentMonth = this.month+1;
    let currentYear = this.year;
    this.days = this.daysInMonth(currentMonth, currentYear);
    this.weeks = Math.ceil(this.days/6);
    let firstDay = new Date(currentYear, currentMonth-1, 1);
    let currentWeekCount = [];
    //Strip time away from date to make comparison easier
    let fullDate = new Date(Date.now());
    if (this.month == fullDate.getMonth() && this.year == fullDate.getFullYear())
      this.detailsDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
    else
      this.detailsDate = new Date(this.year, this.month, 1);
    for (let i = 0; i < this.weeks; i++ ) {
      currentWeekCount.push(i);
    }
    this.weekCount = currentWeekCount;
    let monthAdjusted = new Date(currentYear, currentMonth-1, 1).getMonth();
    this.monthName = this.monthNames[monthAdjusted];
  }
  //month is 1 based
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  isDateSelected(week, day): boolean {
    if(this.detailsDate == undefined)
      return false;
    return (this.getDate(week, day).getTime() == this.detailsDate.getTime());
  }

  monthIncrease() {
    this.month++;
    this.ngOnInit();
  }
  monthDecrease() {
    this.month--;
    this.ngOnInit();
  }
  setDetails(week, day) {
    this.detailsDate = this.getDate(week, day);
  }
  getDate(week, dayOfWeek): Date {
    let currentMonth = this.month;
    let currentYear = (new Date(Date.now()).getFullYear());
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let realDay = ((week*7) + (dayOfWeek)) - firstDay + 1;
    return new Date(currentYear, currentMonth, realDay);
  }

  getYear(): number {
    return this.getDate(1, 1).getFullYear();
  }

  getDateDay(week, dayOfWeek): number {
    let date = this.getDate(week, dayOfWeek);
    return date.getDate();
  }

  dateInRange(week, dayOfWeek): boolean {
    let date = this.getDate(week, dayOfWeek);
    let date2 = this.getDate(2, 4);
    return (date.getMonth() != date2.getMonth()) ? true : false;
  }

  taskHere(date: Date) {
    this.isLoading = true;
    let returnVal = this.jobService.taskHere(this.jobs, date);
    this.isLoading = false;
    return returnVal;
  }

  eventHere(date: Date) {
    this.isLoading = true;
    let returnVal = this.jobService.eventHere(this.jobs, date);
    this.isLoading = false;
    return returnVal;
  }

}
