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
    console.log(property);

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

Object.keys(presets).forEach(presetName =>{
    const presetsBtn = document.createElement("button");
    presetsBtn.classList.add("presets-btn btn");
    presetsBtn.textContent = presetName;

    presetsContainer.appendChild(presetsBtn);

    presetsBtn.addEventListener("click",()=>{
        const preset = presets(presetName);

        console.log(preset);

        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName];
        });

        applyFilters();

        // to change side-bar rangs
        filterContainer.innerHTML = "";
        createFilters();
    });
});