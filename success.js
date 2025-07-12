// Функция перехода на главную страницу
function goToHome() {
  // Здесь можно добавить логику перехода на главную страницу
  console.log("Переход на главную страницу");
  // window.location.href = '/';
}

// Функция перехода к оформлению заказа
function goToCheckout() {
  // Здесь можно добавить логику перехода к оформлению заказа
  console.log("Переход к оформлению заказа");
  // window.location.href = '/checkout';
}

// Добавляем дополнительные эффекты при загрузке
document.addEventListener("DOMContentLoaded", function () {
  // Добавляем конфетти эффект (опционально)
  setTimeout(() => {
    createConfetti();
  }, 1000);
});

// Функция создания конфетти эффекта
function createConfetti() {
  const colors = ["#7fb3d3", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = "50%";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.animation = `fall ${
        Math.random() * 3 + 2
      }s linear forwards`;

      document.body.appendChild(confetti);

      // Удаляем элемент после анимации
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }, i * 100);
  }
}

// CSS анимация для конфетти
const style = document.createElement("style");
style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Обработка клавиатурной навигации
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.classList.contains("home-button")) {
    goToHome();
  }
});
