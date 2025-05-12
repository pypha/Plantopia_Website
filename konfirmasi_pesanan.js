document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year automatically
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add animation to confirmation icon
    const confirmationIcon = document.querySelector('.confirmation-icon');
    if (confirmationIcon) {
        confirmationIcon.style.opacity = '0';
        confirmationIcon.style.transform = 'scale(0.5)';
        confirmationIcon.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            confirmationIcon.style.opacity = '1';
            confirmationIcon.style.transform = 'scale(1)';
        }, 100);
    }
});