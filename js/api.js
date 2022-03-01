// spinner function 
const loadSpinner = spinnerStyle => {
    document.getElementById('spinner').style.display = spinnerStyle;
}
const loadPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value ;

    // display spinner 
    loadSpinner('block');

    // phone url 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))

    // empty search field 
    searchField.value = '';
}

// display phones 
const displayPhone = phones => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    const detailsPhone = document.getElementById('phone-details');
    
    phoneContainer.textContent = '';
    detailsPhone.textContent = '';
    // error handle 
    if(phones.length === 0){
        document.getElementById('error-section').style.display = 'block';
        detailsPhone.textContent = '';
        loadSpinner('none');
    }
    // display function 
    else{
    phones.slice(0,20).forEach(phone =>{
        document.getElementById('error-section').style.display = 'none';
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                  <div class="card border-0 shadow">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title">Device : ${phone.phone_name}</h5>
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

// display details 
const phoneDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}
// details function 
const displayDetails = infoId => {
    // console.log(infoId);
    const detailsPhone = document.getElementById('phone-details');
    detailsPhone.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('border-0');
    div.innerHTML = `
    <div class="shadow">
    <img src="${infoId.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
        <p class="card-text"><span class="fw-bold">Device :</span> ${infoId.name}</p>
        <p class="card-text"><span class="fw-bold">Release Date :</span> ${infoId?.releaseDate!==''?infoId?.releaseDate:'<span class="text-danger">Sorry,release date is not available</span>'}</p>
        <p class="card-text"><span class="fw-bold">Storage :</span> ${infoId.mainFeatures.storage}</p>
        <p class="card-text"><span class="fw-bold">Chipset :</span> ${infoId?.mainFeatures?.chipSet !== undefined ?infoId?.mainFeatures?.chipSet : '<span>Sorry,chipset is not available</span>'}</p>
        <p class="card-text"><span class="fw-bold">Memory :</span> ${infoId?.mainFeatures?.memory !==undefined ?infoId?.mainFeatures?.memory :'<span>Sorry,memory capacity is not available</span>' }</p>
        <p class="card-text"><span class="fw-bold">Display :</span> ${infoId.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Sensors :</span> ${infoId.mainFeatures.sensors}</p>
        <p class="m-0"><span class="fw-bold">Others : </span></p>
        <p class="card-text"><span>WALN :</span> ${infoId?.others?.WLAN!== undefined?infoId?.others?.WLAN:'<span>Sorry,WALN is not available</span>'}</p>
        <p class="card-text m-0">Bluetooth : ${infoId?.others?.Bluetooth !==undefined?infoId?.others?.Bluetooth :'<span>Sorry,bluetooth is not available</span>'}</p>
        <p class="card-text m-0">GPS : ${infoId?.others?.GPS !==undefined ?infoId?.others?.GPS : '<span>Sorry,GPS is not available</span>'}</p>
        <p class="card-text m-0">USB : ${infoId?.others?.USB !==undefined ?infoId?.others?.USB : '<span>Sorry,USB is not available</span>'}</p>
        </div>
    </div>
    `
    detailsPhone.appendChild(div);
}
