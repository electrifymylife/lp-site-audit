const body = document.querySelector('body');
const burger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const headerButtonsWrap = document.querySelector('.header__buttons-wrapper');

burger.addEventListener('click', () => {
  if (burger.classList.contains('header__burger')) {
    burger.classList.remove('header__burger');
    burger.classList.add('header__cross');
    headerNav.classList.add('header__nav--active');
    headerButtonsWrap.classList.add('header__buttons-wrapper--active')
    body.style.overflow = 'hidden';
  } else {
    burger.classList.remove('header__cross');
    burger.classList.add('header__burger');
    headerNav.classList.remove('header__nav--active');
    headerButtonsWrap.classList.remove('header__buttons-wrapper--active')
    body.style.overflow = 'unset';
  }
});

function navigation(slider) {
  let wrapper, dots;

  function markup(remove) {
    wrapperMarkup(remove)
    dotMarkup(remove)
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment)
  }
  function createDiv(className) {
    const div = document.createElement("div")
    const classNames = className.split(" ")
    classNames.forEach((name) => div.classList.add(name))
    return div
  }

  function wrapperMarkup(remove) {
    if (remove) {
      const parent = wrapper.parentNode
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper)
      removeElement(wrapper)
      return
    }
    wrapper = createDiv("navigation-wrapper")
    slider.container.parentNode.appendChild(wrapper)
    wrapper.appendChild(slider.container)
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots)
      return
    }
    dots = createDiv("dots")
    slider.track.details.slides.forEach((_e, idx) => {
      const dot = createDiv("dot")
      dot.addEventListener("click", () => slider.moveToIdx(idx))
      dots.appendChild(dot)
    })
    wrapper.appendChild(dots)
  }

  function updateClasses() {
    const slide = slider.track.details.rel
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }

  slider.on("created", () => {
    markup()
    updateClasses()
  })
  slider.on("optionsChanged", () => {
    markup(true)
    markup()
    updateClasses()
  })
  slider.on("slideChanged", () => {
    updateClasses()
  })
  slider.on("destroyed", () => {
    markup(true)
  })
}

const slider = new KeenSlider(
  '.check__criteria-list',
  {
    loop: true,
    slides: {
      perView: "auto",
      spacing: 24,
    },
    breakpoints: {
      '(max-width: 767px)': {
        slides: {
          perView: 1,
          spacing: 24
        },
      },
    },
  },
  [navigation]
)
