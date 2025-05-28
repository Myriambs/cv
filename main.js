// 🎯 Configuration et données centralisées
const PortfolioData = {
    skills: [
        {
            category: "Frontend Development",
            icon: "💻",
            skills: [
                "HTML5, CSS3, JavaScript ES6+",
                "React.js & Component Libraries",
                "Tailwind CSS & Responsive Design",
                "DOM Manipulation & APIs"
            ]
        },
        {
            category: "Backend Development",
            icon: "⚙️",
            skills: [
                "Node.js & Express.js",
                "MongoDB & Mongoose ODM",
                "SQL Databases & Queries",
                "RESTful API Development"
            ]
        },
        {
            category: "QA & Testing",
            icon: "🧪",
            skills: [
                "Postman API Testing",
                "Selenium WebDriver",
                "Karate DSL Framework",
                "JMeter Performance Testing"
            ]
        }
    ],
    
    projects: [
        {
            title: "QA Automation Framework - REST API Testing Suite",
            description: "Comprehensive testing framework with automated API validation and reporting",
            link: "https://github.com/yourusername/project1",
            tech: ["JavaScript", "Postman", "API Testing"],
            status: "Completed"
        },
        {
            title: "E-commerce Platform - Full Stack MERN Application",
            description: "Complete e-commerce solution with user authentication and payment integration",
            link: "https://github.com/yourusername/project2",
            tech: ["React", "Node.js", "MongoDB"],
            status: "In Progress"
        },
        {
            title: "Interactive Portfolio Website",
            description: "Modern, responsive portfolio showcasing technical skills and projects",
            link: "https://github.com/yourusername/project3",
            tech: ["HTML", "CSS", "JavaScript"],
            status: "Completed"
        }
    ],
    
    certificates: [
        {
            title: "ISTQB Foundation Level",
            description: "Software Testing Fundamentals",
            issuer: "ISTQB",
            date: "2024",
            credentialId: "ISTQB-2024-001"
        },
        {
            title: "REST API Testing with Postman",
            description: "API Automation & Validation",
            issuer: "Postman",
            date: "2024",
            credentialId: "POST-2024-002"
        },
        {
            title: "React JS Complete Guide",
            description: "Modern Frontend Development",
            issuer: "Udemy",
            date: "2023",
            credentialId: "REACT-2023-003"
        }
    ]
};

// 🎨 Templates pour le rendu HTML
const Templates = {
    skill: (skillCategory) => `
        <div class="skill-category">
            <h4>${skillCategory.icon} ${skillCategory.category}</h4>
            <ul>
                ${skillCategory.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `,
    
    project: (project) => `
        <div class="project-item" data-status="${project.status}">
            <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                ${project.title}
            </a>
            <p>${project.description}</p>
            ${project.tech ? `
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            ` : ''}
            <div class="project-status">${project.status}</div>
        </div>
    `,
    
    certificate: (certificate) => `
        <div class="certificate-item">
            <strong>${certificate.title}</strong>
            <p>${certificate.description}</p>
            <div class="certificate-meta">
                <span class="issuer">${certificate.issuer}</span>
                <span class="date">${certificate.date}</span>
            </div>
        </div>
    `
};

// 🏗️ Gestionnaire de rendu optimisé
class PortfolioRenderer {
    constructor() {
        this.containers = {
            skills: document.getElementById('skills-container'),
            projects: document.getElementById('projects-container'),
            certificates: document.getElementById('certificates-container')
        };
        this.activeSection = null;
    }

    // Vérification de l'existence des conteneurs
    validateContainers() {
        return Object.values(this.containers).every(container => container !== null);
    }

    // Rendu avec gestion d'erreurs
    render(section) {
        try {
            if (!this.containers[section]) {
                throw new Error(`Container for ${section} not found`);
            }

            const data = PortfolioData[section];
            const template = Templates[section.slice(0, -1)]; // Remove 's' from plural
            
            this.containers[section].innerHTML = data
                .map(item => template(item))
                .join('');
                
            console.log(`✅ ${section} rendered successfully`);
        } catch (error) {
            console.error(`❌ Error rendering ${section}:`, error);
            this.containers[section].innerHTML = `<p class="error">Failed to load ${section}</p>`;
        }
    }

    // Rendu de toutes les sections
    renderAll() {
        ['skills', 'projects', 'certificates'].forEach(section => this.render(section));
    }

    // Ajout d'un élément dynamiquement
    addItem(section, item) {
        PortfolioData[section].push(item);
        this.render(section);
    }
}

// 🎮 Gestionnaire d'interactions amélioré
class InteractionManager {
    constructor() {
        this.sections = new Set(['skills', 'projects', 'certificates']);
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setupSectionToggling();
        this.setupThemeToggling();
        this.setupButtonFeedback();
        this.setupKeyboardNavigation();
        this.restoreTheme();
    }

    // Gestion des sections avec fermeture automatique
    setupSectionToggling() {
        window.toggleSection = (id) => {
            const targetSection = document.getElementById(id);
            
            if (!targetSection) return;

            // Fermer les autres sections
            this.sections.forEach(sectionId => {
                if (sectionId !== id) {
                    const section = document.getElementById(sectionId);
                    if (section && !section.classList.contains('hidden')) {
                        section.classList.add('hidden');
                        section.classList.remove('show');
                    }
                }
            });

            // Toggle la section cible
            if (targetSection.classList.contains('hidden')) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('show');
                this.scrollToSection(targetSection);
            } else {
                targetSection.classList.add('hidden');
                targetSection.classList.remove('show');
            }
        };
    }

    // Défilement fluide vers la section
    scrollToSection(section) {
        setTimeout(() => {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }

    // Gestion du thème avec sauvegarde
    setupThemeToggling() {
        window.toggleTheme = () => {
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');
            
            if (!themeToggle) return;

            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
                this.currentTheme = 'dark';
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.textContent = '☀️';
                this.currentTheme = 'light';
            }
            
            localStorage.setItem('theme', this.currentTheme);
        };
    }

    // Restaurer le thème sauvegardé
    restoreTheme() {
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (this.currentTheme === 'light') {
            body.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.textContent = '☀️';
        }
    }

    // Feedback tactile amélioré
    setupButtonFeedback() {
        const buttons = document.querySelectorAll('button:not(.theme-toggle)');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
                this.animateButton(button);
            });
        });
    }

    // Effet de ondulation
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Animation de bouton
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Navigation au clavier
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        window.toggleSection('skills');
                        break;
                    case '2':
                        window.toggleSection('projects');
                        break;
                    case '3':
                        window.toggleSection('certificates');
                        break;
                    case 't':
                        window.toggleTheme();
                        break;
                }
            }
        });
    }
}

// 🎭 Gestionnaire d'animations
class AnimationManager {
    static animateProfileImage() {
        const profileImg = document.querySelector('.profile-img');
        if (!profileImg) return;

        profileImg.style.transition = 'transform 0.3s ease';
        profileImg.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
        }, 300);
    }

    static smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Animation de chargement pour les sections
    static fadeInSection(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
}

// 🚀 Initialisation principale
class PortfolioApp {
    constructor() {
        this.renderer = new PortfolioRenderer();
        this.interactionManager = new InteractionManager();
        this.isInitialized = false;
    }

    async init() {
        try {
            // Vérifications préliminaires
            if (!this.renderer.validateContainers()) {
                throw new Error('Required containers not found');
            }

            // Rendu du contenu
            this.renderer.renderAll();

            // Animations d'entrée
            setTimeout(() => {
                AnimationManager.animateProfileImage();
                AnimationManager.smoothScrollToTop();
            }, 500);

            // Ajouter les styles CSS pour les animations
            this.injectAnimationStyles();

            this.isInitialized = true;
            console.log('🎉 Portfolio initialized successfully');

        } catch (error) {
            console.error('❌ Portfolio initialization failed:', error);
        }
    }

    // Injection des styles d'animation
    injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            .error { 
                color: #ff6b6b; 
                text-align: center; 
                padding: 20px; 
            }
            .tech-tag {
                display: inline-block;
                background: rgba(255,255,255,0.1);
                padding: 2px 8px;
                margin: 2px;
                border-radius: 12px;
                font-size: 0.8em;
            }
            .project-status {
                font-size: 0.9em;
                opacity: 0.7;
                margin-top: 10px;
            }
            .certificate-meta {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-size: 0.9em;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }

    // API publique pour ajouter du contenu
    addSkill(category, icon, skills) {
        this.renderer.addItem('skills', { category, icon, skills });
    }

    addProject(title, description, link, tech = [], status = 'Completed') {
        this.renderer.addItem('projects', { title, description, link, tech, status });
    }

    addCertificate(title, description, issuer, date, credentialId) {
        this.renderer.addItem('certificates', { title, description, issuer, date, credentialId });
    }
}

// 🎯 Initialisation automatique
const portfolio = new PortfolioApp();

document.addEventListener('DOMContentLoaded', () => {
    portfolio.init();
});

// Export pour utilisation externe (optionnel)
window.Portfolio = {
    app: portfolio,
    data: PortfolioData,
    addSkill: (...args) => portfolio.addSkill(...args),
    addProject: (...args) => portfolio.addProject(...args),
    addCertificate: (...args) => portfolio.addCertificate(...args)
};