document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const ordersTableBody = document.getElementById('ordersTableBody');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
    const addOrderBtn = document.getElementById('addOrderBtn');
    const statusFilter = document.getElementById('statusFilter');
    const orderModal = document.getElementById('orderModal');
    const deleteModal = document.getElementById('deleteModal');
    const orderForm = document.getElementById('orderForm');
    const closeButtons = document.querySelectorAll('.close-button');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    // Sample data
    let orders = [
        {
            id: 'ORD-001',
            date: '2023-05-15',
            customer: 'Budi Santoso',
            total: 250000,
            status: 'completed'
        },
        {
            id: 'ORD-002',
            date: '2023-05-16',
            customer: 'Ani Wijaya',
            total: 180000,
            status: 'processing'
        },
        {
            id: 'ORD-003',
            date: '2023-05-17',
            customer: 'Citra Dewi',
            total: 320000,
            status: 'pending'
        }
    ];
    
    let currentOrderId = null;
    let isEditMode = false;
    
    // Initialize the page
    function init() {
        renderOrders();
        setupEventListeners();
    }
    
    // Render orders to the table
    function renderOrders(filterStatus = 'all') {
        ordersTableBody.innerHTML = '';
        
        const filteredOrders = filterStatus === 'all' 
            ? orders 
            : orders.filter(order => order.status === filterStatus);
        
        if (filteredOrders.length === 0) {
            noOrdersMessage.style.display = 'block';
        } else {
            noOrdersMessage.style.display = 'none';
            
            filteredOrders.forEach(order => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.customer}</td>
                    <td>${formatCurrency(order.total)}</td>
                    <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                    <td class="action-buttons">
                        <button class="edit-btn" data-id="${order.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" data-id="${order.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                `;
                
                ordersTableBody.appendChild(row);
            });
        }
        
        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEditOrder);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteOrder);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Add order button
        addOrderBtn.addEventListener('click', () => {
            isEditMode = false;
            document.getElementById('modalTitle').textContent = 'Tambah Pesanan Baru';
            orderForm.reset();
            currentOrderId = null;
            orderModal.style.display = 'block';
        });
        
        // Status filter
        statusFilter.addEventListener('change', (e) => {
            renderOrders(e.target.value);
        });
        
        // Form submission
        orderForm.addEventListener('submit', handleFormSubmit);
        
        // Close modals
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                orderModal.style.display = 'none';
                deleteModal.style.display = 'none';
            });
        });
        
        // Cancel buttons
        cancelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                orderModal.style.display = 'none';
                deleteModal.style.display = 'none';
            });
        });
        
        // Confirm delete
        confirmDeleteBtn.addEventListener('click', confirmDelete);
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.style.display = 'none';
            }
            if (e.target === deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const orderData = {
            date: document.getElementById('orderDate').value,
            customer: document.getElementById('customerName').value,
            total: parseFloat(document.getElementById('orderTotal').value),
            status: document.getElementById('orderStatus').value
        };
        
        if (isEditMode) {
            // Update existing order
            const orderIndex = orders.findIndex(order => order.id === currentOrderId);
            if (orderIndex !== -1) {
                orders[orderIndex] = {
                    ...orders[orderIndex],
                    ...orderData
                };
            }
        } else {
            // Add new order
            const newId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
            orders.push({
                id: newId,
                ...orderData
            });
        }
        
        orderModal.style.display = 'none';
        renderOrders(statusFilter.value);
    }
    
    // Handle edit order
    function handleEditOrder(e) {
        const orderId = e.currentTarget.getAttribute('data-id');
        const order = orders.find(order => order.id === orderId);
        
        if (order) {
            isEditMode = true;
            currentOrderId = orderId;
            document.getElementById('modalTitle').textContent = 'Edit Pesanan';
            
            // Fill the form
            document.getElementById('orderId').value = order.id;
            document.getElementById('orderDate').value = order.date;
            document.getElementById('customerName').value = order.customer;
            document.getElementById('orderTotal').value = order.total;
            document.getElementById('orderStatus').value = order.status;
            
            orderModal.style.display = 'block';
        }
    }
    
    // Handle delete order
    function handleDeleteOrder(e) {
        currentOrderId = e.currentTarget.getAttribute('data-id');
        deleteModal.style.display = 'block';
    }
    
    // Confirm delete
    function confirmDelete() {
        orders = orders.filter(order => order.id !== currentOrderId);
        deleteModal.style.display = 'none';
        renderOrders(statusFilter.value);
    }
    
    // Helper functions
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }
    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    function getStatusText(status) {
        const statusText = {
            pending: 'Pending',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        return statusText[status] || status;
    }
    
    // Initialize the application
    init();
});