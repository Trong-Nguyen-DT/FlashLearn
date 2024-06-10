import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { LessonVocabForm } from '../helpers';
import { FormikProps } from 'formik';
import { Callback, getErrorMessage } from '@utils';
import { CreatableSelect, FileUpload, ImagePreview, Input, UploadFileType } from '@components';
import { VocabularyFormField, partOfSpeechOptions } from './helpers';
import { COLOR_CODE } from '@appConfig';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useGetAllVocabulary } from '@queries';
import { useEffect, useState } from 'react';

type Props = {
  formik: FormikProps<LessonVocabForm>;
  prefix: string;
  handleDelete: Callback;
  index: number;
};

const VocabularyForm: React.FC<Props> = ({ formik, handleDelete, prefix, index }) => {
  const [options, setOptions] = useState([]);
  const { touched, errors, getFieldProps, setFieldValue, values } = formik;

  const { vocabulary, isFetching } = useGetAllVocabulary();

  useEffect(() => {
    if (vocabulary) {
      const vocalOptions = vocabulary?.map((vocal) => ({
        value: vocal.id,
        label: vocal.word,
      }));
      setOptions(vocalOptions);
    }
  }, [vocabulary]);

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleRemoveImage = () => {
    setFieldValue(`${prefix}.${VocabularyFormField.IMAGE}`, null);
  };

  const handleOnCreateOption = (inputValue: string) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions([...options, newOption]);
    setFieldValue(`${prefix}.${VocabularyFormField.VOCABULARY_ID}`, inputValue);
    setFieldValue(`${prefix}.${VocabularyFormField.WORD}`, inputValue);
  };

  return (
    <Stack
      direction={'row'}
      sx={{
        border: '2px solid #E0E0E0',
        boxShadow: '0px 4px 0px #E0E0E0',
        borderRadius: 2,
        p: 4,
        gap: 2,
        position: 'relative',
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
        {values.vocabulary[index].image && (
          <ImagePreview
            image={values.vocabulary[index].image}
            imageUrl={values.vocabulary[index].image.url}
            onRemove={() => {
              handleRemoveImage();
            }}
            thumbnailWidth="300px"
            thumbnailHeight="300px"
          />
        )}
        {!values.vocabulary[index].image && (
          <Stack width={300}>
            <FileUpload
              onChange={async (value: UploadFileType[]) => {
                setFieldValue(`${prefix}.${VocabularyFormField.IMAGE}`, value[0]);
              }}
              onBlur={handleRemoveImage}
              acceptFileType={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
              numberAllow={1}
            />
          </Stack>
        )}
      </Box>
      <Stack gap={2} width={'100%'}>
        <CreatableSelect
          label="Từ tiếng anh"
          placeholder="Nhập từ tiếng anh"
          required
          isLoading={isFetching}
          size="small"
          errorMessage={getFieldErrorMessage(`${prefix}.${VocabularyFormField.VOCABULARY_ID}`)}
          {...getFieldProps(`${prefix}.${VocabularyFormField.VOCABULARY_ID}`)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(_: any, value: any) => {
            setFieldValue(`${prefix}.${VocabularyFormField.VOCABULARY_ID}`, value);
            const word = vocabulary.find((vocabulary) => vocabulary.id === value);
            setFieldValue(`${prefix}.${VocabularyFormField.PART_OF_SPEECH}`, word?.partOfSpeech);
            setFieldValue(`${prefix}.${VocabularyFormField.MEANING}`, word?.meaning);
            setFieldValue(`${prefix}.${VocabularyFormField.WORD}`, word?.word);
          }}
          options={options}
          allowCreateOption
          isClearable
          onCreateOption={handleOnCreateOption}
        />
        <CreatableSelect
          label="Loại từ"
          placeholder="Chọn loại từ"
          required
          size="small"
          errorMessage={getFieldErrorMessage(`${prefix}.${VocabularyFormField.PART_OF_SPEECH}`)}
          {...getFieldProps(`${prefix}.${VocabularyFormField.PART_OF_SPEECH}`)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(_: any, value: any) =>
            setFieldValue(`${prefix}.${VocabularyFormField.PART_OF_SPEECH}`, value)
          }
          options={partOfSpeechOptions}
          noOptionsText={'not found'}
        />
        <Input
          required
          label="Định Nghĩa của Từ"
          errorMessage={getFieldErrorMessage(`${prefix}.${VocabularyFormField.MEANING}`)}
          placeholder="Nhập Định Nghĩa của Từ"
          fullWidth
          size="small"
          {...getFieldProps(`${prefix}.${VocabularyFormField.MEANING}`)}
        />
      </Stack>
      <Stack sx={{ position: 'absolute', right: '-40px', top: '40%' }}>
        <Tooltip title="Xóa từ vựng" arrow placement="top">
          <IconButton
            onClick={handleDelete}
            sx={{
              border: `1px solid ${COLOR_CODE.GREY_100}`,
              boxShadow: '0px 2px 2px #E0E0E0',
              background: 'white',
              width: 65,
              height: 65,
              '&:hover': {
                border: `1px solid ${COLOR_CODE.GREY_100}`,
                boxShadow: '0px 4px 0px #E0E0E0',
                background: COLOR_CODE.GREY_100,
              },
            }}
          >
            <RiDeleteBin6Line size={50} color={COLOR_CODE.DANGER} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default VocabularyForm;
