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
  