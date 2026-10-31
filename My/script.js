// script.js — простой JavaScript для сайта «Вторая Эпоха»
// Скрипт подключается на всех трёх страницах, поэтому каждая функция
// сначала проверяет, есть ли нужный элемент на текущей странице.

// ===== 1. Счётчик корзины (все страницы) =====
// Число хранится в localStorage, чтобы не сбрасываться при переходе между страницами.
const cartCount = document.getElementById('cart-count');
let cart = Number(localStorage.getItem('cart')) || 0;

function showCart() {
    if (cartCount) {
        cartCount.textContent = cart;
    }
}
showCart();

// Кнопки «В корзину» есть только в каталоге
const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        cart = cart + 1;
        localStorage.setItem('cart', cart);
        showCart();

        // Короткая обратная связь на кнопке
        button.textContent = 'Добавлено ✓';
        setTimeout(function () {
            button.textContent = 'В корзину';
        }, 1200);
    });
});

// ===== 2. Фильтр товаров в каталоге =====
const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');
const counter = document.getElementById('products-count');

function filterProducts(category) {
    let visible = 0;

    products.forEach(function (card) {
        // data-category записан прямо в HTML у каждой карточки
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            visible = visible + 1;
        } else {
            card.style.display = 'none';
        }
    });

    if (counter) {
        counter.textContent = 'Найдено вещей: ' + visible;
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Убираем выделение у всех кнопок и ставим на нажатую
        filterButtons.forEach(function (b) {
            b.classList.remove('active');
        });
        button.classList.add('active');

        filterProducts(button.dataset.filter);
    });
});

// ===== 3. Проверка формы на странице «О нас» =====
const form = document.getElementById('contact-form');

if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');
    const sendButton = document.getElementById('send-btn');

    sendButton.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Простейшая проверка адреса: должна быть @ и точка после неё
        const emailOk = email.includes('@') && email.indexOf('.', email.indexOf('@')) !== -1;

        formMessage.className = 'form-message error';

        if (name === '') {
            formMessage.textContent = 'Введите ваше имя.';
        } else if (!emailOk) {
            formMessage.textContent = 'Введите корректную почту, например name@mail.ru.';
        } else if (message.length < 10) {
            formMessage.textContent = 'Сообщение слишком короткое (минимум 10 символов).';
        } else {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Спасибо, ' + name + '! Мы ответим вам на почту.';
            form.reset();
        }
    });
}
