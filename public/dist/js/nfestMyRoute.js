var nfest=nfest||{};nfest.myRoute=function(){var e=[],t=[],n=JSON.parse(localStorage.getItem("myRouteEvents")),s=document.querySelectorAll(".eventObj"),o=document.getElementById("infoText"),d=document.querySelector("body"),l=document.getElementById("myTimetableList");d.classList.add("myTimetable");var m=function(){for(l.classList.remove("hide"),a=0;a<s.length;a++)s[a].classList.add("hide");for(i=0;i<n.length;i++)document.getElementById(n[i]).classList.remove("hide"),document.getElementById(n[i]).classList.add("myRouteEvents")},c=function(){if(null==n)for(o.classList.remove("hide"),a=0;a<s.length;a++)s[a].classList.add("hide");if(n)if(0==n.length)for(o.classList.remove("hide"),a=0;a<s.length;a++)s[a].classList.add("hide");else o.classList.add("hide"),nfest.myRoute.showElements()},r=function(){var n=document.querySelectorAll(".eventObj:not(.hide)"),s=document.getElementById("myTimetableList");Array.prototype.forEach.call(n,function(n){var a=n.dataset.start,o=moment(a).format("MM/DD/YY"),i=new Date("10/08/2016"),d=moment(i).format("MM/DD/YY"),l=new Date("10/09/2016"),m=moment(l).format("MM/DD/YY");o===d&&e.push(n),o===m&&t.push(n),s.classList.add("hide"),nfest.myRoute.dayOne(),nfest.myRoute.dayTwo()})},u=function(){console.log(e);var t=document.getElementById("eventsDay1"),n=t.querySelector(".timeToEvent");for(n.classList.add("hide"),i=0;i<e.length;i++)t.appendChild(e[i]),n.classList.remove("hide"),n.innerHTML="DAY 1"},h=function(){console.log(t);var e=document.getElementById("eventsDay2"),n=e.querySelector(".timeToEvent");for(n.classList.add("hide"),i=0;i<t.length;i++)e.appendChild(t[i]),n.classList.remove("hide"),n.innerHTML="DAY 2"};return{showElements:m,checkRouteElements:c,whichDay:r,dayOne:u,dayTwo:h}}(),nfest.myRoute.checkRouteElements(),nfest.myRoute.whichDay();