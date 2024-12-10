// scripts/remote.js
document.addEventListener("DOMContentLoaded", async () => {
    const loadComponent = async (selector, file) => {
      try {
        const res = await fetch(`./components/${file}.html`);
        if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.statusText}`);
        const html = await res.text();
        document.querySelector(selector).innerHTML = html;
      } catch (error) {
        console.error(error);
      }
    };
  
    await loadComponent("header", "header");
    await loadComponent("footer", "footer");
  });
  
  // Lazy Load Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img.lazy");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });
  
    lazyImages.forEach(img => observer.observe(img));
  });
  
  