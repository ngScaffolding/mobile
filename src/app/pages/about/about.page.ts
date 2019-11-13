import { Component, OnInit } from '@angular/core';
import { SoftwareVersion, VersionsService } from 'ngscaffolding-core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  appModules: SoftwareVersion[];
  modules: SoftwareVersion[];

  constructor(private versions: VersionsService) {}

  ngOnInit() {
    const versions = this.versions.getVersions();

    this.appModules = new Array<SoftwareVersion>();
    this.modules = new Array<SoftwareVersion>();

    versions.forEach(version => {
      if (version.isAppModule) {
        this.appModules.push(version);
      } else {
        this.modules.push(version);
      }
    });
  }
}
