import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../../../user.service';
import { User } from '../../../../../../../shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private userService: UserService) {}

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Appelez la méthode de connexion du service userService en passant l'email et le mot de passe
    this.userService.login(email, password).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }
  // if (this.loginForm.valid) {
  //   console.log(this.loginForm.value);
  // } else {

  //   console.log('Formulaire invalide');
  // }
  // UserService : créer la méthode Login
  // Requete en get : en passant email et mdp
  // en retour j'ai mon user avec son id.
  // J'extrait juste l'id
  // Je le stock dans le local storage
  // Le tout doit me faire un observable vrai ou faux si on s'est connexté

  //et récupérer l'id du user

  // Injecter le userservice.login avec les données récupérées de mon formulaire
  // utiliser le service onSubmit
  // stocer l'id du user dans le local stprage
  //
}
