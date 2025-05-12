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
    
    // Sample data
    let shippingData = [
        {
            id: 'SHIP-001',
            orderId: 'ORD-001',
            customerName: 'Budi Santoso',
            customerAddress: 'Jl. Merdeka No. 123, Jakarta',
            shippingMethod: 'reguler',
            status: 'shipped'
        },
        {
            id: 'SHIP-002',
            orderId: 'ORD-002',
            customerName: 'Ani Wijaya',
            customerAddress: 'Jl. Sudirman No. 456, Bandung',
            shippingMethod: 'reguler',
            status: 'processing'
        },
        {
            id: 'SHIP-003',
            orderId: 'ORD-003',
            customerName: 'Citra Dewi',
            customerAddress: 'Jl. Gatot Subroto No. 789, Surabaya',
            shippingMethod: 'express',
            status: 'pending'
        }
    ];
    
    let currentShippingId = null;
    let isEditMode = false;
    
    // Initialize the page
    function init() {
        renderShippingData();
        setupEventListeners();
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
                    <td>${item.orderId}</td>
                    <td>${item.customerName}</td>
                    <td>${item.customerAddress}</td>
                    <td><span class="method-badge method-${item.shippingMethod}">${getMethodText(item.shippingMethod)}</span></td>
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
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const shippingData = {
            orderId: document.getElementById('orderId').value,
            customerName: document.getElementById('customerName').value,
            customerAddress: document.getElementById('customerAddress').value,
            shippingMethod: document.getElementById('shippingMethod').value,
            status: document.getElementById('shippingStatus').value
        };
        
        if (isEditMode) {
            // Update existing shipping
            const shippingIndex = shippingData.findIndex(item => item.id === currentShippingId);
            if (shippingIndex !== -1) {
                shippingData[shippingIndex] = {
                    ...shippingData[shippingIndex],
                    ...shippingData
                };
            }
        } else {
            // Add new shipping
            const newId = `SHIP-${String(shippingData.length + 1).padStart(3, '0')}`;
            shippingData.push({
                id: newId,
                ...shippingData
            });
        }
        
        shippingModal.style.display = 'none';
        renderShippingData(statusFilter.value);
    }
    
    // Handle edit shipping
    function handleEditShipping(e) {
        const shippingId = e.currentTarget.getAttribute('data-id');
        const shipping = shippingData.find(item => item.id === shippingId);
        
        if (shipping) {
            isEditMode = true;
            currentShippingId = shippingId;
            document.getElementById('modalTitle').textContent = 'Edit Pengiriman';
            
            // Fill the form
            document.getElementById('shippingId').value = shipping.id;
            document.getElementById('orderId').value = shipping.orderId;
            document.getElementById('customerName').value = shipping.customerName;
            document.getElementById('customerAddress').value = shipping.customerAddress;
            document.getElementById('shippingMethod').value = shipping.shippingMethod;
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
    function confirmDelete() {
        shippingData = shippingData.filter(item => item.id !== currentShippingId);
        deleteModal.style.display = 'none';
        renderShippingData(statusFilter.value);
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
            express: 'EXPRESS',

        };
        return methodText[method] || method;
    }
    
    // Initialize the application
    init();
});