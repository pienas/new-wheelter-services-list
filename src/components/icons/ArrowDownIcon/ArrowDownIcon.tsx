import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const ArrowDownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M12 3v18l-7-7m14 0-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
