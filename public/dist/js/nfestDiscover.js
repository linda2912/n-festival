var nfest=nfest||{};nfest.discover=function(){var e=document.querySelectorAll(".eventDiscover"),n=document.getElementById("discoverBttn"),o=function(){nfest.discover.showRandomEvent(),nfest.discover.mouseTouchEvents()},t=function(){Array.prototype.forEach.call(e,function(e){e.classList.add("hide")});var n=e[Math.floor(Math.random()*e.length)];n.classList.remove("hide")},r=function(){var e=null;n.onmousedown=function(){e=setInterval(function(){var e=document.querySelectorAll(".eventDiscover");Array.prototype.forEach.call(e,function(e){e.classList.add("hide")});var n=e[Math.floor(Math.random()*e.length)];n.classList.remove("hide")},50)},n.onmouseup=function(){clearInterval(e),e=null},n.onmouseleave=function(){clearInterval(e),e=null},n.ontouchstart=function(){e=setInterval(function(){var e=document.querySelectorAll(".eventDiscover");Array.prototype.forEach.call(e,function(e){e.classList.add("hide")});var n=e[Math.floor(Math.random()*e.length)];n.classList.remove("hide")},50)},n.ontouchend=function(){clearInterval(e),e=null}};return{discoverLauncher:o,showRandomEvent:t,mouseTouchEvents:r}}(),nfest.discover.discoverLauncher();