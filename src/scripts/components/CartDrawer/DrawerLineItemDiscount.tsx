import { Discount } from 'components/icons/Discount';
import { Fragment, FunctionComponent, h } from 'preact';

interface Props {
  title: string;
}

export const DrawerLineItemDiscount: FunctionComponent<Props> = ({ title }) => (
  <Fragment>
    <div className="mx-1 mt-[2px] w-[18px] shrink-0 text-base-body">
      <Discount />
    </div>
    <div>{title}</div>
  </Fragment>
);
