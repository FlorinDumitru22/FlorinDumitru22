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

// Tier Selection
function selectTier(amount) {
    showNotification(`Thank you for choosing the €${amount} tier! You'll be redirected to payment...`);
    // In a real application, this would redirect to a payment processor
    console.log(`Selected tier: €${amount}`);
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
        'materials.subtitle': 'Transparent breakdown of project expenses'
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
        'materials.subtitle': 'Detaliere transparentă a cheltuielilor proiectului'
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
}

// Payment Integration (Stripe)
let selectedTierAmount = 0;

function selectTier(amount) {
    selectedTierAmount = amount;
    showNotification(`Selected €${amount} tier. Choose a payment method below.`);
    // Scroll to payment section
    document.querySelector('.payment-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initiateStripePayment() {
    if (selectedTierAmount === 0) {
        showNotification('Please select a support tier first.');
        return;
    }
    
    // In production, this would create a Stripe checkout session
    showNotification(`Stripe payment of €${selectedTierAmount} would be processed here. Backend integration required.`);
    
    // Placeholder for actual Stripe integration:
    // const stripe = Stripe('your_publishable_key');
    // fetch('/create-checkout-session', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount: selectedTierAmount })
    // })
    // .then(response => response.json())
    // .then(session => stripe.redirectToCheckout({ sessionId: session.id }));
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

