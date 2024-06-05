import { COLOR_CODE, IMAGES, PATHS } from '@appConfig';
import { DialogContext, DialogType, YesNoImageModal } from '@components';
import { IconButton, LinearProgress, Stack, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { StepContent } from '../../helpers';

type Props = {
  courseId: string;
  stepContent: StepContent[];
  step: number;
};

const LearnHeader: React.FC<Props> = ({ courseId, stepContent, step }) => {
  const navigate = useNavigate();

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const handleStop = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: (
        <YesNoImageModal
          onYes={() => closeModal()}
          onNo={() => {
            closeModal();
            navigate(PATHS.courseDetail.replace(':courseId', courseId));
          }}
          message={`Đợi chút, đừng đi mà! Bạn sẽ mất hết tiến trình của bài học này nếu thoát bây giờ`}
          image={IMAGES.dontImage}
          yesText="Tiếp tục học"
          noText="Dừng lại"
        />
      ),
      maxWidth: 'sm',
      hideTitle: true,
    });
    openModal();
  };

  return (
    <Stack direction="row" p={3} px={12} gap={3} width="80%" justifyContent="center">
      <Tooltip title="Trở về" arrow placement="top">
        <IconButton>
          <IoClose onClick={handleStop} size={40} />
        </IconButton>
      </Tooltip>
      <Stack width="80%" justifyContent="center">
        <LinearProgress
          variant="determinate"
          value={((step + 1) / stepContent.length) * 100}
          sx={{
            background: COLOR_CODE.GREY_200,
            height: '10px',
            borderRadius: 5,
            '.MuiLinearProgress-bar': {
              background: COLOR_CODE.PRIMARY,
              height: '10px',
              borderRadius: 5,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LearnHeader;
