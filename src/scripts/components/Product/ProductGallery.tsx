import { h, FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { MediaType, ProductType } from 'types';
import { useProductContext } from 'contexts/productContext';
import { SwatcherProductsContext } from 'contexts/swatcherProductsContext';

import { Image } from '../Image';

interface PropTypes {
  media: MediaType[];
  swatcherProducts?: ProductType[] | null;
}

const ProductGallery: FunctionComponent<PropTypes> = ({ media }) => {
  const { chosenProduct, settings } = useProductContext();
  const { swatchTypes } = useContext(SwatcherProductsContext);

  const images: MediaType[] = settings?.swatcher_type === swatchTypes.variants ? media : chosenProduct?.media;

  return (
    <div
      className="
        product-gallery-slider
        max-md:flex
        max-md:snap-x
        max-md:snap-mandatory
        max-md:items-center
        max-md:overflow-x-auto
        max-md:overflow-y-hidden
        lg:flex
        lg:flex-wrap
    "
    >
      {images?.map((mediaItem) => (
        <div
          className="
            product-gallery-slider__item
            max-w-full
            max-md:w-full
            max-md:shrink-0
            max-md:snap-start
            max-md:group-[&.product-gallery-slider--alt]:w-[calc(85%+15px)]
            max-md:group-[&.product-gallery-slider--alt]:pr-[15px]
            md:pb-4
            md:first:w-full
            lg:w-[calc(50%-1rem/2)]
            lg:grow
            lg:pr-4"
          key={mediaItem.id}
        >
          <div
            className="product-gallery-slider__img relative pt-[100%]"
            data-position={mediaItem.position}
          >
            <Image
              key={mediaItem.id}
              className="absolute left-0 top-0 h-full w-full max-w-full object-cover"
              src={mediaItem.src}
              sizes={['635x791', '290x364']}
              ratio={mediaItem.aspect_ratio}
              alt={mediaItem.alt}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
