import { getShortName } from '@/containers/StartupContainers/NavBar/helpers';
import { COLOR_CODE } from '@appConfig';
import { Avatar, Card, Stack, Typography } from '@mui/material';
import { GetRankResponse } from '@queries';
import { FaMedal } from 'react-icons/fa';

type Props = {
  rank: GetRankResponse;
  index?: number;
};

const RankItem = ({ rank, index }: Props) => {
  return (
    <Card sx={{ borderRadius: 4, width: '80%', overflow: 'unset', boxShadow: 'none' }}>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        px={6}
        gap={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" gap={2}>
          {index !== 0 && (
            <Typography
              fontSize={24}
              fontWeight={700}
              color={index === 0 ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_500}
            >
              {index + 1}
            </Typography>
          )}
          {index === 0 && <FaMedal size={24} color={COLOR_CODE.PRIMARY_500} />}
          <Avatar
            sx={{ width: 50, height: 50, bgcolor: COLOR_CODE.PRIMARY, fontSize: 20 }}
            src={rank.user.avatar}
          >
            {getShortName(rank.user.name)}
          </Avatar>
          <Typography
            fontSize={24}
            fontWeight={700}
            color={index === 0 ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_500}
          >
            {rank.user.name}
          </Typography>
        </Stack>
        <Typography
          fontSize={24}
          fontWeight={700}
          color={index === 0 ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_500}
        >
          {rank.experience} XP
        </Typography>
      </Stack>
    </Card>
  );
};

export default RankItem;
