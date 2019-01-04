import { Injectable } from '@angular/core';
import { Employee } from "../login/model/Employee";
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private apiUrl = '/api/employees';
//   constructor(private http: Http) { }

//   findAll(): Promise<Array<Employee>> {
//             return this.http.get(this.apiUrl)
//                 .toPromise()
//                 .then(response => response.json() as Employee[])
//                 .catch(this.handleError);
//         }

//         private handleError(error: any): Promise<Array<any>> {
//                     console.error('An error occurred', error);
//                     return Promise.reject(error.message || error);
//                 }
// }



@Injectable({
    providedIn: 'root'
  })
export class EmployeeService {
    private apiUrl = '/api/employee';
    constructor(private http: Http) {
    }
    findAll(): Promise<Array<Employee>> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as Employee[])
            .catch(this.handleError);
    }
    createEmployee(employee: Employee): Promise<Array<Employee>> {
        let empHeaders = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl, JSON.stringify(employee), { headers: empHeaders })
            .toPromise()
            .then(response => response.json() as Employee[])
            .catch(this.handleError);
    }
    deleteEmployeeById(id: number): Promise<Array<Employee>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(response => response.json() as Employee[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}