import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@screen/auth/service/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogService } from '@shared/service/dialog.service';



@Component({
  selector: 'app-app-main-layout',
  templateUrl: './app-main-layout.component.html',
  styleUrls: ['./app-main-layout.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '10vw',
      })),
      state('out', style({
        width: '1.7vw'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppMainLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogService: DialogService
  ) {}

  user: any; // To improve with User Type
  isExpanded = true; // Nav opened by default
  sideNavState = 'in';

  @ViewChild('sidenav') sidenav: ViewChild;

  ngOnInit(): void {
    // Get user from local storage
    this.user = JSON.parse(localStorage.getItem('user'));

    // // Get navState from user pref
    // if (localStorage.isNavToggled) {
    //   this.isExpanded = JSON.parse(localStorage.getItem('isNavToggled'));
    //   console.log(this.isExpanded);
    //   // TODO : save sidenav state in localStorage
    // }

  }

  /**
   * Logout from app
   */
  logout(): void {
    this.authService.signOut();
    this.navigate('/auth/login');
  }

  /**
   * Method to change current route
   * @link - route where you want to navigate
   */
  navigate(link: string): void {
    this.router.navigate([link]);
  }

 
  /**
   * Change side-nav-state to trigger right anim
   */
  toggleMenu(){
    this.isExpanded = !this.isExpanded;
    this.sideNavState = this.sideNavState === 'out' ? 'in' : 'out';
    localStorage.setItem('isNavToggled', JSON.stringify(this.isExpanded));
  }

}
