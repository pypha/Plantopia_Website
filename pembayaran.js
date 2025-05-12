document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const downloadBtn = document.getElementById('download-btn');
    const closeBtn = document.getElementById('close-btn');
    const barcodeImg = document.getElementById('barcode-image');
    const barcodeNumber = document.getElementById('barcode-number');

    // Extract transaction ID from barcode number
    const transactionId = barcodeNumber.textContent.trim();
    
    // Update barcode image source with transaction ID
    barcodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(transactionId)}`;
    barcodeImg.alt = `Barcode untuk transaksi ${transactionId}`;

    // Download functionality
    downloadBtn.addEventListener('click', function() {
        // Create a temporary canvas to ensure quality download
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Handle CORS if needed
        img.crossOrigin = 'Anonymous';
        
        img.onload = function() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            
            // Create download link
            const link = document.createElement('a');
            link.download = `barcode-${transactionId}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Show download confirmation
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Berhasil Diunduh!';
            downloadBtn.style.backgroundColor = '#138496';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                downloadBtn.textContent = originalText;
                downloadBtn.style.backgroundColor = '#28a745';
            }, 2000);
        };
        
        img.onerror = function() {
            alert('Gagal memuat gambar barcode. Silakan coba lagi.');
        };
        
        img.src = barcodeImg.src;
    });

    // Close button functionality
    closeBtn.addEventListener('click', function() {
        // Try to close the window
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.close();
        }
        
        // Fallback if window can't be closed
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 500);
    });

    // Add animation when page loads
    document.querySelector('.barcode-container').style.animation = 'fadeIn 0.5s ease-out';
});

// Add keydown event for better accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('close-btn').click();
    }
});