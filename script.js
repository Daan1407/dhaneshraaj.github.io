document.getElementById("year").textContent=new Date().getFullYear();
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));