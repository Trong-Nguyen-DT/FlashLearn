import { Box, Stack } from '@mui/material';
import { LessonVocabForm, LessonVocabFormField } from '../helpers';
import { FormikProps } from 'formik';
import { FileUpload, ImagePreview, Input, UploadFileType } from '@components';
import { getErrorMessage } from '@utils';
import { LessonFormField } from './helpers';

type Props = {
  formik: FormikProps<LessonVocabForm>;
};

const LessonForm: React.FC<Props> = ({ formik }) => {
  const { touched, errors, getFieldProps, setFieldValue, values } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleRemoveImage = () => {
    setFieldValue(`${LessonVocabFormField.LESSON}.${LessonFormField.IMAGE}`, null);
  };

  return (
    <Stack
      sx={{
        width: '40%',
        border: '2px solid #E0E0E0',
        boxShadow: '4px 4px 0px #E0E0E0',
        borderRadius: 2,
        p: 4,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 550,
          alignItems: 'center',
        }}
      >
        {values.lesson.image && (
          <ImagePreview
            image={values.lesson.image}
            onRemove={() => {
              handleRemoveImage();
            }}
            thumbnailWidth="300px"
            thumbnailHeight="300px"
          />
        )}
        {!values.lesson.image && (
          <Stack width={300}>
            <FileUpload
              onChange={async (value: UploadFileType[]) => {
                setFieldValue(`${LessonVocabFormField.LESSON}.${LessonFormField.IMAGE}`, value[0]);
              }}
              onBlur={handleRemoveImage}
              acceptFileType={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
              numberAllow={1}
            />
          </Stack>
        )}
      </Box>
      <Input
        required
        label="Hãy đặt tên cho bài học này"
        errorMessage={getFieldErrorMessage(
          `${LessonVocabFormField.LESSON}.${LessonFormField.NAME}`,
        )}
        placeholder="Nhập Tên Bài Học"
        fullWidth
        size="small"
        {...getFieldProps(`${LessonVocabFormField.LESSON}.${LessonFormField.NAME}`)}
      />
      <Input
        label="Miêu tả bài học này"
        errorMessage={getFieldErrorMessage(
          `${LessonVocabFormField.LESSON}.${LessonFormField.DESCRIPTION}`,
        )}
        placeholder="Nhập miêu tả bài học"
        fullWidth
        multiline
        rows={4}
        size="small"
        {...getFieldProps(`${LessonVocabFormField.LESSON}.${LessonFormField.DESCRIPTION}`)}
      />
    </Stack>
  );
};

export default LessonForm;
