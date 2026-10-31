// Каталог: данные, фильтры, сортировка, быстрый просмотр
const items = [
  ['Шерстяное пальто', 'Верхняя одежда', 1974, 'M', 7800, 'Хорошее', '#8C5A3C', '#4A2F22', '100% шерсть', 'небольшая потёртость на манжете', 9, 1],
  ['Платье-миди в цветочек', 'Платья', 1968, 'S', 4500, 'Отличное', '#D9A441', '#B5543A', '100% хлопок', 'без дефектов', 8, 1],
  ['Джинсы Levi\'s 501', 'Джинсы', 1989, 'M', 5900, 'Хорошее', '#5B7A99', '#2F4256', '100% деним', 'лёгкая потёртость на коленях', 7, 1],
  ['Шёлковая блуза', 'Рубашки и блузы', 1982, 'M', 3200, 'Отличное', '#C98F6B', '#8A4B3A', '100% шёлк', 'без дефектов', 6, 1],
  ['Вязаный кардиган', 'Трикотаж', 1976, 'L', 3900, 'Хорошее', '#7C8F5A', '#3F4D2E', '80% шерсть, 20% акрил', 'мелкие катышки', 5, 0],
  ['Кожаная сумка', 'Аксессуары', 1971, 'One', 4200, 'С историей', '#8B5A2B', '#3E2713', 'натуральная кожа', 'потёртости углов', 4, 0],
  ['Платье с поясом', 'Платья', 1957, 'XS', 6900, 'Отличное', '#B5543A', '#6E2B1B', '100% вискоза', 'без дефектов', 3, 0],
  ['Вельветовая куртка', 'Верхняя одежда', 1983, 'L', 5400, 'Хорошее', '#A06A3A', '#5A3A1C', 'хлопок, вельвет', 'потёртость воротника', 2, 0],
  ['Джинсовая рубашка', 'Рубашки и блузы', 1995, 'XL', 2800, 'Отличное', '#6E8FB0', '#3C5570', '100% деним', 'без дефектов', 1, 0],
  ['Свитер с орнаментом', 'Трикотаж', 1988, 'M', 3500, 'Хорошее', '#9C4A3A', '#4F2A28', '100% шерсть', 'небольшая штопка', 10, 0],
  ['Шёлковый платок', 'Аксессуары', 1964, 'One', 1800, 'Отличное', '#D9A441', '#7A4A36', '100% шёлк', 'без дефектов', 11, 0],
  ['Клетчатое пальто', 'Верхняя одежда', 1969, 'S', 8900, 'С историей', '#6B6B5A', '#33332A', '70% шерсть', 'пятно на подкладке, заметна', 12, 0],
].map((a, i) => ({ id: i, name: a[0], cat: a[1], year: a[2], size: a[3], price: a[4], cond: a[5], c1: a[6], c2: a[7], fabric: a[8], defect: a[9], order: a[10], isNew: a[11], sold: i === 7 }));

const era = y => Math.floor(y / 10) * 10 + '-е';
const state = { cats: new Set(), eras: new Set(), size: null, max: 10000, sort: 'new' };
const grid = $('#grid');
const fmt = n => n.toLocaleString('ru-RU') + ' ₽';

function render() {
  let list = items.filter(p =>
    (!state.cats.size || state.cats.has(p.cat)) &&
    (!state.eras.size || state.eras.has(era(p.year))) &&
    (!state.size || p.size === state.size) && p.price <= state.max);
  const s = { new: (a, b) => b.order - a.order, asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, pop: (a, b) => a.id - b.id }[state.sort];
  list.sort(s);
  $('#count').textContent = `Найдено ${list.length} ${list.length % 10 === 1 && list.length !== 11 ? 'вещь' : 'вещей'}`;
  $('#maxLabel').textContent = fmt(state.max);
  grid.innerHTML = list.length ? list.map(p => `
    <article class="card ${p.sold ? 'sold' : ''}">
      ${p.sold ? '<span class="tag">ПРОДАНО</span>' : p.isNew ? '<span class="tag">NEW</span>' : ''}
      <button class="fav" aria-label="В избранное">♥</button>
      <div class="ph" style="--c1:${p.c1};--c2:${p.c2}">${p.cat}</div>
      <div class="info"><span class="era">${p.year}</span><span class="name">${p.name}</span>
        <span class="size">Размер ${p.size}</span><span class="price">${fmt(p.price)}</span>
        ${p.sold ? '' : `<button class="btn" data-add="${p.name}">В корзину</button>`}
        <button class="quick" data-view="${p.id}">Быстрый просмотр</button></div>
    </article>`).join('') : '<p class="empty">Ничего не нашли. Попробуйте снять часть фильтров.</p>';
}

// Фильтры
$$('[data-cat]').forEach(c => c.addEventListener('change', () => { c.checked ? state.cats.add(c.dataset.cat) : state.cats.delete(c.dataset.cat); render(); }));
$$('[data-era]').forEach(c => c.addEventListener('change', () => { c.checked ? state.eras.add(c.dataset.era) : state.eras.delete(c.dataset.era); render(); }));
$$('.sizes button').forEach(b => b.addEventListener('click', () => {
  const on = b.classList.contains('on');
  $$('.sizes button').forEach(x => x.classList.remove('on'));
  state.size = on ? null : b.textContent; if (!on) b.classList.add('on'); render();
}));
$('#price').addEventListener('input', e => { state.max = +e.target.value; render(); });
$('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
$('#reset').addEventListener('click', () => {
  Object.assign(state, { size: null, max: 10000 }); state.cats.clear(); state.eras.clear();
  $$('.filters input[type=checkbox]').forEach(c => c.checked = false);
  $$('.sizes button').forEach(b => b.classList.remove('on')); $('#price').value = 10000; render();
});

// Быстрый просмотр
const modal = $('#modal');
grid.addEventListener('click', e => {
  const b = e.target.closest('[data-view]'); if (!b) return;
  const p = items[b.dataset.view];
  $('#mPh').style = `--c1:${p.c1};--c2:${p.c2}`; $('#mPh').textContent = p.cat;
  $('#mEra').textContent = p.year; $('#mName').textContent = p.name; $('#mPrice').textContent = fmt(p.price);
  $('#mList').innerHTML = `<li>Размер: ${p.size}</li><li>Состав: ${p.fabric}</li><li>Состояние: ${p.cond.toLowerCase()}, ${p.defect}</li>`;
  const add = $('#mAdd'); add.dataset.add = p.name; add.hidden = p.sold;
  modal.classList.add('open'); $('.close', modal).focus();
});
const closeModal = () => modal.classList.remove('open');
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.close') || e.target.closest('[data-add]')) closeModal(); });
document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
render();
