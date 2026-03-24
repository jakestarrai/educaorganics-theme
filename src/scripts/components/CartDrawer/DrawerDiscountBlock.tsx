import { FunctionComponent, h } from 'preact';
import { Discount } from 'components/icons/Discount';

interface Props {
  title: string;
}

export const CartDiscountBlock: FunctionComponent<Props> = ({ title }) => (
  <div className="item-center flex">
    <div className="mx-1 mt-[2px] w-[18px] shrink-0 text-base-body">
      <Discount />
    </div>
    <div>{title}</div>
  </div>
);
