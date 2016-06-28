![readmeImg/n-festival.png](readmeImg/n-festival2.png)



# N-Festival applicatie

> Deze repository is gevorkt van [https://github.com/tijsluitse/n-festival](https://github.com/tijsluitse/n-festival). Hier is dan ook het proces van het project terug te zien.

> ####Medewerkers:

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

###Loader

* Feedback naar de gebruiker bij het laden van de kaart. Er wordt tijdelijk een wazige afbeelding van een kaart getoond zodat de gebruiker ziet dat daar een kaart ingeladen wordt.

![public/img/amsterdamNoord.png](public/img/amsterdamNoord.png)

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

* Feedback naar de gebruiker bij het laden van de afstand tot een evenement.

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

###Evenement delen via Social Media

<img src="readmeImg/socialMedia.png" alt="loader" width=140>

```
<a href="http://www.facebook.com/sharer.php?u=http://nfest.lisaklein.nl/detail/{{slug}}&t={{{title.rendered}}}" target="black" class="shareSocialMedia facebookIcon">
```

###Terug knop
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

###Nieuws slideshow alleen HTML en CSS
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

###Fallback voor als er geen image wordt toegevoegd aan evenement, curator of loactie

###Intro animatie
<p data-height="709" data-theme-id="dark" data-slug-hash="JKbGxw" data-default-tab="result" data-user="Lindavandijk" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/Lindavandijk/pen/JKbGxw/">N-FESTIVAL</a> by Linda (<a href="http://codepen.io/Lindavandijk">@Lindavandijk</a>) on <a href="http://codepen.io">CodePen</a>.</p>
				<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


#Project verloop

## Team
Ik heb dit project uitgevoerd samen met Lisa Klein en Tijs Luitse zodat wij een product konden neerzetten die direct gebruikt kan worden.

Tijdens het project heeft iedereen een beroepsrol op zich genomen. Lisa was de Back-end Developer, Tijs was de Front-end Developer en ik was de Front-end Designer.

## Taakverdeling
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

## Wat ik heb gedaan de afgelopen 5 weken
#### Week 1
* Schetsen van de app
* HTML en CSS opzet voor de index pagina
* Design voor de app

#### Week 2
* Wireframe
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
![readmeImg/deviceLab.jpg](readmeImg/deviceLab.jpg)

#### Week 5
* Design van Ruben toepassen
* Bugs verschillende browsers fixen


##Conclusie

In het begin was het erg wennen aan het samenwerken op Github omdat we steeds Merge Conflicten kregen. Maar na verloop van tijd ging dat steeds beter doordat we goede afspraken maakten en in een eigen branch werkten. Ik heb veel geleerd van het samenwerken op Git en ik denk dat we met z'n drieën een heel vet product hebben kunnen neerzetten.
