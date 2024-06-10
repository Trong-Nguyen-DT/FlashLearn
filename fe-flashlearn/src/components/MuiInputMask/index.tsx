/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@components';
import { InputProps } from '@components/MuiTextField';
import { emptyFunction } from '@utils';
import React from 'react';
import { IMaskInput } from 'react-imask';
import { IMaskInputProps } from 'react-imask/dist/mixin';

export type ChangeEventPayload = {
  target: { name: string; value: any };
  currentTarget: { name: string; value: any };
};

export type CustomMaskInputProps = IMaskInputProps & {
  onChange: (_event: ChangeEventPayload) => void;
  name: string;
};
const TextMaskCustom: React.FC<CustomMaskInputProps> = ({ ...props }) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      onAccept={(value: any) => {
        onChange({
          target: { name: props.name, value },
          currentTarget: { name: props.name, value },
        });
      }}
      onChange={emptyFunction}
      overwrite
    />
  );
};
// where definitions are:
// 0 - any digit
// a - any letter
// * - any char
// other chars which is not in custom definitions supposed to be fixed
// [] - make input optional
// {} - include fixed part in unmasked value
// ` - prevent symbols shift back
// If definition character should be treated as fixed it should be escaped by \\ (E.g. \\0).

// Additionally you can provide custom definitions:
// mask: '#00000',
// definitions: {
//   // <any single char>: <same type as mask (RegExp, Function, etc.)>
//   // defaults are '0', 'a', '*'
//   '#': /[1-6]/
// }
const MuiInputMask: React.FC<
  InputProps &
    IMaskInputProps & { endAdornment?: React.ReactNode } & { startAdornment?: React.ReactNode }
> = ({ startAdornment, endAdornment, errorMessage, ref: _1, inputRef: _2, ...props }) => (
  <Input
    {...props}
    errorMessage={errorMessage}
    InputProps={{
      startAdornment: startAdornment && startAdornment,
      endAdornment: endAdornment && endAdornment,
      inputComponent: TextMaskCustom as any,
      inputProps: props,
    }}
  />
);

export default MuiInputMask;
