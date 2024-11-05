import { Entity, Group } from '../lib/types';

export const getHierarchyBySource = (entity, source: string) => {
  const di = entity.digitalIdentities.find((currentDI) => currentDI.source === source);

  const { role } = di;

  return role.directGroup;
};

export const getIdentifier = (entity: Entity) => entity.identityCard ?? entity.personalNumber ?? entity.employeeNumber;

export const getHierarchyName = (group: Group) =>
  group.hierarchy && group.name ? `${group.hierarchy}/${group.name}` : group.hierarchy || group.name;
