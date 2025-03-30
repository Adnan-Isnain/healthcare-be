import { Role } from '@prisma/client';

export enum Permission {
  // Treatment permissions
  CREATE_TREATMENT = 'create:treatment',
  READ_TREATMENT = 'read:treatment',
  UPDATE_TREATMENT = 'update:treatment',
  DELETE_TREATMENT = 'delete:treatment',

  // Treatment Options permissions
  CREATE_TREATMENT_OPTION = 'create:treatment_option',
  READ_TREATMENT_OPTION = 'read:treatment_option',
  UPDATE_TREATMENT_OPTION = 'update:treatment_option',
  DELETE_TREATMENT_OPTION = 'delete:treatment_option',

  // Medication permissions
  CREATE_MEDICATION = 'create:medication',
  READ_MEDICATION = 'read:medication',
  UPDATE_MEDICATION = 'update:medication',
  DELETE_MEDICATION = 'delete:medication',

  // Patient permissions
  CREATE_PATIENT = 'create:patient',
  READ_PATIENT = 'read:patient',
  UPDATE_PATIENT = 'update:patient',
  DELETE_PATIENT = 'delete:patient',

  // User management permissions
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',

  // Admin-only permissions
  READ_ALL_MEDICATIONS = 'read:all_medications',
}

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.DOCTOR]: [
    Permission.CREATE_TREATMENT,
    Permission.READ_TREATMENT,
    Permission.UPDATE_TREATMENT,
    Permission.READ_TREATMENT_OPTION,
    Permission.READ_MEDICATION,
    Permission.CREATE_PATIENT,
    Permission.READ_PATIENT,
    Permission.UPDATE_PATIENT,
  ],
  [Role.NURSE]: [
    Permission.READ_TREATMENT,
    Permission.READ_TREATMENT_OPTION,
    Permission.READ_MEDICATION,
    Permission.READ_PATIENT,
  ],
  [Role.STAFF]: [
    Permission.READ_TREATMENT,
    Permission.READ_TREATMENT_OPTION,
    Permission.READ_MEDICATION,
    Permission.READ_PATIENT,
  ],
}; 