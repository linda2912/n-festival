var nfest=nfest||{};nfest.helpers=function(){var e=function(){nfest.helpers.elementCount(),nfest.helpers.addedToMyRoute()},t=function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1},n=function(e,t){e.addEventListener?e.addEventListener("click",t,!1):e.attachEvent("onclick",t)},o=function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e=n.responseText;t(e)}},n.open("GET",e,!0),n.send()},r=function(){var e=JSON.parse(localStorage.getItem("myRouteEvents")),t=document.getElementById("myRouteCounter");null===localStorage.getItem("myRouteEvents")||0===e.length?t.classList.add("hide"):t.innerHTML=e.length},l=function(){function e(e,t){return e.some(function(e){return t===e})}function e(e,t){return e.some(function(e){return t===e})}if(document.querySelector(".detailEventPage")){var t=JSON.parse(localStorage.getItem("myRouteEvents")),n=document.querySelectorAll(".eventInfo");if(e(t,n[0].id)){var o="#"+n[0].id+".buttonAddToRoute";document.querySelector(o).classList.add("addedToRoute")}}if(document.querySelector("body > section#homePage")||document.querySelector("section.curatorDetail")||document.querySelector("body.myTimetable")||document.querySelector("section.locationDetail")){var t=JSON.parse(localStorage.getItem("myRouteEvents")),n=document.querySelectorAll(".eventObj");if(null==t)for(a=0;a<n.length;a++)n[a].classList.add("hide");if(t)if(0==t.length)for(a=0;a<n.length;a++)n[a].classList.add("hide");else for(var r=0;r<n.length;r++)if(e(t,n[r].id)){var o="#"+n[r].id+" .buttonAddToRoute";document.querySelector(o).classList.add("addedToRoute")}}},c=function(e){var t=function(){var e,t=new Date;try{return localStorage.setItem(t,t),e=localStorage.getItem(t)==t,localStorage.removeItem(t),e&&localStorage}catch(n){}}();e(t)},s=function(e){nfest.helpers.getData("https://nfest.lisaklein.nl/data",function(t){for(var n=JSON.parse(t),o=[],a=0;a<n.length;a++){var r=n[a].acf.location.lng,l=n[a].acf.location.lat,c=n[a].slug,s=n[a].title.rendered,u=n[a].acf.address;o.push({lng:r,lat:l,title:s,address:u,link:c}),o.length==n.length&&e(o,n)}})};return{helpersLauncher:e,hasClass:t,onclick:n,getData:o,elementCount:r,addedToMyRoute:l,storageCheck:c,getVenueLocations:s}}(),nfest.helpers.helpersLauncher();