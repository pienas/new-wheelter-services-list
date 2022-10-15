import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const CrossIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m6 18 6-6m6-6-4 4M6 6l6 6m6 6-6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
