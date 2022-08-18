import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginInterface } from 'src/app/services/auth/loginInterface';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSubmitted = false;
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
    private authService: AuthService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  async dismissLoginModal() {
    await this.modalCtrl.dismiss();
  }

  async submitLoginForm() {
    if (!this.loginForm.valid) {
      return;
    }

    const user: LoginInterface = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.loginUser(user).subscribe((res) => {
      this.loadingService.dismissLoading();
      console.log(res);
      this.loginForm.reset();
      this.dismissLoginModal();
      this.toastService.presentToast('Login Successful!', false);
      this.navCtrl.navigateRoot('/tabs');
    });
  }
}
