import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

const UAMBody: React.FC<Props> = ({ children }) => {
  return (
    <Stack flexDirection={'row'}>
      <Stack sx={{ width: '50vw', height: '100vh' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', paddingBottom: '100%' }}>
          <iframe
            src="https://giphy.com/embed/pLY8QHrlL9lKEpvdKQ"
            width="100%"
            height="100%"
            style={{ position: 'absolute', pointerEvents: 'none' }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          />
        </div>
        {/* </div> */}
      </Stack>
      <Stack
        p={5}
        sx={{ width: '50vw', height: '100vh' }}
        justifyContent={'center'}
        className="scale-90"
      >
        {children}
      </Stack>
    </Stack>
  );
};

type Props = PropsWithChildren;

export default UAMBody;
