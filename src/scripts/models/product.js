import { formatMoney } from '@shopify/theme-currency';
import serializeArray from 'helpers/serializeArray';
import { addItem } from 'helpers/cartAjaxCall';
import { addJustAdded, getCart, openPopup } from 'store/features/cart/cartSlice';
import Accordion from 'accordion-js';
import { initUpdateVariantUnitPrice } from 'helpers/utils';

export class Product {
  constructor(elem) {
    this.wrapper = elem;
    this.sectionId = this.wrapper.getAttribute('data-section-id');
    this.handle = this.wrapper.getAttribute('data-handle');
    this.submitButton = this.wrapper.querySelector('[data-submit-button]');
    this.submitButtonText = this.wrapper.querySelector('[data-submit-button]');
    this.buttonText = this.wrapper.querySelector('[data-submit-button-text]');
    this.buttonContent = this.wrapper.querySelector('[data-general-button-content]');
    this.priceContainer = this.wrapper.querySelector('[data-price-wrapper]');
    this.priceElement = this.wrapper.querySelector('[data-price-container]');
    this.shopifyButtons = this.wrapper.querySelector('[data-shopify="payment-button"]');
    this.sizeChart = this.wrapper.querySelector('.size-chart-link');
    this.selectElement = this.wrapper.querySelector('[data-select]');
    this.discountPercentageSellingPlanContainer = this.wrapper.querySelector('[data-discount-percentage]');
    this.priceSellingPlanContainer = this.wrapper.querySelector('[data-price]');
    this.compareAtPriceSellingPlanContainer = this.wrapper.querySelector('[data-compare-at-price]');
    this.sellingPlanInput = this.wrapper.querySelector('[name="selling_plan"]');
    this.selects = this.wrapper.querySelectorAll('#variant-selects select');

    this.initPickupAvailability();
    this.sizeChartInit();
    this.product = this.getProduct();
    this.initVariantSelects();
    this.initQuantitySelector();
    this.getVariantData(this.variantSelects ?? this.variantRadios);
    this.updateOptions(this.variantSelects ?? this.variantRadios);
    this.updateSellingPlanId();
    this.updateSellingPlan();
    this.initModelViewer();
    this.initSubmit();
    this.initProductRecommendations();
    this.updateDynamicButton();
  }

  updateDynamicButton() {
    this.waitForElement('.shopify-payment-button__button--unbranded').then((node) => {
      const dynamicButtonPlaceholder = window.theme.dynamic_button_placeholder;

      setTimeout(() => {
        node.innerHTML = dynamicButtonPlaceholder;
        node.style.display = 'block';
      }, 0);
    });
  }

  updatePickupAvailability(variant) {
    if (!variant) return false;

    const pickupAvailabilityInfoWrapper = this.wrapper.querySelector('[data-store-availability-container]');

    if (!pickupAvailabilityInfoWrapper) return false;

    fetch(`${window.Shopify.routes.root}variants/${variant.id}`)
      .then((response) => response.text())
      .then((text) => {
        const pickupAvailabilityDrawerWrapper = this.wrapper.querySelector('.pickup-availability-drawer');

        const html = new DOMParser().parseFromString(text, 'text/html');
        const pickupAvailabilityInfoHTML = html.querySelector('[data-store-availability-container]');
        const pickupAvailabilityDrawerHTML = html.querySelector('.pickup-availability-drawer');

        pickupAvailabilityInfoWrapper.innerHTML = '';
        pickupAvailabilityInfoHTML &&
          pickupAvailabilityInfoWrapper.insertAdjacentHTML('afterbegin', pickupAvailabilityInfoHTML?.innerHTML);

        pickupAvailabilityDrawerWrapper.innerHTML = '';
        pickupAvailabilityDrawerHTML &&
          pickupAvailabilityDrawerWrapper.insertAdjacentHTML('afterbegin', pickupAvailabilityDrawerHTML?.innerHTML);
        this.initPickupAvailability();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  initPickupAvailability() {
    this.buttonPickupAvailability = this.wrapper.querySelector('.pickup-availability-button');

    if (!this.buttonPickupAvailability) return false;

    this._openButton();
    this._closeButton();
  }

  _openButton() {
    this.buttonPickupAvailability.addEventListener('click', () => {
      document.querySelector('html').classList.add('pickup-availability-active');
    });
  }

  _closeButton() {
    this.wrapper.querySelector('.btn-closer').addEventListener('click', () => {
      document.querySelector('html').classList.remove('pickup-availability-active');
    });
  }

  initModelViewer() {
    const modelViewerEvent = new CustomEvent('activeModelSlide');

    const galleryWrapper = this.wrapper.querySelector('.product-gallery-slider');

    if (!galleryWrapper) return false;

    const gallerySlides = galleryWrapper.querySelectorAll('.product-gallery-slider__item');

    gallerySlides.forEach((slide) => {
      if (slide.querySelector('product-model') || slide.querySelector('deferred-media')) {
        const viewBtn = slide.querySelector('.deferred-media__poster');

        viewBtn.addEventListener('click', () => {
          window.dispatchEvent(modelViewerEvent);
        });
      }
    });
  }

  initVariantSelects() {
    this.variantSelects = this.wrapper.querySelector('#variant-selects');
    this.variantRadios = this.wrapper.querySelector('#variant-radios');

    if (this.variantSelects) {
      this.productForm = this.wrapper.querySelector(`#product-form-${this.variantSelects.dataset.section}`);
      this.inputName = this.productForm.querySelector('input[name="id"]');
      this.inputName.disabled = false;
      this.variantSelects.addEventListener('change', this.onVariantChange.bind(this, this.variantSelects, 'select'));
    }

    if (this.variantRadios) {
      this.productForm = this.wrapper.querySelector(`#product-form-${this.variantRadios.dataset.section}`);
      this.inputName = this.productForm.querySelector('input[name="id"]');
      this.inputName.disabled = false;
      this.variantRadios.addEventListener('change', this.onVariantChange.bind(this, this.variantRadios, 'input'));
    }

    if (!this.variantRadios && !this.variantSelects) {
      this.inputName = this.wrapper?.querySelector('#product-id');

      if (this.inputName) {
        this.inputName.disabled = false;
      }
    }

    this.initSelects();
  }

  initSelects() {
    this.selects.forEach((item) => {
      item.addEventListener('change', (e) => {
        const label = e.target.closest('[data-select-holder]').querySelector('[data-option-value]');

        label.innerHTML = e.target.value;
      });
    });
  }

  initQuantitySelector() {
    const quantityInput = this.wrapper.querySelector('#Quantity');

    if (!quantityInput) return;

    quantityInput.addEventListener('change', (e) => {
      const value = Math.max(1, e.target.value);

      quantityInput.value = value;
    });
    const quantityDecrease = this.wrapper.querySelector('.jcf-btn-dec');
    const quantityIncrease = this.wrapper.querySelector('.jcf-btn-inc');

    quantityDecrease.addEventListener('click', (e) => {
      if (quantityInput.value > 1) {
        quantityInput.value = +quantityInput.value - 1;
      }
    });

    quantityIncrease.addEventListener('click', (e) => {
      quantityInput.value = +quantityInput.value + 1;
    });
  }

  changeVariantForSellingPlan() {
    if (this.variantSelects) {
      this.onVariantChange(this.variantSelects, 'select');
    }

    if (this.variantRadios) {
      this.onVariantChange(this.variantRadios, 'input');
    }

    if (!this.variantRadios && !this.variantSelects) {
      this.onVariantChange();
    }
  }

  updateSellingPlan() {
    const sellingPlanContainer = this.wrapper?.querySelector('[data-selling-plan-fieldset]');

    const selectContainer = this.wrapper.querySelector('[data-select-container]');

    this.labelText = sellingPlanContainer?.querySelector('[data-label-text]');

    this.radioSellingPlan = this.wrapper.querySelector('[data-selling-plan-input]');

    this.radioWithoutSellingPlan = this.wrapper.querySelector('[data-without-selling-plan-input]');

    if (!this.radioSellingPlan) return;

    this.changeVariantForSellingPlan();

    if (this.radioWithoutSellingPlan.checked) {
      this.sellingPlanInput.value = '';
    }

    this.radioSellingPlan.addEventListener('change', () => {
      if (this.radioSellingPlan.checked) {
        this.updateSellingPlanId();
      }

      this.changeVariantForSellingPlan();
    });

    this.radioWithoutSellingPlan.addEventListener('change', () => {
      if (this.radioWithoutSellingPlan.checked) {
        this.sellingPlanInput.value = '';
        this.changeVariantForSellingPlan();
      }
    });

    sellingPlanContainer.querySelectorAll('select').forEach((optionSelector) => {
      optionSelector.addEventListener('change', () => {
        this.updateSellingPlanId();

        this.changeVariantForSellingPlan();
      });
    });
  }

  updateSellingPlanId() {
    this.selectedOption = this.selectElement?.options[this.selectElement.selectedIndex];

    if (!this.selectedOption) return;

    this.selectedSellingPlanId = this.selectedOption.value;

    this.sellingPlanInput.value = this.selectedSellingPlanId;
  }

  handleErrorMessage(errorMessage = false) {
    this.errorMessageElement = this.wrapper.querySelector('.product-form__error-message');

    if (this.errorMessageElement) {
      this.errorMessage = this.errorMessage || this.errorMessageElement;

      this.errorMessage.classList.toggle('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  }

  removeErrorMessage() {
    const removeErrMessage = this.wrapper.querySelector('.product-form__error-message');

    if (removeErrMessage) this.handleErrorMessage();
  }

  onVariantChange(el, selector) {
    this.updateOptions(el, selector);
    this.updateMasterId();
    this.onOptionChange(this.currentVariant);
    this.removeErrorMessage();
    this.updateVariantInput(this.currentVariant);
    this.updateDynamicButton();
  }

  updateOptions(el, selector) {
    if (!el) return;

    if (selector === 'input') {
      let newAcc = [];

      this.optionsValues = Array.from(el.querySelectorAll(selector)).reduce((acc, curr) => {
        if (curr.checked) {
          newAcc = [...acc, curr.value];
        }

        return newAcc;
      }, []);

      const titles = Array.from(this.wrapper.querySelectorAll('.product__variant-label-box')).reduce(
        (acc, curr) => [...acc, curr.querySelector('span:last-child')],
        []
      );

      titles.forEach((title, index) => {
        title.innerText = this.optionsValues[index];
      });
    }

    if (selector === 'select') {
      this.optionsValues = Array.from(el.querySelectorAll(selector), (item) => item.value);
    }
  }

  updateMasterId() {
    this.currentVariant = this.variantData.find(
      (variant) => !variant.options.map((option, index) => this.optionsValues[index] === option).includes(false)
    );
  }

  updateVariantInput(variant) {
    if (!variant) return false;

    this.inputName.value = variant.id;
    this.inputName.dispatchEvent(new Event('change', { bubbles: true }));
  }

  getUrlWithVariant(originalUrl, id, sellingPlanSelectedId) {
    const url = new URL(originalUrl);
    const searchParams = new URLSearchParams(url.search);

    searchParams.set('variant', id);

    if (this.radioSellingPlan) {
      searchParams.set('selling_plan', sellingPlanSelectedId);

      if (this.radioWithoutSellingPlan.checked) {
        searchParams.delete('selling_plan');
      }
    }

    url.search = searchParams.toString();

    return url.toString();
  }

  updateVariantUrl(variant) {
    if (!variant) return;

    const url = this.getUrlWithVariant(window.location.href, variant.id, this.selectedSellingPlanId);

    window.history.replaceState({ path: url }, '', url);
  }

  onOptionChange(variant) {
    this.updatePickupAvailability(variant);
    this.updateVariantPrice(variant);
    this.updateVariantUnitPrice(variant);
    this.updateSubmitButton(variant);
    this.updateVariantUrl(variant);
    this.updateGallery(variant);
  }

  getProduct() {
    let product;

    try {
      product = JSON.parse(this.wrapper.querySelector('#product-json').innerHTML);
    } catch (error) {
      console.warn(error);
    }

    return product;
  }

  updateSubmitButton(variant) {
    if (!variant) {
      this.submitButton.classList.add('disabled');
      this.submitButton.setAttribute('disabled', 'disabled');

      if (this.buttonContent) {
        this.buttonText.innerHTML = theme.strings.unavailable;
        this.priceElement.classList.add('hidden');
        this.buttonContent.classList.remove('divide-x');
      } else {
        this.submitButtonText.innerText = theme.strings.unavailable;
      }

      this.shopifyButtons?.classList.add('hidden');
    } else if (variant.available) {
      this.submitButton.classList.remove('disabled');
      this.submitButton.removeAttribute('disabled');

      if (this.buttonContent) {
        this.buttonText.innerHTML = theme.strings.addToBag;
        this.priceElement.classList.remove('hidden');
        this.buttonContent.classList.add('divide-x');
      } else {
        this.submitButtonText.innerText = theme.strings.addToCart;
      }

      this.shopifyButtons?.classList.remove('hidden');
    } else {
      if (this.buttonContent) {
        this.buttonText.innerHTML = theme.strings.soldOut;
        this.priceElement.classList.add('hidden');
        this.buttonContent.classList.remove('divide-x');
      } else {
        this.submitButtonText.innerText = theme.strings.soldOut;
      }

      this.submitButton.classList.add('disabled');
      this.submitButton.setAttribute('disabled', 'disabled');
      this.shopifyButtons?.classList.add('hidden');
    }
  }

  updateVariantPrice(variant) {
    this.radioSellingPlanCheck = this.radioSellingPlan ? this.radioSellingPlan.checked : false;

    if (variant && this.priceElement) {
      const variantPrice = this.radioSellingPlanCheck
        ? variant.selling_plan_allocations[this.selectElement.selectedIndex].price
        : variant.price;

      this.priceElement.innerHTML = formatMoney(variantPrice, theme.moneyFormat);
    }

    const sellingPlanContainer = document.querySelector('[data-selling-plan-fieldset]');

    if (sellingPlanContainer) {
      const sellingPlanPriceContainer = sellingPlanContainer.querySelector('[data-selling-plan-price]');

      const sellingPlanCompareAtPriceContainer = sellingPlanContainer.querySelectorAll(
        '[data-selling-plan-compare-at-price]'
      );

      sellingPlanPriceContainer.innerHTML = formatMoney(
        variant.selling_plan_allocations[this.selectElement.selectedIndex].price,
        theme.moneyFormat
      );

      sellingPlanCompareAtPriceContainer.forEach((compareAtPriceContainer) => {
        compareAtPriceContainer.innerHTML = formatMoney(
          variant.selling_plan_allocations[this.selectElement.selectedIndex].compare_at_price,
          theme.moneyFormat
        );
      });
    }

    if (!this.priceContainer) return;

    while (this.priceContainer.firstChild) this.priceContainer.removeChild(this.priceContainer.firstChild);

    if (variant) {
      const variantPrice = this.radioSellingPlanCheck
        ? variant.selling_plan_allocations[this.selectElement.selectedIndex].price
        : variant.price;

      if (variant.compare_at_price > variantPrice) {
        this.priceContainer.innerHTML = `<ins class="no-underline">${formatMoney(variantPrice, theme.moneyFormat)}</ins>
          <del class="text-base-sale-price">${formatMoney(variant.compare_at_price, theme.moneyFormat)}</del>`;
      } else {
        this.priceContainer.innerHTML = `<div>${formatMoney(variantPrice, theme.moneyFormat)}</div>`;
      }

      if (!this.radioSellingPlan) return;

      this.sellingPlanPrice = variant.selling_plan_allocations[this.selectElement.selectedIndex].price;

      this.compareAtPriceSellingPlan =
        variant.selling_plan_allocations[this.selectElement.selectedIndex].compare_at_price;
      const discountPercentage =
        ((this.compareAtPriceSellingPlan - this.sellingPlanPrice) / this.compareAtPriceSellingPlan) * 100;

      const roundedDiscountPercentage = Math.round(discountPercentage * 10) / 10;

      this.discountPercentageSellingPlanContainer.innerHTML = `${roundedDiscountPercentage}%`;
      this.priceSellingPlanContainer.innerHTML = formatMoney(this.sellingPlanPrice, theme.moneyFormat);
      this.compareAtPriceSellingPlanContainer.innerHTML = formatMoney(
        this.compareAtPriceSellingPlan,
        theme.moneyFormat
      );
    }
  }

  updateVariantUnitPrice(variant) {
    initUpdateVariantUnitPrice(variant, this.wrapper);
  }

  updateGallery(variant) {
    if (!variant) return false;

    const sliderWrapper = this.wrapper.querySelector('.product-gallery-slider');

    if (!sliderWrapper) return false;

    const currentVariantSliderItem = sliderWrapper.querySelector(
      `.product-gallery-slider__img[data-position="${variant.featured_image?.position}"]`
    );

    currentVariantSliderItem &&
      window.ResponsiveHelper.addRange({
        '..767': {
          on() {
            const imageWidth = currentVariantSliderItem.getBoundingClientRect().width;

            const sliderItemMargin = getComputedStyle(currentVariantSliderItem.parentElement).marginRight.split(
              'px'
            )[0];

            const variantImagePosition = variant.featured_image.position;

            const scrollToIndex = Array.from(sliderWrapper.children).findIndex(
              (elem) => +elem.querySelector('.product-gallery-slider__img').dataset.position === variantImagePosition
            );

            variantImagePosition && sliderWrapper.scrollTo((+sliderItemMargin + imageWidth) * scrollToIndex, 0);
          },
        },
        '768..': {
          on() {
            if (
              sliderWrapper.firstElementChild
                .querySelector('.product-gallery-slider__img')
                .getAttribute('data-position') === currentVariantSliderItem.getAttribute('data-position')
            ) {
              return false;
            }

            sliderWrapper.prepend(currentVariantSliderItem.parentElement);
          },
        },
      });
  }

  initSubmit() {
    if (!this.variantSelects && !this.variantRadios) {
      this.productForm = this.wrapper.querySelector('#product-id')?.form;
    }

    this.productForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.initAddToBag(e);
    });
  }

  initAddToBag(event) {
    event.preventDefault();

    const serializedForm = serializeArray(event.target);

    const variantId = serializedForm.find((item) => item.name === 'id')?.value;
    const sellingPlanID = serializedForm.find((item) => item.name === 'selling_plan')?.value;

    const quantity = this.wrapper.querySelector('#Quantity')?.value || 1;

    const properties = serializedForm.reduce((acc, curr) => {
      let newAcc;

      if (curr.name.includes('properties')) {
        const prop = curr.name.split('[')[1].split(']')[0];

        newAcc = {
          ...acc,
          [prop]: curr.value,
        };
      }

      return newAcc;
    }, {});

    const data = {
      items: [
        {
          quantity,
          id: variantId,
          selling_plan: sellingPlanID,
          properties,
        },
      ],
    };

    addItem(data).then((response) => {
      const { items } = response;

      this.handleErrorMessage(response.description);

      if (!items) return;

      window.Store.dispatch(addJustAdded(items[0]));
      window.Store.dispatch(getCart());
      theme.cart.cartDrawer === 'popup'
        ? window.Store.dispatch(openPopup())
        : window.dispatchEvent(new CustomEvent('productAddedOpenDrawer'));
    });
  }

  waitForElement = (selector) =>
    new Promise((resolve) => {
      const initialButton = this.wrapper.querySelector(selector);

      if (initialButton && !initialButton.disabled) {
        resolve(initialButton);

        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const nodes = Array.from(mutation.addedNodes);

          for (const node of nodes) {
            const button = node.querySelector(selector);
            const haasAClass = node.classList.contains(selector.replace('.', ''));

            if (haasAClass) {
              resolve(node);
              observer.disconnect();

              return;
            }

            if (button && !button.disabled) {
              observer.disconnect();
              resolve(button);

              return;
            }
          }
        });
      });

      if (this.wrapper.querySelectorAll('.shopify-payment-button')[0]) {
        observer.observe(this.wrapper.querySelectorAll('.shopify-payment-button')[0], {
          subtree: true,
          attributes: true,
          childList: true,
        });
      }
    });

  getVariantData(el) {
    if (!el) return;

    this.variantData = this.variantData || JSON.parse(el.querySelector('[type="application/json"]').textContent);
  }

  sizeChartInit() {
    if (!this.sizeChart) return false;

    import('@fancyapps/ui/dist/fancybox.css');
    import('@fancyapps/ui/src/Fancybox/Fancybox.js').then(({ Fancybox }) => {
      Fancybox.bind('.size-chart-link', {
        closeButton: 'outside',
        showClass: 'size-chart',
        dragToClose: false,
        on: {
          reveal: () => {
            const tableWrapper = document.querySelector('[data-table] table');

            tableWrapper?.parentElement.classList.add('table-holder');
          },
        },
      });
    });
  }

  initProductRecommendations() {
    const productRecommendationsContainer = this.wrapper.querySelector('#complementary-products-container');

    if (!productRecommendationsContainer) return false;

    fetch(productRecommendationsContainer.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        const html = document.createElement('div');

        html.innerHTML = text;
        const recommendations = html.querySelector('#complementary-products-container');

        if (recommendations && recommendations.innerHTML.trim().length) {
          productRecommendationsContainer.innerHTML = recommendations.innerHTML;
          const accordionContainer = productRecommendationsContainer.querySelector('.js-complementary-accordion');

          this.accordion = new Accordion(accordionContainer, {
            duration: 400,
            collapse: true,
            showMultiple: false,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
