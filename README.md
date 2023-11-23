[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/TA_3CB_a)
# Examenopdracht Front-end Web Development / Web Services


- Student: Brecht Vandekerckhove
- Studentennummer: 201102978
- E-mailadres: <mailto:brecht.vandekerckhove@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

Voor gebruikers van [Chocolatey](https://chocolatey.org/):
```powershell
choco install nodejs -y
choco install yarn -y
choco install mysql -y
choco install mysql.workbench -y
```

## Opstarten

Installeer alle dependencies:  
`yarn install`  
Maak een .env bestand met volgende inhoud:  
`VITE_API_URL=http://localhost:9000/api`  
Start de app:  
`yarn dev`

## Testen

- Open Cypress met volgend commando:  
`yarn cypress open`  
- Kies voor E2E Testing  
- Kies een browser naar keuze 
- Run de test naar keuze


