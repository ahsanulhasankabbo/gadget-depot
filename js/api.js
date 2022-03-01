// spinner function 
const loadSpinner = spinnerStyle => {
    document.getElementById('spinner').style.display = spinnerStyle;
}
const loadPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value ;

    // display spinner 
    loadSpinner('block');

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))

    searchField.value = '';
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    const detailsPhone = document.getElementById('phone-details');
    
    phoneContainer.textContent = '';
    // error handle 
    if(phones.length === 0){
        document.getElementById('error-section').style.display = 'block';
        detailsPhone.textContent = '';
        loadSpinner('none');
    }
    // display function 
    else{
    phones.forEach(phone =>{
        document.getElementById('error-section').style.display = 'none';
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                  <div class="card">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title">Name : ${phone.phone_name}</h5>
                      <h5 class="card-text">Brand : ${phone.brand}</h5>
                      <button class="btn bg-success text-white" onclick="phoneDetails('${phone.slug}')">Details</button>
                    </div>
                    
                  </div>
        `
        phoneContainer.appendChild(div);
        loadSpinner('none');
    })
    }
}

const phoneDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}
// details function 
const displayDetails = infoId => {
    console.log(infoId);
    const detailsPhone = document.getElementById('phone-details');
    // detailsPhone.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${infoId.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text"><span class="fw-bold">Name :</span> ${infoId.name}</p>
        <p class="card-text"><span class="fw-bold">Release Date :</span> ${infoId.releaseDate!==''?infoId.releaseDate:'<span class="text-danger fw-bold">not found</span>'}</p>
        <p class="card-text"><span class="fw-bold">Storage :</span> ${infoId.mainFeatures.storage}</p>
        <p class="card-text"><span class="fw-bold">Memory Capacity :</span> ${infoId.mainFeatures.memory}</p>
        <p class="card-text"><span class="fw-bold">Display :</span> ${infoId.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Sensors :</span> ${infoId.mainFeatures.sensors}</p>
        <p class="m-0"><span class="fw-bold">Others : </span></p>
        <p class="card-text m-0"><span class="fw-bold"></span> ${infoId.others.WLAN}</p>
        <p class="card-text m-0"><span class="fw-bold"></span> ${infoId.others.Bluetooth}</p>
        <p class="card-text m-0"><span class="fw-bold"></span> ${infoId.others.GPS}</p>
        <p class="card-text m-0"><span class="fw-bold"></span> ${infoId.others.USB}</p>

    </div>
    `
    detailsPhone.appendChild(div);
}
