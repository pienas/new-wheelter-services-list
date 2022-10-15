import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const NameIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M2.5 11s2.33 1.036 5.5 1.616m0 0c1.235.227 2.598.384 4 .384 1.402 0 2.765-.157 4-.384m-8 0V11m0 1.616V14m8-1.384a28.08 28.08 0 0 0 3-.726m-3 .726V11m0 1.616V14m0-8a4 4 0 0 0-8 0m.4 16h7.2c2.24 0 3.36 0 4.216-.436a4 4 0 0 0 1.748-1.748C22 18.96 22 17.84 22 15.6v-3.2c0-2.24 0-3.36-.436-4.216a4 4 0 0 0-1.748-1.748C18.96 6 17.84 6 15.6 6H8.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C2 9.04 2 10.16 2 12.4v3.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748C5.04 22 6.16 22 8.4 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
