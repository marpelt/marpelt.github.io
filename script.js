// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('.main-nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const statusFilters = document.querySelectorAll('.status-filter');
const projectCards = document.querySelectorAll('.project-card');

// Theme Toggle
function toggleTheme() {
   const currentTheme = document.documentElement.getAttribute('data-theme');
   const themeIcon = themeToggle.querySelector('i');

   if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
   } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
   }
}

// Language Toggle
function toggleLanguage() {
   const langText = langToggle.querySelector('.lang-text');
   const isEnglish = langText.textContent === 'EN';

   document.querySelectorAll('.lang-en').forEach(el => {
      el.style.display = isEnglish ? 'none' : 'block';
   });

   document.querySelectorAll('.lang-de').forEach(el => {
      el.style.display = isEnglish ? 'block' : 'none';
   });

   langText.textContent = isEnglish ? 'DE' : 'EN';

   localStorage.setItem('language', isEnglish ? 'de' : 'en');
}

// Check for saved theme preference
function checkTheme() {
   const savedTheme = localStorage.getItem('theme');
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   const themeIcon = themeToggle.querySelector('i');

   if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
   } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
   }
}

// Check for saved language preference
function checkLanguage() {
   const savedLang = localStorage.getItem('language') || 'en';
   const langText = langToggle.querySelector('.lang-text');


   if (savedLang === 'de') {
      document.querySelectorAll('.lang-en').forEach(el => {
         el.style.display = 'none';
      });
      document.querySelectorAll('.lang-de').forEach(el => {
         el.style.display = 'block';
      });
      langText.textContent = 'DE';
   } else {
      document.querySelectorAll('.lang-en').forEach(el => {
         el.style.display = 'block';
      });
      document.querySelectorAll('.lang-de').forEach(el => {
         el.style.display = 'none';
      });
      langText.textContent = 'EN';
   }
}

// Mobile Menu Toggle
function toggleMenu() {
   mainNav.classList.toggle('active');
   menuToggle.querySelector('i').classList.toggle('fa-times');
   menuToggle.querySelector('i').classList.toggle('fa-bars');
}

// Filter Projects by Category and Status
function filterProjects() {
   const activeCategory = document.querySelector('.filter-btn[data-filter].active').getAttribute('data-filter');
   const activeStatus = document.querySelector('.status-filter.active').getAttribute('data-status');

   projectCards.forEach(card => {
      const cardCategories = card.getAttribute('data-category').split(' ');
      const cardStatus = card.querySelector('.project-status').classList.contains('status-active') ? 'active' : 'completed';

      const categoryMatch = activeCategory === 'all' || cardCategories.includes(activeCategory);
      const statusMatch = activeStatus === 'all' || cardStatus === activeStatus;

      if (categoryMatch && statusMatch) {
         card.style.display = 'block';
         setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
         }, 10);
      } else {
         card.style.opacity = '0';
         card.style.transform = 'translateY(20px)';
         setTimeout(() => {
            card.style.display = 'none';
         }, 300);
      }
   });
}

function insertProtectedEmail() {
   const el = document.getElementById("mail");
   if (!el) return;

   const userEncoded = "bWFya3VzLnBlbHRzYXJzemt5";
   const domainEncoded = "Z21haWwuY29t";

   const user = atob(userEncoded);
   const domain = atob(domainEncoded);
   const email = `${user}@${domain}`;
   
   const a = document.createElement("a");
   a.href = `mailto:${email}`;
   a.textContent = email;

   setTimeout(() => {
      el.innerHTML = '';
      el.appendChild(a);
   }, Math.random() * 500 + 300);
}

function addProtectedEmail() {
   const el = document.getElementById("link-mail");
   if (!el) return;

   const userEncoded = "bWFya3VzLnBlbHRzYXJzemt5";
   const domainEncoded = "Z21haWwuY29t";

   const user = atob(userEncoded);
   const domain = atob(domainEncoded);
   const email = `${user}@${domain}`;

   const a = document.createElement("a");
   a.href = `mailto:${email}`;
   a.textContent = 'Email';

   setTimeout(() => {
      el.appendChild(a);
   }, Math.random() * 500 + 300);
}


// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
         window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
         });

         if (mainNav.classList.contains('active')) {
            toggleMenu();
         }
      }
   });
});

// Active Navigation Link on Scroll
function setActiveNavLink() {
   const scrollPosition = window.scrollY;
   const scrollBottom = scrollPosition + window.innerHeight;
   const docHeight = document.documentElement.scrollHeight;
   const tolerance = 5;

   if (scrollPosition <= tolerance) {
      document.querySelectorAll('.nav-link').forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
         }
      });
      return;
   }

   if (scrollBottom >= docHeight - tolerance) {
      document.querySelectorAll('.nav-link').forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === '#contact') {
            link.classList.add('active');
         }
      });
      return;
   }

   // Normale Abschnittsprüfung
   document.querySelectorAll('.section').forEach(section => {
      const sectionTop = section.offsetTop - 70;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const sectionBottom = sectionTop + sectionHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
         document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });
      }
   });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   checkTheme();
   checkLanguage();
   insertProtectedEmail();
   addProtectedEmail();

   // Event Listeners
   themeToggle.addEventListener('click', toggleTheme);
   langToggle.addEventListener('click', toggleLanguage);
   menuToggle.addEventListener('click', toggleMenu);

   // Category Filter Buttons
   document.querySelectorAll('.filter-btn[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
         document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => btn.classList.remove('active'));
         button.classList.add('active');
         filterProjects();
      });
   });

   // Status Filter Buttons
   document.querySelectorAll('.status-filter').forEach(button => {
      button.addEventListener('click', () => {
         document.querySelectorAll('.status-filter').forEach(btn => btn.classList.remove('active'));
         button.classList.add('active');
         filterProjects();
      });
   });

   window.addEventListener('scroll', setActiveNavLink);

   // Initialize project cards
   projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
   });

   // Trigger initial filter
   filterProjects();

   // Animate elements on scroll
   const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('animate');
         }
      });
   }, { threshold: 0.1 });

   document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
      animateOnScroll.observe(el);
   });

});
