import { h, FunctionComponent, Fragment } from 'preact';
import theme from 'helpers/themeSettings';
import { defaultButtonStyle, defaultButtonSizeStyles, defaultButtonColorStyles, twm } from 'helpers/constants';
import { ButtonType } from 'types';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

// for usage:
//
// <Button
//   href="/example"
//   className="class2 class3"
//   color="primary"
//   size="md"
//   text="text"
//   dataAttribute="data-example"
// />

const Button: FunctionComponent<ButtonType> = ({
  element = 'a',
  href,
  className: additionalClasses,
  text,
  type,
  dataAttribute,
  icon,
  snippet,
  size = theme.cart.button_size,
  color,
  ...rest
}) => {
  let content;

  const elementMap = {
    a: 'a',
    button: 'button',
    span: 'span',
    input: 'input',
  };

  const typeAttr = type === 'icon' ? { text: icon } : { type: type || 'button' };

  const ElementComponent = elementMap[element];

  const renderIconContent = () => {
    if (type === 'icon') {
      if (snippet) {
        content = (
          <Icon
            icon={icon}
            className="-m-[3px] h-4 w-4"
          />
        );
      }
    } else {
      content = (
        <Fragment>
          {text}
          {snippet && (
            <Icon
              icon={icon}
              className="-m-[3px] ml-3 h-4 w-4"
            />
          )}
        </Fragment>
      );
    }

    return content;
  };

  const buttonClasses = [defaultButtonStyle];

  const classes = [...buttonClasses, defaultButtonSizeStyles[size], defaultButtonColorStyles[color]];

  if (element === 'input') {
    return (
      <input
        className={twm(classes, additionalClasses)}
        value={text}
        {...typeAttr}
        {...dataAttribute}
        {...rest}
      />
    );
  }

  return (
    <ElementComponent
      href={href}
      className={twm(classes, additionalClasses)}
      {...typeAttr}
      {...dataAttribute}
      {...rest}
    >
      {renderIconContent()}
    </ElementComponent>
  );
};

export default Button;
