# API Twitter Retro

![University](https://img.shields.io/badge/University-Project-2F77DF?labelColor=679EEE&style=for-the-badge)

## Description

Cette API fait partie du projet **Twitter Retro**, un clone de l'ancienne version de Twitter. Elle gère l'authentification, les tweets, les profils utilisateurs et d'autres fonctionnalités majeures du projet. L'API est construite avec **Node.js** et **Express** et s'intègre avec MongoDB pour la gestion des données.

## Technologies utilisées

- **Node.js** : Environnement JavaScript pour le backend
- **Express.js** : Framework minimaliste pour la création d'API
- **MongoDB** : Base de données NoSQL utilisée pour stocker les utilisateurs, les tweets, etc.
- **JWT** : Utilisé pour l'authentification par jetons
- **Nginx** : Serveur proxy pour l'hébergement de l'API sur un VPS
- **PM2** : Gestionnaire de processus pour garantir la stabilité et la disponibilité de l'API

## CI/CD

- **GitHub Actions** : Pipeline CI/CD pour automatiser le déploiement après chaque push sur la branche principale
- **Synchronisation** : Mise à jour automatique du code source, installation des nouvelles dépendances, et redémarrage des processus avec PM2
