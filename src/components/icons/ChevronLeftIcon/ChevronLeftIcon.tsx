import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const ChevronLeftIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m14 6-6 6m6 6-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
