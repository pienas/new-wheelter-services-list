import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const StatusIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M9.5 2H9v0c-.929 0-1.393 0-1.783.051A6 6 0 0 0 2.05 7.217C2 7.607 2 8.07 2 9v3.4c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C6.56 22 8.24 22 11.6 22h.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C22 17.44 22 15.76 22 12.4V9c0-.929 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.166C16.393 2 15.93 2 15 2v0h-.5M6 12h2l2 3 4-6 2 3h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
