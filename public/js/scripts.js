/* ---------------------------
   TYPEWRITER EFFECT
---------------------------- */
const text = document.querySelector(".sec-text");
const textLoad = () => {
    setTimeout(() => {
        text.textContent = "TYPO3-Integrator";
    }, 0);
    setTimeout(() => {
        text.textContent = "TYPO3-Editor";
    }, 4000);
    setTimeout(() => {
        text.textContent = "Technikenthusiast";
    }, 8000); //1s = 1000 milliseconds
}
textLoad();
setInterval(textLoad, 12000);

/* ---------------------------
   SCROLL REVEAL ANIMATION
---------------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
});

document.querySelectorAll("section").forEach(sec => observer.observe(sec));

/* ---------------------------
   TIMELINE SCROLL PROGRESS
---------------------------- */

const timelineEvents = [
    {
        date: 'Februar 2019',
        title: 'Ausbildung zum Mediengestalter - L.N. Schaffrath Digitalmedien',
        description: 'Gestalten von responsiven Websites, Agiles Arbeiten, Contenpflege in TYPO3.'
    },
    {
        date: 'Februar 2021',
        title: 'TYPO3-Integrator - Schaffrath Digitalmedien',
        description: 'Bauen von Templates mit Fluid / Sass, First-Level-Support, Teamarbeit in einem agilen Umfeld.'
    },
    {
        date: 'Juni 2025',
        title: 'TYPO3-Integrator - Niederrhein.it',
        description: 'Hosting von Webseiten, Grundlegende Wartung von TYPO3-Webseiten, Kundenbetreuung, Neudesign von Webseiten'
    },
    {
        date: 'August 2025',
        title: 'TYPO3-Integrator - Web-vision',
        description: 'GIT-Workflow, Kundenbetreuung, Konnzeption von Webseiten, Neudesign von Webseiten'
    },
    {
        date: 'November 2025',
        title: 'Test Analyst - Chefs Value',
        description: 'Softwaretests, Testmanagement, Test-Case-Erstellung, Agile Arbeitsmethoden'
    }
];

const timelineContainer = document.getElementById('timeline-events');
const progressBar = document.getElementById('scroll-progress');

function createTimelineEvent(event) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('timeline-event');
    
    const dateElement = document.createElement('h3');
    dateElement.textContent = event.date;
    
    const titleElement = document.createElement('h4');
    titleElement.textContent = event.title;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = event.description;
    
    eventElement.appendChild(dateElement);
    eventElement.appendChild(titleElement);
    eventElement.appendChild(descriptionElement);
    
    timelineContainer.appendChild(eventElement);
}

function updateProgressBar() {
    const timeline = document.getElementById('timeline-events');
    if (!timeline) return;
    
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineHeight = timeline.scrollHeight;
    
    const scrollTop = window.scrollY;
    const progress = Math.max(0, scrollTop - timelineTop + window.innerHeight / 2);
    const progressPercent = Math.min(100, (progress / timelineHeight) * 100);
    
    // Update the filled line
    const filledLine = timeline.style;
    filledLine.setProperty('--progress', progressPercent + '%');
    
    // Alternative: directly set the ::after pseudo-element height via CSS variable
    document.documentElement.style.setProperty('--timeline-progress', Math.min(100, (progress / timelineHeight) * 100) + '%');
}

function initTimeline() {
    timelineEvents.forEach(createTimelineEvent);
    window.addEventListener('scroll', updateProgressBar);
}

document.addEventListener('DOMContentLoaded', initTimeline);