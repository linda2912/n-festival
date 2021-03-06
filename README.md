![readmeImg/n-festival.png](readmeImg/n-festival2.png)



# N-Festival applicatie

> Deze repository is gevorkt van [https://github.com/tijsluitse/n-festival](https://github.com/tijsluitse/n-festival). Hier is dan ook het proces van het project terug te zien.

> ####In samenwerking met:

> * Tijs Luitse - [https://github.com/tijsluitse](https://github.com/tijsluitse)
> * Lisa Klein - [https://github.com/sayLISA](https://github.com/sayLISA)
> 
> ####Link naar online versie
> [https://nfest.lisaklein.nl](https://nfest.lisaklein.nl)




## Wat is N-festival
Dit najaar vindt de eerste editie van N-Festival plaats: een community festival over innovatie, muziek en goed eten in Amsterdam-Noord. N-Festival wordt een jaarlijkse uitwisseling tussen New York en Amsterdam. Het beste uit beide steden wordt opgezocht en getoond: muziek, culinaire concepten, mode, media, robotica en nog veel meer.

## De opdracht
Een applicatie ontwikkelen voor de festivalgangers van het N-festival die zij tijdens het festival kunnen gebruiken. De opdrachtgever had de volgende Must haves en Could haves opgesteld:

#### Must haves

1. Als gebruiker wil ik kunnen lezen en begrijpen wat het N-Festival is en waar het voor staat 
2. Als gebruiker wil ik informatie over het festival zien, omdat ik bijvoorbeeld wil zien wanneer het festival plaatsvindt 
3. Als gebruiker wil ik kunnen zien welke partners verbonden zijn aan N-Festival en wil ik kunnen doorlinken naar hun website 
4. Als gebruiker wil ik een compleet programma kunnen zien, omdat ik wil weten wat er allemaal te doen is 
5. Als gebruiker wil ik een overzicht van alle locaties zien, omdat ik wil zien waar alles precies plaatsvindt 
6. Als gebruiker wil ik meer informatie over een evenement kunnen zien, omdat ik wil zien of ik het interessant vind. 
7. Als gebruiker wil ik zien wat er nu bezig is, zodat ik kan zien waar ik heen wil op het festival zelf 
7. Als gebruiker wil ik zien wat er hierna komt, zodat ik kan plannen waar ik heen wil 
8. Als gebruiker wil ik kunnen filteren op type evenement, omdat ik een helderder overzicht wil van het programma 
9. Als gebruiker wil ik kunnen filteren op locatie, zodat ik weet wat er om mij heen gebeurt 
10. Als gebruiker wil ik gemakkelijk naar de social netwerkkanalen van het N-Festival kunnen gaan en wil ik gemakkelijk op eigen kanalen kunnen posten over het N-Festival

#### Could haves

1. Als gebruiker wil ik verrast worden met een programmaonderdeel omdat ik nieuwe dingen wil ontdekken 
2. Als gebruiker wil ik een route kunnen uitstippelen, omdat ik me dan tijdens het festival geen zorgen meer hoef te maken over mijn programma
3. Als gebruiker wil ik een selectie kunnen zien van een curator, omdat ik me helemaal wil laten meenemen
4. Als gebruiker wil ik zelf mijn programma kunnen samenstellen en gemaakte keuzes online terug kunnen halen 
5. Als gebruiker wil ik kunnen zien waar het op dit moment druk is zodat ik eventueel mijn programma daarop kan afstemmen



##Installeer de app
Om de app op je eigen computer te installeren moet je deze repo clonen. Open vervolgens je terminal en ga naar hoofdmap van de app. Instaleer dan vervolgens eerst de node modules

``` 
npm install 
```

start de app

``` 
nodemon app.js 
```

#Features

##Loader

* Feedback naar de gebruiker bij het laden van de kaart. Er wordt tijdelijk een wazige achtergrond afbeelding van een kaart getoond zodat de gebruiker ziet dat daar een kaart ingeladen wordt.

<img src="public/img/amsterdamNoord.png" alt="loader" width=280>

```
#locationMap {
    background-image: url('../../img/amsterdamNoord.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    width: 100vw;
    height: 50vh;
    z-index: 1;
    color: black;
}
```

* Feedback naar de gebruiker bij het laden van de afstand tot een evenement. Ik heb dit gedaan door middel van een CSS animatie. Zodra de afstand geladen is, wordt de loader vervangen door de afstand.

<img src="readmeImg/loader.gif" alt="loader" width=80>

```
<div id="distanceCalc" data-location="{{acf.venue.post_name}}">
	<p class="bikeDist">
		<span class="kmLoad1">.</span>
		<span class="kmLoad2">.</span>
		<span class="kmLoad3">.</span>min
	</p>
</div>                                       
```
```
/*DISTANCE LOADER*/

.kmLoad1 {
    -webkit-animation: kmLoad infinite ease-in-out 1s;
    animation: kmLoad infinite ease-in-out 1s;
}

.kmLoad2 {
    -webkit-animation: kmLoad infinite ease-in-out 1s;
    animation: kmLoad infinite ease-in-out 1s;
    -webkit-animation-delay: 300ms;
    animation-delay: 300ms;
}

.kmLoad3 {
    -webkit-animation: kmLoad infinite ease-in-out 1s;
    animation: kmLoad infinite ease-in-out 1s;
    -webkit-animation-delay: 600ms;
    animation-delay: 600ms;
}

@-webkit-keyframes kmLoad {
    0% {
        opacity: 0;
        filter: alpha(opacity=0);
    }
    66% {
        opacity: 0;
        filter: alpha(opacity=0);
    }
    100% {
        opacity: 1;
        filter: alpha(opacity=100);
    }
}

@keyframes kmLoad {
    0% {
        opacity: 0;
        filter: alpha(opacity=0);
    }
    66% {
        opacity: 0;
        filter: alpha(opacity=0);
    }
    100% {
        opacity: 1;
        filter: alpha(opacity=100);
    }
}
```

##Testen op het device lab
Ik heb de app gestest op het device lab en CSS fallbacks voor iedere browser geschreven zodat de app er overal hetzelfde uitziet en goed werkt. In de standaard browser van Samsung ging de app het meest stuk. Daar ben ik dan ook mee begonnen met optimaliseren.

![readmeImg/deviceLab.jpg](readmeImg/deviceLab.jpg)

####Prefixes flexbox

```
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-webkit-justify-content: center;
-ms-flex-pack: center;
justify-content: center;
```
####Fallback viewwidth
```
width: 100%;
width: 100vw;
```
####Prefixes filter
```
-webkit-filter: grayscale(100%);
-moz-filter: grayscale(100%);
-o-filter: grayscale(100%);
-ms-filter: grayscale(100%);
filter: grayscale(100%);
```       
####Prefix keyframes & animatie
```
...
-webkit-animation: added 500ms ease-in-out;
animation: added 500ms ease-in-out;
}

@-webkit-keyframes added {
    0% { ...
```

####Prefix transform
```
-webkit-transform: translateX(0);
-ms-transform: translateX(0);
transform: translateX(0);

```


##Evenement delen via Social Media
Om een dynamische link te maken voor het delen van alle evenementen heb ik handlebars gebruikt. 

<img src="readmeImg/socialMedia.png" alt="loader" width=140>

```
<a href="http://www.facebook.com/sharer.php?u=http://nfest.lisaklein.nl/detail/{{slug}}&t={{{title.rendered}}}" target="black" class="shareSocialMedia facebookIcon">
```

##Dynamische Terug knop


Om een dynamische terug knop te maken heb ik eerst bepaald op welke pagina's een terugknop moet komen. Dat zijn alle pagina's waar twee "/" inzitten en de /myroute pagina. Vervolgens wordt op die pagina's het menu icoon vervangen door een terugknop. De terugknop krijgt een onclick function ```window.history.back();``` die er altijd voor zorgt dat je naar de vorig bezochte pagina terug gaat.

<img src="readmeImg/backButton.png" alt="loader" width=30>



```
/* Dynamic back button for whole application duration */
    var backButton = function () {
        var eventUrl = window.location.pathname,
            eventUrl = eventUrl.split('/'),
            page = eventUrl[1],
            detailPage = eventUrl[2];

        if (window.location.pathname == '/' + page + '/' + detailPage || window.location.pathname == '/myroute') {
            document.querySelector('.menuIcon').classList.add('hide');
            var backButton = document.querySelector('.backButton');
            backButton.classList.remove('hide');
            backButton.onclick = function () {
                window.history.back();
            }
        }
        if (window.location.pathname == '/') {
            document.querySelector('.menuIcon').classList.add('hide');
        }
    };
```

##Nieuws slideshow
De nieuws slider is gemaakt met alleen HTML en CSS animaties. De slideshow bevat altijd maximaal 3 nieuws items (bepaald door de opdrachtgever) waardoor ik er voor gekozen had deze feature te maken met alleen CSS. De nieuws items glijden over elkaar heen door middel van ```transform: translateX```. Om ervoor te zorgen dat ze niet door elkaar heen gaan heb ik gebruik gemaakt van ```z-index```.

> Bekijk [live](https://nfest.lisaklein.nl/#menu)

<img src="readmeImg/slider.png" alt="loader" width=280>

```
<article id="newsFeed">
	{{#firstItems}}
		<section class="newsItem">
      		<div class="news">
				<h1>{{{title.rendered}}}</h1>
				<p>{{{content.rendered}}}</p>
			</div>
		</section>
	{{/firstItems}}
</article>
```
```
.newsItem:nth-child(1) {
    width: 100vw;
    transform: translateX(-100vw);
    animation: newSlideOne 20s infinite cubic-bezier(0, 1, 0, 1);
}

.newsItem:nth-child(2) {
    width: 100vw;
    transform: translateX(0);
    animation: newSlideTwo 20s infinite cubic-bezier(0, 1, 0, 1);
}

.newsItem:nth-child(3) {
    width: 100vw;
    transform: translateX(100vw);
    animation: newSlideThree 20s infinite cubic-bezier(0, 1, 0, 1);
}

@-webkit-keyframes newSlideOne {
    0% {
        transform: translateX(-100vw);
        z-index: 11;
    }
    33% {
        transform: translateX(0);
        z-index: 13;
    }
    66% {
        transform: translateX(100vw);
        z-index: 12;
    }
    100% {
        transform: translateX(-100vw);
        z-index: 11;
    }
}

@-webkit-keyframes newSlideTwo {
    0% {
        transform: translateX(0);
        z-index: 13;
    }
    33% {
        transform: translateX(100vw);
        z-index: 12;
    }
    66% {
        transform: translateX(-100vw);
        z-index: 11;
    }
    100% {
        transform: translateX(0);
        z-index: 13;
    }
}

@-webkit-keyframes newSlideThree {
    0% {
        transform: translateX(100vw);
        z-index: 11;
    }
    33% {
        transform: translateX(-100vw);
        z-index: 11;
    }
    66% {
        transform: translateX(0);
        z-index: 13;
    }
    100% {
        transform: translateX(100vw);
        z-index: 12;
    }
}
```


##Intro animatie

Zie de animatie op [codepen](http://codepen.io/Lindavandijk/pen/JKbGxw)

<img src="readmeImg/intro.png" alt="intro" width=180>

Ik heb deze animatie gemaakt met een SVG door middel van @keyframes en animation. De lijn om de N animeer ik door middel van de stroke-dashoffset: 200; te veranderen. Zie hier een eenvoudiger [voorbeeld](http://codepen.io/Lindavandijk/pen/zBNPyq).

De stroke-dasharray: 160; bepaald de ruimte tussen de strepen. Vervolgens maak ik de stroke transparant en de fill white. Daarna laat ik de h1 tekst van rechts inkomen met transform: translateX en als laatst gaat de onderste regel van opacity: 0; naar opacity: 1;

```
.nFestivalLogo {
  width: 90%;
  stroke-dasharray: 160;
  fill: ;
  stroke-width: 1;
  stroke: white;
  stroke-dashoffset: 200;
  -webkit-animation: draw 5s linear infinite;
}
@-webkit-keyframes draw {
  0% {
    fill: transparent;
    stroke-: white;
  }
  30% {
    fill: transparent;
  }
  40% {
    stroke-width: 1;
  }
  50% {
    fill: white;
    stroke: white;
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
  80% {
    fill: white;
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
  90% {
    fill: unset;
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
  100% {
    fill: unset;
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
}
```
De animatie wordt alleen getoond als de gebruiker voor het eerst de app opent. Dit heb ik gedaan door middel van het in localStorage op te slaan en vervolgens te kijken of het al in localStorage zit.

```
/* If user lands for the first time, show introduction animation */
    var introEnd = function () {
        var introPage = document.querySelector('.introPage');

        if (!localStorage.getItem('introPage')) {
            introPage.classList.remove('hide');
            setTimeout(function () {  
                introPage.style.opacity = '0';            
                introPage.classList.add('hide');
                localStorage.setItem('introPage', 'true');
            }, 2800);
        }
    };
```


##Fallback voor afbeeldingen
Als er geen foto wordt toegevoegt aan een event, curator of locatie, heb ik fallback geschreven zodat er geen lege plek ontstaat. Ik kijk eerst of er een foto in de data staat ```{{#if acf.picture.sizes.medium}} ``` zo ja, wordt die foto geplaatst. Zo niet, wordt er een standaard afbeelding geplaatst.

<img src="readmeImg/curator.png" alt="loader" width=180> <img src="readmeImg/event1.png" alt="loader" width=180>

<img src="readmeImg/curator1.png" alt="loader" width=180> <img src="readmeImg/event.png" alt="loader" width=180>



```
{{#if acf.picture.sizes.medium}} 
	<div class="eventImg" style="background-image: url('{{acf.picture.sizes.medium}}');"></div>
	{{else}}
	<div class="eventImg" style="background-image: url('/img/fallbackLocation.png');"></div>
{{/if}}
```

# Taakverdeling
We hebben ervoor gekozen om taken op te delen door middel van features op te zetten in Trello en die te verdelen. Op deze manier geeft iedereen zijn bijdrage aan de vakken Web App From Scratch, Css To The Rescue, Browser Technologies en Performance Matters.

![readmeImg/trello.png](readmeImg/trello.png)

## Verwerking vakken van de minor

####Web App From Scratch
* Object oriented programming, we hebben files gestructureerd in verschillende modules en geprogrammeerd op de OOP manier.
* IIFE, Immediately- Invoked Function Expressions
* Javascript interacties, vloeiende transities: about naar menupagina scroll
* We halen data op uit een wordpress API, combineren data die we nodig hebben, filteren data op tijd en laden we in de app.
* Templating

####CSS To The Rescue
* Semantische CSS
* :target selectors
* CSS fallbacks voor viewheight, viewwidth etc.
* PE, app is bruikbaar zonder css, we 'hiden' elementen met javascript
* Flexbox
* Prefixes voor alle browsers

####Browser Technologies
* Semantische HTML
* CSS fallbacks voor viewheight, viewwidth etc.
* Progressive Enhanchement, feature detecties voor geolocatie, localstorage, helpers voor addEventListeners.
* App is bruikbaar gemaakt voor toetsenbord gebruikers.
* Core functionaliteiten werken zonder javascript, CSS andere onbevoegdheden door de node server.
* Enhanchement voor gebruikers met een hippe browser: animaties, google maps, geolocatie.

####Performance Matters
* Semantische HTML & CSS
* Gulp, minified js en CSS files voor een snellere laadtijd.
* Geoptimaliseerde http requests: Javascript files worden alleen geladen op de pagina's waar ze nodig zijn.

## Mijn bijdrage de afgelopen 5 weken
#### Week 1
* Schetsen van de app
* HTML en CSS opzet voor de index pagina
* Design voor de app

#### Week 2
* Wireframes
![readmeImg/wireframe.jpg](readmeImg/wireframe.jpg)
* Menu + werkend in css zonder js op iedere pagina
* Toevoegen aan mijn route button HTML en CSS animatie
* Programma pagina opzetten HTML CSS
* Filter systeem opzetten HTML CSS
* Locatie pagina maken events die alleen bij die locatie horen
* Feedback naar de gebruiker bij het laden van de kaart en de afstand tot een evenement.
* Detail evenement pagina re-desingen

#### Week 3
* Evenement delen via Soical Media
* Re-design app: Filter bar, header bar, Menu, Detail event
* Font integreren

#### Week 4
* Nieuwe menu ontwerp integreren HTML CSS
* Android browser bugs fixen HTML CSS
* Detail pagina’s (curator, locaties en programma) integreren HTML CSS
* Terug knop vanuit diepere pagina's
* Ontwerp kaart markers en locaties
* Ontwerp kaart pop-up CSS
* Fine-tuning design CSS
* Nieuws slideshow
* Fallback voor als er geen image wordt toegevoegd aan evenement, curator of loactie
* Intro animatie
* Recommended animaties
* Homescreen icoon
* Discover designen CSS
* Testen op alle Device lab


#### Week 5
* Design van Ruben toepassen
* Bugs verschillende browsers fixen


##Conclusie

In het begin was het erg wennen aan het samenwerken op Github omdat we steeds Merge Conflicten kregen. Maar na verloop van tijd ging dat steeds beter doordat we goede afspraken maakten en in een eigen branch werkten. Ik heb veel geleerd van het samenwerken op Git en ik denk dat we met z'n drieën een heel vet product hebben kunnen neerzetten.
