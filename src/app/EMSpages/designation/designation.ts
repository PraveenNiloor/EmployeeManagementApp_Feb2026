import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { designationModel } from '../Models/designationModel';
import { CommonModule } from '@angular/common';
import { departmentModel } from '../Models/departementModel';
import { Master } from '../Services/master';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designation',
  imports: [FormsModule,CommonModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation {

   designationModel: designationModel = new designationModel();

  // List of designations (using signal)
  designationList = signal<designationModel[]>([]);

  // List of departments for dropdown
  deptList = signal<departmentModel[]>([]);

  // Inject services
  designationService = inject(Master);
 // masterService = inject(Master);

  ngOnInit(): void {
    this.getAllDesignations();
    this.getAllDepartments();
  }

  // Load all designations
  getAllDesignations() {
    this.designationService.getAllDesignation().subscribe({
      next: (res: any) => {
        this.designationList.set(res);
      },
      error: (err) => {
        console.error('Error loading designations:', err);
      }
    });
  }

  // Load all departments for dropdown
  getAllDepartments() {
    this.designationService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.deptList.set(res);
      },
      error: (err) => {
        console.error('Error loading departments:', err);
      }
    });
  }

  // Save new designation
  onSaveDesignation() {
    debugger
    Swal.fire({
      title: 'Saving...',
      text: 'Please wait while designation is being saved',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.designationService.saveDesignation(this.designationModel).subscribe({
      next: (res: any) => {
        debugger
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: res.message || 'Designation saved successfully',
          timer: 1500,
          showConfirmButton: false
        });
        this.getAllDesignations();
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

  // Update existing designation
  onUpdateDesignation() {
    Swal.fire({
      title: 'Updating...',
      text: 'Please wait while designation is being updated',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.designationService.updateDesignation(this.designationModel.designationId, this.designationModel).subscribe({
      next: (res: any) => {
        debugger
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: res.message || 'Designation updated successfully',
          timer: 1500,
          showConfirmButton: false
        });
        this.getAllDesignations();
        this.onReset();
      },
      error: (error) => {
        debugger
        Swal.fire({
          icon: 'error',
          title: 'Update Failed!',
          text: error?.error?.message || 'Something went wrong!'
        });
        console.error(error);
      }
    });
  }

  // Reset the form
  onReset() {
    this.designationModel = new designationModel();
  }

  // Edit designation (populate form)
  onEdit(item: any) {
    this.designationModel = JSON.parse(JSON.stringify(item));
  }

  // Delete designation
  onDelete(designationId: number) {
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
        debugger
        this.designationService.deleteDesignation(designationId).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              res.message || 'Designation deleted successfully.',
              'success'
            );
            this.getAllDesignations();
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

}
