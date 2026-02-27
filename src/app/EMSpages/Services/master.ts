import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { departmentModel } from '../Models/departementModel';
import { designationModel } from '../Models/designationModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {

  apiUrl : string = "https://localhost:7211/api/";
 // deptlist: departmentModel[]=[];

  http = inject(HttpClient)

  onLogin(loginObj:any)
  {
   return this.http.post(this.apiUrl+"EmployeeMaster/login",loginObj) 
  }

  getAllDepartment()
  {
    return this.http.get(this.apiUrl+"DepartmentMaster/GetDepartments");
  }

  saveDepartment(obj:departmentModel)
  {
    //debugger
    return this.http.post(this.apiUrl+"DepartmentMaster/AddDepartment",obj);
  }
  
  updateDepartment(obj:departmentModel)
  {
    return this.http.post(this.apiUrl+"DepartmentMaster/UpdateDepartment",obj);
  }

  deleteDepartment(deptid:number)
  {
    return this.http.post(`${this.apiUrl}DepartmentMaster/DeleteDepartment?deptId=${deptid}`,
    {});
  }

  getAllDesignation() {
    return this.http.get<designationModel[]>(this.apiUrl + "DesignationMaster/GetDesignations");
  }

  // Save a new designation
  saveDesignation(designation: designationModel): Observable<any> {
    const payload = {
      designationName: designation.designationName,
      deptId: designation.deptId
    };
    return this.http.post(`${this.apiUrl}DesignationMaster/AddDesignation`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


updateDesignation(id: number, designation: designationModel): Observable<any> {
  //debugger
  const payload = {
    designationId: designation.designationId,
    designationName: designation.designationName,
    deptId: designation.deptId
  };
  //console.log(`${this.apiUrl}/UpdateDesignation/${id}`);
  return this.http.put(`${this.apiUrl}DesignationMaster/UpdateDesignation/${id}`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
}

//   // Update an existing designation
// updateDesignation(designationId: number, obj: designationModel) {
//   return this.http.put<any>(
//     `${this.apiUrl}DesignationMaster/UpdateDesignation/${designationId}`,
//     obj
//   );
// }


  // Delete a designation by id
  deleteDesignation(designationId: number) {
    //debugger
  return this.http.delete<any>(`${this.apiUrl}DesignationMaster/DeleteDesignation/${designationId}`);
  }
}
