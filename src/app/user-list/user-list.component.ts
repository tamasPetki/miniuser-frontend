import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.retrieveUserList();
  }

  retrieveUserList() {
    this.http.get(environment.server + '/all-users').subscribe((values) => this.userList = values, error => console.log(error), () => console.log(this.userList));
  }

  deleteUser(index) {
    this.http.delete(environment.server + '/delete-user/' + index).subscribe(result => console.log(result), error => console.log(error), () => this.retrieveUserList());
  }
}
