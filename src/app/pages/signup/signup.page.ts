import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isSubmitted = false;

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
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async dismissSignupModal() {
    await this.modalCtrl.dismiss();
  }

  submitSignupForm() {
    if (!this.signupForm.valid) {
      return;
    }
    const user: User = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.authService.registerUser(user).subscribe((res) => {
      this.loadingService.dismissLoading();
      console.log(res);
      this.signupForm.reset();
      this.dismissSignupModal();
      this.toastService.presentToast('Signup Successful!', false);
      this.navCtrl.navigateRoot('/welcome');
    });
  }
}
