/* empty css                      */import{a as h}from"./assets/vendor-Dl2X3eg5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const p="https://pixabay.com/api/",g="54810342-78f3e5f8f5ab65816402207bb",y=document.getElementById("search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".load-more"),a=document.querySelector(".loader");let n="",i=1,L=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});async function f(r,e){return(await h.get(p,{params:{key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20,page:e}})).data}function m(r){const e=r.map(s=>`
    <li class="gallery-item">
      <a href="${s.largeImageURL}">
        <img src="${s.webformatURL}" alt="${s.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${s.likes}</p>
        <p>Views: ${s.views}</p>
        <p>Comments: ${s.comments}</p>
        <p>Downloads: ${s.downloads}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",e),L.refresh()}y.addEventListener("submit",async r=>{if(r.preventDefault(),n=r.target.elements.searchQuery.value.trim(),!!n){i=1,l.innerHTML="",c.classList.add("hidden"),a.classList.remove("hidden");try{const e=await f(n,i);if(a.classList.add("hidden"),e.hits.length===0){iziToast.error({message:"No images found. Try another keyword!"});return}m(e.hits),e.totalHits>i*20&&c.classList.remove("hidden")}catch(e){a.classList.add("hidden"),iziToast.error({message:"Something went wrong!"}),console.error(e)}}});c.addEventListener("click",async()=>{i+=1,a.classList.remove("hidden");try{const r=await f(n,i);a.classList.add("hidden"),m(r.hits);const{height:e}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),i*20>=r.totalHits&&(c.classList.add("hidden"),iziToast.info({message:"We're sorry, but you've reached the end of search results"}))}catch(r){a.classList.add("hidden"),iziToast.error({message:"Something went wrong!"}),console.error(r)}});
//# sourceMappingURL=index.js.map
