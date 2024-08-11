import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '300px', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 5,
          backgroundColor: '#ecdcf2',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#9c6cad' // Primary color
          }
          
        }}
      />
    </Box>
  );
}
