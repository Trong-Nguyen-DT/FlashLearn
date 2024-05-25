import React, { Attributes, PropsWithChildren } from 'react';
import cn from 'classnames';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { Stack } from '@mui/material';
import { DropdownItem } from './types';
import './styles.scss';

const DropdownContainer: React.FC<PropsWithChildren<Props>> = ({
  label,
  items,
  xPosition = 'left',
  yPosition = 'bottom',
  flexPosition,
  labelClassName,
  children,
}) => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(items.length);
  const { onClick, ...rest } = buttonProps;

  return (
    <Stack className={cn('cmp-dropdown')} alignSelf={flexPosition}>
      <button
        style={{ display: 'none' }}
        id="close-popover-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      />
      <button
        className={cn('cmp-dropdown__button-wrap', labelClassName, {
          'cmp-dropdown__button-wrap--open': isOpen,
        })}
        {...rest}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
      >
        {label}
      </button>
      <Stack
        className={cn(
          'cmp-dropdown__menu',
          `cmp-dropdown__menu--x-${xPosition}`,
          `cmp-dropdown__menu--y-${yPosition}`,
          { visible: isOpen },
        )}
      >
        {React.Children.map(children, (child, idx) => {
          if (React.isValidElement(child)) {
            const item = items[idx];
            return React.cloneElement(child, {
              ...itemProps[`${idx}`],
              className: cn(
                'cmp-dropdown__item',
                { 'cmp-dropdown__item--active': item.isActive },
                { 'cmp-dropdown__item--disabled': item.isDisabled },
              ),
              onClick: item.onClick,
            } as Attributes);
          }
          return child;
        })}
      </Stack>
    </Stack>
  );
};

type Props = {
  flexPosition?: 'flex-start' | 'flex-end';
  labelClassName?: string;
  label: React.ReactNode;
  items: DropdownItem[];
  xPosition?: 'left' | 'right';
  yPosition?: 'top' | 'bottom';
};

export default DropdownContainer;
