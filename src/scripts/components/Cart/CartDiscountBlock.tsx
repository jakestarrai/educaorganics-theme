import { FunctionComponent, h } from 'preact';
import { Discount } from 'components/icons/Discount';

interface Props {
  title: string;
}

export const CartDiscountBlock: FunctionComponent<Props> = ({ title }) => (
  <li className="flex items-center">
    <div className="mr-1 w-5 shrink-0 text-base-body">
      <Discount />
    </div>
    {title}
  </li>
);
