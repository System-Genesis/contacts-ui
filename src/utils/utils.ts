import { Entity, Group } from '../lib/types';

export const getHierarchyBySource = (entity, source: string) => {
  const { role } = entity.digitalIdentities.find((currentDI) => currentDI.source === source);
  return role.directGroup;
};

export const getIdentifier = (entity: Entity) => entity.identityCard ?? entity.personalNumber ?? entity.employeeNumber;

export const getHierarchyName = (group: Group) =>
  group.hierarchy && group.name ? `${group.hierarchy}/${group.name}` : group.hierarchy || group.name;

export const mobilePhoneValidation = (value: string): boolean => /^\d{10}$/.test(value);
export const jabberPhoneValidation = (value: string): boolean => /^[\d*]{3,8}$/.test(value);

export const otherPhoneValidation = (value: string): boolean => !value || value === '' || /^\d{10}$/.test(value);
export const redPhoneValidation = (value: string): boolean => !value || value === '' || /^\d{10}$/.test(value);

export const mailValidation = (value: string): boolean =>
  !value || value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const tagsValidation = (value: { name: string; _id: string }[]): boolean => value.length < 14;

export const hasChanges = (formData: object, contact) =>
  Object.keys(formData).some(
    (key) =>
      key !== 'id' &&
      JSON.stringify(formData[key]) !== JSON.stringify(contact[key]) &&
      !(formData[key] === '' && contact[key] === undefined),
  );

export const cleanFormData = (formData: object) => {
  return Object.entries(formData).reduce((cleanedData, [key, value]) => {
    if (Array.isArray(value)) {
      const filteredArray = value.filter((v) => v !== '' && v !== undefined);
      cleanedData[key] = filteredArray.length ? filteredArray : [];
    } else if (value !== undefined) cleanedData[key] = value;
    return cleanedData;
  }, {});
};
