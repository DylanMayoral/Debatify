function initializeThermometers() {
  const levels = document.querySelectorAll(".thermometer .level");
  levels.forEach(level => {
    const targetHeight = level.getAttribute("data-percentage");
    level.style.height = `${targetHeight}%`;
  });
}

// Run on both initial load and Turbo navigation
document.addEventListener("DOMContentLoaded", initializeThermometers);
document.addEventListener("turbo:load", initializeThermometers);
