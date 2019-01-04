import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validateCredential(name: string, pwd: string){
    if(name == 'Manas' && pwd == 'manas') {
      return true;
    }
    return false;
  }
}
