import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m4 13 5 5 6-6.546M20 6l-2.75 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
