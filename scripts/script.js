class Fade {
  constructor(obj) {
    this.increaseDelay = obj.increaseDelay;
    this.defaultSpeed = obj.defaultSpeed;
    this.section = document.querySelector(obj.section);
    this.cards = document.querySelectorAll(obj.cards);
    window.addEventListener("scroll", () => this.move());
  }

  move() {
    if (
      window.scrollY >
      this.section.offsetTop * (this.increaseDelay / 100) -
        this.section.offsetHeight * 2
    ) {
      this.cards.forEach((card) => {
        const speed = card.hasAttribute("data-speed")
          ? card.getAttribute("data-speed")
          : this.defaultSpeed;

        card.classList.add("active");
        card.style.transition = `${speed / 1000}s`;
      });
    }
  }
}

const fadePToolsCards = new Fade({
  increaseDelay: 200,
  defaultSpeed: 600,
  section: ".pTools__cards",
  cards: ".pTools__cards-card",
});

const fadeNToolsCards = new Fade({
  increaseDelay: 150,
  defaultSpeed: 600,
  section: ".nTools__cards",
  cards: ".nTools__cards-card",
});

class Slider {
  slideIndex = 0;
  intervalId = null;

  constructor(obj) {
    this.slides = document.querySelectorAll(obj.slides);
    this.leftArrow = document.querySelector(obj.leftArrow);
    this.rightArrow = document.querySelector(obj.rightArrow);
    this.switchers = document.querySelectorAll(obj.switchers);

    document.addEventListener("DOMContentLoaded", () => {
      this.initializeSlider();
    });
    this.leftArrow.addEventListener("click", () => {
      this.prevSlide();
    });
    this.rightArrow.addEventListener("click", () => {
      this.nextSlide();
    });
    this.switchers.forEach((switcher) => {
      switcher.addEventListener("click", () => {
        let switcherIndex = Array.from(this.switchers).indexOf(switcher);
        this.showSlide(switcherIndex + 1);
      });
    });
  }

  initializeSlider() {
    if (this.slides.length) {
      this.slides[this.slideIndex].classList.add("show");
      this.intervalId = setInterval(() => this.nextSlide(), 5000);
    }
  }

  showSlide(i) {
    if (i >= this.slides.length) {
      this.slideIndex = 0;
    } else if (i < 0) {
      this.slideIndex = this.slides.length - 1;
    }
    this.slides.forEach((slide) => {
      slide.classList.remove("show");
    });
    this.slides[this.slideIndex].classList.add("show");
  }

  prevSlide() {
    clearInterval(this.intervalId);
    this.slideIndex--;
    this.showSlide(this.slideIndex);
  }

  nextSlide() {
    this.slideIndex++;
    this.showSlide(this.slideIndex);
  }
}

const slider = new Slider({
  slides: ".cards__content-main",
  leftArrow: ".cards__content-link-left",
  rightArrow: ".cards__content-link-right",
  switchers: ".cards__switch-btn",
});
