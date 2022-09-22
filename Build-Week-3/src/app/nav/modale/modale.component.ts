import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {

  isVisible = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  toggle() {
    this.isVisible = !this.isVisible;

    //accrocchio? serve a ricaricare per mostrare il post aggiunto dopo l'invio della modale
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/myProfile', {skipLocationChange: true}).then(()=>{
    this.router.navigate([currentUrl])
  });

  }

}
