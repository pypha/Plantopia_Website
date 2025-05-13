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
    
    let currentOrderId = null;
    let isEditMode = false;
    
    // Initialize the page
    function init() {
        loadOrders();
        setupEventListeners();
    }
    
    // Load orders from API
    async function loadOrders(filterStatus = 'all') {
        try {
            const url = filterStatus === 'all' 
                ? 'api.php' 
                : `api.php?status=${filterStatus}`;
            
            const response = await fetch(url);
            const orders = await response.json();
            
            renderOrders(orders);
        } catch (error) {
            console.error('Error loading orders:', error);
            alert('Gagal memuat data pesanan');
        }
    }
    
    // Render orders to the table
    function renderOrders(orders) {
        ordersTableBody.innerHTML = '';
        
        if (orders.length === 0) {
            noOrdersMessage.style.display = 'block';
        } else {
            noOrdersMessage.style.display = 'none';
            
            orders.forEach(order => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${formatDate(order.order_date)}</td>
                    <td>${order.customer_name}</td>
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
            loadOrders(e.target.value);
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
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const orderData = {
            date: document.getElementById('orderDate').value,
            customer: document.getElementById('customerName').value,
            total: parseFloat(document.getElementById('orderTotal').value),
            status: document.getElementById('orderStatus').value
        };
        
        try {
            let url = 'api.php';
            let method = 'POST';
            
            if (isEditMode) {
                orderData.id = currentOrderId;
                method = 'PUT';
            }
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                orderModal.style.display = 'none';
                loadOrders(statusFilter.value);
            } else {
                alert('Gagal menyimpan data: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Gagal menyimpan data pesanan');
        }
    }
    
    // Handle edit order
    async function handleEditOrder(e) {
        const orderId = e.currentTarget.getAttribute('data-id');
        
        try {
            const response = await fetch(`api.php?id=${orderId}`);
            const orders = await response.json();
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                isEditMode = true;
                currentOrderId = orderId;
                document.getElementById('modalTitle').textContent = 'Edit Pesanan';
                
                // Fill the form
                document.getElementById('orderId').value = order.id;
                document.getElementById('orderDate').value = order.order_date;
                document.getElementById('customerName').value = order.customer_name;
                document.getElementById('orderTotal').value = order.total;
                document.getElementById('orderStatus').value = order.status;
                
                orderModal.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading order:', error);
            alert('Gagal memuat data pesanan');
        }
    }
    
    // Handle delete order
    function handleDeleteOrder(e) {
        currentOrderId = e.currentTarget.getAttribute('data-id');
        deleteModal.style.display = 'block';
    }
    
    // Confirm delete
    async function confirmDelete() {
        try {
            const response = await fetch(`api.php?id=${currentOrderId}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                deleteModal.style.display = 'none';
                loadOrders(statusFilter.value);
            } else {
                alert('Gagal menghapus data: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Gagal menghapus data pesanan');
        }
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