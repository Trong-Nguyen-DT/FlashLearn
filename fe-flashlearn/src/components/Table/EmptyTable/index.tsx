import { Stack, Typography } from '@mui/material';
import React from 'react';
import Image from '../../Image';
import { COLOR_CODE, IMAGES } from '@appConfig';

const EmptyTable: React.FC<Props> = ({ title = 'No results found.', image = '', width = 400 }) => (
  <Stack flexGrow={1} justifyContent="center" alignItems="center" className="my-16">
    <Image src={image || IMAGES.OnDevelopImg} width={width} className="mb-8" />
    <Typography
      fontSize={14}
      color={COLOR_CODE.GREY_900}
      fontWeight={500}
      className="text-align-center"
    >
      {title}
    </Typography>
  </Stack>
);

type Props = {
  title?: string;
  style?: React.CSSProperties;
  image?: string;
  width?: number;
};

export default EmptyTable;
