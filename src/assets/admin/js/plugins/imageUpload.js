/* image uplaod */
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
    "image/avif",
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

let inputHidden = document.querySelector("#screenshoot");
let triggerInput = document.querySelector(".selectImage");
let imgArea = document.querySelector(".imgArea");

triggerInput.addEventListener("click", function() {
    inputHidden.click();
})

inputHidden.addEventListener("change", function(e) {
    let image = e.target.files[0];
    if (!validFileType(image)) {
        alert("invalid file type");
        return;
    }
    if (image.size > 2097152) {
        alert("image size must be less than 2MB");
        return;
    } else {
        const reader = new FileReader();
        reader.addEventListener("load", function() {
            const allImgs = document.querySelectorAll(".imgArea img");
            allImgs.forEach((img) => {
                img.remove();
            })
            const imgUrl = reader.result;
            const img = document.createElement("img");
            img.src = imgUrl;
            imgArea.appendChild(img);
            imgArea.classList.add("active");
            imgArea.dataset.title = image.name;
            // alert("image uploaded successfully");
        })
        reader.readAsDataURL(image);
    }
})