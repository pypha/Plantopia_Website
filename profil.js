document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const profileDetails = document.getElementById('profileDetails');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const savePasswordBtn = document.getElementById('savePasswordBtn');
    const confirmModal = document.getElementById('confirmModal');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const pictureUpload = document.getElementById('pictureUpload');
    const profilePicture = document.getElementById('profilePicture');

    // Sample user data
    const userData = {
        name: 'Afifa Anindya',
        email: 'AfifaAnindya@gmail.com',
        phone: '082334337750',
        address: 'Jalan Universitas Airlangga',
        bio: 'Software developer passionate about coding and technology.'
    };

    // Initialize profile
    function initProfile() {
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('profileEmail').textContent = userData.email;
        document.getElementById('detailName').textContent = userData.name;
        document.getElementById('detailEmail').textContent = userData.email;
        document.getElementById('detailPhone').textContent = userData.phone;
        document.getElementById('detailAddress').textContent = userData.address;
        document.getElementById('detailBio').textContent = userData.bio;
        
        // Set form values
        document.getElementById('editName').value = userData.name;
        document.getElementById('editEmail').value = userData.email;
        document.getElementById('editPhone').value = userData.phone;
        document.getElementById('editAddress').value = userData.address;
        document.getElementById('editBio').value = userData.bio;
    }

    // Event Listeners
    editProfileBtn.addEventListener('click', function() {
        profileDetails.style.display = 'none';
        passwordForm.style.display = 'none';
        profileForm.style.display = 'block';
    });

    changePasswordBtn.addEventListener('click', function() {
        profileDetails.style.display = 'none';
        profileForm.style.display = 'none';
        passwordForm.style.display = 'block';
    });

    cancelEditBtn.addEventListener('click', function() {
        profileForm.style.display = 'none';
        profileDetails.style.display = 'block';
    });

    cancelPasswordBtn.addEventListener('click', function() {
        passwordForm.style.display = 'none';
        profileDetails.style.display = 'block';
    });

    deleteAccountBtn.addEventListener('click', function() {
        showModal(
            'Delete Account', 
            'Are you sure you want to delete your account? This action cannot be undone.',
            function() {
                alert('Account deletion requested!');
                hideModal();
            }
        );
    });

    modalCancelBtn.addEventListener('click', hideModal);

    // Form submissions
    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Update user data
        userData.name = document.getElementById('editName').value;
        userData.email = document.getElementById('editEmail').value;
        userData.phone = document.getElementById('editPhone').value;
        userData.address = document.getElementById('editAddress').value;
        userData.bio = document.getElementById('editBio').value;
        
        // Update profile display
        initProfile();
        
        // Show profile details
        profileForm.style.display = 'none';
        profileDetails.style.display = 'block';
        
        alert('Profile updated successfully!');
    });

    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would send this to your server
        alert('Password changed successfully!');
        passwordForm.style.display = 'none';
        profileDetails.style.display = 'block';
        this.reset();
    });

    // Profile picture upload
    pictureUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePicture.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Modal functions
    function showModal(title, message, confirmCallback) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        confirmModal.classList.add('active');
        
        // Set up confirm button
        modalConfirmBtn.onclick = function() {
            confirmCallback();
        };
    }

    function hideModal() {
        confirmModal.classList.remove('active');
    }

    // Initialize the page
    initProfile();
});