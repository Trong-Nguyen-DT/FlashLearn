/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider, SliderProps } from '@mui/material';
import { getRandomId } from '@utils';
import { useRef } from 'react';
import Element from '../Element';

type CustomSliderProps = SliderProps & {
  errorMessage?: string;
  label?: string;
  containerClassName?: string;
  required?: boolean;
};

const CustomSlider = ({
  errorMessage,
  label,
  containerClassName,
  required,
  ...props
}: CustomSliderProps) => {
  const id = useRef(`select-${getRandomId()}`);

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      required={required}
    >
      <Slider id={id.current} {...props} />
    </Element>
  );
};

export default CustomSlider;
