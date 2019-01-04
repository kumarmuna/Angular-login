import { Component, OnInit } from '@angular/core';
import { Loginmodel } from './loginmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Employee } from '../login/model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private employees: Employee[];
  model = new Loginmodel('', 'Manas', '****');
  submitted = false;
  constructor(private router: Router, private employeeService: EmployeeService,private loginService: LoginService) { }

  ngOnInit() {
    this.submitted = false;
    this.getAllEmployees();
  }

  onSubmit() {
    console.log('Submited Successfully...');
    console.log(this.model.username);
    console.log(this.model.password);
    let flag = this.loginService.validateCredential(this.model.username, this.model.password);
    if (flag) {
      this.submitted = true;
    }
    
  }

  get userData() { return JSON.stringify(this.model); }

  getAllEmployees() {
    console.log("caling....");
    this.employeeService.findAll().then(
      employees => {
        console.log(employees);
        this.employees = employees;
      },
      err => {
        console.log(err);
      }
    );
  }

  createEmployee() {
    let name = (<HTMLInputElement>document.getElementById('name')).value;
    let id = (<HTMLInputElement>document.getElementById('id')).value;
    let addess = (<HTMLInputElement>document.getElementById('address')).value;
    console.log(name);
    console.log(id);
    console.log(addess);
    let employee = new Employee(Number(id), name, addess);
    this.employeeService.createEmployee(employee).then(
      employees => {
        this.employees = employees;
      },
      err => {
        console.log(err);
      }
    );
  }
  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployeeById(employee.id).then(
      employees => {
        this.employees = employees;
      },
      err => {
        console.log(err);
      }
    );
  }
}
