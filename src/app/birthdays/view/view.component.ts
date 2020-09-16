import { Component, OnInit } from '@angular/core';
import { BirthdayService } from './../../services/birthday.service';
import {AuthService } from './../../user/auth.service';





@Component({
  selector: 'birthdays',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
user: firebase.User;
birthdays: any;

  constructor(private as: BirthdayService, public as1: AuthService) { }

  ngOnInit(): void {
this.as1.getUserState().subscribe( user => {
this.user=user;
 this.as.getAllBirthdays(this.user.uid).subscribe(data => {

      this.birthdays = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          relation: e.payload.doc.data()['relation'],
          date: e.payload.doc.data()['date'],
      };
      })
    });



})






  }



}
