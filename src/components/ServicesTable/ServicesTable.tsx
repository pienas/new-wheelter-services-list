import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Link,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Heading,
  Box,
  Text,
  useToast,
  InputRightElement,
  Checkbox,
  Grid,
} from '@chakra-ui/react';
import {
  Cell,
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { usePlausible } from 'next-plausible';
import React, { useMemo, useState } from 'react';
import { z } from 'zod';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import dateFormat from 'dateformat';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  chakraComponents,
  ChakraStylesConfig,
  CreatableSelect,
  DropdownIndicatorProps,
  GroupBase,
  Select,
  SingleValue,
} from 'chakra-react-select';

import { InferQueryOutput, trpc } from 'utils/trpc';
import {
  AddIcon,
  MoreIcon,
  FilterIcon,
  RemoveIcon,
  AssignIcon,
  EditIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CrossIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PriorityIcon,
  DescriptionIcon,
  NameIcon,
  UrlIcon,
  EmailIcon,
  PhoneIcon,
  NewCategoryIcon,
  StatusIcon,
} from 'components/icons';
import { DebouncedInput } from 'components/DebouncedInput';
import { Tag } from 'components/Tag';
import { PRIORITY, ServiceForm, STATUS } from 'types';
import { Toast } from 'components/Toast';

type ServiceFromServer = InferQueryOutput<'services.getOne'>['service'];

interface DataTableProps {
  columns: ColumnDef<ServiceFromServer, any>[];
}

interface Option {
  label: React.ReactNode;
  value: string;
}

type ServiceFormType = Omit<z.infer<typeof ServiceForm>, 'createdById'>;

export const ServicesTable = ({ columns }: DataTableProps) => {
  const { data: session } = useSession();

  const { data: services, refetch: refetchServices } = trpc.useQuery(
    ['services.getAll'],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const { data: categories } = trpc.useQuery(['categories.getAll']);

  const { data: users } = trpc.useQuery(['users.getAll']);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'priority', desc: false },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const [selectedAssignee, setSelectedAssignee] =
    useState<SingleValue<Option>>(null);

  const initialFormValues = {
    name: '',
    url: '',
    email: '',
    phone: '',
    priority: PRIORITY.LOW,
    status: STATUS.NEW,
    assigneeId: '',
  };

  const priorityOptions: Option[] = [
    {
      value: PRIORITY.LOW,
      label: <Tag type={PRIORITY.LOW} />,
    },
    {
      value: PRIORITY.MEDIUM,
      label: <Tag type={PRIORITY.MEDIUM} />,
    },
    {
      value: PRIORITY.HIGH,
      label: <Tag type={PRIORITY.HIGH} />,
    },
  ];

  const statusOptions: Option[] = [
    {
      value: STATUS.NEW,
      label: <Tag type={STATUS.NEW} />,
    },
    {
      value: STATUS.IN_PROGRESS,
      label: <Tag type={STATUS.IN_PROGRESS} />,
    },
    {
      value: STATUS.ACCEPTED,
      label: <Tag type={STATUS.ACCEPTED} />,
    },
    {
      value: STATUS.DECLINED,
      label: <Tag type={STATUS.DECLINED} />,
    },
  ];

  const assigneeOptions: Option[] =
    users?.users.map((user) => ({
      value: user.name,
      label: <Tag label={user.name} />,
    })) || [];

  const customStyles: ChakraStylesConfig<Option, false, GroupBase<Option>> = {
    container: (provided) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'gray.500',
    }),
    valueContainer: (provided) => ({
      ...provided,
      pl: '6px',
      pr: '2px',
      fontSize: '12px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'text.100',
      fontSize: '12px',
      opacity: 1,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: '18px',
      height: '18px',
      fontSize: '18px',
      paddingX: '12px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      my: '3px',
      zIndex: 100,
    }),
    menuList: (provided) => ({
      ...provided,
      borderColor: 'gray.500',
      p: '5px',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px',
      p: '0.4rem 10px',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'gray.300',
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: 'black',
      fontSize: '12px',
    }),
  };

  const customStylesMulti: ChakraStylesConfig<
    Option,
    true,
    GroupBase<Option>
  > = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      cursor: 'text',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'gray.500',
    }),
    valueContainer: (provided) => ({
      ...provided,
      pl: '6px',
      pr: '2px',
      fontSize: '12px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'text.100',
      fontSize: '12px',
      opacity: 1,
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    clearIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: () => ({
      display: 'none',
    }),
  };

  const customComponents = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DropdownIndicator: (
      props: DropdownIndicatorProps<Option, false, GroupBase<Option>>,
    ) => (
      <chakraComponents.DropdownIndicator {...props}>
        <ChevronDownIcon color="text.100" />
      </chakraComponents.DropdownIndicator>
    ),
  };

  const globalFilterFn: FilterFn<any> = (
    row,
    columnId,
    filterValue: string,
  ) => {
    const search = filterValue.toLowerCase();

    let value = row.getValue(columnId) as string;

    if (typeof value === 'number') {
      value = String(value);
    }

    return value?.toLowerCase().includes(search);
  };

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    columns,
    data: services?.services || [],
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  const filterPages = (visiblePages: number[], totalPages: number) =>
    visiblePages.filter((page) => page <= totalPages);

  const getVisiblePages = (page: number, total: number) => {
    if (total < 8) {
      return filterPages([1, 2, 3, 4, 5, 6, 7], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, '...', page - 1, page, page + 1, '...', total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, '...', total];
      }
    }
  };

  const createServiceMutation = trpc.useMutation(['services.create']);

  const plausible = usePlausible();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values, { resetForm }) => {
      handleCreateService(values);
      resetForm();
    },
  });

  const handleCreateService = async ({
    name,
    url,
    email,
    phone,
    priority,
    status,
    assigneeId,
  }: ServiceFormType) => {
    createServiceMutation.mutate(
      {
        createdById: session?.user?.id || '',
        name,
        url,
        email,
        phone,
        priority,
        status,
        assigneeId,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            duration: 3000,
            isClosable: false,
            render: () => (
              <Toast
                type="success"
                title="Paslaugų teikėjas sukurtas"
                description="Paslaugų teikėjas buvo sėkmingai sukurtas ir pridėtas į
              sąrašą."
              />
            ),
          });
          refetchServices();
          onClose();
        },
      },
    );
    plausible('create');
  };

  const assignServiceMutation = trpc.useMutation(['services.assign']);

  const selfAssignService = (serviceId: string | undefined) => {
    if (!serviceId) {
      return toast({
        status: 'error',
        duration: 3000,
        isClosable: false,
        render: () => (
          <Toast
            type="error"
            title="Klaida"
            description="Įvyko nenumatyta klaida. Prašome bandyti dar kartą."
          />
        ),
      });
    }

    assignServiceMutation.mutate(
      {
        id: serviceId,
        assignedToId: session?.user?.id || '',
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            duration: 3000,
            isClosable: false,
            render: () => (
              <Toast
                type="success"
                title="Paslaugų teikėjas priskirtas"
                description="Paslaugų teikėjas buvo sėkmingai priskirtas jums."
              />
            ),
          });
          refetchServices();
        },
      },
    );
    plausible('assign');
  };

  const renderCell = (cell: Cell<ServiceFromServer, unknown>) => {
    const { column } = cell;

    const cellValue = cell.getValue();

    switch (column.id) {
      case 'createdAt':
        return (
          <Box>
            <Text fontSize="12px">
              {dateFormat(cellValue as Date, 'yyyy-mm-dd')}
            </Text>
            <Text fontSize="10px">
              {dateFormat(cellValue as Date, 'HH:MM:ss')}
            </Text>
          </Box>
        );
      case 'url':
        return (
          <Link href={cellValue as string} color="brand.500">
            {flexRender(column.columnDef.cell, cell.getContext())}
          </Link>
        );
      case 'priority':
        let priority;

        switch (cellValue) {
          case 'LOW':
            priority = 'Žemas';
            break;
          case 'MEDIUM':
            priority = 'Vidutinis';
            break;
          default:
            priority = 'Aukštas';
            break;
        }

        return <Tag type={priority as PRIORITY} />;
      case 'status':
        let status;

        switch (cellValue) {
          case 'NEW':
            status = 'Naujas';
            break;
          case 'IN_PROGRESS':
            status = 'Derybose';
            break;
          case 'ACCEPTED':
            status = 'Sutiko';
            break;
          default:
            status = 'Nesutiko';
            break;
        }

        return <Tag type={status as STATUS} />;
      case 'actions':
        return (
          <Flex justifyContent="flex-end">
            <MoreIcon boxSize={4} />
          </Flex>
        );
      case 'assignedToId': {
        if (!cellValue) {
          return (
            <Button
              variant="link"
              colorScheme="brand"
              fontWeight={400}
              fontSize="0.75rem"
              onClick={() => selfAssignService(cell.row.original?.id)}
            >
              Priskirti man
            </Button>
          );
        } else {
          return flexRender(column.columnDef.cell, cell.getContext());
        }
      }
      case '_count_comments':
        return cellValue !== 0 ? (
          <Tag label={cellValue as string} />
        ) : (
          <Button
            variant="link"
            colorScheme="brand"
            fontWeight={400}
            fontSize="0.75rem"
          >
            Pridėti pastabą
          </Button>
        );
      case '_count_categories':
        return cellValue !== 0 ? (
          <Tag label={cellValue as string} />
        ) : (
          <Button
            variant="link"
            colorScheme="brand"
            fontWeight={400}
            fontSize="0.75rem"
          >
            Pridėti kategoriją
          </Button>
        );
      default:
        return flexRender(column.columnDef.cell, cell.getContext());
    }
  };

  if (!services || !categories || !users) {
    return <>Loading...</>;
  }

  const selfAssignSelectedServices = () => {
    const servicesArray = Object.keys(rowSelection).map((key) => Number(key));

    servicesArray.forEach((service) => {
      assignServiceMutation.mutate(
        {
          id: services.services[service]?.id || '',
          assignedToId: session?.user?.id || '',
        },
        {
          onSuccess: () => {
            toast({
              status: 'success',
              duration: 3000,
              isClosable: false,
              render: () => (
                <Toast
                  type="success"
                  title="Paslaugų teikėjai priskirti"
                  description="Paslaugų teikėjai buvo sėkmingai priskirti jums."
                />
              ),
            });
            setRowSelection({});
            refetchServices();
          },
        },
      );
      plausible('assign');
    });
  };

  const selfAssignServiceInCreation = () => {
    const userName = users.users.find(
      (user) => user.id === session?.user?.id,
    )?.name;

    if (userName) {
      setSelectedAssignee({
        value: userName,
        label: <Tag label={userName} />,
      });

      formik.setFieldValue('assignee', userName);
    }
  };

  return (
    <Flex direction="column" justifyContent="space-between" height="100%">
      <Flex justifyContent="space-between" alignItems="center" mb="28px">
        <Link href="/">
          <Flex alignItems="center" cursor="pointer">
            <Image
              src="/logo.svg"
              alt="Wheelter logo"
              width="64px"
              height="64px"
            />
            <Box ml="8px" mt="8px">
              <Heading fontSize="xl" color="black">
                Wheelter
              </Heading>
              <Text fontSize="14px" color="text.100">
                Paslaugų teikėjų sąrašas
              </Text>
            </Box>
          </Flex>
        </Link>
        <Flex>
          {Object.keys(rowSelection).length !== 0 && (
            <>
              <Button
                px="30px"
                py="12px"
                color="text.300"
                backgroundColor="gray.500"
                fontWeight={400}
                fontSize="12px"
                borderRadius="4px"
                cursor="pointer"
                transition="background 0.2s"
                mr="12px"
                _hover={{ backgroundColor: 'error.100' }}
              >
                <RemoveIcon boxSize={5} color="text.300" mr="12px" />
                Pašalinti {`(${Object.keys(rowSelection).length})`}
              </Button>
              <Button
                px="30px"
                py="12px"
                color="text.300"
                backgroundColor="gray.500"
                fontWeight={400}
                fontSize="12px"
                borderRadius="4px"
                cursor="pointer"
                transition="background 0.2s"
                mr="12px"
                _hover={{ backgroundColor: 'gray.600' }}
                onClick={() => selfAssignSelectedServices()}
              >
                <AssignIcon boxSize={5} color="text.300" mr="12px" />
                Priskirti man {`(${Object.keys(rowSelection).length})`}
              </Button>
              <Button
                px="30px"
                py="12px"
                color="text.300"
                backgroundColor="gray.500"
                fontWeight={400}
                fontSize="12px"
                borderRadius="4px"
                cursor="pointer"
                transition="background 0.2s"
                mr="12px"
                _hover={{ backgroundColor: 'gray.600' }}
              >
                <EditIcon boxSize={5} color="text.300" mr="12px" />
                Keisti {`(${Object.keys(rowSelection).length})`}
              </Button>
            </>
          )}
          <Button
            px="30px"
            py="12px"
            color="text.300"
            backgroundColor="gray.500"
            fontWeight={400}
            fontSize="12px"
            borderRadius="4px"
            cursor="pointer"
            transition="background 0.2s"
            mr="12px"
            _hover={{ backgroundColor: 'gray.600' }}
          >
            <FilterIcon boxSize={5} color="text.300" mr="12px" />
            Filtrai
          </Button>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
          />
          <Button
            px="30px"
            py="12px"
            color="white"
            backgroundColor="brand.500"
            fontWeight={500}
            fontSize="14px"
            borderRadius="4px"
            boxShadow="0px 2px 10px rgba(100, 0, 230, 0.25)"
            cursor="pointer"
            transition="background 0.2s"
            _hover={{ backgroundColor: 'brand.600' }}
            onClick={onOpen}
          >
            <AddIcon boxSize={5} color="white" mr="12px" />
            Sukurti paslaugų teikėją
          </Button>
        </Flex>
      </Flex>
      <Scrollbars
        height="calc(100vh - 192px)"
        autoHide={true}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              top: '50px',
            }}
          />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              right: '2px',
              bottom: '2px',
              top: '2px',
              borderRadius: '3px',
              height: 'calc(100% - 64px)',
            }}
          />
        )}
      >
        <Table position="relative">
          <Thead
            backgroundColor="gray.500"
            position="sticky"
            top="0"
            zIndex={1}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    cursor="pointer"
                    color="text.200"
                    fontSize="0.75rem"
                    textTransform="unset"
                    fontWeight="500"
                    letterSpacing="0"
                    border="none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    <chakra.span pl="1">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <ArrowDownIcon color="text.200" boxSize={3} />
                        ) : (
                          <ArrowUpIcon color="text.200" boxSize={3} />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getPrePaginationRowModel().rows.length
              ? table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      backgroundColor: row.getIsSelected()
                        ? 'gray.500'
                        : 'gray.200',
                    }}
                    backgroundColor={row.getIsSelected() ? 'gray.500' : 'white'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Td
                        key={cell.id}
                        color="text.100"
                        fontSize="0.75rem"
                        border="none"
                      >
                        <Flex alignItems="center">{renderCell(cell)}</Flex>
                      </Td>
                    ))}
                  </Tr>
                ))
              : 'Rezultatų nėra'}
          </Tbody>
        </Table>
      </Scrollbars>
      <Flex
        borderTop="1px solid"
        borderColor="gray.500"
        py="18px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="text.300" fontSize="14px">
          Rodomi {table.getRowModel().rows.length} iš{' '}
          {table.getPrePaginationRowModel().rows.length} paslaugų teikėjų
        </Text>
        <Flex>
          <Button
            w="40px"
            h="40px"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.500"
            borderRadius="4px"
            fontWeight={400}
            fontSize="16px"
            mr="12px"
            _hover={{
              backgroundColor: table.getCanPreviousPage() && 'gray.600',
            }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon color="text.300" boxSize={6} />
          </Button>
          {getVisiblePages(
            table.getState().pagination.pageIndex + 1,
            table.getPageCount(),
          ).map((page) => (
            <Button
              w="40px"
              h="40px"
              alignItems="center"
              justifyContent="center"
              backgroundColor="gray.500"
              borderRadius="4px"
              fontWeight={
                page === table.getState().pagination.pageIndex + 1 ? 500 : 400
              }
              color={
                page === table.getState().pagination.pageIndex + 1
                  ? 'brand.500'
                  : 'text.300'
              }
              fontSize="16px"
              mr="12px"
              _hover={{ backgroundColor: page !== '...' && 'gray.600' }}
              key={page}
              onClick={() => table.setPageIndex(Number(page) - 1)}
              disabled={page === '...'}
            >
              {page}
            </Button>
          ))}
          <Button
            w="40px"
            h="40px"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.500"
            borderRadius="4px"
            fontWeight={400}
            fontSize="16px"
            mr="12px"
            _hover={{ backgroundColor: table.getCanNextPage() && 'gray.600' }}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon color="text.300" boxSize={6} />
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent p="30px">
          <ModalHeader p="0">
            <Flex>
              <Box mr="15px">
                <Text fontSize="20px" fontWeight={500} mb="6px">
                  Sukurti paslaugų teikėją
                </Text>
                <Text color="text.100" fontSize="12px" fontWeight={400}>
                  Sukurti naują paslaugų teikėją ir pridėti jį į sąrašą.
                  Žvaigždute pažymėti laukai yra privalomi.
                </Text>
              </Box>
              <Button
                variant="unstyled"
                w="24px"
                h="24px"
                minW="24px"
                onClick={onClose}
              >
                <CrossIcon boxSize={6} color="text.300" />
              </Button>
            </Flex>
          </ModalHeader>
          <Divider my="20px" borderColor="gray.500" opacity={1} />
          <ModalBody p="0">
            <form onSubmit={formik.handleSubmit}>
              <Text fontSize="14px" fontWeight={500} mb="10px">
                Paslaugų teikėjo duomenys
              </Text>
              <InputGroup
                sx={{
                  input: {
                    paddingInlineStart: formik.values.name.length
                      ? '9px'
                      : '28px',
                  },
                }}
              >
                {!formik.values.name.length && (
                  <InputLeftElement
                    pointerEvents="none"
                    children={<NameIcon color="text.100" boxSize={4} />}
                    ml="-3px"
                  />
                )}
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  borderColor="gray.500"
                  required={true}
                  placeholder="Pavadinimas *"
                  _placeholder={{
                    color: 'text.100',
                    fontSize: '12px',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  }}
                  _focusVisible={{
                    borderColor: 'brand.500',
                  }}
                />
                {formik.values.name.length && (
                  <InputRightElement
                    children={<CrossIcon color="black" />}
                    onClick={() => formik.setFieldValue('name', '')}
                    cursor="pointer"
                  />
                )}
              </InputGroup>
              <InputGroup
                mt="10px"
                sx={{
                  input: {
                    paddingInlineStart: formik.values.url.length
                      ? '9px'
                      : '28px',
                  },
                }}
              >
                {!formik.values.url.length && (
                  <InputLeftElement
                    pointerEvents="none"
                    children={<UrlIcon color="text.100" boxSize={4} />}
                    ml="-3px"
                  />
                )}
                <Input
                  id="url"
                  name="url"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.url}
                  borderColor="gray.500"
                  required={true}
                  placeholder="Nuoroda *"
                  _placeholder={{
                    color: 'text.100',
                    fontSize: '12px',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  }}
                  _focusVisible={{
                    borderColor: 'brand.500',
                  }}
                />
                {formik.values.url.length && (
                  <InputRightElement
                    children={<CrossIcon color="black" />}
                    onClick={() => formik.setFieldValue('url', '')}
                    cursor="pointer"
                  />
                )}
              </InputGroup>
              <InputGroup
                mt="10px"
                sx={{
                  input: {
                    paddingInlineStart: formik.values.email.length
                      ? '9px'
                      : '28px',
                  },
                }}
              >
                {!formik.values.email.length && (
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="text.100" boxSize={4} />}
                    ml="-3px"
                  />
                )}
                <Input
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  borderColor="gray.500"
                  required={true}
                  placeholder="El. paštas *"
                  _placeholder={{
                    color: 'text.100',
                    fontSize: '12px',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  }}
                  _focusVisible={{
                    borderColor: 'brand.500',
                  }}
                />
                {formik.values.email.length && (
                  <InputRightElement
                    children={<CrossIcon color="black" />}
                    onClick={() => formik.setFieldValue('email', '')}
                    cursor="pointer"
                  />
                )}
              </InputGroup>
              <InputGroup
                mt="10px"
                sx={{
                  input: {
                    paddingInlineStart: formik.values.phone.length
                      ? '9px'
                      : '28px',
                  },
                }}
              >
                {!formik.values.phone.length && (
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="text.100" boxSize={4} />}
                    ml="-3px"
                  />
                )}
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  borderColor="gray.500"
                  required={true}
                  placeholder="Tel. nr. *"
                  _placeholder={{
                    color: 'text.100',
                    fontSize: '12px',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  }}
                  _focusVisible={{
                    borderColor: 'brand.500',
                  }}
                />
                {formik.values.phone.length && (
                  <InputRightElement
                    children={<CrossIcon color="black" />}
                    onClick={() => formik.setFieldValue('phone', '')}
                    cursor="pointer"
                  />
                )}
              </InputGroup>
              <Text fontSize="14px" fontWeight={500} mt="20px" mb="10px">
                Kategorijos
              </Text>
              <Text color="text.100" fontSize="12px">
                Sukurti naują kategoriją
              </Text>
              <CreatableSelect<Option, true, GroupBase<Option>>
                id="categories"
                name="categories"
                placeholder={
                  <Flex alignItems="center">
                    <NewCategoryIcon color="text.100" boxSize={4} mr="5px" />
                    Kategorijos pavadinimas
                  </Flex>
                }
                focusBorderColor="brand.500"
                chakraStyles={customStylesMulti}
                isMulti={true}
              />
              {/* <InputGroup
                mb="10px"
                sx={{
                  input: {
                    paddingInlineStart: '28px',
                  },
                }}
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={<NewCategoryIcon color="text.100" boxSize={4} />}
                  ml="-3px"
                />
                <Input
                  id="category"
                  type="text"
                  borderColor="gray.500"
                  placeholder="Kategorijos pavadinimas"
                  _placeholder={{
                    color: 'text.100',
                    fontSize: '12px',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  }}
                  _focusVisible={{
                    borderColor: 'brand.500',
                  }}
                />
                {formik.values.phone.length && (
                  <InputRightElement
                    children={<CheckIcon color="success.200" />}
                    cursor="pointer"
                  />
                )}
              </InputGroup> */}
              <Grid templateColumns="1fr 1fr">
                {categories.categories.map((category) => (
                  <Checkbox
                    colorScheme="brand"
                    borderColor="checkbox"
                    mb="6px"
                    key={category.id}
                  >
                    <Text fontSize="12px">{category.name}</Text>
                  </Checkbox>
                ))}
              </Grid>
              <Text fontSize="14px" fontWeight={500} mb="10px" mt="14px">
                Papildomi duomenys
              </Text>
              <Grid templateColumns="1fr 1fr 1fr" columnGap="5px">
                <Select<Option, false, GroupBase<Option>>
                  id="priority"
                  name="priority"
                  options={priorityOptions}
                  onChange={(option: SingleValue<Option>) => {
                    formik.setFieldValue('priority', option?.value);
                  }}
                  noOptionsMessage={() => 'Rezultatų nėra'}
                  placeholder={
                    <Flex alignItems="center">
                      <PriorityIcon color="text.100" boxSize={4} mr="5px" />
                      Prioritetas *
                    </Flex>
                  }
                  focusBorderColor="brand.500"
                  chakraStyles={customStyles}
                  components={customComponents}
                />
                <Select<Option, false, GroupBase<Option>>
                  id="status"
                  name="status"
                  options={statusOptions}
                  onChange={(option: SingleValue<Option>) => {
                    formik.setFieldValue('status', option?.value);
                  }}
                  noOptionsMessage={() => 'Rezultatų nėra'}
                  placeholder={
                    <Flex alignItems="center">
                      <StatusIcon color="text.100" boxSize={4} mr="5px" />
                      Statusas *
                    </Flex>
                  }
                  focusBorderColor="brand.500"
                  chakraStyles={customStyles}
                  components={customComponents}
                />
                <Select<Option, false, GroupBase<Option>>
                  id="assignee"
                  name="assignee"
                  options={assigneeOptions}
                  onChange={(option: SingleValue<Option>) => {
                    formik.setFieldValue('assignee', option?.value);
                  }}
                  value={selectedAssignee}
                  noOptionsMessage={() => 'Rezultatų nėra'}
                  placeholder={
                    <Flex alignItems="center">
                      <AssignIcon color="text.100" boxSize={4} mr="5px" />
                      Priskirta
                    </Flex>
                  }
                  focusBorderColor="brand.500"
                  chakraStyles={customStyles}
                  components={customComponents}
                />
                <Text
                  color="brand.500"
                  fontSize="12px"
                  mt="2px"
                  textAlign="right"
                  gridColumn="1/4"
                  cursor="pointer"
                  onClick={() => selfAssignServiceInCreation()}
                >
                  Priskirti man
                </Text>
              </Grid>
              {/* <Flex direction="column" alignItems="flex-end" mt="10px">
                <InputGroup
                  sx={{
                    input: {
                      paddingInlineStart: '28px',
                    },
                  }}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    children={<DescriptionIcon color="text.100" boxSize={4} />}
                    ml="-3px"
                  />
                  <Input
                    id="category"
                    type="text"
                    borderColor="gray.500"
                    placeholder="Pastaba"
                    _placeholder={{
                      color: 'text.100',
                      fontSize: '12px',
                      opacity: 1,
                      transform: 'translateY(-2px)',
                    }}
                    _focusVisible={{
                      borderColor: 'brand.500',
                    }}
                  />
                </InputGroup>
                <Text color="brand.500" fontSize="12px" mt="2px">
                  Pridėti papildomą pastabą
                </Text>
              </Flex> */}
              <Flex justifyContent="flex-end" mt="20px">
                <Button
                  mr="20px"
                  variant="link"
                  onClick={onClose}
                  fontSize="12px"
                  fontWeight={400}
                  color="text.100"
                >
                  Atšaukti
                </Button>
                <Button
                  px="30px"
                  py="12px"
                  color="white"
                  backgroundColor="brand.500"
                  fontWeight={400}
                  fontSize="12px"
                  borderRadius="4px"
                  cursor="pointer"
                  transition="background 0.2s"
                  _hover={{ backgroundColor: 'brand.600' }}
                  type="submit"
                >
                  <CheckIcon boxSize={4} color="white" mr="12px" />
                  Sukurti
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
