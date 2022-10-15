import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const FilterIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M15 2h4.365C20.268 2 21 2.732 21 3.635v0a6.54 6.54 0 0 1-2.738 5.321l-1.929 1.377c-.642.459-.963.688-1.222.959a3.999 3.999 0 0 0-1.041 2.024c-.07.368-.07.762-.07 1.551V20a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-5.133c0-.789 0-1.183-.07-1.551a4 4 0 0 0-1.041-2.024c-.26-.27-.58-.5-1.222-.959L5.738 8.956A6.54 6.54 0 0 1 3 3.635v0C3 2.732 3.732 2 4.635 2H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
