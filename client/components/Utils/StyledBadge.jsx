import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


const VirantBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
//  color: '#44b700',
    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid red',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function StyledBadge({ children, badgeContent }) {
  return (
    <VirantBadge
    color="error" 
    badgeContent={badgeContent}
    max={10}
    >
      {children}
    </VirantBadge>
  );
}
