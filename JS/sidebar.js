document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.flex-1');
    const sidebarToggler = document.getElementById('sidebarToggler');
    let isOpen = true;  // Initially, the sidebar is open with text-only elements visible.

    // Initially show text-only elements and hide icon-only elements
    const iconOnlyElements = document.querySelectorAll('.icon-only');
    const textOnlyElements = document.querySelectorAll('.text-only');

    iconOnlyElements.forEach(element => {
        element.style.display = 'none';
    });

    textOnlyElements.forEach(element => {
        element.style.display = 'inline';
    });

    // Set the initial state of the main content area
    if (isOpen) {
        mainContent.classList.add('main-open');  // Move the main content area 13rem to the right if open
    } else {
        mainContent.classList.add('main-closed');  // Move the main content area 9rem to the right if closed
    }

    sidebarToggler.addEventListener('click', function () {
        if (isOpen) {
            sidebar.classList.add('closed');  // Close the sidebar.
            mainContent.classList.remove('main-open');  // Reset the main content area margin if closed
            mainContent.classList.add('main-closed');  // Move the main content area 9rem to the right.
        } else {
            sidebar.classList.remove('closed');  // Open the sidebar.
            mainContent.classList.remove('main-closed');  // Reset the main content area margin if open
            mainContent.classList.add('main-open');  // Move the main content area 13rem to the right.
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
