const filters = {
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
    exposure:{
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

imageInput.addEventListener("change",(dets)=>{
    const file = dets.target.files[0];
    console.dir(file);

    // Creating image through JS
    const image = new Image();
    // converting in URL
    image.src = URL.createObjectURL(file);

    image.onload = () => {
        placeHolder.style.display = "none";
        imageCanvas.style.display = "initial";
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        canvasCtx.drawImage(image,0,0);
    }

});

reset.addEventListener("click",()=>{
    imageCanvas.style.display = "none";
    placeHolder.style.display = "flex";
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

    return div;
}

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