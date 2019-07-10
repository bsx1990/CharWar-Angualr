import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-options',
  templateUrl: './main-options.component.html',
  styleUrls: ['./main-options.component.scss']
})
export class MainOptionsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public play() {
    this.router.navigate(['/game-board'], { skipLocationChange: true });
  }
}
