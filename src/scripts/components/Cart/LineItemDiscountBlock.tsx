import { Discount } from 'components/icons/Discount';
import { FunctionComponent, h } from 'preact';

interface Props {
  title: string;
}

export const LineItemDiscountBlock: FunctionComponent<Props> = ({ title }) => (
  <li className="item-center flex">
    <div className="mr-1 w-5 shrink-0 text-base-body">
      <Discount />
    </div>
    {title}
  </li>
);
