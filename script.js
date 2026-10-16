document.addEventListener("DOMContentLoaded",()=>{
 const menuBtn=document.querySelector(".menu-btn"),menu=document.querySelector(".mobile-menu");
 if(menuBtn&&menu) menuBtn.addEventListener("click",()=>menu.classList.toggle("open"));
 const theme=document.querySelector("[data-theme]");
 if(localStorage.getItem("tt-theme")==="dark") document.body.classList.add("dark");
 function syncTheme(){if(!theme)return;theme.innerHTML=document.body.classList.contains("dark")?'<i data-lucide="sun"></i>':'<i data-lucide="moon"></i>';theme.setAttribute("aria-label",document.body.classList.contains("dark")?"Switch to light mode":"Switch to dark mode");window.lucide?.createIcons()}
 syncTheme();theme?.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("tt-theme",document.body.classList.contains("dark")?"dark":"light");syncTheme()});
 const rtl=document.querySelector("[data-rtl]");
 function syncRtl(){if(!rtl)return;const on=document.documentElement.dir==="rtl";rtl.innerHTML=on?'<span class="rtl-text">LTR</span>':'<span class="rtl-text">RTL</span>';rtl.setAttribute("aria-label",on?"Switch to LTR":"Switch to RTL")}
 if(localStorage.getItem("tt-dir")==="rtl") document.documentElement.dir="rtl";
 syncRtl();rtl?.addEventListener("click",()=>{document.documentElement.dir=document.documentElement.dir==="rtl"?"ltr":"rtl";localStorage.setItem("tt-dir",document.documentElement.dir);syncRtl()});
 const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 document.querySelectorAll(".nav-link").forEach(link=>{
   const href=(link.getAttribute("href")||"").toLowerCase();
   const isHome=(page==="index.html"||page==="home2.html") && href==="index.html";
   if(isHome || href===page) link.classList.add("active");
 });
 document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
 window.lucide?.createIcons();
 const productFilters=document.querySelectorAll(".product-filter");
 if(productFilters.length){
   const catalogue=productFilters[0].closest(".container")?.querySelector(".grid-3");
   const cards=catalogue?Array.from(catalogue.querySelectorAll(".card")):[];
   productFilters.forEach(button=>button.addEventListener("click",()=>{
     const filter=button.dataset.filter||"all";
     productFilters.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",active?"true":"false")});
     cards.forEach(card=>{const image=card.querySelector("img[data-category]");const category=image?.dataset.category||"";card.classList.toggle("product-card-hidden",filter!=="all"&&category!==filter)});
   }));
 }

 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("is-visible")}),{threshold:.08});document.querySelectorAll(".section,.card,.feature,.step,.stat,.info-card,.cta-box,.media").forEach(e=>io.observe(e));
});