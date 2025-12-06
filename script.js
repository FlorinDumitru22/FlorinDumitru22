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
    
    // Add animation classes
    const animatedElements = document.querySelectorAll('.about-card, .gallery-item, .feature-item, .stat-card, .tier-card');
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
        }, 250);
    });
});
