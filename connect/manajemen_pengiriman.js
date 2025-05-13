document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const shippingTableBody = document.getElementById('shippingTableBody');
    const noShippingMessage = document.getElementById('noShippingMessage');
    const addShippingBtn = document.getElementById('addShippingBtn');
    const statusFilter = document.getElementById('statusFilter');
    const shippingModal = document.getElementById('shippingModal');
    const deleteModal = document.getElementById('deleteModal');
    const shippingForm = document.getElementById('shippingForm');
    const closeButtons = document.querySelectorAll('.close-button');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    let shippingData = [];
    let currentShippingId = null;
    let isEditMode = false;
    
    // Initialize the page
    async function init() {
        await fetchShippingData();
        setupEventListeners();
    }
    
    // Fetch shipping data from server
    async function fetchShippingData() {
        try {
            loadingSpinner.style.display = 'block';
            shippingTableBody.innerHTML = '';
            
            const response = await fetch('api/shipping.php?action=read');
            if (!response.ok) {
                throw new Error('Gagal memuat data pengiriman');
            }
            
            shippingData = await response.json();
            renderShippingData(statusFilter.value);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }
    
    // Render shipping data to the table
    function renderShippingData(filterStatus = 'all') {
        shippingTableBody.innerHTML = '';
        
        const filteredData = filterStatus === 'all' 
            ? shippingData 
            : shippingData.filter(item => item.status === filterStatus);
        
        if (filteredData.length === 0) {
            noShippingMessage.style.display = 'block';
        } else {
            noShippingMessage.style.display = 'none';
            
            filteredData.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${item.order_id}</td>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_address}</td>
                    <td><span class="method-badge method-${item.shipping_method}">${getMethodText(item.shipping_method)}</span></td>
                    <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
                    <td class="action-buttons">
                        <button class="edit-btn" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                `;
                
                shippingTableBody.appendChild(row);
            });
        }
        
        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEditShipping);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteShipping);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Add shipping button
        addShippingBtn.addEventListener('click', () => {
            isEditMode = false;
            document.getElementById('modalTitle').textContent = 'Tambah Pengiriman Baru';
            shippingForm.reset();
            currentShippingId = null;
            shippingModal.style.display = 'block';
        });
        
        // Status filter
        statusFilter.addEventListener('change', (e) => {
            renderShippingData(e.target.value);
        });
        
        // Form submission
        shippingForm.addEventListener('submit', handleFormSubmit);
        
        // Close modals
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                shippingModal.style.display = 'none';
                deleteModal.style.display = 'none';
            });
        });
        
        // Cancel buttons
        cancelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                shippingModal.style.display = 'none';
                deleteModal.style.display = 'none';
            });
        });
        
        // Confirm delete
        confirmDeleteBtn.addEventListener('click', confirmDelete);
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === shippingModal) {
                shippingModal.style.display = 'none';
            }
            if (e.target === deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            order_id: document.getElementById('orderId').value,
            customer_name: document.getElementById('customerName').value,
            customer_address: document.getElementById('customerAddress').value,
            shipping_method: document.getElementById('shippingMethod').value,
            status: document.getElementById('shippingStatus').value
        };
        
        try {
            let response;
            
            if (isEditMode) {
                // Update existing shipping
                response = await fetch('api/shipping.php?action=update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: currentShippingId,
                        ...formData
                    })
                });
            } else {
                // Add new shipping
                response = await fetch('api/shipping.php?action=create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            if (!response.ok) {
                throw new Error('Gagal menyimpan data pengiriman');
            }
            
            shippingModal.style.display = 'none';
            await fetchShippingData();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }
    
    // Handle edit shipping
    function handleEditShipping(e) {
        const shippingId = e.currentTarget.getAttribute('data-id');
        const shipping = shippingData.find(item => item.id == shippingId);
        
        if (shipping) {
            isEditMode = true;
            currentShippingId = shippingId;
            document.getElementById('modalTitle').textContent = 'Edit Pengiriman';
            
            // Fill the form
            document.getElementById('orderId').value = shipping.order_id;
            document.getElementById('customerName').value = shipping.customer_name;
            document.getElementById('customerAddress').value = shipping.customer_address;
            document.getElementById('shippingMethod').value = shipping.shipping_method;
            document.getElementById('shippingStatus').value = shipping.status;
            
            shippingModal.style.display = 'block';
        }
    }
    
    // Handle delete shipping
    function handleDeleteShipping(e) {
        currentShippingId = e.currentTarget.getAttribute('data-id');
        deleteModal.style.display = 'block';
    }
    
    // Confirm delete
    async function confirmDelete() {
        try {
            const response = await fetch('api/shipping.php?action=delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: currentShippingId })
            });
            
            if (!response.ok) {
                throw new Error('Gagal menghapus data pengiriman');
            }
            
            deleteModal.style.display = 'none';
            await fetchShippingData();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }
    
    // Helper functions
    function getStatusText(status) {
        const statusText = {
            pending: 'Menunggu',
            processing: 'Diproses',
            shipped: 'Dikirim',
            delivered: 'Terkirim'
        };
        return statusText[status] || status;
    }
    
    function getMethodText(method) {
        const methodText = {
            reguler: 'REGULER',
            express: 'EXPRESS'
        };
        return methodText[method] || method;
    }
    
    // Initialize the application
    init();
});