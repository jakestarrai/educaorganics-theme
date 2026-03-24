import { useState, useEffect } from 'preact/hooks';

interface SellingPlanProps {
  productsDataJson: any[];
  isLoading: boolean;
}

export function useProductData(prop) {
  const [productsDataJson, setProductsJson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts: any = async (item) => {
    const url = `/products/${item.handle}`;

    setIsLoading(true);

    try {
      const response = await fetch(url);
      const requestData = await response.text();

      const parser = new DOMParser();
      const parsedData = parser.parseFromString(requestData, 'text/html');
      const getScript = parsedData.getElementById('product-json');

      const parsedJson = JSON.parse(getScript.innerHTML);

      return parsedJson;
    } catch (err) {
      console.error(err);

      return null;
    }
  };

  const getResponse = async () => {
    const product = await getProducts(prop);

    if (product) {
      setProductsJson([product]);
    }

    setIsLoading(false);
  };

  return { productsDataJson, isLoading, getResponse };
}
