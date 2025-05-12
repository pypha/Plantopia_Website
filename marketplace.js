// Data Produk
const products = [
    { id: 1, name: "Bunga kamboja", price: 450000, image: "https://2.bp.blogspot.com/-AdFojCFxcik/VGGRGfz2-7I/AAAAAAAAAnE/LjwSW-L1EKU/s1600/Bunga%2BKamboja.jpg"},
    { id: 2, name: "Bunga Mawar", price: 150000, image: "https://asset.kompas.com/crops/kbsMQ08kIM_kS835EpX7yLSyIYg=/3x27:921x640/750x500/data/photo/2022/09/09/631aa84b385fd.jpg"},
    { id: 3, name: "Bunga Krisan", price: 200000, image: "https://www.faunadanflora.com/wp-content/uploads/2017/07/Bunga-Krisan.jpg" },
    { id: 4, name: "Bunga Anggrek Bulan", price: 50000, image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/a9/6e/4f/photo2jpg.jpg" },
    { id: 5, name: "Bunga Anggrek Hartinah", price: 30000, image: "https://thumbs.dreamstime.com/b/pink-phalaenopsis-moth-dendrobium-orchid-flover-background-called-anggrek-hartinah-indonesia-254236444.jpg" },
    { id: 6, name: "Bunga Anggrek Sendok", price: 120000, image: "https://cf.shopee.co.id/file/864d23497e9af9bafff311ac734af5c4" },
    { id: 7, name: "Kaktus Koboi", price: 50000, image: "https://www.hellomd.com/wp-content/uploads/2022/04/Screen_Shot_2022_03_11_at_12_20_03_PM_ceadbe1d2c.png" },
    { id: 8, name: "Jahe", price: 200000, image: "https://akcdn.detik.net.id/community/media/visual/2020/03/21/690ba47e-29f3-489f-ad81-50f12a5de31d.jpeg?w=1000" },
    { id: 9, name: "Kunyit", price: 55000, image: "https://th.bing.com/th/id/OIP.qBoilFZ3RPVMm5VXMkhr_AHaHa?rs=1&pid=ImgDetMain" },
    { id: 10, name: "Mint", price: 210000, image: "https://www.epicgardening.com/wp-content/uploads/2024/04/Mint-in-pot.jpeg" },
    { id: 11, name: "Tanaman Air Lilaeopsis", price: 50000, image: "https://bibitbunga.com/wp-content/uploads/2017/03/Lilaeopsis.jpg" },
    { id: 12, name: "Cambomba Caroliniana", price: 70000, image: "https://th.bing.com/th/id/R.e2f265beaf31818df1a900be28dc473d?rik=3z7uziNEyBa2hQ&riu=http%3a%2f%2fplantsnshrimps.com%2fwp-content%2fuploads%2f2013%2f02%2fCabomba-caroliniana.jpg&ehk=wL44EupkpN%2fVTSbsP6IaVV%2fro7WZhQQmH2iABdjOzNI%3d&risl=&pid=ImgRaw&r=0" },
];

// Keranjang Belanja
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menampilkan produk
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="viewDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id}, event)">Tambahkan ke Keranjang</button>
        </div>
    `).join("");
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId, event) {
    event.stopPropagation(); 
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
}

// Fungsi untuk menampilkan keranjang
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i> Hapus</button>
        </div>
    `).join("");

    updateTotalPrice();
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Fungsi untuk memperbarui total harga
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk mencari produk
function searchProduct() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Fungsi untuk melihat detail produk
function viewDetail(productId) {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "detail_produk.html";
}

// Inisialisasi
if (window.location.pathname.includes("marketplace.html")) {
    displayProducts();
} else if (window.location.pathname.includes("keranjang.html")) {
    displayCart();
}

// Function to display cart items with quantity controls
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-content">
                <h3>${item.name}</h3>
                <p>Rp ${item.price.toLocaleString()}</p>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateQuantityInput(${item.id}, this)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("");

    updateTotalPrice();
}

// Function to update quantity with buttons
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        // Ensure quantity doesn't go below 1
        if (item.quantity < 1) item.quantity = 1;
        
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

// Function to update quantity with input field
function updateQuantityInput(productId, input) {
    const newQuantity = parseInt(input.value);
    if (newQuantity >= 1) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotalPrice();
        }
    } else {
        input.value = 1; // Reset to minimum quantity
    }
}

// Function to update total price
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById("totalPrice").textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Initialize cart display when page loads
if (window.location.pathname.includes("keranjang.html")) {
    displayCart();
}