// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial-intro',
  templateUrl: './tutorial-intro.page.html',
  styleUrls: ['./tutorial-intro.page.scss'],
})
export class TutorialIntroPage implements OnInit {

  private isTutorialComplete: boolean;

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.storage.get('tutorialComplete').then((res) => {
      if (res) {
        this.router.navigate(['auth']);
      }
    })
  }

  ngOnInit() {
  }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/auth');
  }

}
