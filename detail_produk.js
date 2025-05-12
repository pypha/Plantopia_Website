// Extended Product Data with Plant Care Information
const products = [
    {
        id: 1,
        name: "Bunga Kamboja",
        price: 450000,
        image: "https://2.bp.blogspot.com/-AdFojCFxcik/VGGRGfz2-7I/AAAAAAAAAnE/LjwSW-L1EKU/s1600/Bunga%2BKamboja.jpg",
        careInfo: {
            light: "Sinar matahari penuh (minimal 6 jam sehari)",
            watering: "Sedang, biarkan tanah kering di antara penyiraman",
            temperature: "20-35°C (tahan panas tapi tidak tahan frost)",
            humidity: "Kelembapan sedang (40-60%)",
            plantingGuide: "1. Siapkan pot dengan drainase baik\n2. Gunakan campuran tanah berpasir\n3. Tanam stek batang sedalam 15-20cm\n4. Siram secukupnya hingga tumbuh akar",
            suitableLocations: [
                "Daerah tropis",
                "Taman terbuka",
                "Area dengan sinar matahari penuh",
                "Pinggir kolam renang"
            ]
        }
    },
    {
        id: 2,
        name: "Bunga Mawar",
        price: 150000,
        image: "https://asset.kompas.com/crops/kbsMQ08kIM_kS835EpX7yLSyIYg=/3x27:921x640/750x500/data/photo/2022/09/09/631aa84b385fd.jpg",
        careInfo: {
            light: "Sinar matahari penuh (4-6 jam sehari)",
            watering: "Rutin, jaga tanah tetap lembap tapi tidak tergenang",
            temperature: "15-28°C (hindari suhu ekstrim)",
            humidity: "Kelembapan sedang (50-70%)",
            plantingGuide: "1. Pilih lokasi dengan sinar matahari cukup\n2. Gali lubang 2x lebih besar dari akar\n3. Campur tanah dengan kompos\n4. Tanam dengan jarak 50cm antar tanaman\n5. Beri pupuk khusus mawar setiap 2 minggu",
            suitableLocations: [
                "Pekarangan rumah",
                "Pot besar di teras",
                "Taman bunga",
                "Daerah dengan iklim sedang"
            ]
        }
    },
    {
        id: 3,
        name: "Bunga Krisan",
        price: 200000,
        image: "https://www.faunadanflora.com/wp-content/uploads/2017/07/Bunga-Krisan.jpg",
        careInfo: {
            light: "Sinar matahari penuh hingga sebagian teduh (4-6 jam sehari)",
            watering: "Teratur, jaga tanah tetap lembap tetapi tidak basah",
            temperature: "18-25°C (ideal), tahan hingga 30°C",
            humidity: "Kelembapan sedang (50-65%)",
            plantingGuide: "1. Pilih lokasi dengan drainase baik\n2. Gunakan tanah subur campur kompos\n3. Tanam dengan jarak 30-40cm antar tanaman\n4. Beri pupuk seimbang setiap 3 minggu\n5. Pangkas bunga layu untuk stimulasi pertumbuhan baru",
            suitableLocations: [
                "Pekarangan rumah",
                "Pot di teras",
                "Taman bunga",
                "Daerah dataran tinggi"
            ]
        }
    },
    {
        id: 4,
        name: "Bunga Anggrek Bulan",
        price: 50000,
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/a9/6e/4f/photo2jpg.jpg",
        careInfo: {
            light: "Cahaya tidak langsung (teduh parsial)",
            watering: "Semprot 2-3 kali seminggu, jangan biarkan tergenang",
            temperature: "20-30°C (hindari di bawah 15°C)",
            humidity: "Tinggi (60-80%)",
            plantingGuide: "1. Gunakan media tanam pakis atau arang\n2. Letakkan di tempat teduh tapi terang\n3. Siram saat media hampir kering\n4. Beri pupuk khusus anggrek setiap 2 minggu\n5. Ganti media setiap 1-2 tahun",
            suitableLocations: [
                "Dalam ruangan dekat jendela",
                "Terarium",
                "Rak tanaman teduh",
                "Daerah tropis lembap"
            ]
        }
    },
    {
        id: 5,
        name: "Bunga Anggrek Hartinah",
        price: 30000,
        image: "https://thumbs.dreamstime.com/b/pink-phalaenopsis-moth-dendrobium-orchid-flover-background-called-anggrek-hartinah-indonesia-254236444.jpg",
        careInfo: {
                light: "Cahaya sedang tidak langsung",
                watering: "Semprot 2 kali seminggu, kurangi di musim hujan",
                temperature: "18-28°C",
                humidity: "Sedang-tinggi (50-70%)",
                plantingGuide: "1. Gunakan pot dengan drainase baik\n2. Media tanam pakis atau sabut kelapa\n3. Jangan tanam terlalu dalam\n4. Beri pupuk cair khusus anggrek bulanan\n5. Hindari perubahan suhu drastis",
                suitableLocations: [
                    "Pot gantung di teras",
                    "Rak tanaman dalam ruangan",
                    "Daerah dengan iklim stabil",
                    "Kawasan pegunungan"
                ]
            }
        },
        {
            id: 6,
            name: "Bunga Anggrek Sendok",
            price: 120000,
            image: "https://cf.shopee.co.id/file/864d23497e9af9bafff311ac734af5c4",
            careInfo: {
                light: "Cahaya terang tidak langsung",
                watering: "Semprot 3 kali seminggu, kurangi saat dorman",
                temperature: "20-32°C",
                humidity: "Tinggi (70-85%)",
                plantingGuide: "1. Gunakan media kulit kayu atau arang\n2. Letakkan di tempat dengan sirkulasi udara baik\n3. Siram pagi hari\n4. Beri pupuk tinggi fosfor saat musim bunga\n5. Jaga kelembapan dengan tray kerikil",
                suitableLocations: [
                    "Greenhouse",
                    "Taman vertikal",
                    "Daerah pantai",
                    "Kawasan hutan hujan"
                ]
            }
        },
        {
            id: 7,
            name: "Kaktus Koboi",
            price: 50000,
            image: "https://www.hellomd.com/wp-content/uploads/2022/04/Screen_Shot_2022_03_11_at_12_20_03_PM_ceadbe1d2c.png",
            careInfo: {
                light: "Sinar matahari penuh (minimal 8 jam sehari)",
                watering: "Sedikit, setiap 2-3 minggu (biarkan tanah kering sepenuhnya)",
                temperature: "15-35°C (tahan panas ekstrim)",
                humidity: "Rendah (20-40%)",
                plantingGuide: "1. Gunakan campuran tanah kaktus berpasir\n2. Pastikan pot memiliki drainase excellent\n3. Siram hanya saat tanah benar-benar kering\n4. Hindari penyiraman di musim dingin\n5. Beri pupuk kaktus 3 bulan sekali",
                suitableLocations: [
                    "Jendela menghadap selatan",
                    "Taman gurun",
                    "Daerah kering",
                    "Ruang dengan AC"
                ]
            }
        },
        {
            id: 8,
            name: "Jahe",
            price: 200000,
            image: "https://akcdn.detik.net.id/community/media/visual/2020/03/21/690ba47e-29f3-489f-ad81-50f12a5de31d.jpeg?w=1000",
            careInfo: {
                light: "Teduh parsial hingga sinar matahari tidak langsung",
                watering: "Teratur, jaga tanah tetap lembap tapi tidak basah",
                temperature: "22-28°C",
                humidity: "Tinggi (60-80%)",
                plantingGuide: "1. Pilih rimpang segar dengan mata tunas\n2. Tanam 5-10cm di bawah permukaan tanah\n3. Gunakan tanah gembur kaya organik\n4. Siram setiap 2-3 hari\n5. Panen setelah 8-10 bulan",
                suitableLocations: [
                    "Kebun sayur teduh",
                    "Pot besar di teras",
                    "Daerah tropis",
                    "Lahan dengan naungan alami"
                ]
            }
        },
        {
            id: 9,
            name: "Kunyit",
            price: 55000,
            image: "https://th.bing.com/th/id/OIP.qBoilFZ3RPVMm5VXMkhr_AHaHa?rs=1&pid=ImgDetMain",
            careInfo: {
                light: "Sinar matahari penuh hingga teduh parsial",
                watering: "Teratur, tanah harus selalu lembap",
                temperature: "20-30°C",
                humidity: "Sedang-tinggi (50-75%)",
                plantingGuide: "1. Pilih rimpang dengan 2-3 mata tunas\n2. Tanam 5cm di bawah permukaan tanah\n3. Gunakan tanah subur berdrainase baik\n4. Beri mulsa untuk menjaga kelembapan\n5. Panen setelah 7-10 bulan",
                suitableLocations: [
                    "Kebun herbal",
                    "Bedengan taman",
                    "Daerah subtropis",
                    "Polybag besar"
                ]
            }
        },
        {
            id: 10,
            name: "Mint",
            price: 210000,
            image: "https://www.epicgardening.com/wp-content/uploads/2024/04/Mint-in-pot.jpeg",
            careInfo: {
                light: "Teduh parsial hingga sinar matahari pagi",
                watering: "Sering, jangan biarkan tanah kering",
                temperature: "15-25°C",
                humidity: "Sedang (50-70%)",
                plantingGuide: "1. Gunakan pot terpisah (agresif menyebar)\n2. Tanam stek batang 10cm\n3. Gunakan tanah lembap kaya organik\n4. Pangkas secara teratur\n5. Ganti tanaman setiap 2-3 tahun",
                suitableLocations: [
                    "Pot di jendela dapur",
                    "Taman herbal",
                    "Daerah beriklim sejuk",
                    "Area dengan naungan sore"
                ]
            }
        },
        {
            id: 11,
            name: "Tanaman Air Lilaeopsis",
            price: 50000,
            image: "https://bibitbunga.com/wp-content/uploads/2017/03/Lilaeopsis.jpg",
            careInfo: {
                light: "Cahaya sedang hingga tinggi",
                watering: "Selalu terendam air (aquatic plant)",
                temperature: "20-28°C",
                humidity: "100% (tanaman air)",
                plantingGuide: "1. Siapkan akuarium atau kolam dangkal\n2. Tanam di substrat berpasir\n3. Beri pencahayaan cukup 8-10 jam/hari\n4. Tambahkan CO2 untuk pertumbuhan optimal\n5. Pangkas saat terlalu rimbun",
                suitableLocations: [
                    "Akuarium",
                    "Kolam taman",
                    "Taman air",
                    "Paludarium"
                ]
            }
        },
        {
            id: 12,
            name: "Cambomba Caroliniana",
            price: 70000,
            image: "https://th.bing.com/th/id/R.e2f265beaf31818df1a900be28dc473d?rik=3z7uziNEyBa2hQ&riu=http%3a%2f%2fplantsnshrimps.com%2fwp-content%2fuploads%2f2013%2f02%2fCabomba-caroliniana.jpg&ehk=wL44EupkpN%2fVTSbsP6IaVV%2fro7WZhQQmH2iABdjOzNI%3d&risl=&pid=ImgRaw&r=0",
            careInfo: {
                light: "Cahaya tinggi (10-12 jam/hari)",
                watering: "Tanaman air (selalu terendam)",
                temperature: "18-28°C",
                humidity: "100% (tanaman air)",
                plantingGuide: "1. Tanam di substrat akuarium\n2. Beri pencahayaan kuat\n3. Tambahkan pupuk cair aquascape\n4. Pangkas batang yang terlalu panjang\n5. Ganti 30% air mingguan",
                suitableLocations: [
                    "Akuarium ikan hias",
                    "Kolam indoor",
                    "Aquascape",
                    "Waduk buatan"
                ]
            }
        }
    ]


// Get selected product ID
const selectedProductId = parseInt(localStorage.getItem("selectedProduct"));
let quantity = 1;

// Display product details
function displayProductDetails() {
    const product = products.find(p => p.id === selectedProductId);
    
    if (!product) {
        window.location.href = "marketplace.html";
        return;
    }

    // Basic Info
    document.getElementById("mainProductImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = `Rp ${product.price.toLocaleString()}`;
    
    // Plant Care Info
    document.getElementById("lightRequirement").textContent = product.careInfo.light;
    document.getElementById("wateringInfo").textContent = product.careInfo.watering;
    document.getElementById("temperatureRange").textContent = product.careInfo.temperature;
    document.getElementById("humidityLevel").textContent = product.careInfo.humidity;
    
    // Planting Guide (with line breaks)
    const plantingGuide = product.careInfo.plantingGuide.replace(/\n/g, '<br><br>');
    document.getElementById("plantingGuide").innerHTML = plantingGuide;
    
    // Suitable Locations
    const suitableLocationsList = document.getElementById("suitableLocations");
    suitableLocationsList.innerHTML = product.careInfo.suitableLocations
        .map(location => `<li>${location}</li>`)
        .join("");
}

// Quantity controls
document.getElementById("increaseQuantity").addEventListener("click", () => {
    quantity++;
    document.getElementById("quantity").textContent = quantity;
});

document.getElementById("decreaseQuantity").addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        document.getElementById("quantity").textContent = quantity;
    }
});

// Add to cart
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const product = products.find(p => p.id === selectedProductId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ 
            ...product, 
            quantity: quantity 
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert(`${quantity} ${product.name} telah ditambahkan ke keranjang!`);
});

// Initialize
displayProductDetails();