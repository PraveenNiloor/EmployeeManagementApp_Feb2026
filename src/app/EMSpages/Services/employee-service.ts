import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { employeeModel } from '../Models/employeeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
    apiUrl : string = "https://localhost:7211/api/";

  http = inject(HttpClient)

  SaveEmpoyeeDetail(employee:employeeModel)
  {
    debugger
    return this.http.post(`${this.apiUrl}EmployeeMaster/save-employee`,employee);
  }

  getAllEmployeeDetails()
  {
    return this.http.get(`${this.apiUrl}EmployeeMaster/getAllEmployees`);
  }

  getEmpById(id:number)
  {
    return this.http.get(`${this.apiUrl}EmployeeMaster/getEmployeebyId/${id}`);
  }

  onUpdateEmployee(id: number, obj:employeeModel): Observable<any> {
    debugger
    return this.http.put(`${this.apiUrl}EmployeeMaster/update-employee/${id}`, obj, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  deleteEmpData(id:number)
  {
      return this.http.delete<any>(`${this.apiUrl}EmployeeMaster/delete-employee/${id}`);
  }
}
