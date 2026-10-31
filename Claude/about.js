// О нас: один открытый вопрос FAQ + форма обратной связи
$$('.faq details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) $$('.faq details').forEach(o => o !== d && (o.open = false));
}));
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, m = $('#formMsg');
  if (f.name.value.trim().length < 2) return fail('Укажите имя (не короче 2 букв).');
  if (!validEmail(f.email.value)) return fail('Проверьте email: он должен выглядеть как name@mail.ru.');
  if (f.message.value.trim().length < 10) return fail('Напишите сообщение хотя бы из 10 символов.');
  m.textContent = 'Сообщение отправлено. Ответим в течение рабочего дня.'; m.className = 'msg ok'; f.reset();
  function fail(t) { m.textContent = t; m.className = 'msg err'; }
});
