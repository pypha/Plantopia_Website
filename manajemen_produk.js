class ProductManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('plantopia-products')) || [];
        this.currentProductId = null;
        this.initElements();
        this.bindEvents();
        this.renderProducts();
    }

    initElements() {
        this.elements = {
            productsTable: document.getElementById('productsTable'),
            productForm: document.getElementById('productForm'),
            productModal: document.getElementById('productModal'),
            deleteModal: document.getElementById('deleteModal'),
            modalTitle: document.getElementById('modalTitle'),
            addProductBtn: document.getElementById('addProductBtn'),
            productId: document.getElementById('productId'),
            productName: document.getElementById('productName'),
            productCategory: document.getElementById('productCategory'),
            productPrice: document.getElementById('productPrice'),
            productStock: document.getElementById('productStock'),
            productStatus: document.getElementById('productStatus'),
            productImage: document.getElementById('productImage'),
            closeModal: document.getElementById('closeModal'),
            cancelBtn: document.getElementById('cancelBtn'),
            closeDeleteModal: document.getElementById('closeDeleteModal'),
            cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
            confirmDeleteBtn: document.getElementById('confirmDeleteBtn')
        };
    }

    bindEvents() {
        // Add product button
        this.elements.addProductBtn.addEventListener('click', () => this.showProductForm());

        // Form submission
        this.elements.productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // Modal close buttons
        this.elements.closeModal.addEventListener('click', () => this.closeProductForm());
        this.elements.cancelBtn.addEventListener('click', () => this.closeProductForm());
        this.elements.closeDeleteModal.addEventListener('click', () => this.closeDeleteModal());
        this.elements.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());

        // Delete confirmation
        this.elements.confirmDeleteBtn.addEventListener('click', () => this.deleteProduct());
    }

    showProductForm(product = null) {
        if (product) {
            this.currentProductId = product.id;
            this.elements.modalTitle.textContent = 'Edit Product';
            this.elements.productId.value = product.id;
            this.elements.productName.value = product.name;
            this.elements.productCategory.value = product.category;
            this.elements.productPrice.value = product.price;
            this.elements.productStock.value = product.stock;
            this.elements.productStatus.value = product.status;
            this.elements.productImage.value = product.image || '';
        } else {
            this.currentProductId = null;
            this.elements.modalTitle.textContent = 'Add New Product';
            this.elements.productForm.reset();
        }
        this.elements.productModal.classList.remove('hidden');
    }

    closeProductForm() {
        this.elements.productModal.classList.add('hidden');
    }

    showDeleteModal(productId) {
        this.currentProductId = productId;
        this.elements.deleteModal.classList.remove('hidden');
    }

    closeDeleteModal() {
        this.elements.deleteModal.classList.add('hidden');
    }

    saveProduct() {
        const productData = {
            id: this.currentProductId || Date.now(),
            name: this.elements.productName.value,
            category: this.elements.productCategory.value,
            price: parseFloat(this.elements.productPrice.value),
            stock: parseInt(this.elements.productStock.value),
            status: this.elements.productStatus.value,
            image: this.elements.productImage.value || 'https://via.placeholder.com/150?text=Plant'
        };

        if (this.currentProductId) {
            // Update existing product
            const index = this.products.findIndex(p => p.id === this.currentProductId);
            if (index !== -1) {
                this.products[index] = productData;
            }
        } else {
            // Add new product
            this.products.push(productData);
        }

        this.saveToLocalStorage();
        this.renderProducts();
        this.closeProductForm();
    }

    deleteProduct() {
        this.products = this.products.filter(product => product.id !== this.currentProductId);
        this.saveToLocalStorage();
        this.renderProducts();
        this.closeDeleteModal();
    }

    saveToLocalStorage() {
        localStorage.setItem('plantopia-products', JSON.stringify(this.products));
    }

    renderProducts() {
        this.elements.productsTable.innerHTML = '';
        
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 text-center">${product.id}</td>
                <td class="px-6 py-4"><img src="${product.image}" alt="${product.name}"></td>
                <td class="px-6 py-4">${product.name}</td>
                <td class="px-6 py-4">${product.category}</td>
                <td class="px-6 py-4">${product.price.toFixed(2)}</td>
                <td class="px-6 py-4">${product.stock}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold status-${product.status.toLowerCase().replace(' ', '-')}">
                        ${product.status}
                    </span>
                </td>
                <td class="px-6 py-4 space-x-2">
                    <button class="edit-btn text-blue-600 hover:text-blue-800" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn text-red-600 hover:text-red-800" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            // Add event listeners to the buttons
            row.querySelector('.edit-btn').addEventListener('click', () => {
                this.showProductForm(product);
            });
            
            row.querySelector('.delete-btn').addEventListener('click', () => {
                this.showDeleteModal(product.id);
            });
            
            this.elements.productsTable.appendChild(row);
        });
    }
}

// Initialize the product manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productManager = new ProductManager();
});