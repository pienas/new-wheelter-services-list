import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const PriorityIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M20 14c0 4.546-3.5 8-8 8s-8-3.454-8-8c0-4.545 3.5-7.5 3.5-7.5C7.5 10 8 12 10 12c3 0 2-6 2-10 0 0 5.377 2.566 7.315 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
