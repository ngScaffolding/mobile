import { Component } from '@angular/core';
import { CacheWarmService } from 'src/app/services/cacheWarm/cacheWarm.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  constructor(private cacheWarmService: CacheWarmService) {}

  ionViewWillEnter() {
    this.cacheWarmService.warmCache();
  }
}

