import React from 'react';
import { DialogContext } from './DialogContext';
import { DialogContextType, DialogType } from './types';
import { AiOutlineClose } from 'react-icons/ai';
import { Dialog, Stack, Typography, DialogTitle, DialogContent, IconButton } from '@mui/material';
import YesNoDialogContent from './YesNoDialogContent';
import './styles.scss';
import { COLOR_CODE } from '@appConfig';

const CustomDialog = () => {
  const { isOpen, closeModal, getDialogContent } =
    React.useContext<DialogContextType>(DialogContext);

  const {
    data,
    maxWidth = 'xs',
    type,
    title = '',
    hideTitle,
    hideCloseButton = false,
    fullWidth = true,
    // yesNoDialog
    contentText = '',
    subContentText = '',
    showIcon = false,
    icon,
    isWarning = false,
    hideActionButtons = false,
    okText = '',
    cancelText = 'Cancel',
    onClose,
    onOk,
    onCancel = closeModal,
  } = getDialogContent() || {};

  return (
    <Dialog
      maxWidth={maxWidth}
      open={isOpen()}
      onClose={onClose}
      fullWidth={fullWidth}
      className="cmp-dialog__content--visible"
    >
      {!hideCloseButton && (
        <IconButton
          onClick={closeModal}
          sx={{
            color: COLOR_CODE.GREY_600,
            position: 'absolute !important',
            width: 'fit-content',
            top: 1,
            right: 1,
            zIndex: 12,
          }}
        >
          <AiOutlineClose />
        </IconButton>
      )}
      {!hideTitle && (
        <DialogTitle>
          <Stack
            flexDirection={hideTitle ? 'row-reverse' : 'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant={maxWidth === 'md' ? 'h2' : 'h3'} fontWeight={600}>
              {title}
            </Typography>
          </Stack>
        </DialogTitle>
      )}
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
        {data}
        {type === DialogType.YESNO_DIALOG && (
          <YesNoDialogContent
            contentText={contentText}
            subContentText={subContentText}
            showIcon={showIcon}
            icon={icon}
            isWarning={isWarning}
            hideActionButtons={hideActionButtons}
            okText={okText}
            cancelText={cancelText}
            onOk={onOk}
            onCancel={onCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
