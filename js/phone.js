const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phone = data.data;
    displayPhone(phone, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";

    // display show all button, if there are more than 12 phone
    const showAllContainer = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
    }
    else {
        showAllContainer.classList.add("hidden");
        // first 12 phone 
    }


    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach((phone) => {
        console.log(phone);
        const phoneCart = document.createElement("div");
        phoneCart.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCart.innerHTML = ` <figure><img src="${phone.image}"
alt="Shoes" /></figure>
<div class="card-body">
<h2 class="card-title">${phone.phone_name}</h2>
<p>If a dog chews shoes whose shoes does he choose?</p>
<div class="card-actions justify-center">
<button onClick="handleShowdetails('${phone.slug}');my_modal_5.showModal()" class="btn btn-primary">Show details</button>
</div>
</div>`;

        phoneContainer.appendChild(phoneCart);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
};


const handleShowdetails = async (id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;
    const showDetailsContainer = document.getElementById("show-details-container");
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}"> 
    <p><span>Stroage: ${phone?.mainFeatures?.storage}</span></p>
    <p><span>Stroage: ${phone?.others?.GPS ? phone?.others?.GPS : "No GPS"}</span></p>`;
    console.log(phone);
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = phone.name;
    handleShowdetails.showModal();
}

const handleSearch = (isShowAll) => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    toggleLoadingSpinner(true);
    console.log(searchText);
    loadPhone(searchText, isShowAll);
};


// const handleSearch2 = () => {
//     const searchField = document.getElementById("search-field2");
//     const searchText = searchField.value;
//     toggleLoadingSpinner(true);
//     console.log(searchText);
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");
    }
}


const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();
