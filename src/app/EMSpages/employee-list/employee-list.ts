import { Component, inject, OnInit, signal } from '@angular/core';
import { employeeModel } from '../Models/employeeModel';
import { designationModel } from '../Models/designationModel';
import { Observable } from 'rxjs';
import { Master } from '../Services/master';
import { EmployeeService } from '../Services/employee-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit{
  newEmployeeObj: employeeModel = new employeeModel();
  $designationList:Observable<designationModel[]> = new Observable<designationModel[]>();
  employeeslist = signal<employeeModel[]>([]);
//  activeRoute = inject(ActivatedRoute);

  constructor(private empService:EmployeeService, private masterService:Master)
  {
    
    this.$designationList = this.masterService.getAllDesignation();
    // this.activeRoute.params.subscribe((res:any)=>
    // {//debugger
    //   if(res.id !="0")
    //   {
    //        this.newEmployeeObj.empId = Number(res.id);
    //       // this.getEmpById();
    //   }
   
    // })
  }
    ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees()
  {
     this.empService.getAllEmployeeDetails().subscribe({
      next: (res: any) => {
        //debugger
        this.employeeslist.set(JSON.parse(JSON.stringify(res.data)));
      },
      error: (err) => {
        //debugger
        console.error('Error loading departments:', err);
      }
    });
  }


   
  
    // Delete designation
    onDelete(id:number) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          //debugger
          this.empService.deleteEmpData(id).subscribe({
            next: (res: any) => {
              Swal.fire(
                'Deleted!',
                res.message || 'Employee deleted successfully.',
                'success'
              );
              this.getAllEmployees();
            },
            error: (error) => {
              Swal.fire(
                'Error!',
                'Something went wrong while deleting.',
                'error'
              );
              console.error(error);
            }
          });
        }
      });
    }
  
      onReset()
  {
    this.newEmployeeObj = new employeeModel();
  }
  
}
