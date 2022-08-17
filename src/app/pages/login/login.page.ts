import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginInterface } from 'src/app/services/auth/loginInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSubmitted = false;
  isLoading = false;
  loginForm: FormGroup = this.loginFormBuilder.group({
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
  });

  constructor(
    public modalCtrl: ModalController,
    public loginFormBuilder: FormBuilder,
    private loginService: AuthService,
    public toastCtrl: ToastController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async showLoginToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login successful! Welcome back.',
      duration: 3000,
      animated: true,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async submitLoginForm() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    const user: LoginInterface = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    try {
      const response = await this.loginService.login(user);
      response.subscribe((res) => {
         console.log(res.data);
        if (res.status === 'success') {
          setTimeout(() => {
            this.isLoading = false;
          }, 3000);

          this.loginForm.reset();
          this.dismiss();
          this.showLoginToast();
          this.navCtrl.navigateRoot('/home');
        } else {
          console.log(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
