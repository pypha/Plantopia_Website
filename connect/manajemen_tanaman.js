document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const plantsTableBody = document.getElementById('plantsTableBody');
    const addPlantBtn = document.getElementById('addPlantBtn');
    const searchPlant = document.getElementById('searchPlant');
    const filterCategory = document.getElementById('filterCategory');
    
    // Modal Elements
    const plantFormModal = document.getElementById('plantFormModal');
    const deleteModal = document.getElementById('deleteModal');
    const plantForm = document.getElementById('plantForm');
    const modalTitle = document.getElementById('modalTitle');
    const plantIdInput = document.getElementById('plantId');
    
    // Form Elements
    const plantName = document.getElementById('plantName');
    const plantCategory = document.getElementById('plantCategory');
    const plantImage = document.getElementById('plantImage');
    const lightRequirement = document.getElementById('lightRequirement');
    const wateringInfo = document.getElementById('wateringInfo');
    const temperatureRange = document.getElementById('temperatureRange');
    const humidityLevel = document.getElementById('humidityLevel');
    const plantingGuide = document.getElementById('plantingGuide');
    const locationsContainer = document.getElementById('locationsContainer');
    const addLocationBtn = document.getElementById('addLocationBtn');
    
    // Action Buttons
    const cancelBtn = document.getElementById('cancelBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    let currentPlantId = null;
    
    // Initialize the page
    async function init() {
        await fetchPlants();
        setupEventListeners();
    }
    
    // Fetch plants from API
    async function fetchPlants() {
        try {
            const response = await fetch('plants_api.php');
            const data = await response.json();
            renderPlantsTable(data);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    }
    
    // Render plants table
    function renderPlantsTable(plants = []) {
        plantsTableBody.innerHTML = '';
        
        if (plants.length === 0) {
            plantsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Tidak ada tanaman ditemukan</td>
                </tr>
            `;
            return;
        }
        
        plants.forEach(plant => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${plant.id}</td>
                <td>${plant.name}</td>
                <td>${getCategoryName(plant.category)}</td>
                <td>${plant.light_requirement}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${plant.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-id="${plant.id}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            `;
            
            plantsTableBody.appendChild(row);
        });
    }
    
    // Get category name
    function getCategoryName(category) {
        const categories = {
            'herbal': 'Tanaman Herbal',
            'hias': 'Tanaman Hias',
            'buah': 'Tanaman Buah'
        };
        return categories[category] || category;
    }
    
    // Filter plants
    async function filterPlants() {
        const searchTerm = searchPlant.value.toLowerCase();
        const category = filterCategory.value;
        
        try {
            const response = await fetch('plants_api.php');
            const allPlants = await response.json();
            
            const filtered = allPlants.filter(plant => {
                const matchesSearch = plant.name.toLowerCase().includes(searchTerm) || 
                                    plant.id.toLowerCase().includes(searchTerm);
                const matchesCategory = category === 'all' || plant.category === category;
                return matchesSearch && matchesCategory;
            });
            
            renderPlantsTable(filtered);
        } catch (error) {
            console.error('Error filtering plants:', error);
        }
    }
    
    // Show plant form
    async function showPlantForm(plantId = null) {
        currentPlantId = plantId;
        
        if (plantId) {
            // Edit mode
            try {
                const response = await fetch(`plants_api.php?id=${plantId}`);
                const plant = await response.json();
                
                if (!plant) return;
                
                modalTitle.textContent = 'Edit Tanaman';
                plantIdInput.value = plant.id;
                plantName.value = plant.name;
                plantCategory.value = plant.category;
                plantImage.value = plant.image;
                lightRequirement.value = plant.light_requirement;
                wateringInfo.value = plant.watering_info;
                temperatureRange.value = plant.temperature_range;
                humidityLevel.value = plant.humidity_level;
                plantingGuide.value = plant.planting_guide;
                
                // Load locations
                locationsContainer.innerHTML = '';
                plant.suitable_locations.forEach(location => {
                    addLocationInput(location);
                });
            } catch (error) {
                console.error('Error fetching plant:', error);
            }
        } else {
            // Add mode
            modalTitle.textContent = 'Tambah Tanaman Baru';
            plantForm.reset();
            plantIdInput.value = '';
            locationsContainer.innerHTML = '';
            addLocationInput();
        }
        
        plantFormModal.style.display = 'block';
    }
    
    // Add location input
    function addLocationInput(value = '') {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location-input';
        locationDiv.innerHTML = `
            <input type="text" class="location" value="${value}" placeholder="Tambahkan lokasi">
            <button type="button" class="remove-location"><i class="fas fa-times"></i></button>
        `;
        
        const removeBtn = locationDiv.querySelector('.remove-location');
        removeBtn.addEventListener('click', () => {
            locationDiv.remove();
        });
        
        locationsContainer.appendChild(locationDiv);
    }
    
    // Save plant
    async function savePlant(e) {
        e.preventDefault();
        
        // Get locations
        const locationInputs = locationsContainer.querySelectorAll('.location');
        const suitableLocations = Array.from(locationInputs)
            .map(input => input.value.trim())
            .filter(location => location !== '');
        
        if (suitableLocations.length === 0) {
            alert('Harap tambahkan minimal satu lokasi penanaman');
            return;
        }
        
        const plantData = {
            name: plantName.value,
            category: plantCategory.value,
            image: plantImage.value,
            light_requirement: lightRequirement.value,
            watering_info: wateringInfo.value,
            temperature_range: temperatureRange.value,
            humidity_level: humidityLevel.value,
            planting_guide: plantingGuide.value,
            suitable_locations: suitableLocations
        };
        
        if (currentPlantId) {
            plantData.id = currentPlantId;
        }
        
        try {
            const response = await fetch('plants_api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plantData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                await fetchPlants();
                closePlantForm();
            } else {
                alert('Gagal menyimpan tanaman: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving plant:', error);
            alert('Terjadi kesalahan saat menyimpan tanaman');
        }
    }
    
    // Show delete confirmation
    function showDeleteConfirmation(plantId) {
        currentPlantId = plantId;
        deleteModal.style.display = 'block';
    }
    
    // Delete plant
    async function deletePlant() {
        try {
            const response = await fetch(`plants_api.php?id=${currentPlantId}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                await fetchPlants();
                closeDeleteModal();
            } else {
                alert('Gagal menghapus tanaman: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting plant:', error);
            alert('Terjadi kesalahan saat menghapus tanaman');
        }
    }
    
    // Close modals
    function closePlantForm() {
        plantFormModal.style.display = 'none';
        currentPlantId = null;
    }
    
    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        currentPlantId = null;
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Add plant button
        addPlantBtn.addEventListener('click', () => showPlantForm());
        
        // Search and filter
        searchPlant.addEventListener('input', filterPlants);
        filterCategory.addEventListener('change', filterPlants);
        
        // Form submission
        plantForm.addEventListener('submit', savePlant);
        
        // Add location button
        addLocationBtn.addEventListener('click', () => addLocationInput());
        
        // Cancel buttons
        cancelBtn.addEventListener('click', closePlantForm);
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
        
        // Delete confirmation
        confirmDeleteBtn.addEventListener('click', deletePlant);
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === plantFormModal) closePlantForm();
            if (e.target === deleteModal) closeDeleteModal();
        });
        
        // Event delegation for edit/delete buttons
        plantsTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-btn')) {
                const plantId = e.target.closest('.edit-btn').dataset.id;
                showPlantForm(plantId);
            }
            
            if (e.target.closest('.delete-btn')) {
                const plantId = e.target.closest('.delete-btn').dataset.id;
                showDeleteConfirmation(plantId);
            }
        });
    }
    
    // Initialize the application
    init();
});