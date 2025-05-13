class ProductManager {
    constructor() {
        this.products = [];
        this.currentProductId = null;
        this.initElements();
        this.bindEvents();
        this.fetchProducts();
    }

    async fetchProducts() {
        try {
            const response = await fetch('products.php');
            this.products = await response.json();
            this.renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
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
        this.elements.addProductBtn.addEventListener('click', () => this.showProductForm());
        this.elements.productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });
        this.elements.closeModal.addEventListener('click', () => this.closeProductForm());
        this.elements.cancelBtn.addEventListener('click', () => this.closeProductForm());
        this.elements.closeDeleteModal.addEventListener('click', () => this.closeDeleteModal());
        this.elements.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        this.elements.confirmDeleteBtn.addEventListener('click', () => this.deleteProduct());
    }

    showProductForm(product = null) {
        if (product) {
            this.currentProductId = product.id;
            this.elements.modalTitle.textContent = 'Edit Produk';
            this.elements.productId.value = product.id;
            this.elements.productName.value = product.name;
            this.elements.productCategory.value = product.category;
            this.elements.productPrice.value = product.price;
            this.elements.productStock.value = product.stock;
            this.elements.productStatus.value = product.status;
            this.elements.productImage.value = product.image || '';
        } else {
            this.currentProductId = null;
            this.elements.modalTitle.textContent = 'Tambah Produk Baru';
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

    async saveProduct() {
        const productData = {
            name: this.elements.productName.value,
            category: this.elements.productCategory.value,
            price: parseFloat(this.elements.productPrice.value),
            stock: parseInt(this.elements.productStock.value),
            status: this.elements.productStatus.value,
            image: this.elements.productImage.value || 'https://via.placeholder.com/150?text=Plant'
        };

        if (this.currentProductId) {
            productData.id = this.currentProductId;
        }

        try {
            const response = await fetch('products.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();
            
            if (result.success) {
                this.fetchProducts();
                this.closeProductForm();
            } else {
                alert('Gagal menyimpan produk: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Terjadi kesalahan saat menyimpan produk');
        }
    }

    async deleteProduct() {
        try {
            const response = await fetch(`products.php?id=${this.currentProductId}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (result.success) {
                this.fetchProducts();
                this.closeDeleteModal();
            } else {
                alert('Gagal menghapus produk: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Terjadi kesalahan saat menghapus produk');
        }
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
                <td class="px-6 py-4">Rp${product.price.toLocaleString('id-ID')}</td>
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

document.addEventListener('DOMContentLoaded', () => {
    window.productManager = new ProductManager();
});