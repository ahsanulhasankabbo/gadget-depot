const loadPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value ;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone =>{
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                  <div class="card">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body text-center">
                      <h3 class="card-title">${phone.phone_name}</h3>
                      <h3 class="card-text">${phone.brand}</h3>
                    </div>
                  </div>
        `
        phoneContainer.appendChild(div);
    })
}
