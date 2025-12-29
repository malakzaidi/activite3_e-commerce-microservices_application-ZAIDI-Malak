# Application Frontend E-commerce

Application Angular moderne connectée aux microservices e-commerce.

## Architecture

L'application frontend communique avec trois microservices :

### Microservices
- **Customer Service** (Port 8081) - Gestion des clients
- **Inventory Service** (Port 8082) - Gestion des produits
- **Billing Service** (Port 8083) - Gestion des factures

## Fonctionnalités

### 1. Gestion des Clients
- Afficher la liste des clients
- Ajouter un nouveau client
- Supprimer un client
- Endpoints: `GET /api/customers`, `POST /api/customers`, `DELETE /api/customers/{id}`

### 2. Gestion de l'Inventaire
- Afficher la liste des produits
- Ajouter un nouveau produit
- Supprimer un produit
- Endpoints: `GET /api/products`, `POST /api/products`, `DELETE /api/products/{id}`

### 3. Gestion de la Facturation
- Afficher la liste des factures
- Créer une nouvelle facture
- Supprimer une facture
- Endpoints: `GET /api/bills`, `POST /api/bills`, `DELETE /api/bills/{id}`

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm (v10 ou supérieur)

### Étapes

1. **Accéder au dossier du projet**
   ```bash
   cd angular-front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application**
   ```bash
   npm start
   ```

L'application sera accessible à `http://localhost:4200`

## Configuration

Les URLs des microservices sont configurées dans les fichiers de service :

- [src/app/services/customer.service.ts](src/app/services/customer.service.ts) - `http://localhost:8081/api/customers`
- [src/app/services/inventory.service.ts](src/app/services/inventory.service.ts) - `http://localhost:8082/api/products`
- [src/app/services/billing.service.ts](src/app/services/billing.service.ts) - `http://localhost:8083/api/bills`

## Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── customers.component.ts/html/css
│   │   ├── inventory.component.ts/html/css
│   │   ├── billing.component.ts/html/css
│   │   └── dashboard.component.ts/html/css
│   ├── services/
│   │   ├── customer.service.ts
│   │   ├── inventory.service.ts
│   │   └── billing.service.ts
│   ├── app.ts
│   ├── app.routes.ts
│   ├── app.config.ts
│   ├── app.html
│   └── app.css
├── index.html
├── main.ts
└── styles.css
```

## Technologies Utilisées

- **Angular 21** - Framework frontend
- **TypeScript** - Langage de programmation
- **RxJS** - Programmation réactive
- **Angular Router** - Routage
- **HttpClient** - Communication avec les APIs

## Routes

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Accueil et présentation |
| `/customers` | Customers | Gestion des clients |
| `/inventory` | Inventory | Gestion des produits |
| `/billing` | Billing | Gestion des factures |

## Styling

L'application utilise un design moderne avec :
- Navigation bar avec gradient
- Cards responsives
- Tables avec hover effects
- Formulaires intuitifs
- Messages d'erreur explicites
- Design adaptatif (mobile-friendly)

## Build pour Production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`

## Dépannage

### L'application ne se connecte pas aux microservices
1. Vérifiez que les microservices sont en cours d'exécution sur les ports 8081, 8082, 8083
2. Vérifiez les URLs dans les fichiers de service
3. Ouvrez la console du navigateur pour voir les erreurs CORS ou réseau

### Le serveur de développement ne démarre pas
```bash
# Supprimez node_modules et reinstallez
rm -rf node_modules package-lock.json
npm install
npm start
```

## Développement

Pour ajouter une nouvelle fonctionnalité :

1. Créez un nouveau service si nécessaire
2. Créez un nouveau composant
3. Ajoutez la route dans `app.routes.ts`
4. Ajoutez un lien de navigation dans `app.ts`

## Scripts Disponibles

- `npm start` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run watch` - Lance la compilation en mode watch
- `npm test` - Lance les tests

## Support

Pour plus d'informations sur Angular, consultez la [documentation officielle](https://angular.io)
