// Функция оформления заказа
function placeOrder() {
  // Проверяем заполненность обязательных полей
  const requiredFields = document.querySelectorAll(".form-input[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error");
      isValid = false;
    } else {
      field.classList.remove("error");
      field.classList.add("success");
    }
  });

  if (isValid) {
    alert("Заказ успешно оформлен! Спасибо за покупку.");
    // Здесь можно добавить отправку данных на сервер
  } else {
    alert("Пожалуйста, заполните все обязательные поля.");
  }
}

// Валидация полей в реальном времени
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".form-input");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required")) {
        if (!this.value.trim()) {
          this.classList.add("error");
          this.classList.remove("success");
        } else {
          this.classList.remove("error");
          this.classList.add("success");
        }
      }
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error") && this.value.trim()) {
        this.classList.remove("error");
        this.classList.add("success");
      }
    });
  });

  // Валидация email
  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.classList.add("error");
        this.classList.remove("success");
      }
    });
  }

  // Валидация телефона
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      // Разрешаем только цифры, пробелы, дефисы и скобки
      this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, "");
    });
  }
});
