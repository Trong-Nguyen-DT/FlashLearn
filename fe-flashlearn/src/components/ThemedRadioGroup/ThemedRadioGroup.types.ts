/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroupProps } from '@components/RadioButton';
import { Breakpoint, RadioGroupProps as MuiRadioGroupProps } from '@mui/material';
import { ReactNode } from 'react';

export type ThemedRadioGroupOptionType = {
  label: string | ReactNode;
  value: any;
  shortcutKey?: string;
  disabled?: boolean;
  variant?: ThemedRadioGroupVariant;
};

export type ThemedRadioGroupProps = Omit<MuiRadioGroupProps, 'onChange' | 'onBlur'> &
  Pick<
    RadioGroupProps,
    | 'ElementProps'
    | 'columns'
    | 'label'
    | 'onChange'
    | 'onBlur'
    | 'errorMessage'
    | 'containerClassName'
  > & {
    options: ThemedRadioGroupOptionType[];
    scrollToElementIdOnChange?: string | null;
    preventFocusOnScroll?: boolean;
    variant?: ThemedRadioGroupVariant;
    maxWidth?: Breakpoint;
  };

export type ThemedRadioGroupVariant = 'default' | 'square';
