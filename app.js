// Add smooth scrolling to the 'Read More About Design Process' button
document.querySelector(".read").addEventListener("click", function () {
  document.querySelector(".designProcess-page").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// Smooth scrolling for navbar links
const navLinks = document.querySelectorAll("[data-nav-link]");
navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute("href"); // Get the target section ID or URL

    if (targetId.startsWith("#")) {
      // If the target is an anchor on the same page
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start", // Scroll to the top of the target section
      });
    } else {
      // If the target is a link to another page
      window.location.href = targetId; // Navigate to the new page
    }
  });
});
