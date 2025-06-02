const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

// Function to download one image with Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image: " + url));
  });
}

// Function to download all images in parallel and handle UI
function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(imgElements => {
      loading.style.display = "none";
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.textContent = err.message;
    });
}

// Button click handler
btn.addEventListener("click", downloadImages);
