import { useState, useEffect } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { cartSelector } from 'store/selectors';
import theme from 'helpers/themeSettings';

type fetchArr = {
  string;
};

export function useCartRecommendations() {
  const {
    cart: { items, item_count },
  } = useSelector(cartSelector);

  const getRecommendations: any = async () => {
    const fetchArray = items.map((item) => {
      /* eslint-disable */
      const url = `/recommendations/products?section_id=product-recommendations-json&product_id=${item.product_id}&limit=${theme.cart.cartRecommendationsLimit}`;
      /* eslint-disable */
      setIsLoading(true)

      return fetch(url)
        .then((response) => response.text())
        .catch((err) => console.error(err));
    });

    const requestDataArr: any = await Promise.all(fetchArray);

    const parser = new DOMParser();

    const parsedDataArr = requestDataArr.map((requestData) => {
      const parsedData = parser.parseFromString(requestData, 'text/html');
      const getScipt = parsedData.getElementById('product-recommendation-json');

      const parsedJson = JSON.parse(getScipt.innerHTML).products;

      return parsedJson;
    });

    return parsedDataArr;
  };

  const [recomendationsJson, setRecomendationsJson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = async () => {
    const recommendations = await getRecommendations(items);
    const flattedRecommendationsArr = recommendations.flat();

    const uniqueRecommendations = Object.values(
      flattedRecommendationsArr.reduce((accumulator, item) => {
        accumulator[item.id] = item;

        return !items.find(({ product_id }) => product_id === item.id) && accumulator;
      }, {})
    );

    setRecomendationsJson(uniqueRecommendations);
    setIsLoading(false)
  };
  const clickHandler = () => {
    getResponse();
    document.querySelector('.cart-drawer-opener')?.removeEventListener('click', clickHandler);
  };
  
  useEffect(() => {
    if (document.body.classList.contains('scroll-lock')) {
      getResponse();
    }
  }, [item_count]);
  
  useEffect(() => {
    document.querySelector('.cart-drawer-opener')?.addEventListener('click', clickHandler);
  }, []);

  return { recomendationsJson, isLoading };
}
