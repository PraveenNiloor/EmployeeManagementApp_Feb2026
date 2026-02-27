import { Component, inject, OnInit, signal } from '@angular/core';
import { employeeModel } from '../Models/employeeModel';
import { FormsModule } from '@angular/forms';
import { designationModel } from '../Models/designationModel';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EmployeeService } from '../Services/employee-service';
import { Observable } from 'rxjs';
import { Master } from '../Services/master';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,CommonModule,AsyncPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {

  newEmployeeObj: employeeModel = new employeeModel();
  $designationList:Observable<designationModel[]> = new Observable<designationModel[]>();
  $employeeslist : Observable<employeeModel[]> = new Observable<employeeModel[]>();
 activeRoute = inject(ActivatedRoute);

 
  loggedEmpData : employeeModel = new employeeModel();
  
  constructor(private empService:EmployeeService, private masterService:Master)
  {
    const localData = localStorage.getItem('EmpUser');
    if(localData != null)
    {
      this.loggedEmpData = JSON.parse(localData)
    }
    this.$designationList = this.masterService.getAllDesignation();
    this.activeRoute.params.subscribe((res:any)=>
    {//debugger
      if(res.id !="0")
      {
           this.newEmployeeObj.empId = Number(res.id);
           this.getEmpById();
      }
   
    })
  }
  ngOnInit(): void {
    //this.getAllEmployees();
    
  }


onSaveEmp() {
  //debugger;

  // Ensure designationId is a number
  this.newEmployeeObj.designationId = Number(this.newEmployeeObj.designationId);

  // -----------------------
  // Client-side validation
  // -----------------------
  if (!this.newEmployeeObj.name || this.newEmployeeObj.name.trim() === '') {
    alert('Please enter employee name');
    return;
  }

  if (this.newEmployeeObj.designationId <= 0) {
    alert('Please select a valid designation');
    return;
  }

  Swal.fire({
    title: 'Saving...',
    text: 'Please wait while employee is being saved',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  this.empService.SaveEmpoyeeDetail(this.newEmployeeObj).subscribe({
    next: (res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: res.message || 'Employee saved successfully',
        timer: 1500,
        showConfirmButton: false
      });

    
     // this.getAllEmployees();
      this.onReset();
    },
    error: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed!',
        text: err?.error?.message || 'Something went wrong!'
      });
      console.error('Error saving employee:', err);
    }
  });
}

  onReset()
  {
    this.newEmployeeObj = new employeeModel();
  }

  getEmpById()
  {//debugger
    this.empService.getEmpById(this.newEmployeeObj.empId).subscribe({
      next:(res:any)=>
      {
        //debugger
        this.newEmployeeObj = res;
      },
       error: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: err?.error?.message || 'Something went wrong!'
      });
      console.error('Error while getting employee:', err);
    }
    })
  }

    // Update existing Employee
      onUpdateEmp() {
        Swal.fire({
          title: 'Updating...',
          text: 'Please wait while designation is being updated',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });
    
        this.empService.onUpdateEmployee(this.newEmployeeObj.empId, this.newEmployeeObj).subscribe({
          next: (res: any) => {
            //debugger
            Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: res.message || 'Employee Details updated successfully',
              timer: 1500,
              showConfirmButton: false
            });
            this.onReset();
          },
          error: (error:any) => {
            //debugger
            Swal.fire({
              icon: 'error',
              title: 'Update Failed!',
              text: error?.error?.message || 'Something went wrong!'
            });
            console.error(error);
          }
        });
      }
    
}
