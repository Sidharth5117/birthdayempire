import { Component, OnInit } from '@angular/core';

import { BirthdayService } from './../../services/birthday.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AuthService } from './../../user/auth.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
name: string;
birthday: NgbDateStruct;
relation: string;

now = new Date();
year = this.now.getFullYear();
month = this.now.getMonth();
day = this.now.getDay();
id: string;
user: firebase.User;
  constructor(private as: BirthdayService, public as1: AuthService) { }

  ngOnInit(): void {
  
this.as1.getUserState().subscribe( user => {
this.user=user;
})
}

addBirthday()
{
let record= {};
record['name']=this.name;
record['day']=this.birthday.day;
record['month']=this.birthday.month;
record['year']=this.birthday.year;
record['relation']=this.relation;
record['id']=this.user.uid;
record['date']= this.birthday.day + "/" + this.birthday.month + "/" + this.birthday.year;
this.as.addBirthday(record);
}


}
