import { UserTypes } from './enums';

export interface User {
  kartoffelId: string;

  hiddenFields: string[];

  favorites: { type: UserTypes; id: string }[];

  history: { type: UserTypes; id: string }[];

  tags: string[];

  type: UserTypes;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface EntitySearchResult extends Omit<Entity, 'mobilePhone'> {
  mobilePhone: string;
  jabberPhone: string;
  redPhone: string;
  hiddenFields: string[];
  otherPhones: string[];
  mails: string[];
  tags: string[];
}

export interface GroupSearchResult extends Group {
  mobilePhone: string;
  jabberPhone: string;
  redPhone: string;
  hiddenFields: string[];
  entitiesCount: string;
  otherPhones: string[];
  mails: string[];
  tags: string[];
}

export interface Entity {
  _id: string;
  id: string;
  displayName?: string;
  entityType: string;
  personalNumber?: string;
  identityCard?: string;
  employeeNumber?: string;
  employeeId?: string;
  organization?: string;
  serviceType?: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  akaUnit?: string;
  dischargeDay?: Date;
  rank?: string;
  mail?: string;
  jobTitle?: string;
  phone?: string[];
  address?: string;
  clearance?: string;
  fullClearance?: string;
  coloredClearance?: string;
  sex?: string;
  birthDate?: Date;
  enlistmentDate?: Date;
  directGroup?: string;
  commanderOf?: string[];
  hierarchy?: string;
  hierarchyIds?: string[];
  pictures?: {
    profile: {
      url: string;
      meta: {
        path: string;
        format: string;
        takenAt: Date;
        updatedAt: Date;
      };
    };
  };
  digitalIdentities?: DigitalIdentity[];
  akaUnitHierarchy?: string[];
  isAmanAssociated?: boolean;
  mobilePhone: string;
}

export interface DigitalIdentity {
  _id: string;
  uniqueId: string;
  entityId?: string;
  source: string;
  isRoleAttachable: boolean;
  mail?: string;
  upn?: string;
  type: string;
  role?: Role;
}

export interface Role {
  _id: string;
  roleId: string;
  jobTitle?: string;
  digitalIdentityUniqueId?: string;
  directGroup: string;
  clearance?: string;
  hierarchy: string;
  hierarchyIds: string[];
  source: string;
  displayName?: string;
  mailDisplayName?: string;
  connectedEntityId?: string;
}

export interface Group {
  id: string;
  name: string;
  source: string;
  directGroup: string;
  ancestors: string[];
  hierarchy: string;
  isLeaf: boolean;
  commanderRole?: string;
  createdAt: Date;
  updatedAt: Date;
}
