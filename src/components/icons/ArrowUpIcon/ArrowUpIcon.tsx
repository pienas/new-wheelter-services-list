import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const ArrowUpIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M12 21V3l-7 7m14 0-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
