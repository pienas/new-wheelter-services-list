import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const SearchIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m21 21-2.505-2.505c-.392-.392-.588-.588-.786-.664a.89.89 0 0 0-.548-.049c-.208.04-.48.23-1.022.608a9 9 0 1 1 3.155-3.89"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
);
