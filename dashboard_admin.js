document.addEventListener('DOMContentLoaded', function() {
    // Navigation Tabs
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const target = this.getAttribute('href').substring(1);
            document.getElementById(`${target}-content`).classList.add('active');
            
            // Update page title
            pageTitle.textContent = this.textContent.trim();
        });
    });
    
    // Sample data for charts (would be replaced with real data in production)
    const statsData = {
        members: 1248,
        products: 56,
        discussions: 89,
        orders: 42
    };
    
    // Update stats cards
    document.querySelector('.stat-card:nth-child(1) h3').textContent = statsData.members;
    document.querySelector('.stat-card:nth-child(2) h3').textContent = statsData.products;
    document.querySelector('.stat-card:nth-child(3) h3').textContent = statsData.discussions;
    document.querySelector('.stat-card:nth-child(4) h3').textContent = statsData.orders;
    
    // Product management - toggle edit mode (sample functionality)
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.product-actions')) {
                e.stopPropagation();
                return;
            }
            
            // In a real app, this would open a detailed view
            console.log('View product details');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            
            // In a real app, this would filter the current view
            alert(`Fitur pencarian: ${searchTerm}`);
        }
    });
    
    // Notification bell
    const notificationBell = document.querySelector('.notifications');
    
    notificationBell.addEventListener('click', function() {
        alert('Fitur notifikasi akan menampilkan pemberitahuan penting');
    });
    
    // Add product button
    const addProductBtn = document.querySelector('#produk-content .btn-primary');
    
    addProductBtn.addEventListener('click', function() {
        alert('Form tambah produk akan muncul di sini');
    });
    
    // Add member button
    const addMemberBtn = document.querySelector('#komunitas-content .btn-primary');
    
    addMemberBtn.addEventListener('click', function() {
        alert('Form tambah anggota akan muncul di sini');
    });
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Mencoba membuka:', this.href);
    });
});