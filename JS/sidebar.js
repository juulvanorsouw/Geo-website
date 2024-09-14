document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggler = document.querySelector('.sidebar-toggler');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Initially set the sidebar to be visible
    sidebar.classList.remove('closed');
    mainContent.classList.remove('expanded');
    
    sidebarToggler.addEventListener('click', function(event) {
        event.preventDefault();
        sidebar.classList.toggle('closed');
        mainContent.classList.toggle('expanded');
        
        // Update aria-expanded attribute
        const isExpanded = sidebar.classList.contains('closed');
        sidebarToggler.setAttribute('aria-expanded', !isExpanded);
    });
});
