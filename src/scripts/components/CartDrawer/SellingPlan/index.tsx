import { useProductData } from 'hooks/useProductData';
import { useSellingPlanAdd } from 'hooks/useSellingPlanAdd';
import { useEffect } from 'preact/hooks';
import { h } from 'preact';
import theme from 'helpers/themeSettings';
import { CartItem } from 'types';

interface SellingPlanProps {
  item: CartItem;
}

export const SellingPlan: React.FC<SellingPlanProps> = ({ item }) => {
  const { productsDataJson, isLoading, getResponse } = useProductData(item);

  const { updateSellingPlanItem } = useSellingPlanAdd(item);

  const productData = productsDataJson && productsDataJson.length > 0 ? productsDataJson[0].variants : productsDataJson;

  const selectedProduct = productData.find((product) => product.id === item.id);

  useEffect(() => {
    getResponse();
  }, []);

  const renderOptions = () => {
    if (selectedProduct) {
      return productsDataJson[0].selling_plan_groups.map((group) => (
        <option
          value={group.selling_plans[0].id}
          key={group.id}
        >
          {group.name}
        </option>
      ));
    }

    return null;
  };

  return (
    <div>
      {!item.selling_plan_allocation && productsDataJson[0]?.selling_plan_groups.length > 0 && (
        <div className="flex items-center gap-2">
          <input
            id="default-radio-1"
            type="radio"
            value={item.id}
            name="default-radio"
            onChange={() => {
              updateSellingPlanItem(productsDataJson[0].selling_plan_groups[0].selling_plans[0].id);
            }}
            className="
              h-[15px]
              w-[15px]
              shrink-0
              rounded-full
              border
              border-[#9b9b9b]
              "
          />
          <label
            htmlFor="default-radio-1"
            className="text-body-xxs lg:text-body-xs"
          >
            {theme.cart.subscribe.replace(
              '{{ discount }}',
              productsDataJson[0].selling_plan_groups[0].selling_plans[0].price_adjustments[0].value
            )}
          </label>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center gap-2 text-body-xxs lg:text-body-xs">
          <div className="h-6 w-6 shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="#edf979"
              />
              <path
                d="M18.3964 14.6036C18.5917 14.7988 18.9083 14.7988 19.1036 14.6036L22.2855 11.4216C22.4808 11.2263 22.4808 10.9097 22.2855 10.7145C22.0903 10.5192 21.7737 10.5192 21.5784 10.7145L18.75 13.5429L15.9216 10.7145C15.7263 10.5192 15.4097 10.5192 15.2145 10.7145C15.0192 10.9097 15.0192 11.2263 15.2145 11.4216L18.3964 14.6036ZM11.8472 5.75C15.3885 5.75 18.25 8.58811 18.25 12.0776H19.25C19.25 8.02552 15.9305 4.75 11.8472 4.75V5.75ZM18.25 12.0776V14.25H19.25V12.0776H18.25ZM7.11727 7.81271C8.28817 6.54523 9.97282 5.75 11.8472 5.75V4.75C9.68421 4.75 7.73628 5.66895 6.38273 7.13414L7.11727 7.81271Z"
                fill="#2b2627"
              />
              <path
                d="M5.60355 9.39645C5.40829 9.20118 5.09171 9.20118 4.89645 9.39645L1.71447 12.5784C1.5192 12.7737 1.5192 13.0903 1.71447 13.2855C1.90973 13.4808 2.22631 13.4808 2.42157 13.2855L5.25 10.4571L8.07843 13.2855C8.27369 13.4808 8.59027 13.4808 8.78553 13.2855C8.9808 13.0903 8.9808 12.7737 8.78553 12.5784L5.60355 9.39645ZM11.9371 17.875C8.50974 17.875 5.75 15.1592 5.75 11.8319H4.75C4.75 15.7319 7.97809 18.875 11.9371 18.875V17.875ZM5.75 11.8319V9.75H4.75V11.8319H5.75ZM16.5096 15.903C15.3787 17.114 13.7503 17.875 11.9371 17.875V18.875C14.0351 18.875 15.9258 17.9933 17.2404 16.5855L16.5096 15.903Z"
                fill="#2b2627"
              />
            </svg>
          </div>
          {theme.cart.upgrading}
        </div>
      )}
      {item.selling_plan_allocation && (
        <div>
          <label
            htmlFor="select-delivery"
            className="sr-only"
          >
            {theme.cart.delivery}
          </label>
          <select
            id="select-delivery"
            value={item?.selling_plan_allocation.selling_plan.id}
            onChange={(event: any) => {
              return updateSellingPlanItem(event.target.value);
            }}
            className="
              form-select
              h-8
              w-full
              rounded-md
              border-june-dark
              bg-base-body-background
              px-3
              py-1
              pr-9
              text-body-xxs lg:text-body-xs
            "
          >
            {renderOptions()}
          </select>
        </div>
      )}
    </div>
  );
};
