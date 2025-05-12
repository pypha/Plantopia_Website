document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        confirmOrder();
    });
});

function confirmOrder() {
    // Get form values
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const shipping = document.getElementById('shipping').value;
    
    // Simple validation
    if (!name || !address || !shipping) {
        alert('Harap lengkapi semua field!');
        return false;
    }
    
    // Show confirmation
    const confirmation = confirm(`Konfirmasi pesanan:\n\nNama: ${name}\nAlamat: ${address}\nPengiriman: ${shipping === 'regular' ? 'Reguler' : 'Express'}\n\nLanjutkan pembayaran?`);
    
    if (confirmation) {
        alert("Pesanan berhasil dipesan! Terima kasih telah berbelanja.");
        window.location.href = "pembayaran.html";
    }
    
    return false;
}