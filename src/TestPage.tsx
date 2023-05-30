import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const BlinkingText = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevIsVisible) => !prevIsVisible);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" component="span" color={isVisible ? 'primary' : 'transparent'}>
        Hello World
      </Typography>
    </div>
  );
};

export default BlinkingText;
