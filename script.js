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

// Sync number inputs with range sliders
function syncInputs(numberId, rangeId) {
    const numberInput = document.getElementById(numberId);
    const rangeInput = document.getElementById(rangeId);
    
    numberInput.addEventListener('input', (e) => {
        rangeInput.value = e.target.value;
        calculateLoan();
    });
    
    rangeInput.addEventListener('input', (e) => {
        numberInput.value = e.target.value;
        calculateLoan();
    });
}

syncInputs('homePrice', 'homePriceRange');
syncInputs('downPayment', 'downPaymentRange');
syncInputs('interestRate', 'interestRateRange');
syncInputs('loanTerm', 'loanTermRange');

// Financing Calculator
function calculateLoan() {
    // Get input values
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTermYears = parseInt(document.getElementById('loanTerm').value);
    
    // Calculate loan details
    const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTermYears * 12;
    
    // Calculate monthly payment using mortgage formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment;
    if (monthlyInterestRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments;
    } else {
        monthlyPayment = loanAmount * 
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;
    
    // Helper function to format currency
    function formatCurrency(amount) {
        return '€ ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Update display
    document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('loanAmount').textContent = formatCurrency(loanAmount);
    document.getElementById('downPaymentAmount').textContent = formatCurrency(downPaymentAmount);
    document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
    
    // Update chart
    updateChart(loanAmount, totalInterest, downPaymentAmount);
}

// Chart functionality using simple canvas drawing
function updateChart(principal, interest, downPayment) {
    const canvas = document.getElementById('paymentChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const total = principal + interest + downPayment;
    const principalPercent = (principal / total) * 100;
    const interestPercent = (interest / total) * 100;
    const downPaymentPercent = (downPayment / total) * 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = 80;
    const spacing = 100;
    const startX = (canvas.width - (barWidth * 3 + spacing * 2)) / 2;
    const maxHeight = 200;
    
    // Down Payment Bar
    const downPaymentHeight = (downPaymentPercent / 100) * maxHeight;
    const downPaymentGradient = ctx.createLinearGradient(0, 0, 0, maxHeight);
    downPaymentGradient.addColorStop(0, '#43e97b');
    downPaymentGradient.addColorStop(1, '#38f9d7');
    
    ctx.fillStyle = downPaymentGradient;
    ctx.fillRect(startX, canvas.height - downPaymentHeight - 50, barWidth, downPaymentHeight);
    ctx.fillStyle = '#333';
    ctx.font = '14px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Down Payment', startX + barWidth / 2, canvas.height - 30);
    ctx.fillText(downPaymentPercent.toFixed(1) + '%', startX + barWidth / 2, canvas.height - 15);
    
    // Principal Bar
    const principalHeight = (principalPercent / 100) * maxHeight;
    const principalGradient = ctx.createLinearGradient(0, 0, 0, maxHeight);
    principalGradient.addColorStop(0, '#2c5f2d');
    principalGradient.addColorStop(1, '#97c97e');
    
    ctx.fillStyle = principalGradient;
    ctx.fillRect(startX + barWidth + spacing, canvas.height - principalHeight - 50, barWidth, principalHeight);
    ctx.fillStyle = '#333';
    ctx.fillText('Principal', startX + barWidth + spacing + barWidth / 2, canvas.height - 30);
    ctx.fillText(principalPercent.toFixed(1) + '%', startX + barWidth + spacing + barWidth / 2, canvas.height - 15);
    
    // Interest Bar
    const interestHeight = (interestPercent / 100) * maxHeight;
    const interestGradient = ctx.createLinearGradient(0, 0, 0, maxHeight);
    interestGradient.addColorStop(0, '#e67e22');
    interestGradient.addColorStop(1, '#f39c12');
    
    ctx.fillStyle = interestGradient;
    ctx.fillRect(startX + (barWidth + spacing) * 2, canvas.height - interestHeight - 50, barWidth, interestHeight);
    ctx.fillStyle = '#333';
    ctx.fillText('Interest', startX + (barWidth + spacing) * 2 + barWidth / 2, canvas.height - 30);
    ctx.fillText(interestPercent.toFixed(1) + '%', startX + (barWidth + spacing) * 2 + barWidth / 2, canvas.height - 15);
    
    // Title
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2c5f2d';
    ctx.fillText('Cost Breakdown', canvas.width / 2, 30);
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
    showNotification('Thank you for your interest! We will contact you within 24 hours.');
    
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
    // Calculate loan on page load
    calculateLoan();
    
    // Add animation classes
    const animatedElements = document.querySelectorAll('.about-card, .gallery-item, .feature-item, .result-card');
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
            calculateLoan();
        }, 250);
    });
});
