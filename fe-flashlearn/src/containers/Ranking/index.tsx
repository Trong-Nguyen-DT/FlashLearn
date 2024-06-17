/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from '@components';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PeriodRank, useGetRanking } from '@queries';
import { useEffect, useState } from 'react';
import RankItem from './RankItem';

type Props = {
  courseId: string;
};

const Ranking = ({ courseId }: Props) => {
  const [period, setPeriod] = useState<PeriodRank>(PeriodRank.ALL);
  const { rankings, isFetching, setParams } = useGetRanking();

  useEffect(() => {
    setParams({ courseId, period });
  }, [courseId, setParams, period]);

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newPeriod: PeriodRank | null) => {
    setPeriod(newPeriod);
  };

  if (isFetching) return <Loading />;

  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        gap: 2,
      }}
    >
      <Stack direction="row" justifyContent={'end'} width={'80%'}>
        <Typography
          fontSize={24}
          fontWeight={800}
          my={2}
          textAlign={'center'}
          width={'100%'}
          ml={24}
        >
          Bảng Xếp Hạng
        </Typography>
        <ToggleButtonGroup value={period} color="primary" exclusive onChange={handleAlignment}>
          <ToggleButton value={PeriodRank.DAY} sx={{ fontWeight: 800 }}>
            Ngày
          </ToggleButton>
          <ToggleButton value={PeriodRank.WEEK} sx={{ fontWeight: 800 }}>
            Tuần
          </ToggleButton>
          <ToggleButton value={PeriodRank.MONTH} sx={{ fontWeight: 800 }}>
            Tháng
          </ToggleButton>
          <ToggleButton value={PeriodRank.ALL} sx={{ fontWeight: 800 }}>
            Tất cả
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {rankings?.length > 0 ? (
        <>
          {rankings.map((rank, index) => (
            <RankItem rank={rank} index={index} />
          ))}
        </>
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Typography variant="body1" fontWeight={600}>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2">
            Khóa học này chưa có bảng xếp hạng, bạn quay lại sau nhé...
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Ranking;
