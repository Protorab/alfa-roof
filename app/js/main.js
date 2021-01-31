/** @format */

import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
window.jQuery = $;
window.$ = $;
require("./vendor/jquery-ui.min.js");
import Swiper from "./vendor/swiper-bundle.min.js";

// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  const customSelect = document.querySelectorAll(".custom-select-wrapper");
  const phone = document.querySelectorAll("input[type=tel]");
  const popupForm = document.querySelector("#popup__form");
  const formPopup = document.querySelector(".form__popup");
  const popupLeave = document.querySelector("#popup__leave");
  const leaveMessage = document.querySelector(".leave__message");
  const popupThanks = document.querySelector("#popup__thanks");
  const thanksMessage = document.querySelector(".thanks__message");
  const helpForm = document.querySelector("#help__form");
  const popupBg = document.querySelectorAll(".popup__overlay");
  const showForm = document.querySelectorAll(".show__form");
  const closePopup = document.querySelectorAll(".close");
  const sendForms = document.querySelectorAll(".send__form");
  const quizNavigation = document.querySelectorAll(".quiz__navigation");
  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  const questions = document.querySelector(".questions");
  const questionsStepsWrap = document.querySelector(".questions__step");
  const questionsStep = document.querySelectorAll(".questions__step-number");
  const amountChang = document.querySelectorAll(".amount__input-chang");
  let totalPrice = document.querySelector("#total__price");
  let inputPrice = document.querySelector("#price");
  let phoneMask = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });
  const fullImg = document.querySelector("#full__img");
  const imgSmall = document.querySelectorAll(".card__img-small");

  if (imgSmall.length > 0) {
    for (let i = 0; i < imgSmall.length; i++) {
      const img = imgSmall[i];

      img.addEventListener("click", function (e) {
        classRemove(".card__img-small._clicked", "_clicked");
        this.classList.add("_clicked");
        const imgSrc = this.querySelector("img").src;
        e.preventDefault();
        fullImg.src = imgSrc;
      });
    }
  }
  const popupToggle = (
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    bodyClass,
    timing
  ) => {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle(bodyClass);
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  };

  if (questions) {
    const questionsHeight = document.querySelector("#question-01").offsetHeight;
    questions.style.height = questionsHeight + 60 + "px";
  }
  const trimfield = (str) => {
    return str.replace(/^\s+|\s+$/g, "");
  };
  if (quizNavigation.length > 0) {
    quizNavigation.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const showQuestion = (eThis) => {
          if (questionsStep) {
            questionsStep.forEach((step) => {
              step.classList.remove("_current");
            });
          }

          const questionIndex = eThis.dataset.index;
          const currentStep = document.querySelector("#step-" + questionIndex);

          const question = document.querySelector("#question-" + questionIndex);
          const questionHeight = question.offsetHeight;

          if (currentStep) {
            currentStep.classList.add("_current");
          }
          question.classList.add("__show");
          questions.style.height = questionHeight + 60 + "px";
          eThis.parentNode.parentNode.classList.remove("__show");
          console.log(questionIndex);
          if (eThis.classList.contains("show__gift")) {
            questionsStepsWrap.style.display = "none";
            helpForm.style.width = 0;
            helpForm.style.height = 0;
            helpForm.classList.add("__hide");
            eThis.parentNode.parentNode.parentNode.classList.add("full-size");
          }
        };
        if (this.classList.contains("_check")) {
          const answers = this.parentNode.querySelectorAll(".answer:checked")
            .length;
          if (answers == 0) {
            alert("Пожалуйста сделайте выбор");
          } else {
            showQuestion(this);
          }
        } else if (this.classList.contains("_check_area")) {
          const answer = this.parentNode.querySelector(".answer").value;
          if (trimfield(answer) === "") {
            alert("Пожалуйста заполните поле");
          } else {
            showQuestion(this);
          }
        } else {
          showQuestion(this);
        }
      });
    });
  }
  if (phone.length > 0) {
    for (let i = 0; i < phone.length; i++) {
      const phoneItem = phone[i];
      phoneMask.mask(phoneItem);
    }
  }
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      this.classList.toggle("__clicked");
      menu.classList.toggle("__show");
      e.preventDefault;
    });
  }
  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };

  if (sendForms) {
    sendForms.forEach((sendForm) => {
      sendForm.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    });
  }
  if (customSelect) {
    customSelect.forEach((customSelect) => {
      customSelect.addEventListener("click", function () {
        this.querySelector(".custom-select").classList.toggle("open");
      });
      for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener("click", function () {
          if (!this.classList.contains("selected")) {
            this.parentNode
              .querySelector(".custom-option.selected")
              .classList.remove("selected");
            this.classList.add("selected");
            this.closest(".custom-select").querySelector(
              ".custom-select__trigger span"
            ).textContent = this.textContent;
          }
        });
      }
      window.addEventListener("click", function (e) {
        const select = document.querySelector(".custom-select");
        if (!select.contains(e.target)) {
          select.classList.remove("open");
        }
      });
    });
  }

  window.addEventListener("scroll", function () {
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
  });

  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        console.log(subject);
        e.preventDefault();
        popupToggle(
          popupForm,
          formPopup,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          "__fixed",
          100
        );
      });
      return false;
    });
  }

  const popupClose = () => {
    if (window.getComputedStyle(popupForm).display === "flex") {
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        "__fixed",
        1000
      );
    }
    if (window.getComputedStyle(popupLeave).display === "flex") {
      popupToggle(
        popupLeave,
        leaveMessage,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        "__pop",
        1000
      );
    }
    if (window.getComputedStyle(popupThanks).display === "flex") {
      popupToggle(
        popupThanks,
        thanksMessage,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        "__pop",
        1000
      );
    }
  };

  if (popupBg) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
  }

  if (closePopup) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      popupClose();
    }
  });
  /** pop-up before exit */
  let pageY = 0;

  // $(function () {
  //   $(document).on("mousemove", function (event) {
  //     if (pageY) {
  //       if (event.pageY < pageY && pageY < 20) {
  //         popupToggle(
  //           popupLeave,
  //           leaveMessage,
  //           "animate__fadeIn",
  //           "animate__bounceInDown",
  //           "animate__fadeOut",
  //           "animate__bounceOutUp",
  //           "flex",
  //           "__pop",
  //           100
  //         );
  //       }
  //     }
  //     pageY = event.pageY;
  //   });
  // });

  $(".ajax_form").on("submit", function (e) {
    popupToggle(
      popupThanks,
      thanksMessage,
      "animate__fadeIn",
      "animate__bounceInDown",
      "animate__fadeOut",
      "animate__bounceOutUp",
      "flex",
      "__pop",
      100
    );
  });
  $(function () {
    $("#slider-range").slider({
      range: true,
      // min: 0,
      max: 100,
      values: [0],
      slide: function (event, ui) {
        $("#min-value").text(ui.values[0] + "р");
        $("#max-value").text(ui.values[1] + "р");
      },
    });
  });
  $(".catalog__menu-trigger").on("click", function () {
    let content = $(this)
      .parents(".catalog__menu")
      .find(".catalog__menu-content");
    let catalogMenu = $(this).parents(".catalog__menu");
    catalogMenu.toggleClass("_show");
    content.slideToggle();
  });
  let teamThumbs = new Swiper(".team-thumbs", {
    spaceBetween: 100,
    slidesPerView: 5,
    loop: true,
    freeMode: false,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      800: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: ".team-button-next",
      prevEl: ".team-button-prev",
    },
  });
  let teamTop = new Swiper(".team-top", {
    loop: true,
    fade: true,
    loopedSlides: 5, //looped slides should be the same

    thumbs: {
      swiper: teamThumbs,
    },
  });
  $(".room__tab").on("click", function () {
    let displayState = "grid";
    if ($(window).width() <= 600) {
      displayState = "flex";
    }
    let roomNumber = $(this).data("room");
    $(".room__tab").removeClass("_current");
    $(this).toggleClass("_current");
    $(".room__tab-content").fadeOut();
    $(".room__tab-" + roomNumber)
      .css("display", displayState)
      .hide()
      .fadeIn();
  });
  $(".room__photo img").on("click", function () {
    let img = $(this).attr("src");
    $(".room__photo-current img").attr("src", img);
  });

  $(".amount__input").on("keypress", function (e) {
    var str = $(".amount__input").value;

    $(".amount__input").value = str;
    var char = /[+"0-9]/;
    var val = String.fromCharCode(e.which);
    var test = char.test(val);

    if (!test) return false;
  });

  if (amountChang.length > 0) {
    for (let i = 0; i < amountChang.length; i++) {
      const changer = amountChang[i];
      changer.addEventListener("click", function (e) {
        e.preventDefault();
        const price = this.dataset.price;
        let count = this.parentNode.querySelector("#amount__input");
        // if (this.classList.contains("amount__input-chang--add")) {
        //   count.value++;
        // } else {
        //   if (count.value > 0) {
        //     count.value--;
        //   } else {
        //     count.value = 0;
        //   }
        // }

        this.classList.contains("amount__input-chang--add")
          ? count.value++
          : count.value > 0
          ? count.value--
          : (count.value = 0);
        totalPrice.innerHTML = count.value * price;
        inputPrice.value = totalPrice.innerHTML;
      });
    }
  }
});
