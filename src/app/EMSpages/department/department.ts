import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { departmentModel } from '../Models/departementModel';
import { Master } from '../Services/master';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  imports: [FormsModule,CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit{


  ngOnInit(): void {
  //debugger
    this.getAllDepartments()
  }

  dept : departmentModel = new departmentModel();
  deptList = signal<departmentModel[]>([]);

  masterService = inject(Master);



onSaveDepartment() {

  Swal.fire({
    title: 'Saving...',
    text: 'Please wait while department is being saved',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.masterService.saveDepartment(this.dept).subscribe({

    next: (res: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: res.message || 'Department saved successfully',
        timer: 1500,
        showConfirmButton: false
      });

      this.getAllDepartments();
      this.onReset();
    },

    error: (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Save Failed!',
        text: error?.error?.message || 'Something went wrong!'
      });

      console.error(error);
    }

  });

}

  getAllDepartments()
  {
    this.masterService.getAllDepartment().subscribe({
      next:(result:any)=>
    {//debugger
      this.deptList.set(result);
    }})
  }

  onEdit(item:departmentModel)
  {//debugger
    this.dept = JSON.parse(JSON.stringify(item));
   
  }

onUpdateDept() {

  this.masterService.updateDepartment(this.dept).subscribe({

    next: (res: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: res.message || 'Department updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      this.getAllDepartments();
      this.onReset();
    },

    error: (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: error?.error?.message || 'Something went wrong!',
      });

      console.error(error);
    }

  });

}
  onDelete(deptId: number) {

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
      this.masterService.deleteDepartment(deptId).subscribe({
        next: (res: any) => {

          Swal.fire(
            'Deleted!',
            res.message || 'Department deleted successfully.',
            'success'
          );

          // refresh your department list
          this.getAllDepartments();
        },
        error: (error) => {
//debugger
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
     this.dept = new departmentModel();
  }
}
