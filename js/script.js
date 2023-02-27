const loadPhone = (searchText, limit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data, limit))
}

// display data
const displayPhone = (phones, limit) => {
    // console.log(phones);
    const PhoneContainer = document.getElementById('phone-container');
    PhoneContainer.innerHTML = '';

    // show first 10 product
    const showAllBtn = document.getElementById('show-all')
    if (limit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }

    // display error message
    const errorMsg = document.getElementById('error-msg')
    if (phones.length === 0) {
        errorMsg.classList.remove('hidden')
    } else {
        errorMsg.classList.add('hidden')
    }
    // get all product
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-slate-800 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${phone.image}" alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <label for="my-modal-6" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</label>
          </div>
        </div>
        </div>`;
        PhoneContainer.appendChild(div);
    });
    // stop loader 
    toggleLoader(false)
}

// dynamic search data
const searchText = (limit) => {
    // start laoder 
    toggleLoader(true)
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue, limit);
}

// click for get some product
document.getElementById('search-btn').addEventListener('click', function(){
    searchText(10)
})

// loader
const toggleLoader = (isloading) => {
    const laoder = document.getElementById('loader');
    if (isloading == true) {
        laoder.classList.remove('hidden')
    } else {
        laoder.classList.add('hidden')
    }
}

// show all product
document.getElementById('show-all-btn-clicked').addEventListener('click', function(){
    searchText()
})

// enter key
document.getElementById('search-field').addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        searchText(10)
    }
})

// Modal
const phoneDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => modalDisplay(data.data))
}

// display modal
const modalDisplay = (modal) => {
    console.log(modal);
    const modalbox = document.getElementById('modal-box');
    modalbox.innerHTML = `
    <h3 class="font-bold text-lg mb-5">${modal.name}</h3>
    <img class="mx-auto block" src="${modal.image}">
    <h3 class="font-bold text-sm mt-5">Brand: ${modal.brand}</h3>
    <h3 class="font-bold text-sm mt-3">ChipSet: ${modal?.mainFeatures?.chipSet}</h3>
    <h3 class="font-bold text-sm mt-3">Display: ${modal?.mainFeatures?.displaySize}</h3>
    <h3 class="font-bold text-sm mt-3">Memory: ${modal?.mainFeatures?.memory}</h3>
    <h3 class="font-bold text-sm mt-3">Storage: ${modal?.mainFeatures?.storage}</h3>
    <h3 class="font-bold text-sm mt-3">Bluetooth: ${modal?.others?.Bluetooth}</h3>
    <div class="modal-action">
        <label for="my-modal-6" class="btn">Close</label>
    </div>`;
}

loadPhone('iphone')
