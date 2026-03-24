import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';
import { Product } from '../models/product';

class ProductSwatchesVariant extends Product {
  constructor(elem) {
    super(elem);
    this.selects = this.wrapper.querySelectorAll('[data-selects] select');
    this.optionType = this.wrapper.querySelector('[data-selects] [data-option-type]' || {}).dataset.optionType;
    this.getVariantData();
    this.updateOptions(this.variants);

    if (this.optionType !== 'select') {
      this.initSelects();
    }
  }

  initVariantSelects() {
    this.options = [...document.querySelectorAll('div[id^="variant-selects"], div[id^="variant-radios"]')];
    this.productForm = document.querySelector('[data-product-form]');

    if (this.options.length > 0) {
      this.options.forEach((variant) => {
        this.inputName = this.productForm.querySelector('input[name="id"]');
        this.inputName.disabled = false;
        variant.addEventListener('change', this.onVariantChange.bind(this, variant));
      });
    }

    if (this.options.length === 0) {
      this.inputName = document.getElementById('product-id');
      this.inputName.disabled = false;
    }
  }

  updateVariantSwatchesColor() {
    this.options.forEach((option) => {
      if (option.getAttribute('data-swatches-color-type')) {
        const swatchesColorType = option.getAttribute('data-swatches-color-type');

        const variantsWithColor = this.variantData.filter((v) => {
          const array = v.options.map((variantOption, index) => {
            if (this.colorVarinats[index] !== '{color}') {
              return this.colorVarinats[index] === variantOption;
            }

            return true;
          });

          return array.every((value) => value === true);
        });

        const colorInputs = option.querySelectorAll('input');

        colorInputs.forEach((input) => {
          const currentInputVariant = variantsWithColor.find((variantColor) =>
            variantColor.options.map((variantColorOption) => variantColorOption === input.value).includes(true)
          );

          switch (swatchesColorType) {
            case 'image':
              const image = input.parentElement.querySelector('img');
              const defaultImage = option.getAttribute('data-default-image');

              if (currentInputVariant && currentInputVariant.featured_image?.src) {
                image.src = currentInputVariant.featured_image.src;
              } else {
                image.src = defaultImage;
              }

              break;
            case 'metafields':
              let colorValue;
              const colorSpan = input.parentElement.querySelector('.js-metafield');

              if (currentInputVariant) {
                colorValue = this.product.variants.find((productVariant) =>
                  productVariant.options
                    .map((productVariantOption, index) => productVariantOption === currentInputVariant.options[index])
                    .every((value) => value === true)
                ).variant_metafields.metafield_color;
              }

              if (!colorValue) {
                colorValue = input.value;
              }

              colorSpan.style.backgroundColor = colorValue;
              break;
            default:
              break;
          }
        });
      }
    });
  }

  onVariantChange() {
    this.updateOptions(this.options);
    this.updateMasterId();
    this.onOptionChange(this.currentVariant);
    this.updateVariantInput(this.currentVariant);
    const variantChangeEvent = new CustomEvent('variantChange', {
      detail: { variant: this.currentVariant },
    });

    document.dispatchEvent(variantChangeEvent);
  }

  updateOptions(el) {
    if (!el) return;

    this.optionsValues = [];
    this.colorVarinats = [];

    el.forEach((option) => {
      switch (option.getAttribute('data-option-type')) {
        case 'radio':
          let newAcc = [];
          let newColorAcc = [];

          Array.from(option.querySelectorAll('input')).reduce((acc, curr) => {
            if (curr.checked) {
              newAcc = [...acc, curr.value];
            }

            return newAcc;
          }, []);

          Array.from(option.querySelectorAll('input')).reduce((acc, curr) => {
            if (curr.checked) {
              if (option.getAttribute('data-swatches-color-type')) {
                newColorAcc = [...acc, '{color}'];
              } else {
                newColorAcc = [...acc, curr.value];
              }
            }

            return newColorAcc;
          }, []);

          this.colorVarinats = [...this.colorVarinats, ...newColorAcc];

          this.optionsValues = [...this.optionsValues, ...newAcc];

          const title = option.querySelector('.product__variant-label-box span:last-child');

          if (!title) break;

          title.innerText = newAcc[0];

          break;

        case 'select':
          const selectValue = option.querySelector('select').value;

          this.optionsValues = [...this.optionsValues, selectValue];

          this.colorVarinats = [...this.colorVarinats, selectValue];

          break;
        default:
          break;
      }
    });
    this.updateOptionsAvailability();
  }

  updateOptionsAvailability() {
    const variantsInfo = this.product.variants;
    const options = this.product.options_with_values;

    const changeOptionAvailability = (selector, availability) => {
      const optionEl = this.wrapper.querySelector(`select option[value="${selector}"]`);
      const inputEl = this.wrapper.querySelector(`[data-option-input] input[value="${selector}"]`);

      if (optionEl) {
        if (!availability) {
          if (optionEl.textContent.includes(window.theme.product.unavailable)) return;

          optionEl.textContent += window.theme.product.unavailable;

          return;
        }

        optionEl.textContent = optionEl.textContent.includes(window.theme.product.unavailable)
          ? optionEl.textContent.replace(window.theme.product.unavailable, '')
          : optionEl.textContent;
      }

      if (inputEl) {
        inputEl.classList.toggle('disabled', !availability);
      }
    };

    const secondLevelUpdate = (currentOption) =>
      variantsInfo.filter(
        (item) => item.title.includes(this.optionsValues[0]) && item.title.includes(currentOption) && item.available
      );

    const thirdLevelUpdate = (currentOption) =>
      variantsInfo.filter(
        (item) =>
          item.title.includes(this.optionsValues[0]) &&
          item.title.includes(this.optionsValues[1]) &&
          item.title.includes(currentOption) &&
          item.available
      );

    options
      .find(({ position }) => position === 2)
      ?.values.forEach((value) => {
        const availability = secondLevelUpdate(value).length > 0;

        changeOptionAvailability(value, availability);
      });

    options
      .find(({ position }) => position === 3)
      ?.values.forEach((value) => {
        const availability = thirdLevelUpdate(value).length > 0;

        changeOptionAvailability(value, availability);
      });
  }

  onOptionChange(variant) {
    this.updatePickupAvailability(variant);
    this.updateVariantPrice(variant);
    this.updateSubmitButton(variant);
    this.updateVariantUrl(variant);
    this.updateVariantSwatchesColor();
    this.updateGallery(variant);
  }

  initSubmit() {
    let form = this.productForm;

    if (!this.options) {
      form = document.getElementById('product-id').form;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.initAddToBag(e);
    });
  }

  getVariantData() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.wrapper.querySelector('[data-product-vatiants][type="application/json"]').textContent);
  }

  updateGallery(variant) {
    if (!variant) return false;

    const sliderWrapper = this.wrapper.querySelector('.product-gallery-slider');

    const currentVariantSliderItem = sliderWrapper.querySelector(
      `.product-gallery-slider__img[data-position="${variant.featured_image?.position}"]`
    );

    if (!currentVariantSliderItem) return false;

    window.ResponsiveHelper.addRange({
      '..767': {
        on() {
          const imageWidth = currentVariantSliderItem.getBoundingClientRect().width;
          const variantImagePosition = variant.featured_image.position;

          const scrollToIndex = Array.from(sliderWrapper.children).findIndex(
            (elem) => +elem.querySelector('.product-gallery-slider__img').dataset.position === variantImagePosition
          );

          variantImagePosition && sliderWrapper.scrollTo(imageWidth * scrollToIndex, 0);
        },
      },
      '768..': {
        on() {
          if (
            sliderWrapper.firstElementChild
              .querySelector('.product-gallery-slider__img')
              .getAttribute('data-position') === currentVariantSliderItem.getAttribute('data-position')
          )
            return false;

          sliderWrapper.prepend(currentVariantSliderItem.parentElement);
        },
      },
    });
  }
}

register('product-swatches-variants', {
  _initProductSwatchesVariants(handle) {
    if (handle) {
      window.ProductSwatchesVariant = new ProductSwatchesVariant(this.container);
      this.splideInstance = this._initSlider();
      this.productData = JSON.parse(this.container.querySelector('#product-json').innerHTML);
      document.addEventListener('variantChange', (event) => {
        const selectedVariant = event.detail.variant;

        this._scrollSliderToVariant(selectedVariant);
      });
    }
  },

  _initSlider() {
    const { container } = this;
    const mainSlider = container.querySelector('.product-slider');

    this.mainSlides = mainSlider.querySelectorAll('[data-product-slider]');
    const numSlides = this.mainSlides.length;
    const thumbnailHeight = numSlides < 5 ? (88 + 24) * numSlides : 538;

    const splide = new Splide(container.querySelector('.product-slider'), {
      mediaQuery: 'min',
      type: 'loop',
      updateOnMove: true,
      speed: 800,
      perPage: 1,
      gap: 16,
      padding: {
        left: '3.75rem',
        right: '3.75rem',
      },
      rewind: true,
      rewindSpeed: 800,
      center: true,
      pagination: true,
      arrows: false,
      drag: true,
      keyboard: true,
      breakpoints: {
        768: {
          perPage: 2,
          padding: {
            left: '5rem',
            right: '5rem',
          },
          gap: 32,
        },
        1024: {
          perPage: 1,
          padding: 0,
          gap: 0,
          center: false,
          pagination: false,
        },
      },
    });

    const thumbnails = new Splide(container.querySelector('.product-slider-thumbnails'), {
      mediaQuery: 'min',
      direction: 'ttb',
      updateOnMove: true,
      speed: 800,
      height: `${thumbnailHeight}px`,
      fixedWidth: 64,
      fixedHeight: 88,
      gap: 24,
      rewind: true,
      rewindSpeed: 800,
      pagination: false,
      arrows: false,
      drag: true,
      isNavigation: true,
      keyboard: true,
    });

    splide.on('moved', (newIndex) => {
      const selectedSlide = this.mainSlides[newIndex];
      const videoElement = selectedSlide.querySelector('video');

      if (videoElement) {
        const videoSource = videoElement.getAttribute('data-video-src');

        videoElement.src = videoSource;
        videoElement.load();
      } else {
        const videos = mainSlider.querySelectorAll('video');

        videos.forEach((video) => {
          video.pause();
        });
      }
    });
    splide.sync(thumbnails);
    splide.mount();
    thumbnails.mount();

    return splide;
  },

  _scrollSliderToVariant(selectedVariant) {
    if (!this.splideInstance) return;

    this.mainSlides.forEach((swiperSlideEl, index) => {
      const swiperSlideElImg = swiperSlideEl.querySelector('img');
      const cleanImageSrc = selectedVariant?.featured_image.src.split('?')[0];

      if (swiperSlideElImg.src.includes(cleanImageSrc)) {
        this.splideInstance.go(index);
      }
    });
  },

  onLoad() {
    performanceMeasure(this.id, this._initProductSwatchesVariants.bind(this, this.container.dataset.handle));
  },

  onBlockSelect() {
    this._initProductSwatchesVariants(this.container.dataset.handle);
  },
});
