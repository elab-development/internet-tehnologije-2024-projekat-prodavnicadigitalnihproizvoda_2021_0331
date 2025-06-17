# Digital Art Store

Ova aplikacija predstavlja **web prodavnicu digitalne umetnosti**, razvijenu pomoću **Laravel-a (PHP)** za backend i **React-a (JavaScript)** za frontend. Korisnici mogu pregledati umetnička dela, dodavati ih u korpu i preuzimati nakon kupovine.

## Struktura projekta

- prodavnica_digitalnih_proizvoda – Laravel backend (API)
- react-prodavnica – React frontend (korisnički interfejs)

## Kreiranje repozitorijuma
```bash
git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-prodavnicadigitalnihproizvoda_2021_0331.git
```

## Pokretanje projekta lokalno

### 1. Backend – Laravel

1. Uđi u folder:
```bash
cd prodavnica_digitalnih_proizvoda
```

2. Pokreni sledeće komande:
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Backend će biti dostupan na adresi: http://127.0.0.1:8000

### 2. Frontend – React

1. Uđi u folder:
```bash
cd react-prodavnica
```

2. Pokreni sledeće komande:
```bash
npm install
npm start
```

Frontend će biti dostupan na adresi: http://localhost:3000

## Funkcionalnosti

- Registracija i login korisnika (korisnik i admin)
- Prikaz i pretraga umetničkih slika po nazivu, ceni i kategoriji
- Dodavanje i uklanjanje slika iz korpe
- Kupovina i preuzimanje kupljenih slika u visokoj rezoluciji
- Administrator može dodavati, menjati i brisati slike i kategorije
- REST API podržava GET, POST, PUT i DELETE metode
- Ugnježdene rute: /categories/{id}/pictures i /cart/{id}/download
- Paginacija slika i statistika prodaje

## Korišćeni javni REST servisi

1. ZenQuotes API – prikaz nasumičnog citata
2. The MET Museum API – prikaz umetničkog dela dana (naslov i autor)

## RESTful primeri

| Metod  | Ruta                          | Opis                            |
|--------|-------------------------------|----------------------------------|
| GET    | /api/pictures                 | Prikaz svih slika               |
| POST   | /api/pictures                 | Dodavanje slike (admin)         |
| PUT    | /api/pictures/{id}           | Izmena slike (admin)            |
| DELETE | /api/pictures/{id}           | Brisanje slike (admin)          |
| GET    | /api/categories/{id}/pictures| Slike po kategoriji             |
| GET    | /api/cart/{id}/download      | Preuzimanje kupljene slike      |

## Autori

- Jana Gojković 2021/0300 
- Tamara Gligorijević 2021/0331
