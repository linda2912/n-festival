var nfest=nfest||{};nfest.timeToEvent=function(){var e=document.querySelectorAll(".eventObj"),t=[],s=[],n=[],r=function(){nfest.timeToEvent.sortTimeToEvent()},a=function(){Array.prototype.forEach.call(e,function(e){var i=document.getElementById("eventsList");e.classList.add("hide");var r=e.dataset.start,a=e.dataset.end,o=moment(r).format(),d=moment(a).format(),l=moment().format();l>=o&&d>=l&&t.push(e),l>=d&&s.push(e),o>=l&&n.push(e),i.classList.add("hide"),nfest.timeToEvent.pastEvents(),nfest.timeToEvent.currentEvents(),nfest.timeToEvent.comingEvents()})},o=function(){var e=document.getElementById("pastEvents"),t=e.querySelector(".timeToEvent");for(t.classList.add("hide"),i=0;i<s.length;i++){s[i].classList.remove("hide"),e.appendChild(s[i]);var n=nfest.helpers.hasClass(s[i],"filterHide");n||(t.classList.remove("hide"),t.innerHTML="AFGELOPEN")}},d=function(){var e=document.getElementById("currentEvents"),s=e.querySelector(".timeToEvent");for(s.classList.add("hide"),i=0;i<t.length;i++){t[i].classList.remove("hide"),e.appendChild(t[i]);var n=nfest.helpers.hasClass(t[i],"filterHide");n||(s.classList.remove("hide"),e.classList.add("scrollNow"),s.innerHTML="NOW")}},l=function(){var e=document.getElementById("comingEvents"),t=null,s=e.querySelector(".timeToEvent");for(s.classList.add("hide"),i=0;i<n.length;i++)n[i].classList.remove("hide"),e.appendChild(n[i]);var r=e.querySelectorAll(".eventObj:not(.filterHide)");for(i=0;i<r.length;i++){var a=moment(),o=r[i].dataset.start,d=moment(o),l=moment(o).fromNow();if(a.startOf("day").isSame(d.startOf("day"))){var m=r[i].querySelector(".timeToEvent");m.classList.remove("hide"),m.innerHTML=l.toUpperCase(),t===l&&m.classList.add("hide"),t=l}else{var v=nfest.helpers.hasClass(r[i],"filterHide");v||(s.classList.remove("hide"),s.innerHTML=l.toUpperCase())}}};return{timeToEventLauncher:r,sortTimeToEvent:a,pastEvents:o,currentEvents:d,comingEvents:l}}(),nfest.timeToEvent.timeToEventLauncher();