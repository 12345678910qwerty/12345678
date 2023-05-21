const inp = document.querySelector('.x');
const cardData = [];

const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', filterCards);

const registrationButton = document.querySelector('.registration-button');
registrationButton.addEventListener('click', function () {
    window.location.href = '../html/index2.html';
});

function block(data) {
    const html = `
    <article class="con">
        <img src="${data.default_image.thumbnail}" alt="Plant Image" class="plant-image" onclick="viewDetails(event)"> <!-- Добавление обработчика событий для просмотра деталей товара -->
        <h2>Name:${data.common_name}</h2>
        <p><span id="${data.id}"></span></p>
        <p><span>info:${data.cycle}</span></p>
        <p><span>price: 10$ </span></p>
        <button class="add-to-cart" onclick="addToCart(event)">Добавить в корзину</button>
    </article>
  `;
    inp.insertAdjacentHTML('beforeend', html);
    cardData.push(data);
}

function addToCart(event) {
    const block = event.target.closest('.con');
    const img = block.querySelector('img').src;
    const name = block.querySelector('h2').textContent;
    const id = block.querySelector('p span[id]').id;

    const cartItem = {
        img,
        name,
        id
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function viewDetails(event) {
    const block = event.target.closest('.con');
    const id = block.querySelector('p span[id]').id;

    localStorage.setItem('selectedItemId', id);
    window.location.href = '../html/index4.html'; 
}

function filterCards() {
    const searchText = searchInput.value.toLowerCase();

    const filteredCards = cardData.filter((card) => {
        const name = card.common_name.toLowerCase();
        return name.includes(searchText);
    });

    renderCards(filteredCards);
}

function renderCards(cards) {
    clearContainer();

    cards.forEach((card) => {
        block(card);
    });
}

function clearContainer() {
    inp.innerHTML = '';
}

function show() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://perenual.com/api/species-list?page=1&key=sk-oC2o646648e8a363c981');
    request.send();
    request.addEventListener('load', () => {
        const response = JSON.parse(request.responseText);
        const data = response.data;
        cardData.push(...data);
        renderCards(cardData);
    });
}

show();
