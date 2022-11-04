import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AppUserService} from "../../services/app-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private appUserService: AppUserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const username : string = this.loginFormGroup.get("username")?.value!;
    const password : string = this.loginFormGroup.get("password")?.value!;

    this.appUserService.login(username, password).subscribe(
      () => this.router.navigateByUrl("list")
    );
  }

}
