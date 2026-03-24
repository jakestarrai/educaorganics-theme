import { initProductCardAddToBag } from 'helpers/utils';
import ProductCard from './productCard';

export default class QuickView {
  constructor(elem) {
    this.initChooseOptions(elem);
    this.cards = elem.querySelectorAll('[data-js-product-card]');
    initProductCardAddToBag(this.cards);
  }

  removeModalHtml(modal) {
    modal.querySelector('.js-quick-card') && modal.querySelector('.js-quick-card').remove();
  }

  renderHtmlInModal(modal, html) {
    this.removeModalHtml(modal);
    modal.insertAdjacentElement('afterbegin', html);
  }

  initProductCard(wrapper) {
    const productCard = new ProductCard(wrapper);
  }

  initFancybox() {
    import('@fancyapps/ui/dist/fancybox.css');
    import('@fancyapps/ui').then(({ Fancybox }) => {
      Fancybox.bind('[data-fancybox="quick-view"]', {
        on: {
          done: (fancybox, slide) => {
            this.initProductCard(slide.$content.querySelector('.js-quick-card'));
            this.closeFancybox(document.querySelector('dialog#cart-drawer'), fancybox);

            if (window.Shopify?.PaymentButton?.init) {
              window.Shopify.PaymentButton.init?.();
            }
          },
        },
        mainClass: 'fancybox-quick-view',
        type: 'ajax',
        trapFocus: false,
        autoFocus: false,
        click: 'close',
        dragToClose: false,
        Toolbar: false,
        Thumbs: false,
        groupAttr: false,
      });
    });
  }

  closeFancybox(Cartdrawer, fancybox) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          if (Cartdrawer.hasAttribute('open')) {
            fancybox.close();
          }
        }
      });
    });

    observer.observe(Cartdrawer, { attributes: true });
  }

  initChooseOptions(wrapper) {
    const cards = wrapper.querySelectorAll('[data-js-product-card]');

    this.modal = document.querySelector('#quick-view-popup');

    if (!cards) return false;

    this.initFancybox();
  }
}
