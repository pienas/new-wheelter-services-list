import type { NextPage } from 'next';
import Head from 'next/head';
import { createColumnHelper, Row, Table } from '@tanstack/react-table';
import { Button, Checkbox, CheckboxProps, Container } from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';
import { signIn, useSession } from 'next-auth/react';

import { InferQueryOutput, trpc } from 'utils/trpc';
import { ServicesTable } from 'components/ServicesTable';

type ServiceFromServer = InferQueryOutput<'services.getOne'>['service'];

const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <Checkbox ref={ref} colorScheme="brand" borderColor="checkbox" {...rest} />
  );
};

const Home: NextPage = () => {
  const columnHelper = createColumnHelper<ServiceFromServer>();

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }: { table: Table<ServiceFromServer> }) => (
          <IndeterminateCheckbox
            {...{
              isChecked: table.getIsAllRowsSelected(),
              isIndeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: { row: Row<ServiceFromServer> }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                isChecked: row.getIsSelected(),
                isIndeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Sukūrimo data',
      }),
      columnHelper.accessor('createdById', {
        cell: (info) => {
          const { data: userData } = trpc.useQuery([
            'users.getUsersName',
            { id: info.getValue() as string },
          ]);

          return userData?.user?.name;
        },
        header: 'Sukūrė',
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: 'Pavadinimas',
      }),
      columnHelper.accessor('url', {
        cell: (info) => info.getValue(),
        header: 'Nuoroda',
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: 'El. paštas',
      }),
      columnHelper.accessor('phone', {
        cell: (info) =>
          info.getValue()?.replace(/(\d{3})(\d{3})(\d{5})/, '$1 $2 $3'),
        header: 'Tel. nr.',
      }),
      columnHelper.accessor('priority', {
        cell: (info) => info.getValue(),
        header: 'Prioritetas',
        sortingFn: (rowA, rowB) => {
          switch (rowA.original?.priority) {
            case 'HIGH':
              return -1;
            case 'MEDIUM':
              return rowB.original?.priority === 'HIGH' ? 1 : -1;
            case 'LOW':
              return rowB.original?.priority === 'HIGH' ||
                rowB.original?.priority === 'MEDIUM'
                ? 1
                : -1;
            default:
              return 0;
          }
        },
      }),
      columnHelper.accessor('status', {
        cell: (info) => info.getValue(),
        header: 'Statusas',
        sortingFn: (rowA, rowB) => {
          switch (rowA.original?.status) {
            case 'NEW':
              return -1;
            case 'IN_PROGRESS':
              return rowB.original?.status === 'NEW' ? 1 : -1;
            case 'DECLINED':
              return rowB.original?.status === 'NEW' ||
                rowB.original?.status === 'IN_PROGRESS'
                ? 1
                : -1;
            case 'ACCEPTED':
              return rowB.original?.status === 'NEW' ||
                rowB.original?.status === 'IN_PROGRESS' ||
                rowB.original?.status === 'DECLINED'
                ? 1
                : -1;
            default:
              return 0;
          }
        },
      }),
      columnHelper.accessor('assignedToId', {
        cell: (info) => {
          const { data: userData } = trpc.useQuery([
            'users.getUsersName',
            { id: info.getValue() as string },
          ]);

          return userData?.user?.name;
        },
        header: 'Priskirta',
      }),
      columnHelper.accessor('_count.comments', {
        cell: (info) => info.getValue(),
        header: 'Pastabos',
      }),
      columnHelper.accessor('_count.categories', {
        cell: (info) => info.getValue(),
        header: 'Kategorijos',
      }),
      {
        id: 'actions',
      },
    ],
    [columnHelper],
  );

  const { data: session } = useSession();

  if (!session) {
    return (
      <Button colorScheme="green" size="lg" onClick={() => signIn()}>
        Prisijungti
      </Button>
    );
  }

  return (
    <>
      <Head>
        <title>Wheelter services list</title>
      </Head>
      <Container
        w="100vw"
        h="100vh"
        maxW="100vw"
        backgroundColor="#EFF0F3"
        p="40px"
      >
        <Container
          w="calc(100vw - 80px)"
          h="full"
          maxW="unset"
          backgroundColor="white"
          borderRadius="10px"
          px="40px"
          pt="28px"
          boxShadow="0px 6px 22px rgba(0, 0, 0, 0.1)"
        >
          <ServicesTable columns={columns} />
        </Container>
      </Container>
    </>
  );
};

export default Home;
