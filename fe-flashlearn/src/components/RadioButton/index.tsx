/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import shortid from 'shortid';

import './styles.scss';
import { Stack } from '@mui/material';
import Element, { ElementProps } from '@components/Element';

type LabelType = string | ReactElement;

const RadioButton: React.FC<RadioProps> = ({
  label,
  labelClassName,
  containerClassName,
  style,
  ...props
}) => {
  const id = useRef(shortid.generate());
  return (
    <Stack direction={'row'} className={cn('cmp-radio', containerClassName)} style={style}>
      <input id={id.current} className={cn('cmp-radio__input')} type="radio" {...props} />
      <label htmlFor={id.current} className={cn('cmp-radio__label', labelClassName)}>
        {label}
      </label>
    </Stack>
  );
};

type RadioProps = Omit<React.HTMLProps<HTMLInputElement>, 'label'> & {
  label?: LabelType;
  labelClassName?: string;
  containerClassName?: string;
};

const Group: React.FC<RadioGroupProps> = ({
  options,
  value,
  containerClassName,
  onChange = () => {},
  label,
  errorMessage,
  name,
  onBlur,
  columns = 3,
  ElementProps,
}) => {
  const [data, setData] = useState<any>(value);

  useEffect(() => {
    onChange(name, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    setData(value);
  };

  const handleRadioBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <Element
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      {...ElementProps}
    >
      <Stack direction="row">
        {options?.map((option, index) => (
          <RadioButton
            key={`radio-${name}-${index}`}
            name={name}
            value={option.value}
            checked={data === option.value}
            label={option.label as LabelType}
            onChange={handleValueChange}
            containerClassName={cn(columns && 'cmp-radio-groups__column')}
            style={{ width: `${100 / columns}%` }}
            onBlur={handleRadioBlur}
          />
        ))}
      </Stack>
    </Element>
  );
};

export type RadioGroupProps = {
  label?: string;
  options?: { value: any; label: LabelType }[];
  value?: any;
  name?: string;
  onChange?: (name: string, value: any) => void;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  columns?: number;
  disabled?: boolean;
  onBlur?: (name: string, touched: boolean) => void;
  ElementProps?: Omit<
    ElementProps,
    'children' | 'id' | 'errorMessage' | 'label' | 'className' | 'subLabel' | 'required'
  >;
};

export default Group;
