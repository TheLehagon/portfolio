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

document.addEventListener('DOMContentLoaded', () => {
    const chips = Array.from(document.querySelectorAll('.chip'));
    const cards = Array.from(document.querySelectorAll('.about-card'));

    const filterByTopic = (topic) => {
        if (topic === 'reset') {
            cards.forEach(c => c.classList.remove('hidden'));
            return;
        }
        cards.forEach(c => {
            c.classList.toggle('hidden', c.dataset.topic !== topic);
        });
    };

    // ensure a single active chip (falls back to first chip)
    let active = chips.find(c => c.getAttribute('aria-pressed') === 'true') || chips[0];
    chips.forEach(c => c.setAttribute('aria-pressed', c === active ? 'true' : 'false'));

    // apply initial filter based on active chip
    filterByTopic(active.dataset.topic);

    // interaction: change active chip and filter cards
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
            chip.setAttribute('aria-pressed', 'true');
            filterByTopic(chip.dataset.topic);
        });
    });
});

// === Interaktive Chips für "Über mich" ===
(function(){
  const chips = document.querySelectorAll('.chip-row .chip');
  const cards = document.querySelectorAll('.about-card');
  if(!chips.length || !cards.length) return;

  function update(topic){
    cards.forEach(c=>{
      const show = topic==='reset' || c.dataset.topic===topic || topic===null;
      c.style.display = show ? '' : 'none';
    });
  }
  update(null); // Start: alles anzeigen

  chips.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const topic = btn.dataset.topic;
      // aria-pressed toggeln
      chips.forEach(c=>c.setAttribute('aria-pressed','false'));
      if(topic!=='reset'){ btn.setAttribute('aria-pressed','true'); }
      update(topic);
    });
    // Space/Enter via Button ist nativ handled
  });
})();

// === Mini-Quiz ===
(function(){
  const form = document.getElementById('quiz-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const answered = ['q1','q2','q3'].every(q => data.get(q));
    const out = document.getElementById('quiz-result');
    if(!answered){
      out.textContent = 'Bitte beantworte alle Fragen 😊';
      out.classList.remove('hidden');
      return;
    }
    out.textContent = 'Nice! Du kennst jetzt meine Vorlieben – hier ein digitaler High‑Five 🙌';
    out.classList.remove('hidden');
  });
})();

