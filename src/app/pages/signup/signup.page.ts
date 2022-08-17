import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthResponse } from 'src/app/services/auth/auth-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isSubmitted = false;
  isLoading = false;

  signupForm: FormGroup = this.signupFormBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],

    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    public modalCtrl: ModalController,
    public signupFormBuilder: FormBuilder,
    private signupService: AuthService,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sign up successful! Please login.',
      duration: 3000,
      animated: true,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }

  async submitSignupForm() {
    console.log(
      this.signupForm.get('password').value !==
        this.signupForm.get('confirmPassword').value &&
        this.signupForm.get('confirmPassword').dirty
    );
    if (!this.signupForm.valid) {
      return;
    }
    this.isLoading = true;
    const user: User = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    try {
      const response = await this.signupService.signup(user);
      response.subscribe((res) => {
        console.log(res);
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 3000);

      this.signupForm.reset();
      this.dismiss();
      this.showToast();
    } catch (error) {
      console.log('Error Ocurred: ', error);
    }
  }
}
