import cn from 'classnames';
import React from 'react';
import { RiInformationFill } from 'react-icons/ri';

import './styles.scss';
import { isEmpty } from 'lodash';
import { Stack, StackProps, Tooltip, TooltipProps, Typography } from '@mui/material';
import { COLOR_CODE } from '@appConfig';

const Element: React.FC<ElementProps> = ({
  children,
  errorMessage,
  label,
  className,
  subLabel,
  required,
  tooltip,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);
  return (
    <Stack className={cn(className, 'form-element')} {...props}>
      {hasLabel && (
        <ElementLabel
          {...{
            label,
            required,
            tooltip,
          }}
        />
      )}

      {hasSubLabel && <>{subLabel}</>}
      {children}
      {hasError && (
        <Typography
          variant="body2"
          color="error"
          classes={{
            root: 'mt-1',
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

const ElementLabelTooltip = ({ title, arrow = true, ...props }: ElementTooltipProps) => {
  return (
    <span>
      <Tooltip
        arrow={arrow}
        title={<span style={{ whiteSpace: 'pre-line' }}>{title}</span>}
        {...props}
      >
        <i className="cursor-pointer ml-1 mt-2">
          <RiInformationFill size={16} color={COLOR_CODE.PRIMARY} />
        </i>
      </Tooltip>
    </span>
  );
};

export const ElementLabel: React.FC<LabelProps> = ({
  id,
  label,
  required,
  tooltip,
  icon,
  showDifference,
}) => {
  return (
    <Stack justifyContent="flex-start" alignItems="center" direction="row">
      <label
        style={{
          color: COLOR_CODE.GREY_900,
          fontWeight: 500,
          marginBottom: 2,
          fontSize: 14,
        }}
        className={cn({ 'has-bg-difference': showDifference, 'ml-8': icon })}
        htmlFor={id}
      >
        {label} {required && <span className="has-text-danger fw-bold text-is-14">*</span>}
      </label>
      {icon}
      {tooltip && <ElementLabelTooltip {...tooltip} />}
    </Stack>
  );
};

export type ElementTooltipProps = Omit<TooltipProps, 'children'>;

type LabelProps = Partial<{
  label: React.ReactNode;
  required: boolean;
  tooltip: ElementTooltipProps;
  icon: React.ReactNode;
  id: string;
  showDifference: boolean;
}>;

export type ElementProps = StackProps &
  LabelProps & {
    children: React.ReactNode;
    id?: string;
    errorMessage?: string;
    className?: string;
    subLabel?: React.ReactNode;
  };

export default Element;
