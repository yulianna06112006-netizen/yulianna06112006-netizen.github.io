document.addEventListener('DOMContentLoaded', () => {
    // Подсветка активного пункта меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Модальное окно быстрого просмотра
    const modal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const closeBtn = document.querySelector('.modal-close');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // В реальном проекте здесь подгрузка данных по ID товара
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
    });

    // FAQ Аккордеон
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            // Закрываем все остальные
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Обработка форм (имитация)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Отправлено!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    });

    // Фильтры (визуальная имитация для демо)
    document.querySelectorAll('.filter-option input').forEach(input => {
        input.addEventListener('change', () => {
            console.log(`Фильтр изменен: ${input.name} = ${input.value}`);
            // Здесь должна быть логика фильтрации товаров
        });
    });
});