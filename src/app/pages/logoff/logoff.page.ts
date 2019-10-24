import { Component, OnInit } from '@angular/core';
import { UserAuthenticationBase, LoggingService } from 'ngscaffolding-core';
import { Router } from '@angular/router';
import { resetStores } from '@datorama/akita';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss']
})
export class LogoffPage implements OnInit {
  constructor(private userAuthService: UserAuthenticationBase, private router: Router, private logger: LoggingService) {}

  ngOnInit() {
    this.userAuthService.logoff();

    // Clear Akita Stores
    resetStores({ exclude: ['appSettings'] });

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 5000);
  }
}
