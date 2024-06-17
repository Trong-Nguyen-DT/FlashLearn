/* eslint-disable react-refresh/only-export-components */
import { RateCoursePayload } from '@queries';
import * as Yup from 'yup';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

export enum RatingFormField {
  ID = 'id',
  RATING = 'rating',
}

export const ratingFormInitValue: RateCoursePayload = {
  id: null,
  rating: 0,
};

export const RatingFormSchema = () =>
  Yup.object().shape({
    rating: Yup.number().required('Rating is required'),
  });

export const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

export const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: (
      <Tooltip title="Rất không hài lòng">
        <SentimentVeryDissatisfiedIcon
          color="error"
          sx={{ transform: 'scale(1)', width: 70, height: 70 }}
        />
      </Tooltip>
    ),
    label: 'Very Dissatisfied',
  },
  2: {
    icon: (
      <Tooltip title="Không hài lòng">
        <SentimentDissatisfiedIcon
          color="error"
          sx={{ transform: 'scale(1)', width: 70, height: 70 }}
        />
      </Tooltip>
    ),
    label: 'Dissatisfied',
  },
  3: {
    icon: (
      <Tooltip title="Bình thường">
        <SentimentSatisfiedIcon
          color="warning"
          sx={{ transform: 'scale(1)', width: 70, height: 70 }}
        />
      </Tooltip>
    ),
    label: 'Neutral',
  },
  4: {
    icon: (
      <Tooltip title="Hài lòng">
        <SentimentSatisfiedAltIcon
          color="success"
          sx={{ transform: 'scale(1)', width: 70, height: 70 }}
        />
      </Tooltip>
    ),
    label: 'Satisfied',
  },
  5: {
    icon: (
      <Tooltip title="Rất hài lòng">
        <SentimentVerySatisfiedIcon
          color="success"
          sx={{ transform: 'scale(1)', width: 70, height: 70 }}
        />
      </Tooltip>
    ),
    label: 'Very Satisfied',
  },
};

export function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
