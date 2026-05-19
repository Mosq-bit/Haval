const burgerBtn = document.getElementById("burgerBtn");
const headerNav = document.getElementById("headerNav");
const navOverlay = document.getElementById("navOverlay");

function toggleMenu() {
  burgerBtn.classList.toggle("active");
  headerNav.classList.toggle("active");
  navOverlay.classList.toggle("active");

  if (headerNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

if (burgerBtn) {
  burgerBtn.addEventListener("click", toggleMenu);
}

if (navOverlay) {
  navOverlay.addEventListener("click", toggleMenu);
}

const allLinks = document.querySelectorAll(".header__nav a");
allLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768 && headerNav.classList.contains("active")) {
      toggleMenu();
    }
  });
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && headerNav.classList.contains("active")) {
    burgerBtn.classList.remove("active");
    headerNav.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

//
// Перенаправляем на одно модальное окно
document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("callbackForm");
  const phoneInput = document.getElementById("phoneInput");
  const phoneError = document.getElementById("phoneError");
  const formContent = document.getElementById("formContent");
  const successContent = document.getElementById("successContent");

  // Открытие модального окна
  function openModal() {
    if (formContent) formContent.style.display = "block";
    if (successContent) successContent.style.display = "none";
    if (phoneInput) {
      phoneInput.value = "+7";
      phoneInput.classList.remove("error");
    }
    if (phoneError) phoneError.classList.remove("active");

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      if (phoneInput) {
        phoneInput.focus();
        phoneInput.setSelectionRange(
          phoneInput.value.length,
          phoneInput.value.length,
        );
      }
    }, 100);
  }

  // Закрытие модального окна
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Валидация телефона
  function validatePhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 11 && digits[0] === "7";
  }

  // Отправка формы
  function submitForm(e) {
    e.preventDefault();

    const phone = phoneInput.value;

    if (!validatePhone(phone)) {
      phoneError.classList.add("active");
      phoneInput.classList.add("error");
      return;
    }

    phoneError.classList.remove("active");
    phoneInput.classList.remove("error");

    const submitBtn = document.querySelector(".modal-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    setTimeout(() => {
      formContent.style.display = "none";
      successContent.style.display = "block";

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        closeModal();
      }, 3000);
    }, 1000);
  }

  // телефон
  function initPhoneMask() {
    phoneInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);

      let formattedValue = "";

      if (value.length > 0) {
        if (value[0] === "7") {
          formattedValue = "+7";
        } else if (value[0] === "8") {
          formattedValue = "+7";
          value = "7" + value.slice(1);
        } else {
          formattedValue = "+7";
          value = "7" + value;
          if (value.length > 11) value = value.slice(0, 11);
        }

        if (value.length > 1) {
          formattedValue += " (" + value.substring(1, 4);
        }
        if (value.length >= 5) {
          formattedValue += ") " + value.substring(4, 7);
        }
        if (value.length >= 8) {
          formattedValue += "-" + value.substring(7, 9);
        }
        if (value.length >= 10) {
          formattedValue += "-" + value.substring(9, 11);
        }
      }

      this.value = formattedValue;
    });

    phoneInput.addEventListener("focus", function () {
      if (!this.value) {
        this.value = "+7";
      }
      setTimeout(() => {
        this.setSelectionRange(this.value.length, this.value.length);
      }, 0);
    });
  }

  // Обработчики для всех кнопок открытия
  const openBtns = document.querySelectorAll('[id^="openModalBtn"]');
  openBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (form) form.addEventListener("submit", submitForm);

  initPhoneMask();

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});

//
// Дополнительные эффекты для таймера
document.addEventListener("DOMContentLoaded", function () {
  // Добавляем классы для стилизации цифр таймера
  const timer = document.querySelector(".sinoby-timer");
  if (timer) {
    const observer = new MutationObserver(function () {
      const digits = document.querySelectorAll(".sinoby-digit");
      digits.forEach((digit) => {
        digit.style.transition = "all 0.3s ease";
      });
    });
    observer.observe(timer, { childList: true, subtree: true });
  }
});
//
// цвета для HAVAL M6
const colorVariantsM6 = [
    {
        id: "black",
        swatchColor: "#1a1a1a",
        imageUrl: "/Haval/img/черный-неметаллик.png",
    },
    {
        id: "light-gray",
        swatchColor: "#e7e7e7",
        imageUrl: "/Haval/img/белый-неметаллик.png",
    },
    {
        id: "grey",
        swatchColor: "#a1a1a1",
        imageUrl: "/Haval/img/серый-неметаллик.png",
    },
];

// цвета для HAVAL DARGO X
const colorVariantsDargo = [
    {
        id: "grey-drago",
        swatchColor: "#ADADAD",
        imageUrl: "/Haval/img/Агат.png",
    },
    {
        id: "black-drago",
        swatchColor: "#000000",
        imageUrl: "/Haval/img/Черный-нефрит.png",
    },
    {
        id: "kvarc-drago",
        swatchColor: "#e7e7e7",
        imageUrl: "/Haval/img/Графитовый-кварц.png",
    },
    {
        id: "orange-drago",
        swatchColor: "#a13a21",
        imageUrl: "/Haval/img/Терракотовый.png",
    },
];

// создания кружков
function createColorOptions(container, colorVariants, imgElement, defaultColorId) {
    let currentColorId = defaultColorId;
    container.innerHTML = "";

    colorVariants.forEach((color) => {
        const colorOption = document.createElement("div");
        colorOption.className = "color-option";

        if (color.id === currentColorId) {
            colorOption.classList.add("active");
        }

        const colorCircle = document.createElement("div");
        colorCircle.className = "color-circle";
        colorCircle.style.backgroundColor = color.swatchColor;
        colorCircle.style.width = "28px";
        colorCircle.style.height = "28px";
        colorCircle.style.borderRadius = "50%";
        colorCircle.style.transition = "all 0.3s ease";
        colorCircle.style.cursor = "pointer";
        colorCircle.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.15)";
        colorCircle.style.border = "2px solid white";

        if (color.id === "light-gray" || color.id === "kvarc-drago") {
            colorCircle.style.border = "1px solid #ccc";
        }

        colorOption.appendChild(colorCircle);
        colorOption.style.display = "flex";
        colorOption.style.flexDirection = "column";
        colorOption.style.alignItems = "center";
        colorOption.style.justifyContent = "center";
        colorOption.style.cursor = "pointer";
        colorOption.style.transition = "all 0.3s ease";

        colorCircle.addEventListener("mouseenter", () => {
            colorCircle.style.transform = "scale(1.1)";
            colorCircle.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        });

        colorCircle.addEventListener("mouseleave", () => {
            if (color.id !== currentColorId) {
                colorCircle.style.transform = "scale(1)";
            } else {
                colorCircle.style.transform = "scale(1.15)";
            }
            colorCircle.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.15)";
        });

        colorOption.addEventListener("click", () => {
            if (currentColorId === color.id) return;

            document.querySelectorAll(`[data-slider="${container.dataset.slider}"] .color-option`).forEach((opt) => {
                opt.classList.remove("active");
            });

            colorOption.classList.add("active");
            colorCircle.style.transform = "scale(1.15)";
            colorCircle.style.boxShadow = "0 0 0 2px #0066cc";

            currentColorId = color.id;
            
            // смена изображения
            imgElement.style.opacity = "0.5";
            imgElement.style.transition = "opacity 0.3s ease";
            setTimeout(() => {
                imgElement.src = color.imageUrl;
                imgElement.onload = function () {
                    imgElement.style.opacity = "1";
                };
            }, 200);
        });

        if (color.id === currentColorId) {
            colorCircle.style.transform = "scale(1.15)";
            colorCircle.style.boxShadow = "0 0 0 2px #0066cc";
        }

        container.appendChild(colorOption);
    });
}

// стили
function addStyles() {
    if (!document.querySelector("#custom-styles")) {
        const style = document.createElement("style");
        style.id = "custom-styles";
        style.textContent = `
            .color-options {
                display: flex;
                gap: 16px;
                align-items: center;
                justify-content: center;
                margin: 32px 0 27px;
            }
            .carImage {
                transition: opacity 0.3s ease;
                width: 100%;
                max-width: 400px;
                display: block;
                margin: 0 auto;
                padding-top:13px;
            }
            .color-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }
            @media (max-width: 480px) {
                .color-circle {
                    width: 40px !important;
                    height: 40px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация
function init() {
    addStyles();
    
    // первый слайдер
    const container1 = document.querySelector('.color-options[data-slider="1"]');
    const img1 = document.querySelector('.carImage[data-slider="1"]');
    if (container1 && img1) {
        createColorOptions(container1, colorVariantsM6, img1, "grey");
    }
    
    // второй слайдер
    const container2 = document.querySelector('.color-options[data-slider="2"]');
    const img2 = document.querySelector('.carImage[data-slider="2"]');
    if (container2 && img2) {
        createColorOptions(container2, colorVariantsDargo, img2, "grey-drago");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
