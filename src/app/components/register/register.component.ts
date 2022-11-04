import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {AppUserService} from "../../services/app-user.service";
import {Router} from '@angular/router';
import {Validators} from '@angular/forms'
import {CustomValidators} from "../../classes/validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup = new FormGroup({
    username: new FormControl('', CustomValidators.regexValidator(".+@.+\\..+")), //[Validators.email, Validators.required]),
    passwords: new FormGroup({
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      CustomValidators.characterRequiredValidator(true, true, true, true)]),
      passwordAgain: new FormControl('')
    }, CustomValidators.passwordMatchValidator("password", "passwordAgain"))
  })

  get username() {
    return this.registerFormGroup.get("username")!;
  }

  get password() {
    return this.registerFormGroup.get("passwords.password")!;
  }

  get passwordAgain() {
    return this.registerFormGroup.get("passwords.passwordAgain")!;
  }

  get passwords() {
    return this.registerFormGroup.get("passwords")!;
  }

  // static patternValidator(regex: RegExp): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if (!control.value) {
  //       // if the control value is empty return no error.
  //       return null;
  //     }
  //
  //     // test the value of the control against the regexp supplied.
  //     const valid = regex.test(control.value);
  //
  //     // if true, return no error, otherwise return the error object passed in the second parameter.
  //     const ret = valid ? null : {isValid: "Not valid"};
  //     return ret;
  //   };
  // }


  static matchValidator(control: AbstractControl): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const password: string = control.get("password")!.value!; // get password from our password form control
      const confirmPassword: string = control.get("passwordAgain")!.value!; // get password from our confirmPassword form control

      // if the confirmPassword value is null or empty, don't return an error.
      if (!confirmPassword?.length) {
        return null;
      }

      // compare the passwords and see if they match.
      if (password !== confirmPassword) {
        control.get("passwordAgain")!.setErrors({mismatch: true});
        return {mismatch: true};
      } else {
        // if passwords match, don't return an error.
        return null;
      }
    };
  }

  constructor(
    private appUserService: AppUserService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username: string = this.registerFormGroup.get("username")?.value!;
    const password: string = this.registerFormGroup.get("password")?.value!;

    this.appUserService.register(username, password).subscribe(
      () => this.router.navigateByUrl("list")
    );
  }

}
