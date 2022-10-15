import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const EditIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m16 11-.5.5v0c-.327.327-.737.56-1.186.671L11 13l.57-2.28c.16-.64.24-.96.369-1.259.114-.265.257-.517.425-.75.19-.265.423-.498.89-.964L17.5 3.5c.08-.08.12-.12.155-.152a2 2 0 0 1 2.69 0c.036.033.075.072.155.152v0c.08.08.12.12.151.155a2 2 0 0 1 0 2.69 4.899 4.899 0 0 1-.151.155l-2 2M22 12v2c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C18.2 22 16.8 22 14 22H9.5c-2.33 0-3.495 0-4.413-.38a5 5 0 0 1-2.706-2.707C2 17.995 2 16.83 2 14.5v0-.5M12 2H9.5c-2.33 0-3.495 0-4.413.38A5 5 0 0 0 2.38 5.088C2 6.005 2 7.17 2 9.5v.5m15-6a2.652 2.652 0 0 0 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
