import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@app/screen/auth/service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  public user: any;

  constructor(
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private translate: TranslateService
  ) {
    this.registerSvgIcons();
    translate.setDefaultLang('en'); // Set default app lang at start
    translate.use('en');
  }

  public ngOnInit() {
    // init this.user on startup
    this.authService.me().subscribe((data) => {
      this.user = data.user;
      // set user lang to default app lang
      // this.translate.setDefaultLang(this.user.lang); // TODO update app lang from user lang
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  ngOnDestroy() {
    // Unsubscribe from User observable
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /**
   * 1 - Add your svg in assets
   * 2 - Add svg name in the registerSvgIcons() name's array
   * 3 - Now you can render your with mat-icon: <mat-icon svgIcon='registered-svg'><mat-icon>
   */
  registerSvgIcons() {
    [
      'info',
      'exec-filter-save',
      'metric-info',
      'delete-exec',
      'warning-data',
      'new-collab',
      'pdf-export',
      'fr-flag',
      'key-fact-time',
      'key-fact-execution',
      'key-fact-project',
      'en-flag',
      'ru-flag',
      'verification-mark',
      'usecase-locked',
      'metric-count',
      'factonics-logo-text',
      'factonics-spinner',
      'catalog-fake-card',
      'factonics-logo-round',
      'notification-sidenav-icon',
      'usecase-sidenav-icon',
      'project-sidenav-icon',
      'factonics-logo-round',
      'project-dashboard-filter',
      'new-project',
      'chart-data-not-found',
      'add',
      'add-blue',
      'airplane-front-view',
      'air-station',
      'balloon',
      'boat',
      'cancel-icon',
      'cargo-ship',
      'car',
      'catamaran',
      'clone',
      'convertible',
      'delete',
      'drone',
      'fighter-plane',
      'fire-truck',
      'horseback-riding',
      'motorcycle',
      'railcar',
      'railroad-train',
      'rocket-boot',
      'sailing-boat',
      'segway',
      'shuttle',
      'space-shuttle',
      'steam-engine',
      'suv',
      'tour-bus',
      'tow-truck',
      'transportation',
      'trolleybus',
      'water-transportation',
      'substract',
    ].forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon}.svg`
        )
      );
    });
  }
}
