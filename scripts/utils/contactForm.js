// Global DOM variables
const modal = document.getElementById('contact_modal');
const openModalBtn = document.querySelector('.contact_button');
const closeModalBtn = document.querySelector('.modal-close-btn');

// Event listeners
openModalBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', closeModal);


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
