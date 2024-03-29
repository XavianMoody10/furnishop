"use strict";

function toggleMobileMenu() {
  const openIcon = document.querySelector(".open-icon");
  const closeIcon = document.querySelector(".close-icon");
  const navigation = document.querySelector(".navigation");
  let isOpen = false;

  function animationEvent() {
    if (!isOpen) {
      navigation.style.transform = "translateX(0)";
      isOpen = true;
    } else {
      navigation.style.transform = "translateX(-100%)";
      isOpen = false;
    }

    iconsAppearance();
  }

  function iconsAppearance() {
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }

  openIcon.addEventListener("click", animationEvent);
  closeIcon.addEventListener("click", animationEvent);
}

toggleMobileMenu();

// APPLY SLIDER FUNCTIONALITY
function sliderFunctionality() {
  let currentPosition = 0;
  let scrollingTimer;

  // CALCULATE THE CLOSEST MULTIPLE OF A NUMBER
  function calculateClosestMultiple(number, width) {
    return Math.round(number / width) * width;
  }

  // GET THE GAP VALUE OF A SLIDE CONTAINER
  function getTheGap(slides) {
    const slide = slides[0];
    let containerStyles = window.getComputedStyle(slide);
    let gapValue = containerStyles.columnGap;
    let stringValue = gapValue;
    let numericValue = parseInt(stringValue, 10);
    return numericValue;
  }

  // UPDATE PAGINATION TRACKER WHEN SLIDE IN INTERACTED
  function updatePagination(paginations, sliderWidth) {
    [...paginations].forEach((p, i) => {
      if (i === Math.floor(currentPosition / sliderWidth)) {
        p.classList.add("all-products-pagination__bullet--active");
      } else {
        p.classList.remove("all-products-pagination__bullet--active");
      }
    });
  }

  // PERFORM SCROLL SNAP WHEN INTERACTING WITH SLIDER
  function scrollSnap(slider, slides, paginations) {
    const sliderWidth = slider.offsetWidth;
    const gapValue = getTheGap(slides);
    const fullScrollLength = sliderWidth + gapValue;

    const newPos = calculateClosestMultiple(
      slider.scrollLeft,
      fullScrollLength
    );

    currentPosition = newPos;

    slider.scrollTo({ left: currentPosition, behavior: "smooth" });

    updatePagination(paginations, sliderWidth);
  }

  // THIS IS EXCLUSIVELY FOR SLIDERS ON TOUCH DEVICES
  function touchScrollingSnap(slider, slides, paginations) {
    // WAIT UNTILE SLIDER IS FINISHED SCROLLING BEFORE EXECUTING EVENT
    slider.addEventListener("scroll", () => {
      clearTimeout(scrollingTimer);

      scrollingTimer = setTimeout(() => {
        scrollSnap(slider, slides, paginations);
      }, 200);
    });
  }

  // NEXT ARROW EVENT
  function nextArrowEvent(slider, slides, paginations) {
    const sliderWidth = slider.offsetWidth;

    if (slider.scrollWidth - sliderWidth !== currentPosition) {
      const gapValue = getTheGap(slides);
      currentPosition += sliderWidth + gapValue;
      slider.scrollTo({ left: currentPosition, behavior: "smooth" });

      if (paginations) {
        updatePagination(paginations, sliderWidth);
      }
    }
  }

  // PREV ARROW EVENT
  function prevArrowEvent(slider, slides, paginations) {
    if (currentPosition !== 0) {
      const sliderWidth = slider.offsetWidth;
      const gapValue = getTheGap(slides);
      currentPosition -= sliderWidth + gapValue;
      slider.scrollTo({ left: currentPosition, behavior: "smooth" });

      if (paginations) {
        updatePagination(paginations, sliderWidth);
      }
    }
  }

  function newProductsSlider() {
    const slider = document.querySelector(".new-products-slider");

    slider.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) {
        slider.scrollLeft -= event.movementX;
      }
    });
  }

  // THIS IS FOR THE ALL PRODUCTS SLIDER
  function allProductsSlider() {
    const slider = document.querySelector(".all-products-slider");
    const slides = document.querySelectorAll(".all-products-slider__slide");
    const arrows = document.querySelectorAll(".all-products-pagination__icon");
    const paginations = document.querySelectorAll(
      ".all-products-pagination__bullet"
    );

    arrows[0].addEventListener("touchstart", (e) => {
      e.preventDefault();
      prevArrowEvent(slider, slides, paginations);
    });

    arrows[1].addEventListener("touchstart", (e) => {
      e.preventDefault();
      nextArrowEvent(slider, slides, paginations);
    });

    arrows[0].addEventListener("click", (e) => {
      e.preventDefault();
      prevArrowEvent(slider, slides, paginations);
    });

    arrows[1].addEventListener("click", (e) => {
      e.preventDefault();
      nextArrowEvent(slider, slides, paginations);
    });

    slider.addEventListener("touchmove", () => {
      touchScrollingSnap(slider, slides, paginations);
    });

    slider.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) {
        slider.scrollLeft -= event.movementX;
      }
    });

    slider.addEventListener("mouseup", (e) => {
      scrollSnap(slider, slides, paginations);
    });

    slider.addEventListener("mouseleave", (e) => {
      scrollSnap(slider, slides, paginations);
    });
  }

  //THIS IS FOR THE TESTIMONIAL SLIDER
  function testimonialSlider() {
    const arrows = document.querySelectorAll(".testimonial-pagination__icon");
    const slider = document.querySelector(".testimonial-slider");
    const slides = document.querySelectorAll(".testimonial-slide");

    const prevArrow = arrows[0];
    const nextArrow = arrows[1];

    nextArrow.addEventListener("click", (e) => {
      e.preventDefault();
      nextArrowEvent(slider, slides);
    });

    prevArrow.addEventListener("click", (e) => {
      e.preventDefault();
      prevArrowEvent(slider, slides);
    });
  }

  allProductsSlider();
  newProductsSlider();
  testimonialSlider();
}

sliderFunctionality();
