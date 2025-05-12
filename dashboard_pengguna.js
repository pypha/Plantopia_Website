// Toggle profile dropdown
document.getElementById('profileToggle').addEventListener('click', function() {
    document.getElementById('profileDropdown').classList.toggle('show');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('.user-profile, .user-profile *')) {
        var dropdowns = document.getElementsByClassName('profile-dropdown');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});