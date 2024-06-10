/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from '@components';
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import RankItem from './RankItem';
import { PeriodRank, useGetRanking } from '@queries';

type Props = {
  courseId: string;
};

const Ranking = ({ courseId }: Props) => {
  const { rankings, isFetching, setParams } = useGetRanking();

  useEffect(() => {
    setParams({ courseId, period: PeriodRank.DAY });
  }, [courseId, setParams]);

  if (isFetching) return <Loading />;

  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        gap: 2,
      }}
    >
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
