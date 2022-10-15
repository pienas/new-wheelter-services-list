import { z } from 'zod';

export enum PRIORITY {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum STATUS {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export const ServiceForm = z.object({
  createdById: z.string(),
  name: z.string(),
  url: z.string().url({ message: 'Invalid url' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\+370\d{8}$/, { message: 'Invalid phone number' }),
  priority: z.nativeEnum(PRIORITY),
  status: z.nativeEnum(STATUS),
  assigneeId: z.string(),
});
