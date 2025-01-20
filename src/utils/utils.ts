import { EntitySearchResult, GroupSearchResult } from '../lib/types';

export const getHierarchyBySource = (entity, source: string) => {
  const { role } = entity.digitalIdentities.find((currentDI) => currentDI.source === source);
  return role.directGroup;
};

export const getIdentifier = (entity: EntitySearchResult) =>
  entity.identityCard ?? entity.personalNumber ?? entity.employeeNumber;

export const getHierarchyName = (group: GroupSearchResult) =>
  group.hierarchy && group.name ? `${group.hierarchy}/${group.name}` : group.hierarchy || group.name;

export const mobilePhoneValidation = (value: string): boolean => /^\d{10}$/.test(value);
export const jabberPhoneValidation = (value: string): boolean => /^[\d*]{3,8}$/.test(value);

export const otherPhoneValidation = (value: string): boolean => !value || value === '' || /^\d{10}$/.test(value);
export const redPhoneValidation = (value: string): boolean => !value || value === '' || /^\d{10}$/.test(value);

export const mailValidation = (value: string): boolean =>
  !value || value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const hasChanges = (formData: object, contact) => {
  return Object.keys(formData).some((key) => {
    const formValue = formData[key];
    const contactValue = contact?.[key];

    if ((formValue === '' && contactValue === undefined) || (formValue === undefined && contactValue === ''))
      return false;

    return JSON.stringify(formValue) !== JSON.stringify(contactValue);
  });
};

export const cleanFormData = (formData: object) => {
  return Object.entries(formData).reduce((cleanedData, [key, value]) => {
    if (Array.isArray(value)) {
      const filteredArray = value.filter((v) => !(v === '' || v === undefined || v.option === ''));
      cleanedData[key] = filteredArray.length ? filteredArray : [];
    } else if (value !== undefined) cleanedData[key] = value;
    return cleanedData;
  }, {});
};

export const getDefaultTags = (contact: object): string[] => {
  // TODO: fix this to  fit true data

  const dict = { Civilian: 'אזרח', Soldier: 'חייל', GoalUser: 'תפקידן' };

  let tags = [];

  if (['חובה', 'קבע', 'עובד צה"ל'].includes(contact?.serviceType)) tags = [contact?.serviceType];
  else {
    const c = (contact?.identityCard ?? contact?.employeeId) && !contact?.personalNumber && !contact?.serviceType;

    if (contact?.source || ['8200', 'OneTree', 'Souf'].includes(contact?.source))
      tags = [c ? 'אזרח' : contact?.entityType, contact?.serviceType === 'פטורים' ? '' : contact?.serviceType];
    else tags = [c ? 'אזרח' : contact?.entityType];
  }

  return tags.filter((t) => !!t).map((t) => dict[t] ?? t);
};
