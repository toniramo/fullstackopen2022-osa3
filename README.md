# Puhelinluettelo

Linkki sovellukseen Herokussa:
https://phonebook-fullstackopen22.herokuapp.com/

## Ohjeita

### Frontendin tuotantoversio backendin tarjottavaksi

```sh
npm --prefix phonebook-frontend/ run build && cp -r ./phonebook-frontend/build ./phonebook-backend/
```

### Backendin vieminen Herokuun
Kun sovellus luotu Herokussa, aja projektin juuressa:

```sh
git subtree push --prefix phonebook-backend/ heroku master
```

### Valmiita npm komentoja
Kaikki komennot ajettavat kansiosta `phonebook-backend/` TAI komennolla

```sh
npm --prefix phonebook-backend/ run <komento>
```
- `start`: käynnistä sovellus paikallisesti nodella
- `dev`: käynnistä sovellus paikallisesti nodemonin avulla
- `build:ui`: luo tuotantoversion frontendistä ja kopio vie sen backendiin
- `deploy`: vie backend (frontendin kanssa, jos `build:ui` ajettu) Herokuun
- `deploy:full`: tuotantoversio frontendista, sen julkaisu sekä sovelluksen vieminen Herokuun
- `logs:prod`: seuraa Herokun lokeja
