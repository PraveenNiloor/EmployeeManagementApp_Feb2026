import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import Swal from 'sweetalert2';
import { employeeModel } from '../Models/employeeModel';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isCollapsed = false;
  isMobileOpen = false;
  router = inject(Router);

  loggedEmpData : employeeModel = new employeeModel();

  constructor()
  {
    //debugger
    const localData = localStorage.getItem('EmpUser');
    if(localData != null)
    {
      this.loggedEmpData = JSON.parse(localData)
    }
  }

  ngOnInit() {
    const savedState = localStorage.getItem('sidebarCollapsed');
    this.isCollapsed = savedState === 'true';
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
  }

  openMobileSidebar() {
    this.isMobileOpen = true;
  }

  closeSidebar() {
    this.isMobileOpen = false;
  }


  onLogout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Logout'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  });
}

}