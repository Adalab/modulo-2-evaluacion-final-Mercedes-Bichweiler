const u=document.querySelector(".js_inputSearch"),p=document.querySelector(".js_submitSearch"),m=document.querySelector(".js_listProducts"),l=document.querySelector(".js_cartList"),h="https://fakestoreapi.com/products",f="https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";let o=[],n=[];const d=localStorage.getItem("cart");d&&(n=JSON.parse(d),i());fetch(h).then(t=>t.json()).then(t=>{o=t,a(o),i()}).catch(()=>{fetch(f).then(t=>t.json()).then(t=>{o=t,a(o),i()})});function a(t){let e="";for(let r of t){const s=r.image||"https://placehold.co/300x200";e+=`
    <div>
      <img src="${s}"/>
      <p>${r.title}</p>
      <p>${r.price}€</p>
      <button 
       id="${r.id}" 
       class="js_buyBtn product-btn ${n.some(c=>c.id===r.id)?"product-btn--selected":""}">
       ${n.some(c=>c.id===r.id)?"Eliminar":"Comprar"}
      </button>
    </div>`}m.innerHTML=e,y()}function y(){document.querySelectorAll(".js_buyBtn").forEach(e=>{e.addEventListener("click",b)})}function b(t){const e=parseInt(t.currentTarget.id),r=o.find(c=>c.id===e);n.some(c=>c.id===e)?n=n.filter(c=>c.id!==e):n.push(r),g(),a(o),i()}function i(){l.innerHTML="";for(let t of n){const e=t.image||"https://placehold.co/50x50";l.innerHTML+=`
      <li class="cart-item">
        <img src="${e}" alt="${t.title}" width="50" />
        <span>${t.title} - ${t.price}€</span>
      </li>
    `}}function g(){localStorage.setItem("cart",JSON.stringify(n))}function S(t){t.preventDefault();const e=u.value.toLowerCase(),r=o.filter(s=>s.title.toLowerCase().includes(e));a(r)}p.addEventListener("click",S);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzsifQ==
