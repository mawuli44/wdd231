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
  
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
  
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  });
  
  // scripts/profile.js
document.addEventListener('DOMContentLoaded', () => {
  const savedJobsList = document.getElementById('saved-jobs-list');
  const applicationHistoryList = document.getElementById('application-history');
  const emailNotificationsCheckbox = document.getElementById('email-notifications');

  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const applicationHistory = JSON.parse(localStorage.getItem('applicationHistory')) || [];
  const emailNotifications = JSON.parse(localStorage.getItem('emailNotifications')) || false;

  // Render saved jobs
  savedJobs.forEach(job => {
    const li = document.createElement('li');
    li.textContent = `${job.title} at ${job.company}`;
    savedJobsList.appendChild(li);
  });

  // Render application history
  applicationHistory.forEach(app => {
    const li = document.createElement('li');
    li.textContent = `${app.title} - Applied on ${app.date}`;
    applicationHistoryList.appendChild(li);
  });

  // Set notification preference
  emailNotificationsCheckbox.checked = emailNotifications;

  // Save notification settings
  emailNotificationsCheckbox.addEventListener('change', () => {
    localStorage.setItem('emailNotifications', JSON.stringify(emailNotificationsCheckbox.checked));
  });
});

// scripts/job-details.js
document.addEventListener("DOMContentLoaded", () => {
  const job = JSON.parse(localStorage.getItem("selectedJob"));
  if (job) {
    document.getElementById("job-title").textContent = job.title;
    document.getElementById("job-company").textContent = job.company;
    document.getElementById("job-location").textContent = job.location;
    document.getElementById("job-type").textContent = job.type;
    document.getElementById("job-salary").textContent = job.salary;
  } else {
    document.querySelector(".job-details").innerHTML = "<p>Job details not found. Please go back and try again.</p>";
  }
});

// scripts/fetchjobs.js
document.addEventListener("DOMContentLoaded", async () => {
  const jobsList = document.getElementById("jobs-list");

  const fetchJobs = async () => {
    try {
      const res = await fetch("data/jobs.json");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      return [];
    }
  };

  const renderJobs = (jobs) => {
    if (jobs.length === 0) {
      jobsList.innerHTML = "<p>No jobs available. Please try again later.</p>";
      return;
    }

    jobsList.innerHTML = jobs.map(job => `
      <div class="job">
        <h4>${job.title}</h4>
        <p>${job.company} - ${job.location}</p>
        <button class="view-details" data-job='${JSON.stringify(job)}'>View Details</button>
      </div>
    `).join('');
  };

  const jobs = await fetchJobs();
  renderJobs(jobs);

  // Add click listener for "View Details" button
  document.querySelectorAll(".view-details").forEach(button => {
    button.addEventListener("click", (e) => {
      const job = JSON.parse(e.target.getAttribute("data-job"));
      localStorage.setItem("selectedJob", JSON.stringify(job));
      window.location.href = "job-details.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const jobsList = document.getElementById("jobs-list");

  const fetchGitHubJobs = async () => {
    try {
      const response = await fetch("https://jobs.github.com/positions.json?description=remote");
      if (!response.ok) throw new Error(`GitHub Jobs API Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch jobs from GitHub Jobs:", error);
      return [];
    }
  };

  const fetchRemoteOkJobs = async () => {
    try {
      const response = await fetch("https://remoteok.io/api");
      if (!response.ok) throw new Error(`RemoteOK API Error: ${response.statusText}`);
      const data = await response.json();
      return data.slice(1).map(job => ({
        title: job.position,
        company: job.company,
        location: job.location || "Remote",
        url: job.url,
      }));
    } catch (error) {
      console.error("Failed to fetch jobs from RemoteOK:", error);
      return [];
    }
  };

  const renderJobs = (jobs) => {
    if (!jobs.length) {
      jobsList.innerHTML = "<p>No jobs available. Please try again later.</p>";
      return;
    }

    jobsList.innerHTML = jobs
      .map(
        job => `
        <div class="job">
          <h4>${job.title}</h4>
          <p>${job.company} - ${job.location}</p>
          <a href="${job.url}" target="_blank" class="btn">View Job</a>
        </div>
      `
      )
      .join("");
  };

  const [githubJobs, remoteOkJobs] = await Promise.all([fetchGitHubJobs(), fetchRemoteOkJobs()]);
  const allJobs = [...githubJobs, ...remoteOkJobs];
  renderJobs(allJobs);
});


document.addEventListener("DOMContentLoaded", async () => {
const featuredJobsContainer = document.getElementById("featured-jobs");
const jobs = await fetch("data/jobs.json").then(res => res.json());

const featuredJobs = jobs.slice(0, 3); // Display first 3 jobs as featured

featuredJobsContainer.innerHTML = featuredJobs
  .map(
    job => `
      <div class="job">
        <h4>${job.title}</h4>
        <p>${job.company} - ${job.location}</p>
        <a href="job-details.html" class="btn">View Job</a>
      </div>
    `
  )
  .join("");
});


document.addEventListener("DOMContentLoaded", async () => {
  const jobsList = document.getElementById("jobs-list");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const filterBtn = document.getElementById("filter-btn");

  const fetchJobs = async () => {
    try {
      const res = await fetch("data/jobs.json");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      return [];
    }
  };

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
          <a href="job-details.html" class="btn">View Job</a>
        </div>
      `
      )
      .join("");
  };

  const filterJobs = (jobs) => {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText);
      const matchesCategory =
        selectedCategory === "" || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const jobs = await fetchJobs();
  renderJobs(jobs);

  filterBtn.addEventListener("click", () => {
    const filteredJobs = filterJobs(jobs);
    renderJobs(filteredJobs);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const jobsList = document.getElementById("jobs-list"); // Element to render job data
  const searchInput = document.getElementById("search"); // Search input field
  const filterBtn = document.getElementById("filter-btn"); // Button to trigger search

  const fetchJobs = async (keywords = "") => {
    const url = `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(
      keywords
    )}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "b7fc4797-57af-4c13-8a01-1576b41c46ff", // Your API key
        },
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json(); // Parse JSON response
      return data.results; // `results` contains an array of jobs
    } catch (error) {
      console.error("Failed to fetch jobs from Reed:", error);
      return [];
    }
  };

  const renderJobs = (jobs) => {
    if (jobs.length === 0) {
      jobsList.innerHTML = "<p>No jobs available. Please try again later.</p>";
      return;
    }

    jobsList.innerHTML = jobs
      .map(
        (job) => `
        <div class="job">
          <h4>${job.jobTitle}</h4>
          <p>${job.locationName} - ${job.minimumSalary ? `£${job.minimumSalary}` : "Salary not specified"}</p>
          <p>${job.jobDescription.slice(0, 150)}...</p>
          <a href="${job.jobUrl}" target="_blank" class="btn">View Job</a>
        </div>
      `
      )
      .join("");
  };

  const searchJobs = async () => {
    const keywords = searchInput.value.trim();
    const jobs = await fetchJobs(keywords);
    renderJobs(jobs);
  };

  filterBtn.addEventListener("click", searchJobs);
});
