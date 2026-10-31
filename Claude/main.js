// Общий скрипт: меню, корзина, подписка, уведомления
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let cart = Number(sessionStorage.getItem('cart') || 0);

function updateCart() { const c = $('#cartCount'); if (c) c.textContent = cart; }
function toast(text) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = text; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}
function addToCart(name) {
  cart++; sessionStorage.setItem('cart', cart); updateCart(); toast('Добавлено в корзину: ' + name);
}
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

$('.burger')?.addEventListener('click', () => $('.nav').classList.toggle('open'));
updateCart();
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (b) addToCart(b.dataset.add);
  const f = e.target.closest('.fav');
  if (f) f.classList.toggle('on');
});
$('#subForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const i = $('#subEmail'), m = $('#subMsg');
  if (!validEmail(i.value)) { m.textContent = 'Введите email в формате name@mail.ru'; m.className = 'msg err'; return; }
  m.textContent = 'Готово! Мы напишем, когда появятся новые вещи.'; m.className = 'msg ok'; i.value = '';
});
