import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const AddIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M5 12h7m7 0h-4m-3 0V5m0 7v7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
