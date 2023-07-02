import { z } from 'zod';

export enum PRIORITY {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum PRIORITYLT {
  LOW = 'Žemas',
  MEDIUM = 'Vidutinis',
  HIGH = 'Aukštas',
}

export enum STATUS {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export enum STATUSLT {
  NEW = 'Naujas',
  IN_PROGRESS = 'Derybose',
  ACCEPTED = 'Sutiko',
  DECLINED = 'Nesutiko',
}

export const ServiceForm = z.object({
  createdById: z.string(),
  name: z.string(),
  url: z.string().url({ message: 'Invalid url' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\+370\d{8}$/, { message: 'Invalid phone number' }),
  priority: z.nativeEnum(PRIORITY),
  status: z.nativeEnum(STATUS),
  assignedToId: z.optional(z.string()),
});
