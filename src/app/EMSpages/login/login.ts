import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Master } from '../Services/master';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj :any = {
    email:'',
    mobileNo:''
  }

  http = inject(HttpClient);
  router = inject(Router);
  masterService = inject(Master);

  // onLogin()
  // { //debugger
  //   this.http.post("https://localhost:7211/api/EmployeeMaster/login",this.loginObj).subscribe(
  //     {
  //       next:(result:any)=>
  //       {
  //         //debugger
  //         alert(result.message);
  //         this.router.navigateByUrl("dashboard");
  //       },
  //       error:(error:any)=>
  //       {
  //         //debugger
  //         alert(error.message);
  //       }

  //     }
  //   )
  // }

  onLogin() {

  Swal.fire({
    title: 'Logging in...',
    text: 'Please wait',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.masterService.onLogin(this.loginObj).subscribe({
    next: (result: any) => {
      //debugger
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: result.message || 'Welcome back!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        //debugger
        localStorage.setItem('EmpUser',JSON.stringify(result));
        if(result.role === 'Employee')
        {
           this.router.navigateByUrl("employee/"+result.userId);
        }
        else{
        this.router.navigateByUrl('dashboard');
        }
      });

    },

    error: (error: any) => {

      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error?.error?.message || 'Invalid username or password'
      });

      console.error(error);
    }

  });

}

}
