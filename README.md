# Testiranje web aplikacije kviza

Ovaj projekt sadrži testove za web aplikaciju kviza mentalne aritmetike.
Web aplikacija se sastoji od dva zasebna projekta, jedan za fronted i jedan za backend. Svaki od projekata sadržan je u zasebnom git repozitoriju.
Frontend je izrađen u radnom okviru ReactJS.
Backend je izrađen u radnom okviru ExpressJS.
Za pristup komponentama frontenda i backenda ovaj projekt koristi git submodule.

Web aplikacija je inicijalno, zbog potrebe za brzom izradom sustava i malom složenošću sustava, izrađena ad-hoc metodom sa ručnim testiranjem značajki.
Trenutni cilj ovoga projekta je postaviti okvir za automatsko testiranje web aplikacije kako bi se olakšao daljnji razvoj i održavanje aplikacije.

Trenutno podržani preglednici su Mozilla Firefox 96.0.3 i Chromium 103.0.5060.53.

### Alati potrebni za testiranje sustava.
    nodejs
    npm
    Mozilla Firefox
    Chromium

### Način pokretanja testova
    git checkout
    git submodule init
    git submodule update
    npm install
    make build
    npm run test

# Okvir za testiranje
Okvir za testiranje sastoji se od testova izrađenih u radnom okviru Jest.
Konfiguracija Jest radnog okvira za testiranje nalazi se u jest.config.js datoteci.
Za provođenje use case testova uz Jest koristi se radni okvir Selenium za upravljanje internetskim pretraživačem.


## provođenje testiranja
Testiranje se obavlja u razvojnom okruženju kao sastavni dio procesa razvoja novih značajki aplikacije i održavanja postojećeg sustava. Pri tome testiranje pokreće programer koji razvija aplikaciju.
Dodavanje novih značajki sustava obavlja se korištenjem test driven development metode.

Testiranje se provodi automatski nakon promjena u granama git repozitorija ili jednom dnevno ukoliko nema promjena u repozitoriju. U ovome slučaju testiranje pokreće Jenkins okvir za automatizaciju.
Koraci koje provodi Jenkins zapisani su u Jenkinsfile datoteci.

## vrste testova
Trenutno podržane vrste testova su unit testovi i use case testovi.

Broj unit testova trenutno je jako mali i pokriva samo par komponenti sustava. Cilj razvoja ovih testova bio je upoznati se sa radom radnog okvira i omogućiti razvoj ostalih dijelova sustava. Prepreka za stvaranje unit testova za komponente je nepostojanje dizajna sustava na koji se testovi mogu referencirati. Zapisivanjem načina na koji komponente trenutno rade u testove otežalo bi popravak nedostataka sustava. Iste prepreke sprječavaju stvaranje integration i system testova.

Use case testovi temelje se na zahtjevima zapisanima u zahtjevi.org datoteci. Ovi testovi nastali su iz procedura ručnog testiranja koje su korištene pri razvoju aplikacije.

## izvještaji
   Pri izvršavanju unit testova stvaraju se izvještaji o pokrivenosti koda testovima i izvještaj o uspješnosti izvođenja.
   Izvještaji se ispisuju na standardni izlaz u tekstnom formatu.
   Izvještaj o uspješnosti izvođenja u JUnit formatu zapisuje se u unit_tests.xml datoteku unutar reports direktorija
   Izvještaj o pokrivenosti koda testovima u cobertura formatu zapisuje se u cobertura-coverage.xml datoteku unutar coverage direktorija.

   Pri izvršavanju use case testova stvara se izvještaj o uspješnosti izvođenja.
   Izvještaj se ispisuje na standardni izlaz u tekstnom obliku.
   Izvještaj se u JUnit formatu zapisuje u use_case_tests.xml datoteku unutar reports direktorija.


   Iz xml datoteka izvještaja okvir za automatizaciju Jenkins stvara objedinjeni izvještaj testiranja sustava.

## Trenutni problemi
Trenutno najveći problem ovoga projekta je nedostatak dokumenta o dizajnu sustava koji služi kao referenca za pisanje testova.
Drugi problem je nedostatak detalja u opisu zahtjeva sustava.


## Planirani daljnji koraci razvoja okvira za testiranje
- specifikacija dizajna sustava
- proširenje opisa zahtjeva sustava
- izrada unit, integration i system testova prema dizajnu sustava
- dodavanje alata statičke analize koda, lintera
- dodavanje provjere sigurnosnih nadogradnji u paketima koje aplikacija koristi
