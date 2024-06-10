import { COLOR_CODE, NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { IconButton, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import {
  VocabularyOfLessonPayload,
  useAddLesson,
  useAddVocabularies,
  useAddVocabulariesOfLesson,
  useGetAllVocabulary,
  useGetLesson,
  useGetLessonDetail,
  useGetVocabularyOfLesson,
  useUpdateLesson,
} from '@queries';
import { Toastify } from '@services';
import { FieldArray, FieldArrayRenderProps, Form, FormikProvider, useFormik } from 'formik';
import { isNumber } from 'lodash';
import { useMemo, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LessonForm from './LessonForm';
import { LessonFormField } from './LessonForm/helpers';
import VocabularyForm from './VocabularyForm';
import { VocabularyFormType, vocalInitialValues } from './VocabularyForm/helpers';
import CreateLessonFooter from './components/Footer';
import {
  LessonVocabForm,
  LessonVocabFormField,
  LessonVocabFormSchema,
  lessonVocabInitialValues,
  scrollToRef,
} from './helpers';

const CreateLesson = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');
  const ArrayHelperRef = useRef<FieldArrayRenderProps>(null);
  const lastVocalAddedRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const navigate = useNavigate();

  const { pathname } = location;

  const isUpdate = pathname.split('/')[3] !== 'lesson-create';

  const { lessonId: paramLessonId, courseId } = useParams<{ lessonId: string; courseId: string }>();

  const { handleInvalidateLessonList } = useGetLesson({ courseId });

  const { lessonDetail } = useGetLessonDetail({ id: paramLessonId });

  const { vocabulary: vocabularyOfLesson } = useGetVocabularyOfLesson({ lessonId: paramLessonId });

  const { onUpdateLesson, isLoading: isLoadingUpdate } = useUpdateLesson({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(data) {
      setFieldValue(
        `${LessonVocabFormField.LESSON}.${LessonFormField.ID}`,
        data.data.data.id.toString(),
      );
      handleAddVocabulary();
    },
  });
  const { onAddNewLesson, isLoading: isLoadingAddNewLesson } = useAddLesson({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(data) {
      setFieldValue(
        `${LessonVocabFormField.LESSON}.${LessonFormField.ID}`,
        data.data.data.id.toString(),
      );
      handleAddVocabulary();
    },
  });

  const { onAddVocabularyOfLesson, isLoading: isLoadingAddVocabularyOfLesson } =
    useAddVocabulariesOfLesson({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        Toastify.error(error.message?.[0]?.errorMessage);
      },
      onSuccess() {
        Toastify.success(isUpdate ? 'Cập nhật bài học thành công' : 'Tạo bài học thành công');
        handleInvalidateLessonList();
        navigate(PATHS.lessonsList.replace(':courseId', courseId));
      },
    });

  const { onAddNewVocabulary, isLoading: isLoadingAddVocabulary } = useAddVocabularies({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(data) {
      handleInvalidateVocabularyList();
      const newVocal: VocabularyOfLessonPayload[] = data.data.data.vocabularies.map((vocal) => {
        const existVocal = values.vocabulary.find((voc) => voc.word === vocal.word);
        return {
          vocabularyId: vocal.id,
          image: existVocal?.image,
          meaning: existVocal?.meaning,
        };
      });
      const existVocal: VocabularyOfLessonPayload[] = values.vocabulary
        .filter((vocal) => isNumber(vocal.vocabularyId))
        .map((vocal) => {
          return {
            vocabularyId: Number(vocal.vocabularyId),
            image: vocal.image,
            meaning: vocal.meaning,
          };
        });
      onAddVocabularyOfLesson({
        vocabularies: [...existVocal, ...newVocal],
        lessonId: Number(values.lesson.id),
      });
    },
  });

  const { vocabulary, handleInvalidateVocabularyList } = useGetAllVocabulary();

  const handleAddVocabulary = () => {
    const newVocal = values.vocabulary
      .map((vocal) =>
        !isNumber(vocal.vocabularyId)
          ? {
              word: vocal.vocabularyId,
              partOfSpeech: vocal.partOfSpeech,
            }
          : vocal.partOfSpeech !==
            vocabulary.find((voc) => voc.id === vocal.vocabularyId)?.partOfSpeech
          ? {
              word: vocabulary.find((voc) => voc.id === vocal.vocabularyId).word,
              partOfSpeech: vocal.partOfSpeech,
            }
          : null,
      )
      .filter((vocal) => vocal !== null);

    onAddNewVocabulary({ vocabularies: newVocal });
  };

  const handleOnSubmit = (value: LessonVocabForm) => {
    const payload = { ...value.lesson, ...(isUpdate && { id: paramLessonId }), courseId: courseId };
    isUpdate ? onUpdateLesson(payload) : onAddNewLesson(payload);
  };

  const INITIAL: LessonVocabForm = useMemo(() => {
    if (lessonDetail && vocabularyOfLesson && isUpdate) {
      return {
        lesson: {
          id: lessonDetail.id.toString(),
          name: lessonDetail.name,
          description: lessonDetail.description,
          image: { url: lessonDetail.image },
          courseId: courseId,
        },
        vocabulary: vocabularyOfLesson.map((voc) => ({
          vocabularyId: voc.vocabulary.id,
          partOfSpeech: voc.vocabulary.partOfSpeech,
          image: { url: voc.image },
          meaning: voc.meaning,
        })),
      };
    }
    return lessonVocabInitialValues;
  }, [courseId, isUpdate, lessonDetail, vocabularyOfLesson]);

  const formik = useFormik<LessonVocabForm>({
    initialValues: INITIAL,
    validationSchema: LessonVocabFormSchema,
    onSubmit: handleOnSubmit,
    enableReinitialize: true,
  });

  const { handleSubmit, values, setFieldValue } = formik;

  const handleAddFunction = () => {
    const newFunction: VocabularyFormType = vocalInitialValues;
    ArrayHelperRef.current.push(newFunction);
    scrollToRef(lastVocalAddedRef);
  };

  const isLoading =
    isLoadingAddVocabularyOfLesson ||
    isLoadingAddVocabulary ||
    isLoadingUpdate ||
    isLoadingAddNewLesson;

  return (
    <Stack
      sx={{
        width: '100%',
        height: 'calc(100vh - 100px)',
        overflowX: isMobileScreen ? 'hidden' : 'auto',
        pt: `${NAVBAR_HEIGHT}px`,
        alignItems: 'center',
      }}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%', height: '100%' }}>
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Stack
              sx={{
                width: '100%',
                height: '100%',
                mt: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'auto',
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  width: '80%',
                  alignItems: 'center',
                  gap: 4,
                  overflow: 'hidden',
                }}
              >
                <LessonForm formik={formik} />
                <Stack width={'100%'} height={'100%'}>
                  <Typography
                    variant="body2"
                    textAlign={'center'}
                    py={3}
                    fontSize={20}
                    fontWeight={700}
                  >
                    Từ Vựng
                  </Typography>
                  <Stack
                    height={'70vh'}
                    width={'100%'}
                    sx={{ overflowY: 'auto', gap: 3, alignItems: 'center' }}
                  >
                    <FieldArray
                      name={LessonVocabFormField.VOCABULARY}
                      render={(arrayHelpers) => {
                        ArrayHelperRef.current = arrayHelpers;
                        return (
                          <>
                            {values.vocabulary.map((_, index) => {
                              const isLastVocalIndex = values.vocabulary.length - 1;
                              const prefix = `${LessonVocabFormField.VOCABULARY}[${index}]`;
                              return (
                                <Stack
                                  width={'80%'}
                                  key={prefix}
                                  ref={isLastVocalIndex === index ? lastVocalAddedRef : null}
                                >
                                  <VocabularyForm
                                    formik={formik}
                                    handleDelete={arrayHelpers.remove}
                                    prefix={prefix}
                                    index={index}
                                  />
                                </Stack>
                              );
                            })}
                          </>
                        );
                      }}
                    />
                    <Tooltip title="Thêm từ vựng" arrow placement="top">
                      <IconButton
                        onClick={handleAddFunction}
                        sx={{
                          backgroundColor: COLOR_CODE.PRIMARY,
                          width: 70,
                          height: 70,
                          '&:hover': {
                            backgroundColor: COLOR_CODE.PRIMARY_400,
                          },
                        }}
                      >
                        <IoMdAdd size={50} color="white" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
              <CreateLessonFooter isLoading={isLoading} />
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default CreateLesson;
