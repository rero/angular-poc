# Angular POC

Projet pour tester Angular POC

Vous devez avoir au préalable installer pnpm sur votre système.

## Installation de bibliothèques
```bash
pnpm install
```

## Bibliothèques dans ce projet

- [Angular 22](https://angular.dev)
- [NgRx Signal Store](https://ngrx.io/guide/signals)
- [Tailwind CSS](https://tailwindcss.com)
- [Optimus UI](https://optimus.openng.org/)
- [Vitest](https://vitest.dev)

## Serveur

Pour démarrer le projet

```bash
pnpm start
```

Pour démarrer le projet avec des données mockées :

```bash
pnpm start_mock
```

Une fois le serveur lancé, ouvrez votre navigateur et rendez-vous à l'adresse `http://localhost:4200/`. L'application se rechargera automatiquement chaque fois que vous modifierez l'un des fichiers source.

## Tests

Lancer la suite de tests :

```bash
pnpm test
```

Lancer les tests en mode watch :

```bash
pnpm test:watch
```

Lancer les tests avec la couverture de code :

```bash
pnpm test:coverage
```
