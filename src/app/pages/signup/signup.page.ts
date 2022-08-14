import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isSubmitted = false;
  userSignUpModel = {
    name: '',
    email: '',
    password: '',
  };

  signupForm: FormGroup = this.signupFormBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,

      ],
    ],
  });

  constructor(
    public modalCtrl: ModalController,
    public signupFormBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
  submitSignupForm() {
    console.log(this.signupForm.valid);
    console.log(this.signupForm.get('password'));
    console.log(this.signupForm.value);
  }
}
