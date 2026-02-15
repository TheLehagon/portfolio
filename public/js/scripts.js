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
   DARK MODE TOGGLE
---------------------------- */
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Check localStorage for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.classList.add('active');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', (e) => {
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create overlay for ripple effect
    const overlay = document.createElement('div');
    overlay.className = 'dark-mode-overlay';
    overlay.style.setProperty('--x', x + 'px');
    overlay.style.setProperty('--y', y + 'px');
    document.body.appendChild(overlay);

    // Toggle dark mode after a short delay
    setTimeout(() => {
      document.body.classList.toggle('dark-mode');
      themeToggle.classList.toggle('active');
      
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
      
      // Save preference
      localStorage.setItem('darkMode', isDark);
    }, 400);

    // Remove overlay after animation
    setTimeout(() => {
      overlay.remove();
    }, 900);
  });
})();

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
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) themeToggleBtn.classList.remove('hidden');
  });
})();

/* ---------------------------
   INTERACTIVE PARTICLE BACKGROUND ANIMATION
---------------------------- */
(function() {
  const bgContainer = document.getElementById('bg-animation');
  if (!bgContainer) return;

  const PARTICLE_COUNT = 10;
  const particles = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  class Particle {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = `particle type-${Math.floor(Math.random() * 3) + 1}`;
      
      this.size = Math.random() * 20 + 10;
      this.element.style.width = this.size + 'px';
      this.element.style.height = this.size + 'px';
      
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      
      this.opacity = Math.random() * 0.25 + 0.1;
      this.element.style.opacity = this.opacity;
      
      this.animationDuration = Math.random() * 15 + 12;
      this.element.style.animation = `floatParticle ${this.animationDuration}s ease-in-out infinite`;
      this.element.style.animationDelay = Math.random() * 2 + 's';
      
      bgContainer.appendChild(this.element);
    }

    update(mouseX, mouseY, scrollProgress) {
      // Bewegung basierend auf Scroll
      this.y += this.vy + (scrollProgress * 0.1);
      
      // Partikel folgen der Maus (Attraktion)
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 250) {
        const force = (250 - distance) / 250 * 0.2;
        this.x += (dx / distance) * force;
        this.y += (dy / distance) * force;
      }
      
      // Eigenständige Bewegung
      this.x += this.vx;
      
      // Wrap around screen
      if (this.x < -20) this.x = window.innerWidth + 20;
      if (this.x > window.innerWidth + 20) this.x = -20;
      if (this.y < -20) this.y = window.innerHeight + 20;
      if (this.y > window.innerHeight + 20) this.y = -20;
      
      // Update position
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
      
      // Opacity basierend auf Scrollfortschritt
      const baseOpacity = this.opacity + (scrollProgress * 0.1);
      this.element.style.opacity = Math.min(0.4, baseOpacity);
    }
  }

  // Initialize particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Mouse leave
  document.addEventListener('mouseleave', () => {
    mouseX = window.innerWidth / 2;
    mouseY = -100;
  });

  // Animation loop
  function animate() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = windowHeight > 0 ? window.scrollY / windowHeight : 0;

    particles.forEach(particle => {
      particle.update(mouseX, mouseY, scrollProgress);
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
