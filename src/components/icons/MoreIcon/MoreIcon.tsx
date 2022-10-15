import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const MoreIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M11.5 7C12.875 7 14 5.875 14 4.5S12.875 2 11.5 2A2.507 2.507 0 0 0 9 4.5C9 5.875 10.125 7 11.5 7ZM11.5 9.5A2.507 2.507 0 0 0 9 12c0 1.375 1.125 2.5 2.5 2.5S14 13.375 14 12s-1.125-2.5-2.5-2.5ZM9 19.5c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5A2.507 2.507 0 0 1 9 19.5Z"
      fill="currentColor"
    />
  </Icon>
);
