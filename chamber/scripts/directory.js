document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById('directory');
    const toggleViewBtn = document.getElementById('toggleView');

    // Fetch data
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Failed to fetch members:', error);
            directory.innerHTML = '<p>Failed to load directory. Please try again later.</p>';
        }
    }

    // Display members
    function displayMembers(members) {
        directory.innerHTML = members.map(member => `
            <div class="card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `).join('');
        directory.classList.add('grid-view'); // Default to grid view
    }

    // Toggle view
    toggleViewBtn.addEventListener('click', () => {
        directory.classList.toggle('grid-view');
        directory.classList.toggle('list-view');
    });

    // Footer dynamic dates
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    fetchMembers();
});
