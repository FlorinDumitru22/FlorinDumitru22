// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Funding Progress Tracker
function updateFundingProgress() {
    const totalGoal = 85000;
    const raisedAmount = 32450;
    const percentage = Math.round((raisedAmount / totalGoal) * 100);
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    // Update chart
    updateChart(raisedAmount, totalGoal - raisedAmount);
}

// Chart functionality for funding breakdown
function updateChart(raised, remaining) {
    const canvas = document.getElementById('paymentChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const total = raised + remaining;
    const raisedPercent = (raised / total) * 100;
    const remainingPercent = (remaining / total) * 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = 120;
    const spacing = 80;
    const startX = (canvas.width - (barWidth * 2 + spacing)) / 2;
    const maxHeight = 200;
    
    // Raised Bar
    const raisedHeight = (raisedPercent / 100) * maxHeight;
    const raisedGradient = ctx.createLinearGradient(0, 0, 0, maxHeight);
    raisedGradient.addColorStop(0, '#2c5f2d');
    raisedGradient.addColorStop(1, '#97c97e');
    
    ctx.fillStyle = raisedGradient;
    ctx.fillRect(startX, canvas.height - raisedHeight - 50, barWidth, raisedHeight);
    ctx.fillStyle = '#333';
    ctx.font = '14px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Raised', startX + barWidth / 2, canvas.height - 30);
    ctx.fillText('€' + raised.toLocaleString(), startX + barWidth / 2, canvas.height - 15);
    
    // Remaining Bar
    const remainingHeight = (remainingPercent / 100) * maxHeight;
    const remainingGradient = ctx.createLinearGradient(0, 0, 0, maxHeight);
    remainingGradient.addColorStop(0, '#e67e22');
    remainingGradient.addColorStop(1, '#f39c12');
    
    ctx.fillStyle = remainingGradient;
    ctx.fillRect(startX + barWidth + spacing, canvas.height - remainingHeight - 50, barWidth, remainingHeight);
    ctx.fillStyle = '#333';
    ctx.fillText('Remaining', startX + barWidth + spacing + barWidth / 2, canvas.height - 30);
    ctx.fillText('€' + remaining.toLocaleString(), startX + barWidth + spacing + barWidth / 2, canvas.height - 15);
    
    // Title
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2c5f2d';
    ctx.fillText('Funding Progress', canvas.width / 2, 30);
}

// Contact Form Handler
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send data to a server
    console.log('Form submitted:', { name, email, phone, interest, message });
    
    // Show success message with better UX
    showNotification('Thank you for your interest! We\'ll be in touch within 24 hours.');
    
    // Reset form
    event.target.reset();
}

// Show notification function for better UX
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c5f2d;
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Update funding progress on page load
    updateFundingProgress();
    
    // Initialize materials chart
    initMaterialsChart();
    
    // Add animation classes
    const animatedElements = document.querySelectorAll('.about-card, .gallery-item, .feature-item, .stat-card, .tier-card, .update-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Resize chart on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateFundingProgress();
            initMaterialsChart();
        }, 250);
    });
    
    // Load current language
    const savedLang = localStorage.getItem('language') || 'en';
    switchLanguage(savedLang);
});

// Multi-language Support
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.funding': 'Funding',
        'nav.updates': 'Updates',
        'nav.progress': 'Progress',
        'nav.volunteer': 'Volunteer',
        'nav.support': 'Support',
        'hero.title': 'Crowdsourced Off-Grid Timber Frame House',
        'hero.subtitle': 'Join us in building a sustainable off-grid home in the Carpathian Mountains',
        'hero.cta': 'Support Our Project',
        'about.title': 'About Our Project',
        'about.timber.title': 'Timber Frame Construction',
        'about.timber.desc': 'Traditional timber frame building using locally sourced wood from sustainable Carpathian forests. A timeless construction method that\'s both beautiful and durable.',
        'about.offgrid.title': 'Off-Grid Living',
        'about.offgrid.desc': 'Completely self-sufficient with solar panels, rainwater harvesting, and natural heating systems. Living in harmony with nature.',
        'about.community.title': 'Community Crowdsourced',
        'about.community.desc': 'Built by and for the community. Your contribution helps create a demonstration of sustainable living and inspires others to follow.',
        'about.eco.title': 'Eco-Friendly Design',
        'about.eco.desc': 'Minimal environmental impact using natural materials, passive solar design, and renewable energy. A blueprint for sustainable mountain living.',
        'funding.title': 'Crowdfunding Progress',
        'funding.subtitle': 'Help us build this sustainable off-grid timber frame home',
        'funding.stats.goal': 'Total Goal',
        'funding.stats.raised': 'Raised So Far',
        'funding.stats.supporters': 'Supporters',
        'funding.stats.days': 'Days Remaining',
        'funding.funded': 'funded',
        'funding.stages.title': 'Funding by Build Stage',
        'funding.stages.fencing.title': 'Fencing & Site Security',
        'funding.stages.foundations.title': 'Foundations Build',
        'funding.stages.timber.title': 'Timber Frame',
        'funding.stages.insulation.title': 'Insulation & Walls',
        'funding.stages.roof.title': 'Roof Installation',
        'funding.stages.status.complete': '✓ Complete',
        'funding.stages.status.progress': 'In Progress - 75%',
        'funding.stages.status.pending': 'Pending - 30%',
        'funding.stages.status.not_started': 'Not Started',
        'funding.tiers.title': 'Support Tiers',
        'funding.tiers.seed.title': 'Seed Supporter',
        'funding.tiers.seed.benefit1': 'Project updates via email',
        'funding.tiers.seed.benefit2': 'Name on supporter wall',
        'funding.tiers.seed.benefit3': 'Digital thank you card',
        'funding.tiers.timber.title': 'Timber Friend',
        'funding.tiers.timber.benefit1': 'All Seed Supporter benefits',
        'funding.tiers.timber.benefit2': 'Invitation to build events',
        'funding.tiers.timber.benefit3': 'Photo with completed house',
        'funding.tiers.timber.benefit4': 'Personalized timber beam',
        'funding.tiers.guardian.title': 'Forest Guardian',
        'funding.tiers.guardian.benefit1': 'All Timber Friend benefits',
        'funding.tiers.guardian.benefit2': 'Weekend stay in completed house',
        'funding.tiers.guardian.benefit3': 'Workshop on timber framing',
        'funding.tiers.guardian.benefit4': 'Commemorative plaque',
        'funding.tiers.builder.title': 'Mountain Builder',
        'funding.tiers.builder.benefit1': 'All Forest Guardian benefits',
        'funding.tiers.builder.benefit2': 'Week-long stay privilege',
        'funding.tiers.builder.benefit3': 'Hands-on building experience',
        'funding.tiers.builder.benefit4': 'Name on foundation stone',
        'funding.tiers.button': 'Choose Tier',
        'funding.cart.title': 'Your Selection',
        'funding.cart.remove': 'Remove',
        'funding.cart.total': 'Total:',
        'funding.cart.checkout': 'Proceed to Checkout',
        'funding.payment.title': 'Payment Options',
        'funding.payment.stripe': 'Pay with Card (Stripe)',
        'funding.payment.paypal': 'Pay with PayPal',
        'funding.payment.bank': 'Bank Transfer',
        'funding.payment.note': 'All payments are secure and encrypted. You\'ll receive a confirmation email with your supporter benefits.',
        'gallery.title': 'Project Gallery',
        'gallery.subtitle': 'Timber frame design and off-grid features',
        'notifications.tier_selected': 'Added {tierName} (€{amount}) to your selection.',
        'notifications.cart_cleared': 'Selection cleared.',
        'notifications.select_tier': 'Please select a support tier first.',
        'features.title': 'Project Features',
        'features.transparent': '100% Transparent',
        'features.transparent_desc': 'Every euro tracked and shared publicly with regular updates',
        'features.community': 'Community Driven',
        'features.community_desc': 'Built by volunteers and supporters who share our vision',
        'features.educational': 'Educational',
        'features.educational_desc': 'Workshops and tutorials on sustainable off-grid living',
        'features.opensource': 'Open Source',
        'features.opensource_desc': 'Plans and learnings shared freely with the community',
        'updates.title': 'Project Updates',
        'updates.subtitle': 'Latest news from the build site',
        'progress.title': 'Build Progress',
        'progress.subtitle': 'Watch our timber frame house come to life',
        'progress.livestream': 'Live from the Build Site',
        'volunteer.title': 'Volunteer Schedule',
        'volunteer.subtitle': 'Join us on the build site',
        'materials.title': 'Materials & Costs',
        'materials.subtitle': 'Transparent breakdown of project expenses',
        'contact.title': 'Join Our Community',
        'contact.subtitle': 'Get involved in building this sustainable project',
        'contact.email': 'Email',
        'contact.location': 'Project Location',
        'contact.social': 'Social Media',
        'contact.follow': 'Follow our progress!',
        'contact.builddays': 'Build Days',
        'contact.schedule': 'Weekends & Holidays',
        'contact.join': 'Join the building team!',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.phone': 'Your Phone',
        'contact.form.interest': 'I want to...',
        'contact.form.option1': 'Support Financially',
        'contact.form.option2': 'Volunteer to Build',
        'contact.form.option3': 'Visit the Project',
        'contact.form.option4': 'Get Updates',
        'contact.form.option5': 'Other',
        'contact.form.message': 'Tell us how you\'d like to get involved...',
        'contact.form.submit': 'Join the Project',
        'updates.card1.title': 'Foundation Complete!',
        'updates.card1.text': 'We\'ve finished laying the foundation for our timber frame house. The concrete has cured perfectly, and we\'re ready for the timber frame raising next week.',
        'updates.card1.readmore': 'Read More →',
        'updates.card2.title': 'Solar Panels Ordered',
        'updates.card2.text': 'Thanks to our amazing supporters, we\'ve ordered a 10kW solar panel system with battery storage. Installation scheduled for January.',
        'updates.card2.readmore': 'Read More →',
        'updates.card3.title': 'Community Build Weekend Success',
        'updates.card3.text': 'Over 30 volunteers joined us for the foundation prep. Amazing community spirit and we\'re ahead of schedule!',
        'updates.card3.readmore': 'Read More →',
        'progress.timeline.site.title': 'Site Preparation - Completed',
        'progress.timeline.site.desc': 'Land cleared, access road built',
        'progress.timeline.foundation.title': 'Foundation - Completed',
        'progress.timeline.foundation.desc': 'Concrete foundation laid and cured',
        'progress.timeline.timber.title': 'Timber Frame - In Progress',
        'progress.timeline.timber.desc': 'Timber delivery and frame raising',
        'progress.timeline.timber.badge': 'Current Phase',
        'progress.timeline.roof.title': 'Roof & Walls - Upcoming',
        'progress.timeline.roof.desc': 'Roof installation and wall panels',
        'progress.timeline.systems.title': 'Off-Grid Systems - Planned',
        'progress.timeline.systems.desc': 'Solar, water, heating installation',
        'progress.livestream.placeholder': 'Live stream will start during build days',
        'progress.livestream.schedule': 'Next stream: Saturday, Dec 7 @ 9:00 AM',
        'progress.livestream.notify': 'Notify Me',
        'volunteer.calendar.title': 'Upcoming Build Days',
        'volunteer.expect.title': 'What to Expect',
        'volunteer.expect.hours': '8:00 AM - 5:00 PM build days',
        'volunteer.expect.lunch': 'Lunch and refreshments provided',
        'volunteer.expect.safety': 'Safety equipment supplied',
        'volunteer.expect.instruction': 'Expert instruction included',
        'volunteer.expect.accommodation': 'Accommodation available nearby',
        'volunteer.stats.total': 'Total Volunteers',
        'volunteer.stats.hours': 'Volunteer Hours',
        'materials.budget.title': 'Budget Allocation',
        'materials.detailed.title': 'Detailed Costs',
        'footer.tagline': 'Community-driven off-grid sustainable living since 2024',
        'footer.quicklinks': 'Quick Links',
        'footer.resources': 'Resources',
        'footer.connect': 'Connect',
        'footer.copyright': '© 2024 Carpathian Timber Frame Project. Open Source & Community Driven.'
    },
    ro: {
        'nav.home': 'Acasă',
        'nav.about': 'Despre',
        'nav.funding': 'Finanțare',
        'nav.updates': 'Noutăți',
        'nav.progress': 'Progres',
        'nav.volunteer': 'Voluntariat',
        'nav.support': 'Susține',
        'hero.title': 'Casă din Lemn Off-Grid Finanțată de Comunitate',
        'hero.subtitle': 'Alătură-te nouă în construirea unei case sustenabile off-grid în Munții Carpați',
        'hero.cta': 'Susține Proiectul',
        'about.title': 'Despre Proiectul Nostru',
        'about.timber.title': 'Construcție din Lemn',
        'about.timber.desc': 'Construcție tradițională din lemn folosind lemn de proveniență locală din pădurile durabile ale Carpaților. O metodă de construcție atemporală, atât frumoasă, cât și durabilă.',
        'about.offgrid.title': 'Viață Off-Grid',
        'about.offgrid.desc': 'Complet autosuficient cu panouri solare, colectare de apă pluvială și sisteme naturale de încălzire. Viața în armonie cu natura.',
        'about.community.title': 'Finanțat de Comunitate',
        'about.community.desc': 'Construit de și pentru comunitate. Contribuția ta ajută la crearea unei demonstrații de viață durabilă și inspiră pe alții să urmeze.',
        'about.eco.title': 'Design Ecologic',
        'about.eco.desc': 'Impact minim asupra mediului folosind materiale naturale, design solar pasiv și energie regenerabilă. Un model pentru viața durabilă în munte.',
        'funding.title': 'Progres Finanțare',
        'funding.subtitle': 'Ajută-ne să construim această casă sustenabilă din lemn off-grid',
        'funding.stats.goal': 'Obiectiv Total',
        'funding.stats.raised': 'Strâns Până Acum',
        'funding.stats.supporters': 'Susținători',
        'funding.stats.days': 'Zile Rămase',
        'funding.funded': 'finanțat',
        'funding.stages.title': 'Finanțare pe Etape de Construcție',
        'funding.stages.fencing.title': 'Împrejmuire & Securitate Șantier',
        'funding.stages.foundations.title': 'Construcție Fundații',
        'funding.stages.timber.title': 'Structură din Lemn',
        'funding.stages.insulation.title': 'Izolație & Pereți',
        'funding.stages.roof.title': 'Instalare Acoperiș',
        'funding.stages.status.complete': '✓ Completat',
        'funding.stages.status.progress': 'În Desfășurare - 75%',
        'funding.stages.status.pending': 'În Așteptare - 30%',
        'funding.stages.status.not_started': 'Neînceput',
        'funding.tiers.title': 'Niveluri de Susținere',
        'funding.tiers.seed.title': 'Susținător Sămânță',
        'funding.tiers.seed.benefit1': 'Actualizări proiect prin email',
        'funding.tiers.seed.benefit2': 'Nume pe peretele susținătorilor',
        'funding.tiers.seed.benefit3': 'Cartonaș de mulțumire digital',
        'funding.tiers.timber.title': 'Prieten al Lemnului',
        'funding.tiers.timber.benefit1': 'Toate beneficiile Susținător Sămânță',
        'funding.tiers.timber.benefit2': 'Invitație la evenimentele de construcție',
        'funding.tiers.timber.benefit3': 'Fotografie cu casa finalizată',
        'funding.tiers.timber.benefit4': 'Grindă personalizată',
        'funding.tiers.guardian.title': 'Paznic al Pădurii',
        'funding.tiers.guardian.benefit1': 'Toate beneficiile Prieten al Lemnului',
        'funding.tiers.guardian.benefit2': 'Sejur de weekend în casa finalizată',
        'funding.tiers.guardian.benefit3': 'Atelier despre construcția din lemn',
        'funding.tiers.guardian.benefit4': 'Placă comemorativă',
        'funding.tiers.builder.title': 'Constructor Montan',
        'funding.tiers.builder.benefit1': 'Toate beneficiile Paznic al Pădurii',
        'funding.tiers.builder.benefit2': 'Privilegiu de sejur o săptămână',
        'funding.tiers.builder.benefit3': 'Experiență practică de construcție',
        'funding.tiers.builder.benefit4': 'Nume pe piatra de temelie',
        'funding.tiers.button': 'Alege Nivel',
        'funding.cart.title': 'Selecția Ta',
        'funding.cart.remove': 'Elimină',
        'funding.cart.total': 'Total:',
        'funding.cart.checkout': 'Continuă la Plată',
        'funding.payment.title': 'Opțiuni de Plată',
        'funding.payment.stripe': 'Plătește cu Cardul (Stripe)',
        'funding.payment.paypal': 'Plătește cu PayPal',
        'funding.payment.bank': 'Transfer Bancar',
        'funding.payment.note': 'Toate plățile sunt sigure și criptate. Vei primi un email de confirmare cu beneficiile tale de susținător.',
        'gallery.title': 'Galerie Proiect',
        'gallery.subtitle': 'Design structură din lemn și caracteristici off-grid',
        'notifications.tier_selected': 'Adăugat {tierName} (€{amount}) la selecția ta.',
        'notifications.cart_cleared': 'Selecție ștearsă.',
        'notifications.select_tier': 'Te rugăm să selectezi mai întâi un nivel de susținere.',
        'features.title': 'Caracteristici Proiect',
        'features.transparent': '100% Transparent',
        'features.transparent_desc': 'Fiecare euro urmărit și partajat public cu actualizări regulate',
        'features.community': 'Condus de Comunitate',
        'features.community_desc': 'Construit de voluntari și susținători care împărtășesc viziunea noastră',
        'features.educational': 'Educațional',
        'features.educational_desc': 'Ateliere și tutoriale despre viața sustenabilă off-grid',
        'features.opensource': 'Sursă Deschisă',
        'features.opensource_desc': 'Planuri și învățături partajate liber cu comunitatea',
        'updates.title': 'Actualizări Proiect',
        'updates.subtitle': 'Ultimele știri de la șantier',
        'progress.title': 'Progres Construcție',
        'progress.subtitle': 'Urmărește cum prinde viață casa noastră din lemn',
        'progress.livestream': 'Live de la Șantier',
        'volunteer.title': 'Program Voluntariat',
        'volunteer.subtitle': 'Alătură-te nouă la șantier',
        'materials.title': 'Materiale & Costuri',
        'materials.subtitle': 'Detaliere transparentă a cheltuielilor proiectului',
        'contact.title': 'Alătură-te Comunității',
        'contact.subtitle': 'Implică-te în construirea acestui proiect sustenabil',
        'contact.email': 'Email',
        'contact.location': 'Locație Proiect',
        'contact.social': 'Rețele Sociale',
        'contact.follow': 'Urmărește progresul nostru!',
        'contact.builddays': 'Zile de Construcție',
        'contact.schedule': 'Weekend-uri & Sărbători',
        'contact.join': 'Alătură-te echipei de construcție!',
        'contact.form.name': 'Numele Tău',
        'contact.form.email': 'Emailul Tău',
        'contact.form.phone': 'Telefonul Tău',
        'contact.form.interest': 'Doresc să...',
        'contact.form.option1': 'Susțin Financiar',
        'contact.form.option2': 'Voluntariez la Construcție',
        'contact.form.option3': 'Vizitez Proiectul',
        'contact.form.option4': 'Primesc Actualizări',
        'contact.form.option5': 'Altceva',
        'contact.form.message': 'Spune-ne cum ai dori să te implici...',
        'contact.form.submit': 'Alătură-te Proiectului',
        'updates.card1.title': 'Fundație Completată!',
        'updates.card1.text': 'Am terminat turnarea fundației pentru casa noastră din lemn. Betonul s-a întărit perfect și suntem gata pentru ridicarea structurii din lemn săptămâna viitoare.',
        'updates.card1.readmore': 'Citește Mai Mult →',
        'updates.card2.title': 'Panouri Solare Comandate',
        'updates.card2.text': 'Mulțumită susținătorilor noștri minunați, am comandat un sistem de panouri solare de 10kW cu stocare în baterii. Instalarea programată pentru ianuarie.',
        'updates.card2.readmore': 'Citește Mai Mult →',
        'updates.card3.title': 'Succes la Weekend-ul de Construcție Comunitară',
        'updates.card3.text': 'Peste 30 de voluntari s-au alăturat nouă pentru pregătirea fundației. Spirit comunitar uimitor și suntem înaintea programului!',
        'updates.card3.readmore': 'Citește Mai Mult →',
        'progress.timeline.site.title': 'Pregătire Teren - Completat',
        'progress.timeline.site.desc': 'Teren curățat, drum de acces construit',
        'progress.timeline.foundation.title': 'Fundație - Completat',
        'progress.timeline.foundation.desc': 'Fundație din beton turnată și întărită',
        'progress.timeline.timber.title': 'Structură din Lemn - În Desfășurare',
        'progress.timeline.timber.desc': 'Livrare lemn și ridicare structură',
        'progress.timeline.timber.badge': 'Faza Curentă',
        'progress.timeline.roof.title': 'Acoperiș & Pereți - Urmează',
        'progress.timeline.roof.desc': 'Instalare acoperiș și panouri pereți',
        'progress.timeline.systems.title': 'Sisteme Off-Grid - Planificate',
        'progress.timeline.systems.desc': 'Instalare solar, apă, încălzire',
        'progress.livestream.placeholder': 'Stream-ul live va începe în zilele de construcție',
        'progress.livestream.schedule': 'Următorul stream: Sâmbătă, 7 Dec @ 9:00 AM',
        'progress.livestream.notify': 'Anunță-mă',
        'volunteer.calendar.title': 'Zile de Construcție Viitoare',
        'volunteer.expect.title': 'La Ce Să Te Aștepți',
        'volunteer.expect.hours': 'Zile de construcție 8:00 AM - 5:00 PM',
        'volunteer.expect.lunch': 'Prânz și răcoritoare oferite',
        'volunteer.expect.safety': 'Echipament de siguranță furnizat',
        'volunteer.expect.instruction': 'Instrucțiuni de la experți incluse',
        'volunteer.expect.accommodation': 'Cazare disponibilă în apropiere',
        'volunteer.stats.total': 'Total Voluntari',
        'volunteer.stats.hours': 'Ore de Voluntariat',
        'materials.budget.title': 'Alocare Buget',
        'materials.detailed.title': 'Costuri Detaliate',
        'footer.tagline': 'Viață sustenabilă off-grid condusă de comunitate din 2024',
        'footer.quicklinks': 'Linkuri Rapide',
        'footer.resources': 'Resurse',
        'footer.connect': 'Conectare',
        'footer.copyright': '© 2024 Proiect Carpathian Timber Frame. Open Source & Condus de Comunitate.'
    }
};

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('data-lang', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Helper function to get translated text
function getTranslation(key, replacements = {}) {
    const lang = localStorage.getItem('language') || 'en';
    let text = translations[lang] && translations[lang][key] ? translations[lang][key] : key;
    
    // Replace placeholders like {tierName}, {amount}
    Object.keys(replacements).forEach(placeholder => {
        text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    
    return text;
}

// Payment Integration (Stripe)
let selectedTierAmount = 0;
let selectedTierName = '';

// Cart System
function selectTier(amount, tierName) {
    selectedTierAmount = amount;
    selectedTierName = tierName;
    
    // Update cart UI
    document.getElementById('cartTierName').textContent = tierName;
    document.getElementById('cartTierAmount').textContent = `€ ${amount}`;
    document.getElementById('cartTotal').textContent = `€ ${amount}`;
    
    // Show cart section
    document.getElementById('cartSection').style.display = 'block';
    
    // Scroll to cart
    document.getElementById('cartSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    const message = getTranslation('notifications.tier_selected', { tierName, amount });
    showNotification(message);
}

function clearCart() {
    selectedTierAmount = 0;
    selectedTierName = '';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    
    const message = getTranslation('notifications.cart_cleared');
    showNotification(message);
}

function proceedToCheckout() {
    if (selectedTierAmount === 0) {
        const message = getTranslation('notifications.select_tier');
        showNotification(message);
        return;
    }
    
    // Show payment section
    document.getElementById('paymentSection').style.display = 'block';
    
    // Scroll to payment
    document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initiateStripePayment() {
    if (selectedTierAmount === 0) {
        const message = getTranslation('notifications.select_tier');
        showNotification(message);
        return;
    }
    
    // Check if Stripe is loaded
    if (typeof Stripe === 'undefined') {
        showNotification('Stripe is not loaded. Please refresh the page.');
        return;
    }
    
    // In production, this would use your actual Stripe publishable key
    // const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY');
    
    showNotification(`Stripe checkout for €${selectedTierAmount} would open here. 
        
To complete integration:
1. Add your Stripe publishable key
2. Create backend endpoint /create-checkout-session
3. Uncomment integration code in script.js`);
    
    // Production code (uncomment when backend is ready):
    /*
    fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount: selectedTierAmount,
            tierName: selectedTierName,
            currency: 'eur'
        })
    })
    .then(response => response.json())
    .then(session => {
        const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY');
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            showNotification(result.error.message);
        }
    })
    .catch(error => {
        showNotification('Payment failed. Please try again.');
        console.error('Error:', error);
    });
    */
}

function initiatePayPalPayment() {
    if (selectedTierAmount === 0) {
        showNotification('Please select a support tier first.');
        return;
    }
    
    showNotification(`PayPal payment of €${selectedTierAmount} would be processed here. Backend integration required.`);
    
    // Placeholder for PayPal integration
    // paypal.Buttons({ ... }).render('#paypal-button-container');
}

function showBankDetails() {
    const detailsDiv = document.getElementById('payment-details');
    detailsDiv.style.display = 'block';
    detailsDiv.innerHTML = `
        <h4>Bank Transfer Details</h4>
        <p><strong>Bank:</strong> BCR Romania</p>
        <p><strong>IBAN:</strong> RO49RNCB0000000000000001</p>
        <p><strong>Swift/BIC:</strong> RNCBROBU</p>
        <p><strong>Account Name:</strong> Carpathian Timber Frame Project</p>
        <p><strong>Amount:</strong> €${selectedTierAmount || '___'}</p>
        <p><strong>Reference:</strong> Your name + tier level</p>
        <p class="note">Please email us at hello@carpathiantimber.org after making the transfer.</p>
    `;
}

// Materials Cost Chart
function initMaterialsChart() {
    const canvas = document.getElementById('materialsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const costs = [
        { label: 'Timber', amount: 18500, color: '#8B4513' },
        { label: 'Solar', amount: 15000, color: '#FFD700' },
        { label: 'Foundation', amount: 12000, color: '#696969' },
        { label: 'Roof', amount: 9000, color: '#B22222' },
        { label: 'Windows', amount: 0, color: '#87CEEB' },
        { label: 'Systems', amount: 0, color: '#32CD32' }
    ];
    
    const total = costs.reduce((sum, item) => sum + item.amount, 1);
    let startAngle = 0;
    
    costs.forEach(item => {
        const sliceAngle = (item.amount / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, 120, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        if (item.amount > 0) {
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = canvas.width / 2 + Math.cos(labelAngle) * 80;
            const labelY = canvas.height / 2 + Math.sin(labelAngle) * 80;
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, labelX, labelY);
        }
        
        startAngle += sliceAngle;
    });
}

// Volunteer Signup
function signupForBuildDay(date) {
    showNotification(`Volunteer signup for ${date} would open here. Backend integration required for scheduling.`);
    // In production, this would open a form to collect volunteer details
}

// Live Stream Notification
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('You\'ll receive an email notification before the next live stream!');
    });
});

// Signup buttons
document.querySelectorAll('.signup-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!e.target.disabled) {
            showNotification('Volunteer registration would open here. Backend integration required.');
        }
    });
});

