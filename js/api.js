const loadPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value ;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))

    searchField.value = '';
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone =>{
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
    })
}

const phoneDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = infoId => {
    // console.log(infoId);
    const detailsPhone = document.getElementById('phone-details');
    detailsPhone.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${infoId.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text"><span class="fw-bold">Name :</span> ${infoId.name}</p>
        <p class="card-text"><span class="fw-bold">Release Date :</span> ${infoId.releaseDate}</p>
        <p class="card-text"><span class="fw-bold">Storage :</span> ${infoId.mainFeatures.storage}</p>
        <p class="card-text"><span class="fw-bold">Memory Capacity :</span> ${infoId.mainFeatures.memory}</p>
        <p class="card-text"><span class="fw-bold">Display :</span> ${infoId.mainFeatures.displaySize}</p>
    </div>
    `
    detailsPhone.appendChild(div);
}
