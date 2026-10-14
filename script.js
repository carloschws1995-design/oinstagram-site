const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const switchLinks = document.querySelectorAll('[data-switch-modal]');
const buyButtons = document.querySelectorAll('.buy-btn');
const filterButtons = document.querySelectorAll('[data-category-filter]');
const productCards = document.querySelectorAll('.product-card');
const productSearch = document.getElementById('productSearch');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const checkoutProductName = document.getElementById('checkoutProductName');
const checkoutProductPrice = document.getElementById('checkoutProductPrice');
let selectedCategory = 'Todos';

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function showPrototypeNotice(form, message) {
  let notice = form.querySelector('.info-message');
  if (!notice) {
    notice = document.createElement('p');
    notice.className = 'info-message';
    notice.setAttribute('role', 'status');
    form.appendChild(notice);
  }
  notice.textContent = message;
}

function filterProducts() {
  const searchTerm = productSearch.value.trim().toLocaleLowerCase('pt-BR');

  productCards.forEach((card) => {
    const matchesCategory = selectedCategory === 'Todos' || card.dataset.category === selectedCategory;
    const searchableText = `${card.dataset.name} ${card.dataset.category} ${card.querySelector('p').textContent}`
      .toLocaleLowerCase('pt-BR');
    const matchesSearch = searchableText.includes(searchTerm);
    card.hidden = !matchesCategory || !matchesSearch;
  });
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => closeModal(button.dataset.closeModal));
});

switchLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const currentModal = document.querySelector('.modal.open');
    if (currentModal) closeModal(currentModal.id);
    openModal(link.dataset.switchModal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) closeModal(modal.id);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') modals.forEach((modal) => closeModal(modal.id));
});

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    if (!card) return;
    checkoutProductName.textContent = card.dataset.name;
    checkoutProductPrice.textContent = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(card.dataset.price));
    openModal('checkoutModal');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.categoryFilter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    filterProducts();
  });
});

productSearch.addEventListener('input', filterProducts);
document.querySelector('.search-button').addEventListener('click', filterProducts);
document.querySelector('[data-scroll-target]').addEventListener('click', (event) => {
  document.getElementById(event.currentTarget.dataset.scrollTarget).scrollIntoView({ behavior: 'smooth' });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showPrototypeNotice(loginForm, 'A autenticação ainda precisa ser conectada a um serviço seguro.');
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showPrototypeNotice(signupForm, 'O cadastro ainda precisa ser conectado a um serviço seguro.');
});
