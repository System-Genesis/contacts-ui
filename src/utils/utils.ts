import { Entity, Group } from '../lib/types';

export const getHierarchyBySource = (entity, source: string) => {
  const di = entity.digitalIdentities.find((currentDI) => currentDI.source === source);

  const { role } = di;

  return role.directGroup;
};

export const getIdentifier = (entity: Entity) => entity.identityCard ?? entity.personalNumber ?? entity.employeeNumber;

export const getHierarchyName = (group: Group) =>
  group.hierarchy && group.name ? `${group.hierarchy}/${group.name}` : group.hierarchy || group.name;

// const formValidations = (formData) => {
//   const newErrors = {};

//   if (!/^\d{10}$/.test(formData.mobilePhone)) {
//     newErrors.mobilePhone = 'Mobile number must be exactly 10 digits';
//   }

//   if (!/^\d{0,10}$/.test(formData.redPhone)) {
//     newErrors.redPhone = 'Red phone must be up to 10 digits';
//   }

//   if (!/^[\d*]{0,8}$/.test(formData.jabberPhone)) {
//     newErrors.jabberPhone = 'Jabber phone must be up to 8 digits and may include *';
//   }
//   return Object.keys(newErrors).length === 0;
// };

export const hasChanges = (formData: object, contact) =>
  Object.keys(formData).some((key) => JSON.stringify(formData[key]) !== JSON.stringify(contact[key]));
