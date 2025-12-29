# E-Commerce Microservices Application

## Description

Application e-commerce basée sur une **architecture microservices** permettant de gérer les factures contenant des produits et appartenant à des clients. Cette application démontre l'implémentation complète d'une architecture distribuée avec Spring Cloud.

Voila l'architecture de l'activité:

<img width="1169" height="777" alt="image" src="https://github.com/user-attachments/assets/3a6122b9-848c-454a-866c-257f443062e1" />

Enregistrement des microservices en Eureka Server:

<img width="1903" height="667" alt="image" src="https://github.com/user-attachments/assets/f8e8e47d-90b7-40f5-8e85-f5115a9e61f6" />


## Table des matières
- [Description](#description)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage de l'application](#démarrage-de-lapplication)
- [Endpoints API](#endpoints-api)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Captures d'écran](#captures-décran)
- [Références](#références)
- [Auteur](#auteur)


### Objectifs du projet
- Implémenter une architecture microservices complète
- Utiliser les patterns de découverte de services (Eureka)
- Configurer un API Gateway dynamique
- Gérer la configuration centralisée
- Implémenter la communication inter-services avec OpenFeign
- Développer une interface client moderne avec Angular

---

<img width="1899" height="738" alt="image" src="https://github.com/user-attachments/assets/2be35495-f70d-4d72-bb36-4a606d18a89d" />

<img width="1578" height="760" alt="Screenshot 2025-10-26 170241" src="https://github.com/user-attachments/assets/ac794b49-d78e-449c-92e3-5dfe39a07530" />

- Test des endpoints :
  Customer-service:
Récupérer tous les clients :

<img width="1269" height="1122" alt="image" src="https://github.com/user-attachments/assets/72813e77-17c2-4dc4-b2c4-59cf0c36f3a0" />


Test du config-service : 

<img width="1304" height="713" alt="image" src="https://github.com/user-attachments/assets/5f569822-f37c-4bc8-8e9a-785db18c6969" />

<img width="1169" height="750" alt="image" src="https://github.com/user-attachments/assets/e4f17cb5-83f3-448f-9dec-fa5a0deb2a1c" />

<img width="1070" height="553" alt="image" src="https://github.com/user-attachments/assets/7292d883-9402-4c95-bda7-459ea89044d9" />

## Architecture

L'application est composée de plusieurs microservices indépendants communiquant via HTTP/REST :

### Composants principaux

1. **Client Angular** - Interface utilisateur web
2. **Spring Cloud Gateway** (Port 8888) - Point d'entrée unique, routage dynamique
3. **Eureka Discovery Service** (Port 8761) - Annuaire des microservices
4. **Config Service** (Port 8888) - Configuration centralisée avec Git

### Microservices métier

- **Customer Service** (Port 8081) - Gestion des clients
- **Inventory Service** (Port 8082) - Gestion des produits
- **Billing Service** (Port 8083) - Gestion des factures (utilise OpenFeign)

### Schéma d'architecture

```
Client Angular
      |
      v
Spring Cloud Gateway (8888)
      |
      +--- Eureka Discovery (8761)
      |
      +--- Config Service (8888)
      |
      +--- Customer Service (8081)
      |
      +--- Inventory Service (8082)
      |
      +--- Billing Service (8083)
                |
                +--[OpenFeign]--> Customer Service
                |
                +--[OpenFeign]--> Inventory Service
```

---

## Technologies utilisées

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Cloud**
  - Spring Cloud Gateway
  - Eureka Discovery Client/Server
  - OpenFeign
  - Config Server
- **Spring Data JPA**
- **H2 Database** (base de données en mémoire)
- **Lombok**
- **Maven**

### Frontend
- **Angular 15+**
- **TypeScript**
- **Bootstrap / Angular Material**
- **RxJS**

### Outils
- **Git** - Gestion de version
- **Postman** - Tests API
- **IntelliJ IDEA / VS Code** - IDEs

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **JDK 17** ou supérieur
- **Maven 3.8+**
- **Node.js 16+** et **npm**
- **Angular CLI** : `npm install -g @angular/cli`
- **Git**
- Un IDE (IntelliJ IDEA, Eclipse, VS Code)

---

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/malakzaidi/activite3_e-commerce-microservices_application-ZAIDI-Malak.git
cd activite3_e-commerce-microservices_application-ZAIDI-Malak
```

### 2. Compiler les microservices

```bash
# Pour chaque microservice
cd eureka-discovery
mvn clean install
cd ..

cd config-service
mvn clean install
cd ..

cd gateway-service
mvn clean install
cd ..

cd customer-service
mvn clean install
cd ..

cd inventory-service
mvn clean install
cd ..

cd billing-service
mvn clean install
cd ..
```

### 3. Installer le client Angular

```bash
cd angular-client
npm install
```

---

## Configuration

### Configuration centralisée (Config Service)

Le Config Service utilise un repository Git pour stocker les configurations. Créez un repository Git avec les fichiers de configuration suivants :

**application.properties** (configuration globale)
```properties
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
```

**customer-service.properties**
```properties
server.port=8081
spring.datasource.url=jdbc:h2:mem:customer-db
spring.h2.console.enabled=true
```

**inventory-service.properties**
```properties
server.port=8082
spring.datasource.url=jdbc:h2:mem:inventory-db
spring.h2.console.enabled=true
```

**billing-service.properties**
```properties
server.port=8083
spring.datasource.url=jdbc:h2:mem:billing-db
spring.h2.console.enabled=true
```

### Configuration du Config Service

Dans `config-service/src/main/resources/application.properties` :

```properties
server.port=8888
spring.application.name=config-service
spring.cloud.config.server.git.uri=https://github.com/votre-username/config-repo
spring.cloud.config.server.git.default-label=main
```

---

## Démarrage de l'application

L'ordre de démarrage est important :

### 1. Démarrer Config Service
```bash
cd config-service
mvn spring-boot:run
```
Vérifier : http://localhost:8888/actuator/health

### 2. Démarrer Eureka Discovery Service
```bash
cd eureka-discovery
mvn spring-boot:run
```
Vérifier : http://localhost:8761

### 3. Démarrer les microservices métier

```bash
# Terminal 1
cd customer-service
mvn spring-boot:run

# Terminal 2
cd inventory-service
mvn spring-boot:run

# Terminal 3
cd billing-service
mvn spring-boot:run
```

### 4. Démarrer Gateway Service
```bash
cd gateway-service
mvn spring-boot:run
```

### 5. Démarrer le client Angular
```bash
cd angular-client
ng serve
```
Accéder à : http://localhost:4200

---

## Endpoints API

### Via Gateway (http://localhost:8888)

#### Customer Service
```
GET    /customer-service/customers          - Liste tous les clients
GET    /customer-service/customers/{id}     - Détails d'un client
POST   /customer-service/customers          - Créer un client
PUT    /customer-service/customers/{id}     - Modifier un client
DELETE /customer-service/customers/{id}     - Supprimer un client
```

#### Inventory Service
```
GET    /inventory-service/products          - Liste tous les produits
GET    /inventory-service/products/{id}     - Détails d'un produit
POST   /inventory-service/products          - Créer un produit
PUT    /inventory-service/products/{id}     - Modifier un produit
DELETE /inventory-service/products/{id}     - Supprimer un produit
```

#### Billing Service
```
GET    /billing-service/bills               - Liste toutes les factures
GET    /billing-service/bills/{id}          - Détails d'une facture
GET    /billing-service/bills/customer/{id} - Factures d'un client
POST   /billing-service/bills               - Créer une facture
```

### Accès direct aux services

- **Customer Service** : http://localhost:8081
- **Inventory Service** : http://localhost:8082
- **Billing Service** : http://localhost:8083

### Consoles H2

- Customer DB : http://localhost:8081/h2-console
- Inventory DB : http://localhost:8082/h2-console
- Billing DB : http://localhost:8083/h2-console

---

## Tests

### Tests avec Postman

Importez la collection Postman fournie dans le dossier `/postman` :

1. Ouvrir Postman
2. Importer `E-Commerce-Microservices.postman_collection.json`
3. Exécuter les requêtes de test

### Tests unitaires

```bash
# Pour chaque microservice
mvn test
```

### Exemples de requêtes

**Créer un client**
```bash
curl -X POST http://localhost:8888/customer-service/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
```

**Créer un produit**
```bash
curl -X POST http://localhost:8888/inventory-service/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 1200.00,
    "quantity": 10
  }'
```

**Créer une facture**
```bash
curl -X POST http://localhost:8888/billing-service/bills \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "productIds": [1, 2],
    "date": "2024-12-29"
  }'
```

---

## Structure du projet

```
activite3_e-commerce-microservices_application/
│
├── config-service/
│   ├── src/
│   └── pom.xml
│
├── eureka-discovery/
│   ├── src/
│   └── pom.xml
│
├── gateway-service/
│   ├── src/
│   └── pom.xml
│
├── customer-service/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/.../
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   ├── controllers/
│   │   │   │   └── CustomerServiceApplication.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── inventory-service/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/.../
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   ├── controllers/
│   │   │   │   └── InventoryServiceApplication.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── billing-service/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/.../
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   ├── controllers/
│   │   │   │   ├── feign/
│   │   │   │   │   ├── CustomerServiceClient.java
│   │   │   │   │   └── InventoryServiceClient.java
│   │   │   │   └── BillingServiceApplication.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── angular-client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   └── index.html
│   ├── package.json
│   └── angular.json
│
├── postman/
│   └── E-Commerce-Microservices.postman_collection.json
│
└── README.md
```

---

## Fonctionnalités

### Customer Service
- CRUD complet sur les clients
- Validation des données
- Base de données H2
- Endpoints REST

### Inventory Service
- CRUD complet sur les produits
- Gestion des stocks
- Base de données H2
- Endpoints REST

### Billing Service
- Création de factures
- Association client-produits via OpenFeign
- Calcul automatique du montant total
- Consultation des factures par client
- Base de données H2

### Gateway Service
- Routage dynamique des requêtes
- Load balancing
- Configuration centralisée des routes
- Intégration avec Eureka

### Eureka Discovery
- Enregistrement automatique des services
- Health check des instances
- Interface web de monitoring

### Config Service
- Configuration centralisée
- Gestion des profils (dev, prod)
- Rafraîchissement dynamique
- Stockage Git des configurations

### Client Angular
- Interface utilisateur moderne
- Gestion des clients
- Gestion des produits
- Création et visualisation des factures
- Communication avec la Gateway


## Références

- Vidéo tutoriel : [Architecture Microservices avec Spring Cloud](https://www.youtube.com/watch?v=-G2rcLMO1gQ)
- Repository GitHub référence : [Mohamed Youssfi - Microservices App](https://github.com/mohamedYoussfi/micro-services-app)
- Documentation Spring Cloud : https://spring.io/projects/spring-cloud
- Documentation Angular : https://angular.io/docs

---

## Auteur

**ZAIDI Malak**

- GitHub : [@malakzaidi](https://github.com/malakzaidi)

---

## Licence

Ce projet est développé dans un cadre éducatif.

---

## Améliorations futures

- Ajouter l'authentification avec Spring Security et JWT
- Implémenter un système de cache avec Redis
- Ajouter la gestion des transactions distribuées
- Implémenter le pattern Circuit Breaker avec Resilience4j
- Ajouter la containerisation avec Docker et Docker Compose
- Implémenter les logs centralisés avec ELK Stack
- Ajouter le monitoring avec Spring Boot Admin
- Implémenter la traçabilité distribuée avec Sleuth et Zipkin
- Ajouter des tests d'intégration complets
- Déploiement sur le cloud (AWS, Azure, GCP)





