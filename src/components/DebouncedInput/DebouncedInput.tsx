import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

import { CrossIcon, SearchIcon } from 'components/icons';

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...rest
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <InputGroup
      mr="12px"
      w="300px"
      sx={{
        input: {
          paddingInlineStart: '56px',
        },
      }}
    >
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="text.300" />}
        ml="18px"
      />
      <Input
        placeholder="Paieška"
        pr="30px"
        border="none"
        backgroundColor="gray.500"
        color="text.300"
        _placeholder={{ color: 'text.300' }}
        fontSize="12px"
        borderRadius="4px"
        {...rest}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <InputRightElement
          onClick={() => setValue('')}
          cursor="pointer"
          children={<CrossIcon boxSize={4} color="text.300" />}
        />
      )}
    </InputGroup>
  );
};
