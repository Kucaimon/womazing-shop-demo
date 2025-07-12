// Данные товаров
let cartItems = {
  1: {
    name: "Футболка USA",
    price: 129,
    quantity: 1,
  },
};

// Функция увеличения количества
function increaseQuantity(itemId) {
  cartItems[itemId].quantity++;
  updateItemDisplay(itemId);
  updateCartTotals();
}

// Функция уменьшения количества
function decreaseQuantity(itemId) {
  if (cartItems[itemId].quantity > 1) {
    cartItems[itemId].quantity--;
    updateItemDisplay(itemId);
    updateCartTotals();
  }
}

// Функция обновления количества при вводе
function updateQuantity(itemId) {
  const input = document.getElementById(`quantity-${itemId}`);
  const newQuantity = parseInt(input.value);

  if (newQuantity >= 1) {
    cartItems[itemId].quantity = newQuantity;
    updateItemDisplay(itemId);
    updateCartTotals();
  } else {
    input.value = cartItems[itemId].quantity;
  }
}

// Функция обновления отображения товара
function updateItemDisplay(itemId) {
  const item = cartItems[itemId];
  const quantityInput = document.getElementById(`quantity-${itemId}`);
  const totalElement = document.getElementById(`total-${itemId}`);

  quantityInput.value = item.quantity;
  totalElement.textContent = `$${item.price * item.quantity}`;
}

// Функция обновления общих сумм
function updateCartTotals() {
  let subtotal = 0;

  Object.values(cartItems).forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  document.getElementById("subtotal").textContent = `$${subtotal}`;
  document.getElementById("total").textContent = `$${subtotal}`;
}

// Функция удаления товара
function removeItem(itemId) {
  const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);

  // Анимация удаления
  itemElement.classList.add("fade-out");

  setTimeout(() => {
    delete cartItems[itemId];
    itemElement.remove();
    updateCartTotals();

    // Проверяем, есть ли еще товары
    if (Object.keys(cartItems).length === 0) {
      showEmptyCart();
    }
  }, 300);
}

// Функция отображения пустой корзины
function showEmptyCart() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 30px;">
                    <h2 style="color: #6c757d; margin-bottom: 20px;">Корзина пуста</h2>
                    <p style="color: #adb5bd;">Добавьте товары для оформления заказа</p>
                </div>
            `;
}

// Адаптивность для мобильных устройств
function handleMobileLayout() {
  const mobileRows = document.querySelectorAll(".mobile-row");

  if (window.innerWidth <= 480) {
    mobileRows.forEach((row) => {
      row.style.display = "flex";
    });
  } else {
    mobileRows.forEach((row) => {
      row.style.display = "none";
    });
  }
}

// Обработчик изменения размера окна
window.addEventListener("resize", handleMobileLayout);

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  handleMobileLayout();
});
