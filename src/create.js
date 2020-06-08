import { fabric } from 'fabric';
import rates from './exchange';

const basePrice = 200;
// const colorPercent = 10;
const printPercent = 1.5;
let price = basePrice;

const canvas = new fabric.Canvas('tshirt-canvas');

function updateTshirtImage(imageURL) {
  // If the user doesn't pick an option of the select, clear the canvas
  // if (!imageURL) {
  canvas.clear();
  // }

  // Create a new image that can be used in Fabric with the URL
  const image = fabric.Image.fromURL(imageURL, function (img) {
    img.scaleToHeight(100);
    img.scaleToWidth(100);
    canvas.centerObject(img);
    canvas.add(img);
    canvas.renderAll();
    console.log(img);
  });

  console.log(canvas);
  console.log(image);
}

async function getOtherPrices(prc) {
  const result = await rates.then((rts) => {
    return Object.keys(rts)
      .map((key) => {
        const currency = rts[key];
        return `${Math.round((prc / currency.rate) * 100) / 100} ${currency.id} (${currency.name}) <br/>`;
      })
      .join('');
  });
  return result;
}
async function updatePrice(extrasPercent) {
  price = basePrice * extrasPercent;
  document.getElementById('base-currency').innerText = price + ' NOK';
  document.getElementById('other-currency').innerHTML = await getOtherPrices(price);
}

function switchDesign(e) {
  updateTshirtImage(e.target.value);
  updatePrice(e.target.value === '' ? 1 : printPercent);

  console.log(e.target.value);
}
function getFavs() {
  let favs = localStorage.getItem('favorites');
  if (favs !== null) {
    favs = JSON.parse(favs);
  } else {
    favs = {
      projects: [],
    };
  }
  return favs;
}

function saveFavs(favs) {
  if (favs !== undefined) {
    localStorage.setItem('favorites', JSON.stringify(favs));
  } else {
    localStorage.removeItem('favorites');
  }
}

function renderFavs() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  const favs = getFavs();

  // <div class="gallery">
  // <a target="_blank">
  //       <img class="bckg" src="${project.background}" alt="" width="450" height="450">
  //       <img class="print" src="${project.img}" width="150" height="200">
  // </a>
  //   <button class="delete-btn" data-idx="${idx}">Delete</button>
  // </div>

  favs.projects.forEach(async function (project, idx) {
    const others = await getOtherPrices(project.price);
    const galleryTemplate = `
      <div class="gallery">
          <div id="tshirt-div2">
                        <img id="tshirt-backgroundpicture" src="${project.background}" width="450"
                            height="450" />

                        <div id="drawingArea" class="drawing-area2">
                            <div class="canvas-container2">
                            <img id="tshirt-canvas" class="print" src="${project.img}" width="150" height="200">
                        </div>

                        <hr>

                        <div class="desc">${project.price} NOK</div>
                        <div>${others}</div>
                        <br>
            <button class="delete-btn" data-idx="${idx}">Delete</button>
        </div>`;
    const item = document.createElement('div');
    item.className = 'responsive';
    item.innerHTML = galleryTemplate;
    gallery.appendChild(item);
  });
}

function addToFavs() {
  let favs = localStorage.getItem('favorites');
  if (favs !== null) {
    favs = JSON.parse(favs);
  } else {
    favs = {
      projects: [],
    };
  }

  const newProject = {
    img: canvas.toDataURL('image/png'),
    background: document.getElementById('tshirt-backgroundpicture').src,
    price: price,
  };

  favs.projects.push(newProject);
  saveFavs(favs);
  renderFavs();
}

function galleryClicked(evt) {
  console.dir(evt.target.className);
  if (evt.target.className === 'delete-btn') {
    const deleteIdx = Number(evt.target.dataset.idx);
    const favs = getFavs();
    favs.projects.splice(deleteIdx, 1);
    saveFavs(favs);
    renderFavs();
  }
}
export function createFabric() {
  const selector = document.getElementById('tshirt-design');
  selector.addEventListener('change', switchDesign);
  const addToFavsBtn = document.getElementById('btn-AddToFavs');
  addToFavsBtn.addEventListener('click', addToFavs);
  const gallery = document.getElementById('gallery');
  gallery.addEventListener('click', galleryClicked);
  rates.then(() => updatePrice(1));
  renderFavs();
}
