// Get elements
const openManifestoBtn = document.getElementById("openManifestoBtn");
const manifestoPopup = document.getElementById("manifestoPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

// Open the pop-up
openManifestoBtn.addEventListener("click", () => {
    manifestoPopup.style.display = "block";
});

// Close the pop-up when the user clicks on the close button
closePopupBtn.addEventListener("click", () => {
    manifestoPopup.style.display = "none";
});

// Close the pop-up when the user clicks anywhere outside of the pop-up content
window.addEventListener("click", (event) => {
    if (event.target === manifestoPopup) {
        manifestoPopup.style.display = "none";
    }
});
