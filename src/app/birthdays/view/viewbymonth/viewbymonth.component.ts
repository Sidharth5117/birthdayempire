import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BirthdayService } from './../../../services/birthday.service';
import {AuthService } from './../../../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbymonth',
  templateUrl: './viewbymonth.component.html',
  styleUrls: ['./viewbymonth.component.css']
})
export class ViewbymonthComponent implements OnInit {
month:any;
user: firebase.User;
birthdays: any;

date = new Date();
monthno:any;


  constructor(private as: BirthdayService, public as1: AuthService) { }

  ngOnInit(): void {

this.as1.getUserState().subscribe( user => {
this.user=user;
this.monthno = this.date.getMonth();
this.month = moment.months(this.monthno);
                                          
this.getBirthdays();

})




  }



getBirthdays()
{
this.as.getBirthdaysByMonth(this.user.uid, parseInt(moment().month(this.month).format("M"))).subscribe(data => {
                                                                                                                                                                                                                         this.birthdays = data.map(e => {                                                                                                                                                                                     return {                                                                                                                                                                                                             id: e.payload.doc.id,                                                                                                                                                                                              name: e.payload.doc.data()['name'],                                                                                                                                                                                relation: e.payload.doc.data()['relation'],                                                                                                                                                                        date: this.as.formatDate(e.payload.doc.data()['day'],e.payload.doc.data()['month'],e.payload.doc.data()['year']),                                                                                                  birthdaytoday: this.as.birthdayToday(e.payload.doc.data()['month'],e.payload.doc.data()['day']),                                                                                                                   age: this.as.calculateAge(e.payload.doc.data()['year'],e.payload.doc.data()['month'],e.payload.doc.data()['day']),                                                                                             };                                                                                                                                                                                                                 })                                                                                                                                                                                                              
 });
}




}
