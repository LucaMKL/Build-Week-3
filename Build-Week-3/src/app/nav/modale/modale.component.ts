import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {

  isVisible = false

  constructor() { }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  toggle(){
    this.isVisible = !this.isVisible;
  }
}
