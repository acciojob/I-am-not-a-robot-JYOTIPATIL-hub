//your code here
const imageContainer = document.getElementById("imageContainer");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const messageParagraph = document.getElementById("para");

let images = [];  // Array to hold image elements
let selectedImages = [];  // Array to track selected images

// Array with 5 unique images (URLs can be API calls if needed)
const imageSources = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"];

function initGame() {
    // Reset message and buttons
    messageParagraph.textContent = "";
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    selectedImages = [];

    // Choose a random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * imageSources.length);
    const duplicateImage = imageSources[duplicateIndex];

    // Create an array with images including the duplicate
    const imagesToRender = [...imageSources, duplicateImage];

    // Shuffle the images array
    imagesToRender.sort(() => Math.random() - 0.5);

    // Render images in the container
    imageContainer.innerHTML = "";
    imagesToRender.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src; 
        img.className = `img${duplicateIndex + 1}`; // Class names per requirement
        img.onclick = () => handleImageClick(img, src);
        imageContainer.appendChild(img);
    });
}

// Handle image click
function handleImageClick(img, src) {
    // Check if image was already selected (to avoid double-clicking the same image)
    if (selectedImages.includes(src)) return;

    // Add the selected image to the array and show Reset button
    selectedImages.push(src);
    resetButton.style.display = "block";

    // Check if two images have been clicked
    if (selectedImages.length === 2) {
        verifyButton.style.display = "block";
    } else {
        verifyButton.style.display = "none";
    }
}

// Verify user selection
function verifySelection() {
    verifyButton.style.display = "none";

    if (selectedImages.length === 2) {
        if (selectedImages[0] === selectedImages[1]) {
            messageParagraph.textContent = "You are a human. Congratulations!";
        } else {
            messageParagraph.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
    }
}

// Reset the game
function resetGame() {
    initGame();  // Reinitialize game state
}

// Initialize game on page load
initGame();
