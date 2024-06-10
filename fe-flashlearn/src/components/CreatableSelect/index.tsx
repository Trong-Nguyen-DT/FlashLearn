/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import { isEmpty, isEqual } from 'lodash';
import { useCallback, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { COLOR_CODE } from '../../appConfig';
import Element from '../Element';
import Image from '../Image';
import './styles.scss';
import { emptyFunction, getRandomId } from '@utils';
import { Checkbox, Stack } from '@mui/material';

const MAX_MENU_HEIGHT = 200;

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowDown size={20} />
    </components.DropdownIndicator>
  );
};

const Control = ({ children, ...props }: any) => (
  <components.Control {...props}>
    <FiSearch className="ml-8" />
    {children}
  </components.Control>
);

const ControlWithLabel = ({ children, ...props }: any) => {
  const { labelControl } = props.selectProps;
  return (
    <components.Control {...props}>
      <p className="pl-3 text-color-grey-900">{labelControl}</p>
      <span className="cmp-creatable-select__indicator-separator" />
      {children}
    </components.Control>
  );
};

const ControlNoSearchIcon = ({ children, ...props }: any) => (
  <components.Control {...props}>{children}</components.Control>
);

const IndicatorSeparator = (props: any) => <components.IndicatorSeparator {...props} />;

const CreatableSelectCmp = ({
  options,
  onChange,
  label = '',
  className = '',
  value,
  errorMessage = '',
  placeholder = 'Select',
  containerClassName = '',
  onBlur = emptyFunction,
  name = '',
  required = false,
  hideSearchIcon = true,
  isDisabled = false,
  isMulti = false,
  hideButtonDelete = false,
  labelControl = '',
  isClearable = false,
  iconSearch = null,
  showCheckbox = false,
  onInputChange = emptyFunction,
  ElementProps = {},
  allowCreateOption = false,
  ...props
}: any) => {
  const id = useRef(`select-${getRandomId()}`);
  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      onChange(name, selectedOption ? selectedOption.map((item: any) => item?.value) : null);
    } else onChange(name, selectedOption?.value || null);
  };

  const handleSelectBlur = () => {
    onBlur && onBlur(name, true);
  };
  const hasError = !isEmpty(errorMessage);

  const selectedOption = isMulti
    ? options?.filter((option: any) => value?.includes(option.value)) || null
    : options?.find((option: any) => isEqual(option.value, value)) || null;
  // For custom select, follow this link:
  // https://react-select.com/styles#using-classnames

  const Option = useCallback(
    (props: any) => {
      const { data } = props;
      const children = (
        <Stack direction={'row'} alignItems="center">
          {showCheckbox && <Checkbox checked={value.includes(data.value.toString())} readOnly />}
          {iconSearch && typeof iconSearch === 'string' ? (
            <Image src={iconSearch} className="cmp-creatable-select__icon" />
          ) : (
            iconSearch
          )}
          <Stack className={iconSearch && 'ml-12'}>
            <span>
              {data.label} {data.postfixLabel}
            </span>
            <span className="text-color-grey-500 text-is-14">{data.subLabel}</span>
          </Stack>
        </Stack>
      );
      if (data.isHide) return null;

      return <components.Option {...props} children={children} />;
    },
    [iconSearch, showCheckbox, value],
  );

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      required={required}
      {...ElementProps}
    >
      <Stack>
        <CreatableSelect
          id={id.current}
          maxMenuHeight={MAX_MENU_HEIGHT}
          isClearable={isClearable}
          isDisabled={isDisabled}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleChange}
          options={options}
          className={cn('cmp-creatable-select', className, {
            'cmp-creatable-select--error': hasError,
            'cmp-creatable-select--is-disabled': isDisabled,
            'cmp-creatable-select__indicator--disabled': hideButtonDelete,
          })}
          isMulti={isMulti}
          hideSelectedOptions={!showCheckbox && isMulti}
          classNamePrefix="cmp-creatable-select"
          menuPlacement="auto"
          closeMenuOnSelect={!isMulti}
          // menuPosition={menuPosition}
          onBlur={handleSelectBlur}
          name={name}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: COLOR_CODE.PRIMARY,
              neutral20: COLOR_CODE.GREY_200,
              primary50: COLOR_CODE.PRIMARY_100,
            },
          })}
          components={{
            DropdownIndicator: isDisabled ? () => null : DropdownIndicator,
            IndicatorSeparator: isDisabled ? () => null : IndicatorSeparator,
            Control: labelControl
              ? ControlWithLabel
              : hideSearchIcon
              ? ControlNoSearchIcon
              : Control,
            Option,
          }}
          onInputChange={onInputChange}
          {...props}
          menuPortalTarget={document.querySelector('#root')}
          isOptionDisabled={(option: any) => option.disabled}
          {...(!allowCreateOption && {
            isValidNewOption: () => false,
          })}
        />
      </Stack>
    </Element>
  );
};

export default CreatableSelectCmp;
