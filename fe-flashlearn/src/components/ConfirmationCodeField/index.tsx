/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import appConfig from 'src/appConfig';
import './styles.scss';
import { generateArray, getRandomId, isNumeric } from '@utils';
import useMeasure from './useMeasure';
import { isEmpty } from 'lodash';
import Element from '@components/Element';
import { Input } from '@components';

const MAX_SIZE = 80;
const SPACE_BETWEEN = 24;
const SPACE_BETWEEN_SMALL = 8;
const SPACE_AROUND = 0;

const getDiff = (str1: string, str2: string) => {
  const res = str2.replace(str1, '');
  return res;
};

const ConfirmationCodeField: React.FC<Props> = ({
  label,
  errorMessage,
  fields = appConfig.VERIFICATION_CODE_LENGTH,
  containerClassName,
  className,
  onChange,
  resetCodeCount = 0,
  isDisabled = false,
}) => {
  const id = useRef<string>(`code-field-${getRandomId()}`);
  const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);
  const [valueArr, setValue] = useState(generateArray(fields));
  const {
    bind,
    bounds: { width },
  } = useMeasure();
  const [cellSize, setCellSize] = useState(MAX_SIZE);
  const isBackward = useRef(false);

  useEffect(() => {
    if (resetCodeCount) {
      setValue(generateArray(fields));
      onChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCodeCount]);

  // Auto size width of text field when screen is small
  useEffect(() => {
    if (width > 0) {
      const spaceBetween = width > 768 ? SPACE_BETWEEN : SPACE_BETWEEN_SMALL;
      const size = (width - spaceBetween * (fields - 1) - SPACE_AROUND * 2) / fields;

      if (size < MAX_SIZE) setCellSize(size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // Link ref to input fields
  useEffect(() => {
    setRefs((elRefs) => generateArray(fields).map((_, i) => elRefs[`${i}`] || createRef()));
  }, [fields]);

  const handleInputChange = (idx: number) => (event: any) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    handleValueChange(idx, value);
  };

  const handleValueChange = (idx: number, value: string) => {
    if (isNumeric(value)) {
      const updatedValue = [...valueArr];
      const pasteValue = getDiff(valueArr[`${idx}`], value);

      if (isEmpty(pasteValue)) {
        updatedValue[`${idx}`] = '';
        move(idx);
      } else {
        // eslint-disable-next-line no-return-assign
        pasteValue.split('').map((x, i) => (updatedValue[idx + i] = x));
        move(idx + pasteValue.length - 1);
      }

      updatedValue.splice(fields);
      setValue(updatedValue);
      onChange(updatedValue.join(''));
    }
  };

  const handleKeyPress = (idx: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    switch (key) {
      case 'ArrowLeft':
        isBackward.current = true;
        move(idx);
        break;
      case 'ArrowRight':
        move(idx);
        break;
      case 'Delete':
        handleValueChange(idx, '');
        break;
      case 'Backspace':
        isBackward.current = true;
        handleValueChange(idx, '');
        // prevent Default to prevent delete 2 times
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const move = (idx: number) => {
    if (isBackward.current) {
      isBackward.current = false;
      moveBackward(idx);
    } else {
      moveForward(idx);
    }
  };

  const moveForward = (idx: number) => {
    if (idx + 1 < fields) {
      setTimeout(() => {
        refs[idx + 1]?.current?.focus();
      }, 100);
    } else {
      setTimeout(() => {
        refs[fields - 1].current?.focus();
      }, 100);
    }
  };

  const moveBackward = (idx: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setTimeout(() => {
      idx > 0 && refs[idx - 1].current?.focus();
    }, 100);
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };

  const inputContainerClassName =
    width > 768 ? 'cmp-code-field__input--container' : 'cmp-code-field__input--container-small';
  const hasError = !!errorMessage;
  return (
    <Stack>
      <Element id={id.current} errorMessage={null} label={label} className={containerClassName}>
        <div className={cn('cmp-code-field__container', className)} {...bind}>
          {generateArray(fields).map((_, index) => (
            <>
              <Input
                key={`code-field-${index}`}
                inputMode="decimal"
                inputRef={refs[`${index}`]}
                className={cn('cmp-code-field__input', inputContainerClassName)}
                errorMessage={hasError ? ' ' : ''}
                value={valueArr[`${index}`]}
                onKeyDown={handleKeyPress(index)}
                onChange={handleInputChange(index)}
                sx={{ input: cellStyle }}
                autoFocus={index === 0}
                disabled={isDisabled}
              />
              {index + 1 === 3 && <span className="cmp-code-field__separator">-</span>}
            </>
          ))}
        </div>
      </Element>
      {!!errorMessage && (
        <Typography variant="body2" className="has-text-danger mt-1">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

type Props = {
  label?: string | React.ReactNode;
  errorMessage?: string;
  onChange: (..._args: any[]) => void;
  fields?: number;
  containerClassName?: string;
  className?: string;
  resetCodeCount?: number;
  isDisabled?: boolean;
};

export default ConfirmationCodeField;
