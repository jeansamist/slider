/**
 * Create a slider
 */
export default class Slider {
  /**
   *
   * @param {HTMLElement} element
   * @param {Object} options
   */
  constructor(
    element = null,
    options = {
      // slidesToScroll: ,
      slidesVisible: 1,
    }
  ) {
    this.element = element;
    this.elementChildren = new Array(...element.children);
    this.options = options;
    this.sliderContainer = document.createElement("div");
    this.slidesContainer = document.createElement("div");
    this.nextBtn = document.createElement("button");
    this.prevBtn = document.createElement("button");

    // Create Buttons for the DOM
    this.prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.1897 7.93994L8.56969 10.5599C7.79969 11.3299 7.79969 12.5899 8.56969 13.3599L15.0897 19.8799" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.0908 4.04004L14.0508 5.08004" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    this.nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.9 7.93994L15.52 10.5599C16.29 11.3299 16.29 12.5899 15.52 13.3599L9 19.8699" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 4.04004L10.04 5.08004" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    this.index = 0;

    // Bind functions
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    // Add main classes
    this.sliderContainer.classList.add("slider-container");
    this.slidesContainer.classList.add("slides-container");

    // Create slides
    this.slides = this.elementChildren.map((slide) => {
      // console.log(slide);
      let sliderItem = document.createElement("div");
      sliderItem.classList.add("slider-item");
      sliderItem.style.width = `${100 / this.elementChildren.length}%`;
      sliderItem.append(slide);
      return sliderItem;
    });

    // Attach events
    // There I attach all click events
    this.nextBtn.addEventListener("click", this.next);
    this.prevBtn.addEventListener("click", this.prev);

    // Styles
    this.slidesContainer.style.width = `${
      this.elementChildren.length * (100 / this.options.slidesVisible)
    }%`;
    this.slides.forEach((slide) => {
      this.slidesContainer.appendChild(slide);
    });
    this.slides[this.index].classList.add("active");

    // Attach elements to DOM
    this.element.appendChild(this.prevBtn);
    this.element.appendChild(this.nextBtn);
    this.sliderContainer.append(this.slidesContainer);
    element.append(this.sliderContainer);
  }

  next() {
    this.index++;
    if (this.index < this.elementChildren.length) {
      this.slidesContainer.style.transform = `translateX(-${
        (100 / this.elementChildren.length) * this.index
      }%)`;
      this.slides[this.index - 1].classList.remove("active");
      this.slides[this.index].classList.add("active");
    } else {
      this.index--;
    }
  }
  prev() {
    this.index--;
    if (this.index < this.elementChildren.length && this.index != -1) {
      this.slidesContainer.style.transform = `translateX(-${
        (100 / this.elementChildren.length) * this.index
      }%)`;
      this.slides[this.index + 1].classList.remove("active");
      this.slides[this.index].classList.add("active");
    } else {
      this.index++;
    }
  }
}
