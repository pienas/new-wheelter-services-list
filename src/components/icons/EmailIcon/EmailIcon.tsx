import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const EmailIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M22 9.5V9v0c0-.929 0-1.394-.062-1.782a5 5 0 0 0-4.156-4.156C17.393 3 16.93 3 16 3h-6c-2.8 0-4.2 0-5.27.545A5 5 0 0 0 2.545 5.73C2 6.8 2 8.2 2 11v2c0 2.8 0 4.2.545 5.27a5 5 0 0 0 2.185 2.185C5.8 21 7.2 21 10 21h6c.929 0 1.393 0 1.782-.062a5 5 0 0 0 4.156-4.156C22 16.393 22 15.93 22 15v0-.5M18 8l-1 .667-.562.375c-1.604 1.069-2.406 1.603-3.273 1.811a5.001 5.001 0 0 1-2.33 0c-.867-.208-1.669-.742-3.273-1.811L7 8.667 6 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
