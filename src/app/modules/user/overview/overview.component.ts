import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  title = 'user overview';
  users = [
    {
      name: 'Simon Koopmans',
      email: 'simon@email.com',
      adminrights: true
    },
    {
      name: 'Joeri Roijenga',
      email: 'joeri@email.com',
      adminrights: true
    },
    {
      name: 'Peter Kolhorn',
      email: 'peter@email.com',
      adminrights: false
    }
  ];

  addUser(newUserName, newUserEmail, newAdminrights){
    let newUser = {
      name: newUserName,
      email: newUserEmail,
      adminrights: newAdminrights
    };
    this.users.push(newUser);
  }
  constructor() {}


  ngOnInit(): void {
  }

}
