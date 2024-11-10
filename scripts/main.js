// Display current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;

// Array of Course Objects
const courses = [
    { code: 'CSE 110', name: 'Introduction to Programming', credits: 3, type: 'CSE', completed: true },
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, type: 'WDD', completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, type: 'CSE', completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, type: 'WDD', completed: true },
    { code: 'WDD 231', name: 'Front-end Development 1', credits: 2, type: 'WDD', completed: false },
    { code: 'ITM 111', name: 'Introduction to Database', credits: 3, type: 'ITM', completed: true },
    { code: 'CSE 210', name: 'Programming with class', credits: 2, type: 'CSE', completed: true }
];

// Render Courses
function renderCourses(filter = 'all') {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = '';

    let totalCredits = 0;
    courses
        .filter(course => filter === 'all' || course.type === filter)
        .forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = course.completed ? 'completed' : 'incomplete';
            courseDiv.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
            courseList.appendChild(courseDiv);
            totalCredits += course.credits;
        });

    document.getElementById("total-credits").textContent = totalCredits;
}

// Filter Courses
function filterCourses(type) {
    renderCourses(type);
}

// Initial Render
renderCourses();

// Toggle navigation for hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

