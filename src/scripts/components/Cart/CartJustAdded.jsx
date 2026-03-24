import { h, Component } from 'preact';
import { getId } from 'helpers/utils';
import { Image } from '../Image';

class CartJustAdded extends Component {
  constructor(props) {
    super(props);
  }

  renderItemOptions({ options_with_values, product_has_only_default_variant }) {
    if (!product_has_only_default_variant) {
      return options_with_values.map((option) => (
        <div key={`${getId()}-${option}`}>
          <span className="mr-1 inline-block text-base-secondary">{option.name}:</span>
          {option.value}
        </div>
      ));
    }
  }

  render({ justAdded }) {
    const { featured_image, product_title, quantity, id } = justAdded;

    return (
      <div className="flex items-center">
        <div className="mr-4 w-16 shrink-0 md:w-[90px]">
          <Image
            key={id}
            src={featured_image.url}
            sizes={['64x80', '90x90', '90x90']}
            alt={featured_image.alt}
            ratio={featured_image.aspect_ratio}
          />
        </div>
        <div>
          <div className="mb-2 text-title last:mb-0 lg:text-title-desktop">{product_title}</div>
          <div className="mb-2 text-body-small last:mb-0">{this.renderItemOptions(justAdded)}</div>
          <div className="mb-2 text-body-small last:mb-0">
            <span className="mr-1 inline-block text-base-secondary">{theme.cart.quantity}:</span>
            <span data-test-id="added-quantity">{quantity}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CartJustAdded;
