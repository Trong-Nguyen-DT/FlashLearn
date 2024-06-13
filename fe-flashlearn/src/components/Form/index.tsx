import { Callback } from '@utils';
import React, { KeyboardEvent } from 'react';

const Form: React.FC<Props> = ({ children, preventDefault = false, customSubmit, ...props }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (preventDefault && event.key === 'Enter') {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      customSubmit && customSubmit();

      event.preventDefault();
    }
  };

  return (
    <form onKeyDown={handleKeyDown} {...props}>
      {children}
    </form>
  );
};

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  preventDefault?: boolean;
  customSubmit?: Callback;
};

export default Form;
