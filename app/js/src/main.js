const body = document.querySelector('body'),
      burger = document.querySelector('.burger'),
      mobileMenu = document.querySelector('.header__wrapper'),
      filterIcon = document.querySelector('.catalog__queries-filter'),
      filter = document.querySelector('.filter'),
      order = document.querySelector('.order'),
      requestPoup = document.querySelector('.request__popup'),
      filterClose = document.querySelector('.filter .filter__close'),
      filterCheckbox = document.querySelectorAll('.filter__checkbox-checkbox'),
      tabs = document.querySelectorAll('.filter__tabs-tab'),
      filterApply = document.querySelector('.filter .filter__btns-btn.dark'),
      filterClear = document.querySelector('.filter .filter__btns-btn.white'),
      queriesDelete = document.querySelectorAll('.catalog__queries__wrapper-item svg'),
      catalogNav = document.querySelectorAll('.catalog__nav__wrapper-item'),
      readMore = document.querySelector('.obj__wrapper-description-text-btn'),
      readMoreBtn = document.querySelector('.obj__wrapper-description-text-btn .arrow'),
      readMoreTextBtn = document.querySelector('.obj__wrapper-description-text-btn-text'),
      descriptionText = document.querySelector('.obj__wrapper-description-text-text'),
      orderClose = document.querySelector('.order .filter__close'),
      buyBtn = document.querySelector('.obj__wrapper-info-price-btn'),
      buyRequest = document.querySelector('.obj__wrapper-info-request-btn'),
      imageWrapper = document.querySelector('.obj__wrapper-gallery-main'),
      galleryNavItems = document.querySelectorAll('.obj__wrapper-gallery-nav-ph'),
      galleryMainImage = document.querySelector('.obj__wrapper-gallery-main img'),
      cardContainer = document.querySelector('.obj__related-items'),
      cards = document.querySelectorAll('.catalog__cards-card'),
      prevButton = document.querySelector('.prev'),
      nextButton = document.querySelector('.next'),
      navItems = document.querySelectorAll('.value__wrapper-nav-items-item'),
      contentBlocks = document.querySelectorAll('.value__wrapper-content'),
      upArrow = document.querySelector('.value__wrapper-nav-nav .arrow.up'),
      downArrow = document.querySelector('.value__wrapper-nav-nav .arrow.down'),
      sliderImages = document.querySelectorAll('.about__wrapper-slider-img'),
      leftArrow = document.querySelector('.about__wrapper-slider-nav .arrow'),
      rightArrow = document.querySelector('.about__wrapper-slider-nav .arrow.rotate'),
      activeIndex = document.querySelector('.about__wrapper-slider-nav .catalog__pagination-count .active'),
      totalCount = document.querySelector('.about__wrapper-slider-nav .catalog__pagination-count .total'),
      deliveryCheckbox = document.querySelectorAll('.bag__wrapper-col-delivery-checkbox-item'),
      catalogHeader = document.querySelector('.catalog__header'),
      catalogNavigation = document.querySelector('.catalog__nav'),
      catalogQueries = document.querySelector('.catalog__queries'),
      forms = document.querySelectorAll('form')


burger.addEventListener('click', function () {
  this.classList.toggle('active')
  mobileMenu.classList.toggle('active')
  body.classList.toggle('lock')
})

if (filterIcon) {
  filterIcon.addEventListener('click', function () {
    filter.classList.add('active')
    body.classList.add('lock')
  })
}

if (filterClose) {
  filterClose.addEventListener('click', function () {
    filter.classList.remove('active')
    body.classList.remove('lock')
  })
}

if (orderClose) {
  orderClose.addEventListener('click', function () {
    order.classList.remove('active')
    body.classList.remove('lock')
  })
}

if (filterCheckbox) {
  filterCheckbox.forEach(el => {
    el.addEventListener('click', function () {
      this.classList.toggle('active')
    })
  })
}

if (filterApply) {
  filterApply.addEventListener('click', function () {
    filter.classList.remove('active')
  })
}
if (filterClear) {
  filterClear.addEventListener('click', function () {
    filterCheckbox.forEach(el => {
      el.classList.remove('active')
    })
  })
}

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('active')
    })
    this.classList.add('active')
  })
})

queriesDelete.forEach(button => {
  button.addEventListener('click', function () {
    const parent = this.parentElement
    parent.remove()
  })
})

catalogNav.forEach(el => {
  el.addEventListener('click', function () {
    this.classList.toggle('active')
  })
})

if (readMore) {
  let isExpanded = false

  readMore.addEventListener('click', function () {
    readMoreBtn.classList.toggle('up')
    descriptionText.classList.toggle('active')

    isExpanded = !isExpanded
    
    if (isExpanded) {
      readMoreTextBtn.textContent = 'Read less'
    } else {
      readMoreTextBtn.textContent = 'Read more'
    }
  })
}

if (buyBtn) {
  buyBtn.addEventListener('click', function () {
    order.classList.add('active')
    body.classList.add('lock')
  })
}

if (buyRequest) {
  buyRequest.addEventListener('click', function () {
    requestPoup.classList.add('active')
    body.classList.add('lock')
  })
}

//gallery
if (imageWrapper && window.innerWidth >= 390) {
  imageWrapper.addEventListener('mousemove', function (e) {
    const x = (e.offsetX / imageWrapper.offsetWidth) * 100
    const y = (e.offsetY / imageWrapper.offsetHeight) * 100
    imageWrapper.querySelector('img').style.transformOrigin = x + '% ' + y + '%'
  })
}

if (imageWrapper) {
  galleryNavItems.forEach((e) => {
    e.addEventListener('click', () => {
      const img = e.querySelector('img')
      const sourceElement = galleryMainImage.parentElement.querySelector('source')
      const newSrc = img.src.replace(/^.*\/img\//, 'img/')
      galleryMainImage.src = newSrc.replace('-min', '')
      sourceElement.srcset = newSrc.replace('-min', '').replace(/\.jpg$/, '.webp')
    })
  })
}

let currentIndex = 0

//cards slider
var mySwiper = new Swiper('.obj__related-items .swiper-container', {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.obj__related-nav .swiper-button-next',
    prevEl: '.obj__related-nav .swiper-button-prev',
  },
})

//main value slider
if (upArrow) {
  function updateActiveItem(index) {
    navItems.forEach((navItem) => {
      navItem.classList.remove('active')
    })
    navItems[index].classList.add('active')
  
    contentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove('active')
    })
    contentBlocks[index].classList.add('active')
  
    if (index === 0) {
      upArrow.classList.add('inactive')
      downArrow.classList.remove('inactive')
    } else if (index === navItems.length - 1) {
      upArrow.classList.remove('inactive')
      downArrow.classList.add('inactive')
    } else {
      upArrow.classList.remove('inactive')
      downArrow.classList.remove('inactive')
    }
  }

  upArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--
      updateActiveItem(currentIndex)
    }
  })

  downArrow.addEventListener('click', () => {
    if (currentIndex < navItems.length - 1) {
      currentIndex++
      updateActiveItem(currentIndex)
    }
  })

  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index
      updateActiveItem(currentIndex)
    })
  })

  updateActiveItem(currentIndex)
}

//main slider
if (leftArrow) {
  function updatePaginationCount() {
    activeIndex.textContent = currentIndex + 1
    totalCount.textContent = sliderImages.length
  }

  function showImage(index) {
    currentIndex = index
    sliderImages.forEach((image, i) => {
      if (i === index) {
        image.classList.add('active')
      } else {
        image.classList.remove('active')
      }
    })
    updatePaginationCount()
  }

  updatePaginationCount()

  leftArrow.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length
    showImage(currentIndex)
  })

  rightArrow.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % sliderImages.length
    showImage(currentIndex)
  })
}

if (deliveryCheckbox) {
  deliveryCheckbox.forEach(el => {
    el.addEventListener('click', function () {
      this.classList.toggle('active')
    })
  })
}

//catalog nav fixed
if (catalogHeader && window.innerWidth <= 500) {
  function handleScroll() {
    const headerTop = catalogHeader.getBoundingClientRect().top

    if (headerTop <= 0) {
      catalogNavigation.classList.add('fixed')
      catalogQueries.classList.add('fixed')
    } else {
      catalogNavigation.classList.remove('fixed')
      catalogQueries.classList.remove('fixed')
    }
  }
  window.addEventListener('scroll', handleScroll)
}

//validation
if (forms) {
  forms.forEach(form => {

    const btn = form.querySelector('.btn')
  
    btn.addEventListener('click', function (event) {
  
      const requiredInputs = form.querySelectorAll('[required]')
      const message = document.querySelector('.form__done')
      let isValid = true
      
      requiredInputs.forEach(input => {
        if (input.value.trim() === '') {
          isValid = false
          input.classList.add('invalid')

          const parentDiv = input.parentElement
          if (parentDiv) {
            parentDiv.classList.add('invalid-div')
          }
        } else {
          input.classList.remove('invalid')

          const parentDiv = input.parentElement
          if (parentDiv) {
            parentDiv.classList.remove('invalid-div')
          }
        }
      })
  
      if (!isValid) {
        event.preventDefault()
      }

      if (isValid) {
        if (message) {
          message.classList.add('active')
        }
      }
    })
  })
}