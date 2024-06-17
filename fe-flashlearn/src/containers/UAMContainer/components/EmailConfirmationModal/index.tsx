/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfirmationCodeField, Form, Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { useSignUp, useVerifyEmail } from '@queries';
import { Toastify } from '@services';
import { Callback } from '@utils';
import cn from 'classnames';
import React, { useMemo, useState } from 'react';
import appConfig from 'src/appConfig';
import './styles.scss';

type Props = {
  email: string;
  encodeOTP: string;
  onCallBack?: Callback;
  isSignUp?: boolean;
};

const EmailConfirmationModal: React.FC<Props> = ({
  email,
  encodeOTP: encode,
  onCallBack,
  isSignUp,
}) => {
  const { isLoading } = useSignUp();

  const { verifyEmail, isLoading: isLoadingEmail } = useVerifyEmail({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(value) {
      setEncodeOTP(value.data.data.encodeOTP);
      Toastify.success('Một mã OTP mới đã được gửi đến email của bạn.');
    },
  });

  const [code, setCode] = useState('');
  const [encodeOTP, setEncodeOTP] = useState(encode);

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  const handleSubmitCode = () => {
    onCallBack(code, encodeOTP);
  };

  const handleSendAgain = () => {
    verifyEmail({
      email,
      isSignUp,
    });
  };

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  const handleCheckSubmit = () => !isDisabled && handleSubmitCode();

  return (
    <Stack className={cn('ctn-mfa')}>
      <Stack direction="row" alignItems="center" sx={{ mb: 0.5, px: 3 }}>
        <Typography variant="h3" className="ctn-mfa__title">
          Xác minh Email
        </Typography>
      </Stack>
      <Stack className="ctn-mfa__container" direction="row" alignItems="center">
        <Typography className="ctn-mfa__text">
          Mã xác nhận OTP đã được gửi đến email của bạn, vui lòng nhập mã xác nhận vào các ô bên
          dưới để thực hiện quá trình đăng ký.
        </Typography>
      </Stack>

      <Stack sx={{ my: 1, mx: 3 }}>
        <Form customSubmit={handleCheckSubmit} autoComplete="off" preventDefault>
          <ConfirmationCodeField onChange={handleValueChange} />
        </Form>
      </Stack>

      <Stack className="ctn-mfa__container" direction="row" alignItems="center">
        <Typography className="ctn-mfa__text">
          Bạn có thể cần kiểm tra hộp thư rác nếu không tìm thấy email. Nếu bạn không nhận được mã,
          hãy nhấn nút Gửi lại bên dưới.
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" className="ctn-mfa__container-button">
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          disabled={isLoadingEmail}
          onClick={handleSendAgain}
        >
          Gửi lại
        </Button>
        <Button
          onClick={handleCheckSubmit}
          startIcon={isLoading && <Loading size="small" />}
          variant="contained"
        >
          Kiểm tra
        </Button>
      </Stack>
    </Stack>
  );
};

export default EmailConfirmationModal;
