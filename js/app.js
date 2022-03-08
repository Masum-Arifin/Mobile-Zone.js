// Search Handler
const searchResult = document.getElementById("search-result");
const itemDetail = document.getElementById("details");
const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchInput = searchField.value;
  searchField.value = "";

  // Error Handling
  const errorDiv = document.getElementById("error-message");
  if (searchInput == "") {
    errorDiv.innerText = "Please write something to search.";
  } else {
    errorDiv.innerText = "";
    // Load Phone APi ..
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displaySearchResult(data.data));
  }
};
const displaySearchResult = (phone) => {
  const errorDiv = document.getElementById("error-message");
  if (phone.length == 0) {
    errorDiv.innerText = "No Result Found!";
    searchResult.textContent = "";
    itemDetail.textContent = "";
  } else {
    // const twentyProducts = phone.slice(0, 20);
    searchResult.textContent = "";
    twentyProducts.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="card">
              <img class="w-50 mx-auto pt-2" src="${phone.image}" class="card-img-top" alt="">
              <div class="card-body">
                  <h4 class="fs-4">${phone.phone_name}</h4>
                  <h5 class="fs-5 my-3">Brand: ${phone.brand}</h5>
                  <button onclick="showDetails('${phone.slug}')" class="btn btn-success">Details</button>
              </div>
          </div>
          `;
      searchResult.appendChild(div);
    });
  }
};

// ..........itemsDetails url..........
const showDetails = (itemId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${itemId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

// display Phone Features

const displayPhoneDetails = (item) => {
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
  <div class="col-md-4 mt-5">
  <img src="${item.image}" class="h-75 w-75 img-fluid rounded-start" alt="..." />
    </div>
      <div class="col-md-8 mt-5">
          
          <div class="card-body text-start">
              <h3 class="card-title text-light">Brand: ${item.brand}</h3>
              <h5 class="area text-light">Name: <span>${item.name}</span></h5>
              <h5 class="model text-light">Model: <span>${item.slug}</span></h5>
              <h5 class="release text-light">Release: ${item?.releaseDate}</span></p>
              <h5 class="fw-bold text-light"> Main Features</h5>
      <h6 class="text-light"><span class="fw-bold text-light">Chipset:</span> ${item.mainFeatures.chipSet}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">Display Size:</span> ${item.mainFeatures.displaySize}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">Memory:</span> ${item.mainFeatures.memory}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">Sensors:</span> ${item.mainFeatures.sensors}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">storage:</span> ${item.mainFeatures.storage}</h6>
      <h4 class="fw-bold text-light"> Others</h4>
      <h6 class="text-light"><span class="fw-bold text-light">Bluetooth:</span> ${item.others?.Bluetooth}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">GPS:</span> ${item.others?.GPS}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">NFC:</span> ${item.others?.NFC}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">Radio:</span> ${item.others?.Radio}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">USB:</span> ${item.others?.USB}</h6>
      <h6 class="text-light"><span class="fw-bold text-light">WLAN:</span> ${item.others?.WLAN}</h6>
      
               <button onclick="less()" class="btn btn-danger shadow-none">show less</button>
          </div>
      </div>
  `;

  itemDetail.textContent = "";
  itemDetail.appendChild(div);
};
const less = () => {
  itemDetail.innerText = "";
};
