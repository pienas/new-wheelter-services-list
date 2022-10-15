import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const ErrorIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M17.5 3.647A9.953 9.953 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10a9.959 9.959 0 0 0-1.067-4.5M9 15l3-3m0 0 3-3m-3 3L9 9m3 3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
