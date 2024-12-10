// scripts/darkModeToggle.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
  
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleButton.textContent = "☀️ Light Mode";
    }
  
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      toggleButton.textContent = theme === 'dark' ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  });
  