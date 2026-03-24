import { CartType } from 'types';

export async function changeItem(line, options, state) {
  function getDefaultRequestConfig() {
    return JSON.parse(
      JSON.stringify({
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;',
        },
      })
    );
  }

  function getItemIndex(key) {
    if (typeof key !== 'string' || key.split(':').length !== 2) {
      throw new TypeError('Theme Cart: Provided key value is not a string with the format xxx:xxx');
    }

    let index = -1;

    state.items.forEach(function (item, i) {
      index = item.key === key ? i + 1 : index;
    });

    if (index === -1) {
      return Promise.reject(new Error('Theme Cart: Unable to match line item with provided key'));
    }

    return index;
  }

  const config = getDefaultRequestConfig();

  const requestOptions = options || {};

  config.method = 'POST';
  config.body = JSON.stringify({
    line: getItemIndex(line),
    quantity: requestOptions.quantity,
    properties: requestOptions.properties,
    selling_plan: requestOptions.selling_plan,
  });

  const response = await fetch('/cart/change.js', config);

  const result = (await response.json()) as CartType;

  return result;
}
