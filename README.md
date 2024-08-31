# Session Planner Frontend

![Next.js](https://img.shields.io/badge/next.js-v13-000000?logo=nextdotjs&logoColor=white&labelColor=000000&color=white) 
![Node.js](https://img.shields.io/badge/node.js-v18-339933?logo=nodedotjs&logoColor=white&labelColor=339933&color=white)

## Description

Le frontend de **Session Planner** est une application web développée avec **Next.js**. Il sert d'interface utilisateur pour interagir avec l'API backend **Adonis JS** afin de faciliter l'inscription aux sessions de jeu pour l'Union Sportive Vernoise Badminton.

## Prérequis

![Node.js](https://img.shields.io/badge/node.js-v18-339933?logo=nodedotjs&logoColor=white&labelColor=339933&color=white)
![npm](https://img.shields.io/badge/npm-v10-CB3837?logo=npm&logoColor=white&labelColor=CB3837&color=white)

## Installation

1. **Clonez le dépôt** : 
   ```bash
   git clone https://github.com/MathieuBesson/session-planner-pwa
   ```
2. **Accédez au répertoire du projet** :
   ```bash
   cd session-planner-pwa
   ```
3. **Installez les dépendances** :
   ```bash
   npm install
   ```
4. **Configurez les variables d'environnement** :
   - Créez un fichier `.env.local` à partir de `.env.example` et configurez les variables d'environnement.

## Démarrage

Pour démarrer le serveur de développement, exécutez la commande suivante :

```bash
npm run dev
```

- L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000).

## API Backend

L'API backend de **Session Planner**, développée avec **Adonis JS**, est disponible ici : [session-planner-api](https://github.com/MathieuBesson/session-planner-api).

## TODO

- ✔️ Revoir le typage de tous les props de composants
- ✔️ Découper les composants volumineux 

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.
