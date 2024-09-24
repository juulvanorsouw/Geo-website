document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggler = document.getElementById('sidebarToggler');
    let isOpen = false;  // Initially, the sidebar is closed with text-only elements visible.

    // Initially hide icon-only elements and show text-only elements
    const iconOnlyElements = document.querySelectorAll('.icon-only');
    const textOnlyElements = document.querySelectorAll('.text-only');

    iconOnlyElements.forEach(element => {
        element.style.display = 'none';
    });

    textOnlyElements.forEach(element => {
        element.style.display = 'inline';
    });

    sidebarToggler.addEventListener('click', function () {
        if (isOpen) {
            sidebar.classList.add('closed');  // Close the sidebar.
        } else {
            sidebar.classList.remove('closed');  // Open the sidebar.
        }
        isOpen = !isOpen;  // Toggle the state.

        // Toggle the visibility of icon-only and text-only elements
        iconOnlyElements.forEach(element => {
            element.style.display = isOpen ? 'none' : 'inline';
        });

        textOnlyElements.forEach(element => {
            element.style.display = isOpen ? 'inline' : 'none';
        });
    });
});
