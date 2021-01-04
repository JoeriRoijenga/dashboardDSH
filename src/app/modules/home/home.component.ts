import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: ``,
  styleUrls: []
})
export class HomeComponent {

  constructor(private router: Router) {
    router.navigate(['/admin']);
  }
}
