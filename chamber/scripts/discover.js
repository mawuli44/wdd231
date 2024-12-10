// Lazy loading images and visitor message
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img.lazy");
  
    // Function to lazy load images
    const lazyLoad = (img) => {
      const src = img.getAttribute("data-src");
      if (src) {
        img.src = src;
        img.classList.remove("lazy");
      }
    };
  
    // IntersectionObserver for lazy loading
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyLoad(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
  
    images.forEach((img) => imgObserver.observe(img));
  
    // Visitor message logic
    const visitorMessage = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();
  
    if (lastVisit) {
      const lastVisitDate = new Date(parseInt(lastVisit, 10));
      const daysDifference = Math.floor((currentTime - lastVisitDate) / (1000 * 60 * 60 * 24));
  
      if (daysDifference === 0) {
        visitorMessage.textContent = "Back so soon! Awesome!";
      } else if (daysDifference === 1) {
        visitorMessage.textContent = "You last visited 1 day ago.";
      } else {
        visitorMessage.textContent = `You last visited ${daysDifference} days ago.`;
      }
    } else {
      visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    }
  
    localStorage.setItem("lastVisit", currentTime.toString());
  });
  
  