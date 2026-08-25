import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Button, ButtonDirective } from '@openng/optimus-ui/button';
import { InputText } from '@openng/optimus-ui/inputtext';
import { AppStateApi } from '@shared/appSate/app-state-api';
import { AppStateStore } from '@shared/appSate/app-state-store';

@Component({
  selector: 'app-login',
  imports: [ButtonDirective, RouterLink, InputText, Button, FormField, FormRoot],
  templateUrl: './login.html',
  styles: [
    `
      :host ::ng-deep .untouched-field.p-invalid {
        border-color: inherit;
      }
    `,
  ],
})
export default class Login {
  protected store = inject(AppStateStore);
  protected appStateApi = inject(AppStateApi);
  private router = inject(Router);

  loginModel = signal({
    username: '',
    password: '',
  });

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.username, { message: "L'utilisateur est obligatoire." });
      required(schemaPath.password, { message: 'Le mot de passe est obligatoire.' });
    },
    {
      submission: {
        action: async (form) => {
          const user = this.appStateApi.getUser();

          if (user.username !== form().value().username) {
            return [
              {
                kind: 'loginNotFound',
                message: 'Erreur de login',
                fieldTree: form.username,
              },
            ];
          }

          this.store.login(user);
          this.router.navigate(['/']);
          return undefined;
        },
      },
    },
  );
}
