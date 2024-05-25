import React from 'react';
import DropdownContainer from './DropdownContainer';
import './styles.scss';
import { Stack, Typography } from '@mui/material';
import { DropdownItem } from './types';
import { COLOR_CODE } from '@appConfig';

const CustomDropdown: React.FC<Props> = ({ items, color, ...props }) => (
  <DropdownContainer items={items} {...props}>
    {items.map((item, idx) => (
      <Stack
        key={`dropdown__item--${idx}`}
        gap={1}
        flexDirection={'row'}
        sx={{
          '&:hover': {
            bgcolor: COLOR_CODE.GREY_100,
          },
        }}
      >
        {item.icon}
        <Typography
          fontSize={20}
          style={{ color: color && color === COLOR_CODE.PRIMARY ? COLOR_CODE.GREY_800 : '' }}
        >
          {item.label}
        </Typography>
      </Stack>
    ))}
  </DropdownContainer>
);

type Props = {
  flexPosition?: 'flex-start' | 'flex-end';
  labelClassName?: string;
  label: React.ReactNode;
  items: DropdownItem[];
  xPosition?: 'left' | 'right';
  yPosition?: 'top' | 'bottom';
  color?: string;
  icon?: React.ReactElement;
};

export default CustomDropdown;

// eslint-disable-next-line react-refresh/only-export-components
export * from './types';
