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
    
    // Plant Data (simulated database)
    let plants = JSON.parse(localStorage.getItem('plantopia_plants')) || [];
    let currentPlantId = null;
    
    // Initialize the page
    function init() {
        renderPlantsTable();
        setupEventListeners();
    }
    
    // Render plants table
    function renderPlantsTable(filteredPlants = null) {
        plantsTableBody.innerHTML = '';
        
        const plantsToRender = filteredPlants || plants;
        
        if (plantsToRender.length === 0) {
            plantsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Tidak ada tanaman ditemukan</td>
                </tr>
            `;
            return;
        }
        
        plantsToRender.forEach(plant => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${plant.id}</td>
                <td>${plant.name}</td>
                <td>${getCategoryName(plant.category)}</td>
                <td>${plant.lightRequirement}</td>
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
    function filterPlants() {
        const searchTerm = searchPlant.value.toLowerCase();
        const category = filterCategory.value;
        
        const filtered = plants.filter(plant => {
            const matchesSearch = plant.name.toLowerCase().includes(searchTerm) || 
                                plant.id.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || plant.category === category;
            return matchesSearch && matchesCategory;
        });
        
        renderPlantsTable(filtered);
    }
    
    // Show plant form
    function showPlantForm(plantId = null) {
        currentPlantId = plantId;
        
        if (plantId) {
            // Edit mode
            const plant = plants.find(p => p.id === plantId);
            if (!plant) return;
            
            modalTitle.textContent = 'Edit Tanaman';
            plantIdInput.value = plant.id;
            plantName.value = plant.name;
            plantCategory.value = plant.category;
            plantImage.value = plant.image;
            lightRequirement.value = plant.lightRequirement;
            wateringInfo.value = plant.wateringInfo;
            temperatureRange.value = plant.temperatureRange;
            humidityLevel.value = plant.humidityLevel;
            plantingGuide.value = plant.plantingGuide;
            
            // Load locations
            locationsContainer.innerHTML = '';
            plant.suitableLocations.forEach(location => {
                addLocationInput(location);
            });
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
    function savePlant(e) {
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
            id: plantIdInput.value || `PLANT-${Date.now()}`,
            name: plantName.value,
            category: plantCategory.value,
            image: plantImage.value,
            lightRequirement: lightRequirement.value,
            wateringInfo: wateringInfo.value,
            temperatureRange: temperatureRange.value,
            humidityLevel: humidityLevel.value,
            plantingGuide: plantingGuide.value,
            suitableLocations: suitableLocations
        };
        
        if (currentPlantId) {
            // Update existing plant
            const index = plants.findIndex(p => p.id === currentPlantId);
            if (index !== -1) {
                plants[index] = plantData;
            }
        } else {
            // Add new plant
            plants.unshift(plantData);
        }
        
        saveToLocalStorage();
        renderPlantsTable();
        closePlantForm();
    }
    
    // Show delete confirmation
    function showDeleteConfirmation(plantId) {
        currentPlantId = plantId;
        deleteModal.style.display = 'block';
    }
    
    // Delete plant
    function deletePlant() {
        plants = plants.filter(plant => plant.id !== currentPlantId);
        saveToLocalStorage();
        renderPlantsTable();
        closeDeleteModal();
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
    
    // Save to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('plantopia_plants', JSON.stringify(plants));
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