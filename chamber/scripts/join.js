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
  