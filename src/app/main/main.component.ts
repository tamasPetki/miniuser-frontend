import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  messageResp = '';
  private messageSubscription: Subscription;


  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.messageSubscription = this.auth.messageSubject.subscribe(value => {
        this.messageResp = value;
        console.log(this.messageResp);
      }
      , error => console.log(error));
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
