// window.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const certId = params.get('id');

//     fetch('certificates.json')
//         .then(response => response.json())
//         .then(data => {
//             const cert = data.certificates.find(c => c.id === certId);
//             if (cert) {
//                 document.querySelector('.certificate__name').textContent = `${cert.name}`;
//                 document.querySelector('.certificate__camp').textContent = cert.camp;
//                 document.querySelector('.certificate__camp-number').textContent = cert.campNumber;
//                 document.querySelector('.grade__duration-time').textContent = cert.duration;
//                 document.querySelector('.grade__grade').textContent = "Final Grade : " + cert.grade || "A+";
//             }
//             else {
//                 document.querySelector('.certificate').innerHTML = 'Certificate not found.';
//                 document.querySelector('.certificate').style.fontWeight = "900";
//                 document.querySelector('.certificate').style.fontSize = "2rem";
//                 document.querySelector('.certificate').style.textAlign = "center";
//             }
//         });
// });

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const certId = params.get('id');

    // Camp-specific data
    const campInfo = {
        1: { duration: 72, courses: "HTML, CSS, JavaScript Basics", nextCamp: "Frontend Development Camp" },
        2: { duration: 80, courses: "Advanced JS, DOM, React, Tailwind, GSAP", nextCamp: "Backend Development Camp" },
        3: { duration: 90, courses: "Node.js, Express, Databases, Deployment", nextCamp: "Full-Stack Mastery" }
    };

    fetch('certificates.json')
        .then(response => response.json())
        .then(data => {
            const cert = data.certificates.find(c => c.id === certId);

            if (cert) {
                // Fill basic fields
                document.querySelector('.certificate__name').textContent = cert.name;
                document.querySelector('.certificate__camp').textContent = cert.camp;

                // Camp number mapping
                const campNumber = cert.campNumber || (cert.camp.includes("Fundamentals") ? 1 :
                    cert.camp.includes("Frontend") ? 2 : 3);
                document.querySelector('.certificate__camp-number').textContent = campNumber;

                // Fill dynamic fields from JSON or default campInfo
                document.querySelector('.grade__duration-time').textContent = cert.duration || campInfo[campNumber].duration;
                document.querySelector('.grade__courses-list').textContent = `${cert.courses || campInfo[campNumber].courses}`;
                document.querySelector('.grade__grade').textContent = `Final Grade: ${cert.grade || "A+"}`;

                // Update notes dynamically
                const notesItems = document.querySelectorAll('.notes__item');
                if (notesItems.length > 0) {
                    notesItems[0].textContent = `The student is eligible to proceed to the next phase: ${campInfo[campNumber].nextCamp}.`;
                }

                // Optionally, you can fill the date if you add a span for it
                // e.g., document.querySelector('.certificate__date').textContent = cert.date;

            } else {
                // Certificate not found
                const certDiv = document.querySelector('.certificate');
                certDiv.innerHTML = 'Certificate not found.';
                certDiv.style.fontWeight = "900";
                certDiv.style.fontSize = "2rem";
                certDiv.style.textAlign = "center";
            }
        })
        .catch(err => {
            console.error("Error loading certificates:", err);
        });
});
