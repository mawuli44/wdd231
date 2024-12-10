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
  
  