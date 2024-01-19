"use strict";

// APPLY SLIDER FUNCTIONALITY
function sliderFunctionality() {
  function newProductsSlider() {
    const slider = document.querySelector(".new-products-slider");

    slider.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) {
        slider.scrollLeft -= event.movementX;
      }
    });
  }

  newProductsSlider();
}

sliderFunctionality();
