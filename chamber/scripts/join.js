document.addEventListener("DOMContentLoaded", () => {
    // Populate the timestamp hidden input
    document.getElementById("timestamp").value = new Date().toISOString();
  
    // Modal functionality
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");
    
    openButtons.forEach(button => {
      button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        document.getElementById(modalId).showModal();
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        button.closest("dialog").close();
      });
    });
  });
  

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);

  // Display submitted data
  document.getElementById('displayFirstName').textContent = params.get('firstName') || 'N/A';
  document.getElementById('displayLastName').textContent = params.get('lastName') || 'N/A';
  document.getElementById('displayEmail').textContent = params.get('email') || 'N/A';
  document.getElementById('displayPhone').textContent = params.get('phone') || 'N/A';
  document.getElementById('displayOrganization').textContent = params.get('organization') || 'N/A';
  document.getElementById('displayTimestamp').textContent = params.get('timestamp') || 'N/A';