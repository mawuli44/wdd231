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
  