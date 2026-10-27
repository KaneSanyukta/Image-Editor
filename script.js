let filters = {
    brightness:{
        min:0,
        value:100,
        max:200,
        unit:"%",
    },
    contrast:{
        min:0,
        value:100,
        max:200,
        unit:"%",
    },
    saturation:{
        min:0,
        value:100,
        max:200,
        unit:"%",
    },
    hueRotation:{
        min:0,
        value:0,
        max:360,
        unit:"deg",
    },
    blur:{
        min:0,
        value:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        min:0,
        value:0,
        max:100,
        unit:"%",
    },
    sepia:{
        min:0,
        value:0,
        max:100,
        unit:"%",
    },
    opacity:{
        min:0,
        value:100,
        max:100,
        unit:"%",
    },
    invert:{
        min:0,
        value:0,
        max:100,
        unit:"%",
    },
}

const filterContainer = document.querySelector(".filters");

const placeHolder = document.querySelector(".placeholder");
const imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
const imageInput = document.querySelector("#image-input");
const reset = document.querySelector("#reset-btn");

let file = "null";
let selectedImage = "null";

const downloadBtn = document.querySelector("#download-btn");

const presetsContainer = document.querySelector(".presets");

imageInput.addEventListener("change",(dets)=>{
    file = dets.target.files[0];
    console.dir(file);

    // Creating image through JS
    const image = new Image();
    // converting in URL
    image.src = URL.createObjectURL(file);

    image.onload = () => {
        selectedImage = image;
        placeHolder.style.display = "none";
        imageCanvas.style.display = "initial";
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        canvasCtx.drawImage(image,0,0);
    }

});

function createFilterElement(name,unit="%",value,min,max){

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.id = name;
    input.max = max;
    input.value = value;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input",(event)=>{
        // console.log(event.target.value);
        // console.log(event.target.id);

        filters[name].value = input.value;
        // console.log(filters[name]);
        applyFilters(event.target.id);
    })

    return div;
}

function createFilters(){
    Object.keys(filters).forEach(filter=>{
        //console.log(filter);
        //console.log(filters[filter]);

        const filterElement = createFilterElement(
            filter,
            filters[filter].unit,
            filters[filter].value,
            filters[filter].min,
            filters[filter].max
        );

        //console.dir(filterElement);
        filterContainer.appendChild(filterElement);
    });
}

createFilters();

function applyFilters(property){
    // console.log(property);

    // crearing previous image
    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        `.trim();

    // re-draw image
    canvasCtx.drawImage(selectedImage,0,0);
}

reset.addEventListener("click",()=>{
    // put inital value
    filters = {
        brightness:{
            min:0,
            value:100,
            max:200,
            unit:"%",
        },
        contrast:{
            min:0,
            value:100,
            max:200,
            unit:"%",
        },
        saturation:{
            min:0,
            value:100,
            max:200,
            unit:"%",
        },
        hueRotation:{
            min:0,
            value:0,
            max:360,
            unit:"deg",
        },
        blur:{
            min:0,
            value:0,
            max:20,
            unit:"px",
        },
        grayscale:{
            min:0,
            value:0,
            max:100,
            unit:"%",
        },
        sepia:{
            min:0,
            value:0,
            max:100,
            unit:"%",
        },
        opacity:{
            min:0,
            value:100,
            max:100,
            unit:"%",
        },
        invert:{
            min:0,
            value:0,
            max:100,
            unit:"%",
        },
    }
    applyFilters();

    // to change side-bar rangs
    filterContainer.innerHTML = "";
    createFilters();
});

downloadBtn.addEventListener("click",()=>{
    const link = document.createElement("a");
    // a have attribute download to download content instead of nevigate
    link.download = "edited-image.png";
    // Converting image canvas data into url
    link.href = imageCanvas.toDataURL();
    link.click();
});

const presets = {

    oldSchool: {
        brightness: 105,
        contrast: 115,
        saturation: 80,
        grayscale: 10,
        sepia: 35,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 75,
        grayscale: 0,
        sepia: 45,
        blur: 0,
        hueRotation: 350,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 105,
        contrast: 125,
        saturation: 0,
        grayscale: 100,
        sepia: 0,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        grayscale: 0,
        sepia: 20,
        blur: 0,
        hueRotation: 350,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 105,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hueRotation: 190,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        grayscale: 5,
        sepia: 30,
        blur: 0.3,
        hueRotation: 10,
        opacity: 100,
        invert: 0
    },

    dramatic: {
        brightness: 90,
        contrast: 155,
        saturation: 110,
        grayscale: 15,
        sepia: 0,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    vivid: {
        brightness: 105,
        contrast: 115,
        saturation: 165,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 95,
        grayscale: 0,
        sepia: 5,
        blur: 0.5,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        saturation: 110,
        grayscale: 0,
        sepia: 10,
        blur: 1,
        hueRotation: 5,
        opacity: 95,
        invert: 0
    },

    fadedFilm: {
        brightness: 110,
        contrast: 80,
        saturation: 65,
        grayscale: 10,
        sepia: 20,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    // 1. Kodak Portra
    kodakPortra: {
        brightness: 108,
        contrast: 92,
        saturation: 85,
        grayscale: 0,
        sepia: 18,
        blur: 0,
        hueRotation: 355,
        opacity: 100,
        invert: 0
    },

    goldenHour: {
        brightness: 112,
        contrast: 105,
        saturation: 115,
        grayscale: 0,
        sepia: 25,
        blur: 0,
        hueRotation: 350,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 82,
        contrast: 125,
        saturation: 85,
        grayscale: 5,
        sepia: 8,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    pastel: {
        brightness: 115,
        contrast: 82,
        saturation: 85,
        grayscale: 5,
        sepia: 5,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    tealOrange: {
        brightness: 100,
        contrast: 120,
        saturation: 120,
        grayscale: 0,
        sepia: 10,
        blur: 0,
        hueRotation: 345,
        opacity: 100,
        invert: 0
    },

    matte: {
        brightness: 108,
        contrast: 78,
        saturation: 85,
        grayscale: 0,
        sepia: 8,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    arctic: {
        brightness: 105,
        contrast: 110,
        saturation: 90,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hueRotation: 185,
        opacity: 100,
        invert: 0
    },

    sunset: {
        brightness: 105,
        contrast: 112,
        saturation: 125,
        grayscale: 0,
        sepia: 22,
        blur: 0,
        hueRotation: 340,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 100,
        contrast: 130,
        saturation: 160,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hueRotation: 285,
        opacity: 100,
        invert: 0
    },

    coffee: {
        brightness: 95,
        contrast: 105,
        saturation: 75,
        grayscale: 0,
        sepia: 35,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },

    rose: {
        brightness: 108,
        contrast: 98,
        saturation: 110,
        grayscale: 0,
        sepia: 12,
        blur: 0,
        hueRotation: 325,
        opacity: 100,
        invert: 0
    },

    forest: {
        brightness: 95,
        contrast: 115,
        saturation: 105,
        grayscale: 0,
        sepia: 8,
        blur: 0,
        hueRotation: 20,
        opacity: 100,
        invert: 0
    },

    ocean: {
        brightness: 100,
        contrast: 112,
        saturation: 115,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hueRotation: 175,
        opacity: 100,
        invert: 0
    },

    polaroid: {
        brightness: 110,
        contrast: 88,
        saturation: 80,
        grayscale: 0,
        sepia: 18,
        blur: 0,
        hueRotation: 0,
        opacity: 100,
        invert: 0
    },
};


Object.keys(presets).forEach((presetName) => {
    const presetsBtn = document.createElement("button");

    presetsBtn.classList.add("btn");
    presetsBtn.textContent = presetName;

    presetsContainer.appendChild(presetsBtn);

    presetsBtn.addEventListener("click", (event) => {
        // Remove active class from all preset buttons
        presetsContainer.querySelectorAll(".btn").forEach((btn) => {
            btn.classList.remove("presets-btn");
        });

        // Add active class to the clicked button
        event.currentTarget.classList.add("presets-btn");

        // Get the selected preset
        const preset = presets[presetName];

        // Update filter values
        Object.keys(preset).forEach((filterName) => {
            filters[filterName].value = preset[filterName];
        });

        // Apply selected filters
        applyFilters();

        // Update sidebar ranges
        filterContainer.innerHTML = "";
        createFilters();
    });
});
