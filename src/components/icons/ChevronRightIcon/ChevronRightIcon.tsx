import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const ChevronRightIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m10 6 4 4m2 2-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
