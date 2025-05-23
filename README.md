# TastEDU – Opiskelijaravintolasovellus

📄This documentation is also available in [English](README.en.md)

Tämä sovellus on toteutettu osana Web-sovelluskehitys-kurssin yksilötehtävää.

> 📲 **[Avaa TastEDU-sovellus tästä](https://users.metropolia.fi/~neal/WSK/individual-assignment/)**

> (⚠️Huom! Sovellus toimii vain Metropolian verkossa tai VPN-yhteydellä, koska se käyttää sisäistä rajapintaa.)

---

## 🧠 Sovelluksen idea ja kohderyhmä

TastEDU on verkkosovellus, jonka tarkoituksena on helpottaa opiskelijoiden arkea tarjoamalla selkeän ja nopean tavan etsiä opiskelijaravintoloita, tarkastella ruokalistoja sekä löytää oma suosikkiravintola. Sovellus hyödyntää karttapohjaa ja listanäkymää, joiden avulla käyttäjät voivat tutustua ravintoloihin visuaalisesti tai selaamalla.

---

## ⚙️ Sovelluksen toiminnallisuudet

- 🔎 **Ravintoloiden selaus listana tai kartalla**
- 🧭 **Hakutoiminnot** nimen, kaupungin ja palveluntarjoajan perusteella
- 🍽️ **Ruokalistat:** päivän ja viikon listat
- ⭐ **Suosikkiravintolan tallennus**
- 👤 **Käyttäjän profiilin hallinta**
- 🗺️ **Karttanäkymä ja käyttäjän sijainti**
- 📱 **Responsiivinen käyttöliittymä mobiililaitteille**

---

## 🔐 Tunnistautuminen

Sovelluksessa käyttäjät voivat:

- Rekisteröityä omalla käyttäjänimellä ja salasanalla
- Kirjautua sisään ja ulos
- Tarkastella ja muokata omia käyttäjätietojaan
- Poistaa käyttäjätunnuksensa
- Tallentaa suosikkiravintolan profiiliinsa

Tunnistautuminen toimii token-pohjaisesti (JWT), ja käyttäjätiedot tallennetaan localStorageen istunnon ajaksi.

---

## 💻 Kehityksestä

Sovellus on rakennettu ilman ulkoisia front-end-kehyksiä (esim. React, Vue). Tavoitteena oli harjoitella puhdasta HTML/CSS/JavaScript (ES6+) -pohjaista kehitystä sekä:

- Modulaarista koodirakennetta (JavaScript ES6 import/export)
- REST-rajapintojen hyödyntämistä (GET, POST, PUT, DELETE)
- DOM-manipulaatiota ja tapahtumien käsittelyä käsin
- Responsiivisen käyttöliittymän suunnittelua mobiilikäyttöön
- Leaflet.js-kirjaston käyttöä karttapohjaisessa navigoinnissa
- Rajapinta ei tarjoa ravintoloille kuvia, joten käytössä on geneerisiä esimerkkikuvia visuaalisuuden parantamiseksi.

---

## 💻 Teknologiat ja kirjastot

- HTML, CSS, JavaScript (ES6+)
- Leaflet.js (karttanäkymään)
- REST API (ravintolat, käyttäjätiedot)
- LocalStorage (tokenin säilyttämiseen)

  > ℹ️ **Huom:** Sovelluksen käyttämä REST-rajapinta on Metropolian tarjoama valmiiksi toteutettu rajapinta, ei itse kehitetty osa tätä projektia.

---

## 🧪 Muita toteutuskokeiluja

Projektin alkuvaiheessa kehitin erillisen back-endin Node.js:n ja Expressin avulla käyttäjien hallintaa varten. Toteutuksessa käytettiin omaa tietokantaa rekisteröitymiseen ja kirjautumiseen. Myöhemmin, kun selvisi että tehtävässä kannattaisi hyödyntää Metropolian tarjoamaa valmista rajapintaa, Express-toteutus jäi pois käytöstä.

🔎 Tämä vaihtoehtoinen toteutus on kuitenkin nähtävissä [`express`](https://github.com/nealukumies/WSK-restaurantapp/tree/express) -branchissa. Se demonstroi mm.:

- Express.js REST-API:n toteutusta
- Käyttäjien rekisteröinti- ja kirjautumislogiikkaa omalla MySQL-tietokannalla
- JWT-tunnistautumisen toteutusta
- Bcrypt-kirjaston käyttöä salasanojen hashaukseen
- Nodemonin käyttöä kehitysympäristössä

---

## 📸 Kuvakaappaukset

Etkö pääse Metropolian verkkoon? Ei hätää! Tässä muutama kuvakaappaus sovelluksesta:

![Koti-näkymä](assets/screenshot_homepage.png)
_Iloinen logo toivottaa tervetulleeksi! Tämä on kirjautumattoman käyttäjän näkymä. Kirjautuneen käyttäjän
navigaatio-napit ovat Koti, Profiili ja Kirjaudu ulos._

![Ravintolat-näkymä](assets/screenshot_listview.png)
_Ravintolat-näkymä, jossa käyttäjä voi selata ravintoloita listana ja suodattaa kaupungin, palveluntarjojan tai nimen mukaan. Ruokalistat aukeaa modaali-ikkunaan._

![Kartta-näkymä](assets/screenshot_mapview.png)
_Kartta-näkymä, jossa käyttäjä voi tarkastella ravintoloita kartalla. Tässäkin näkymässä ruokalistata avautuvat modaali-ikkunaan._

![Ruokalista-näkymä](assets/screenshot_menu.png)
_Ruokalista-näkymä, jossa käyttäjä voi tarkastella päivän tai viikon ruokalistoja. Ruokalista aukeaa modaali-ikkunaan, jossa näkyy päivän tai viikon lista._

![Profiili-näkymä](assets/screenshot_profile.png)
_Käyttäjän profiili, jossa käyttäjä voi tarkastella ja muokata omia tietojaan. Profiilissa näkyy myös käyttäjän suosikkiravintola. Profiilin voi poistaa, jolloin käyttäjätiedot poistuvat myös palvelimelta._

![Suosikkiravintola](assets/screenshot_favoriterestaurant.png)
_Jos käyttäjä on valinnut suosikkiravintolan, voi sen valita suodatinriviltä klikkaamalla sen nimeä. Silloin näkymään jää vain suosikkiravintola._

---
