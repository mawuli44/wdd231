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

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
});

// Fetch and Render Jobs from jobs.json
document.addEventListener("DOMContentLoaded", async () => {
  const jobsList = document.getElementById("jobs-list");
  const searchInput = document.getElementById("search");
  const filterBtn = document.getElementById("filter-btn");

  // Function to fetch jobs from local JSON file
  const fetchJobs = async () => {
    try {
      const response = await fetch("data/jobs.json");
      if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  // Function to render jobs to the DOM
  const renderJobs = (jobs) => {
    if (jobs.length === 0) {
      jobsList.innerHTML = "<p>No jobs available. Please try again later.</p>";
      return;
    }

    jobsList.innerHTML = jobs
      .map(
        (job) => `
        <div class="job">
          <h4>${job.title}</h4>
          <p>${job.company} - ${job.location}</p>
          <p>${job.type} | ${job.salary}</p>
        </div>
      `
      )
      .join("");
  };

  // Function to filter jobs based on search input
  const filterJobs = (jobs) => {
    const searchText = searchInput.value.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText)
    );
  };

  // Load and display jobs
  const jobs = await fetchJobs();
  renderJobs(jobs);

  // Add event listener to filter button
  filterBtn.addEventListener("click", () => {
    const filteredJobs = filterJobs(jobs);
    renderJobs(filteredJobs);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const jobsList = document.getElementById("jobs-list");

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs...");
      const response = await fetch("data/jobs.json");
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      return [];
    }
  };

  const renderJobs = (jobs) => {
    if (!jobs.length) {
      jobsList.innerHTML = "<p>No jobs available.</p>";
      return;
    }
    jobsList.innerHTML = jobs.map(job => `
      <div class="job">
        <h4>${job.title}</h4>
        <p>${job.company} - ${job.location}</p>
        <p>${job.type} | ${job.salary}</p>
      </div>
    `).join("");
  };

  const jobs = await fetchJobs();
  renderJobs(jobs);
});
