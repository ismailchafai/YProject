import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../serviceAuth/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedButton: string = 'user';



  signUpMode: boolean = false;
  signUpMode2: boolean = false;

  emailInput: boolean = false;
  userInput: boolean = false;
  passInput: boolean = false;
  cinInput: boolean = false;
  iceAgLocInput: boolean = false;
  confirmPassInput: boolean=false;

  userRadio: boolean = true;
  propRadio!: boolean;
  agenceRadio!: boolean;

  passwordVisible: boolean = false;
  passwordVisible1: boolean = false;



  isCreate: boolean = false;
  isConnected: boolean = true;


  signInForm!: FormGroup;
  signUpForm!: FormGroup;


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


  getSelecteUser(): void {
    this.userRadio = true;
    this.propRadio = false;
    this.agenceRadio = false;

    this.showDialog();
  }

  getSelecteProp(): void {
    this.userRadio = false;
    this.propRadio = true;
    this.agenceRadio = false;

    this.showDialog();
  }

  getSelecteAgence(): void {
    this.userRadio = false;
    this.propRadio = false;
    this.agenceRadio = true;

    this.showDialog();
  }


  constructor(private formBuilder: FormBuilder, protected authService: AuthService,private router:Router,private messageService: MessageService) {
  }



  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      cin: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      iceAgLoc: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-z]+\.[a-zA-Z][a-z]+$/),
        Validators.minLength(8)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/)
      ]],
      confirpassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/)
      ]]
    });
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\s]{8,}$/)]],
      password: ['', [Validators.required, this.passwordValidator]],
    });

  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumber = /[0-9]+/.test(value);
    const hasSymbol = /[^\w\s]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol && value.length >= 8;

    if (!isValid) {
      return {invalidPassword: true};
    }

    return null;
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;

  }

  inputChangeIceAgLoc() {
    const iceAgLoc = this.signUpForm.get("iceAgLoc");
    this.iceAgLocInput=false;
    if(iceAgLoc?.value===""){
      this.iceAgLocInput = false;
      this.submit = false;
    }
   else if (!iceAgLoc?.valid) {
      this.iceAgLocInput = true;
      this.submit = false;
    }
    else if(isNaN(Number(iceAgLoc?.value))){
      this.iceAgLocInput = true;
      this.submit = false;
    }
    else {
      const usernameControl = this.signUpForm.get("username");
      const passwordControl = this.signUpForm.get("password");
      const passwordConfirmControl = this.signUpForm.get("confirpassword");

      if ((this.agenceRadio) && (usernameControl?.valid && passwordControl?.valid && iceAgLoc?.valid) && (passwordControl?.value==passwordConfirmControl?.value)) {
        console.log("Tous les champs sont valides");
        this.submit = true;
      }
      else {
        this.submit = false;
      }
    }
  }
  inputChangeCin() {
    const cinControl = this.signUpForm.get("cin");
    this.cinInput=false;
    if(cinControl?.value===''){
      this.cinInput=false;
      this.submit = false;
    }
  else  if (!cinControl?.valid) {
      if(this.userRadio || this.propRadio){
        this.cinInput = true;
        this.submit = false;
      }
    }
    else {
      const usernameControl = this.signUpForm.get("username");
      const passwordControl = this.signUpForm.get("password");
      const passwordConfirmControl = this.signUpForm.get("confirpassword");

      if ((this.userRadio||this.propRadio) && (usernameControl?.valid && passwordControl?.valid && cinControl?.valid) && (passwordControl?.value==passwordConfirmControl?.value)) {
        console.log("Tous les champs sont valides");
        this.submit = true;
      }else {
        this.submit = false;
      }
    }
  }

  inputChangeUsername() {
    const usernameControl = this.signUpForm.get("username");
    this.userInput = false;
    if(usernameControl?.value==""){
      this.userInput = false;
      this.submit = false;
    }
   else if (!usernameControl?.valid) {
      this.userInput = true;
      this.submit = false;
    }
    else {
      const passwordControl = this.signUpForm.get("password");
      const cinControl = this.signUpForm.get("cin");
      const iceAgLocControl = this.signUpForm.get("iceAgLoc");
      const passwordConfirmControl = this.signUpForm.get("confirpassword");

      if ((this.userRadio||this.propRadio) && (usernameControl?.valid && passwordControl?.valid && cinControl?.valid) && (passwordControl?.value==passwordConfirmControl?.value)) {
        console.log("Tous les champs sont valides");
        this.submit = true;
      }
      else  this.submit = !!((this.agenceRadio) && (usernameControl?.valid && passwordControl?.valid && iceAgLocControl?.valid) && (passwordControl?.value == passwordConfirmControl?.value));
    }
  }

  submit: boolean = true;

  inputChangePasword() {
    const passwordControl = this.signUpForm.get("password");
    this.passInput=false;
    if(passwordControl?.value==""){
      this.passInput = false
      this.submit=false;
    }
   else if (!passwordControl?.valid) {
      this.passInput = true
      this.submit=false;
      console.log("1")
    }
    else {
      const usernameControl = this.signUpForm.get("username");
      const passwordControl = this.signUpForm.get("password");
      const cinControl = this.signUpForm.get("cin");
      const passwordConfirmControl = this.signUpForm.get("confirpassword");
      const iceAgLocControl = this.signUpForm.get("iceAgLoc");

      if (this.userRadio && usernameControl?.valid && passwordControl?.valid && cinControl?.valid && passwordControl?.value==passwordConfirmControl?.value) {
        console.log("Tous les champs sont valides");
        this.submit = true;
      }
      else  this.submit = !!((this.agenceRadio) && (usernameControl?.valid && passwordControl?.valid && iceAgLocControl?.valid) && (passwordControl?.value == passwordConfirmControl?.value));
    }
  }

  inputChangePaswordConfirm() {
    const confirmPasswordControl = this.signUpForm.get("confirpassword");
    const confirmPasswordValue = confirmPasswordControl?.value;
    this.confirmPassInput = false;
    if(confirmPasswordValue==""){
      this.confirmPassInput = false;
      this.submit = false;
    }
  else  if (confirmPasswordValue !== this.signUpForm.value.password ) {
      console.log("Les mots de passe ne correspondent pas");
      this.confirmPassInput = true;
      this.submit = false;
    }    else {
      const usernameControl = this.signUpForm.get("username");
      const passwordControl = this.signUpForm.get("password");
      const cinControl = this.signUpForm.get("cin");
      const iceAgLocControl = this.signUpForm.get("iceAgLoc");


      if ((this.userRadio||this.propRadio)&& usernameControl?.valid && passwordControl?.valid && cinControl?.valid ) {
        console.log("Tous les champs sont valides");
        this.submit = true;
      }
      else  this.submit = !!((this.agenceRadio) && (usernameControl?.valid && passwordControl?.valid && iceAgLocControl?.valid));
    }
  }

  handleCreat() {
    console.log("handleCreat")
    if (!this.userRadio && !this.propRadio && !this.agenceRadio) {
      return;
    }
    else if (this.userRadio) {
      this.authService.viderClient();
      this.authService.client.username_Client = this.signUpForm.value.username;
      this.authService.client.password_Client = this.signUpForm.value.password;
      this.authService.client.cin = this.signUpForm.value.cin;
      this.authService.creeCompte1(this.authService.client).subscribe(
        {
          next: data => {
            if(data===1){
              this.isCreate=true;
              this.showCreate();
              setTimeout(() => {
                this.signUpMode = false;
              }, 500);

            }
             if(data==-2){
              this.isCreate=false;
              this.showCreate();
              this.submit = false
            }
          },
          error: err => {
            this.isCreate=false;
            this.showCreate();
            this.submit = false
          }
        }
      );
    } else if (this.propRadio) {
      this.authService.viderProp();
      this.authService.propAppartement.username = this.signUpForm.value.username;
      this.authService.propAppartement.password = this.signUpForm.value.password;
      this.authService.propAppartement.iceAgApp = this.signUpForm.value.cin;

      console.log(this.authService.propAppartement)
      this.authService.creeCompte2(this.authService.propAppartement).subscribe(
        {
          next: data => {

            if(data===1){
              this.isCreate=true;
              this.showCreate();
              setTimeout(() => {
                this.signUpMode = false;
              }, 500);

            }
            if(data==-2){
              this.isCreate=false;
              this.showCreate();
              this.submit = false
            }

          },
          error: err => {
            this.isCreate=false;
            this.showCreate();
            this.submit = false
          }
        }
      );
    } else if (this.agenceRadio) {
      this.authService.viderAgence();
      this.authService.agenceLocation.usernameAgenceLoc = this.signUpForm.value.username;
      this.authService.agenceLocation.password = this.signUpForm.value.password;
      this.authService.agenceLocation.iceAgLoc = this.signUpForm.value.iceAgLoc;
      console.log("Number validite")
      console.log(this.authService.agenceLocation.iceAgLoc)

      this.authService.creeCompte3(this.authService.agenceLocation).subscribe(
        {
          next: data => {
            if(data===1){
              this.isCreate=true;
              this.showCreate();
              setTimeout(() => {
                this.signUpMode = false;
              }, 500);

            }
             if(data==-2){
              this.isCreate=false;
              this.showCreate();
              this.submit = false
            }
          },
          error: err => {
            this.isCreate=false;
            this.showCreate();
            this.submit = false
          }
        }
      );
    }

    this.resetErrors();

  }

  resetErrors() {
    this.emailInput = false;
    this.userInput = false;
    this.passInput = false;
    this.cinInput = false;
    this.confirmPassInput = false;
    this.iceAgLocInput=false
  }



  Signup() {
    this.submit=false;
    this.resetErrors();
    this.signUpMode = true;
    this.resetFormSignUp();
  }

  SignIn() {
    this.signUpMode = false;
    this.resetFormSignIp();
  }

  resetFormSignUp() {
    this.signUpForm.reset();
  }
  resetFormSignIp() {
    this.signUpForm.reset();
  }


  handleLogin(){
    const username=this.signInForm.value.username
    const password=this.signInForm.value.password
    this.authService.login(username,password).subscribe(
      {
        next :data => {
          console.log("1")
          this.isConnected=true;

          this.authService.loadProfile(data)
          setTimeout(()=>{
            // this.router.navigateByUrl("/navbar");
            this.router.navigateByUrl("/home");
          },500);


        },
        error :err => {
          this.isConnected=false;
        }
      }
    )
  }

  togglePasswordVisibility1() {
    this.passwordVisible1 = !this.passwordVisible1;
  }


  showCreate() {
    if(this.isCreate){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account successfully created' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Account creation failed ,The account already exists' });
    }
  }

  private showConnected() {
    if(this.isConnected){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Connected' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'error' });
    }
  }
}


