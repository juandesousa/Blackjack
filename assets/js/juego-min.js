(()=>{"use strict";let e=[];const t=["C","D","H","S"],r=["A","J","Q","K"];let n=[];const a=document.querySelector("#btnPedir"),l=document.querySelector("#btnDetener"),o=document.querySelector("#btnNuevo"),s=document.querySelectorAll("small"),d=document.querySelectorAll(".divCartas"),c=()=>{e=[];for(let r=2;r<=10;r++)for(let n of t)e.push(r+n);for(let n of t)for(let t of r)e.push(t+n);return _.shuffle(e)},i=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},u=(e,t)=>(n[t]=n[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[t].innerText=n[t],n[t]),f=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),d[t].append(r)},h=e=>{let t=0;do{const e=i();t=u(e,n.length-1),f(e,n.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=n;setTimeout(()=>{t===e?alert("Empate!!!!!"):e>21?alert("Computadora Gana!!!!!"):t>21?alert("Jugador Gana!!!!!"):alert("Computadora Gana!!!!!")},1e3)})()};a.addEventListener("click",()=>{const e=i(),t=u(e,0);f(e,0),t>21?(console.warn("Perdiste"),a.disabled=!0,l.disabled=!0,h(t)):21===t&&(console.warn("Genial"),a.disabled=!0,l.disabled=!0,h(t))}),l.addEventListener("click",()=>{a.disabled=!0,l.disabled=!0,h(n[0])}),o.addEventListener("click",()=>{((t=2)=>{console.clear(),e=c(),n=[];for(let e=0;e<t;e++)n.push(0);s.forEach(e=>e.innerText=0),d.forEach(e=>e.innerText=""),a.disabled=!1,l.disabled=!1})()})})();