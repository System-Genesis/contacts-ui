import i18next from 'i18next';
import { Typography, useTheme, Grid } from '@mui/material';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { AddPhone } from '../../buttons/addPhone';
import outlook from '../../../assets/icons/outlook.svg';
import jabber from '../../../assets/icons/jabber.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { openSubUser } from '../../../store/reducers/drawer';
import { getUserById } from '../../../services/userService';
import { UserTypes } from '../../../lib/enums';

export const EntityContentDrawer: React.FC<{
  contact: EntitySearchResult;
  formData: any;
  setFormData: any;
}> = ({ contact, setFormData, formData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);

  const handleHide = (isHidden, field) =>
    setFormData((prev) => ({
      ...prev,
      hiddenFields: !isHidden ? prev.hiddenFields.concat(field).sort() : prev.hiddenFields.filter((f) => f !== field),
    }));
  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index === undefined) setFormData((prev) => ({ ...prev, [field]: '' }));
    else
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field][index]?.option ? [{ ...prev[field][index], option: '' }] : [''],
      }));
  };

  const handleHierarchyClick = async (id) => {
    const user = await getUserById({ id, type: UserTypes.GROUP });
    dispatch(openSubUser(user as GroupSearchResult));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
      <UpperContact
        contact={contact}
        title={contact.fullName}
        subTitle={contact.jobTitle ?? ''}
        setFormData={setFormData}
        hiddenFields={contact.hiddenFields}
        imageSize={contact.entityType === 'GoalUser' ? '3rem' : '5rem'}
        type={contact.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
      />

      {!isEdit &&
        (contact.hierarchy ??
          (contact.entityType !== 'GoalUser' && contact.jobTitle && contact.jobTitle !== 'unknown')) && (
          <>
            <StyledGridSection container theme={theme}>
              <Typography variant="body1">
                {contact.entityType !== 'GoalUser' ? i18next.t(`roleDetails`) : i18next.t(`description`)}
              </Typography>
              <StyledGridInfo container theme={theme}>
                <FieldDiv
                  fieldLabel={i18next.t('field.hierarchy')}
                  value={contact.hierarchy}
                  onClick={() => handleHierarchyClick(contact.directGroup)}
                  sx={{ cursor: 'pointer', '&:hover': { color: theme.colors.aquaDark } }}
                />
                {contact.entityType !== 'GoalUser' && (
                  <FieldDiv
                    fieldLabel={i18next.t('field.jobTitle')}
                    value={contact.jobTitle !== 'unknown' ? contact.jobTitle : ''}
                  />
                )}
              </StyledGridInfo>
              <StyledDivider theme={theme} />
            </StyledGridSection>
          </>
        )}

      {contact.entityType !== 'GoalUser' && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('userDetails')}</Typography>
            <StyledGridInfo container theme={theme}>
              {(contact.personalNumber ?? contact.identityCard) ? (
                <>
                  <FieldDiv
                    fieldLabel={i18next.t('field.personalNumber')}
                    value={contact.personalNumber}
                    hidable
                    isHidden={formData.hiddenFields?.includes('personalNumber')}
                    onHide={(isHidden) => handleHide(isHidden, 'personalNumber')}
                  />
                  <FieldDiv
                    fieldLabel={i18next.t('field.identityCard') ?? i18next.t('noData')}
                    value={contact.identityCard}
                    hidable
                    isHidden={formData.hiddenFields?.includes('identityCard')}
                    onHide={(isHidden) => handleHide(isHidden, 'identityCard')}
                  />
                </>
              ) : (
                <FieldDiv
                  fieldLabel={i18next.t('field.employeeId') ?? i18next.t('noData')}
                  value={contact.employeeId ?? i18next.t('noData')}
                  hidable
                  isHidden={formData.hiddenFields?.includes('employeeId')}
                  onHide={(isHidden) => handleHide(isHidden, 'employeeId')}
                />
              )}

              {contact.rank && contact.rank !== i18next.t('unknown') && (
                <FieldDiv fieldLabel={i18next.t('field.rank')} value={contact.rank} />
              )}
              <FieldDiv
                fieldLabel={i18next.t('field.birthDate')}
                value={
                  contact.birthDate
                    ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB')
                    : i18next.t('noData')
                }
              />
              <FieldDiv fieldLabel={i18next.t('field.serviceType')} value={contact.serviceType} />
              {contact.dischargeDay && (
                <FieldDiv
                  fieldLabel={i18next.t('field.dischargeDate')}
                  value={new Date(contact.dischargeDay.toString()).toLocaleDateString('en-GB')}
                />
              )}
            </StyledGridInfo>
          </StyledGridSection>
          <StyledDivider theme={theme} />
        </>
      )}

      {isEdit && contact.entityType === 'GoalUser' && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('fastShortcuts')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={'jabberPhones'}
                fieldLabel={i18next.t('jabber')}
                value={formData.jabberPhones?.[0]?.option}
                required={!!contact.jabberPhones?.[0]?.option}
                editable
                removable
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    jabberPhones: [{ ...prev.jabberPhones?.[0], option: event.target.value }],
                  }))
                }
                onRemove={() => handleRemove({ field: 'jabberPhones', index: 0 })} //TODO: fix this
                icon={jabber}
                keyFilter={/^[0-9*]$/}
                lengthLimit={8}
              />
              <FieldDiv
                field={'mail'}
                fieldLabel={i18next.t('field.mail')}
                value={formData.mails?.[0]?.option}
                editable
                removable
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    mails: [{ ...prev.mails?.[0], option: event.target.value }],
                  }))
                }
                onRemove={() => handleRemove({ field: 'mails', index: 0 })} //TODO: fix this
                icon={outlook}
                keyFilter={/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-@]$/}
              />
            </StyledGridInfo>
          </StyledGridSection>
          <StyledDivider theme={theme} />
        </>
      )}

      {(isEdit ||
        (contact.mobilePhone && contact.entityType !== 'GoalUser') ||
        contact.redPhone ||
        (contact.jabberPhones?.length > 0 && contact.jabberPhones?.[0]?.option !== '') ||
        contact?.otherPhones?.length > 0) && (
        <StyledGridSection container theme={theme}>
          <Typography variant="body1">
            {contact.entityType === 'GoalUser' ? i18next.t(`contactDetails`) : i18next.t(`extraContactDetails`)}
          </Typography>
          <StyledGridInfo container theme={theme}>
            {contact.entityType !== 'GoalUser' && (
              <FieldDiv
                field={'mobilePhone'}
                fieldLabel={i18next.t('field.mobilePhone')}
                value={
                  isEdit
                    ? formData.mobilePhone
                    : formData.mobilePhone?.replace(/\D/g, '').replace(/(\d{3})(\d{7})/, '$1-$2')
                }
                required={!!contact.mobilePhone}
                hidable
                editable
                onChange={(event) => setFormData((prev) => ({ ...prev, mobilePhone: event.target.value }))}
                isHidden={formData.hiddenFields?.includes('mobilePhone')}
                onHide={(isHidden) => handleHide(isHidden, 'mobilePhone')}
                keyFilter={/[0-9]/}
                lengthLimit={10}
              />
            )}
            {(contact.entityType !== 'GoalUser' || !isEdit) && (
              <FieldDiv
                field={'jabberPhones'}
                fieldLabel={i18next.t('field.jabberPhone')}
                value={formData.jabberPhones?.[0]?.option}
                required={!!contact.jabberPhones?.[0]?.option}
                editable
                hidable
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    jabberPhones: [{ ...prev.jabberPhones?.[0], option: event.target.value }],
                  }))
                }
                isHidden={formData.hiddenFields?.includes('jabberPhones')}
                onHide={(isHidden) => handleHide(isHidden, 'jabberPhones')}
                keyFilter={/[0-9*]/}
                lengthLimit={8}
              />
            )}
            <FieldDiv
              field={'redPhone'}
              fieldLabel={i18next.t('field.redPhone')}
              value={formData.redPhone?.toString()}
              editable
              onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
              isHidden={formData.hiddenFields?.includes('redPhone')}
              keyFilter={/[0-9]/}
              lengthLimit={10}
            />
            {contact.entityType === 'GoalUser' ? (
              <FieldDiv
                field={'otherPhone'}
                fieldLabel={i18next.t('field.phone')}
                value={formData.otherPhones?.[0]?.toString()}
                editable
                onChange={(event) => setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }))}
                keyFilter={/[0-9]/}
                lengthLimit={10}
              />
            ) : (
              <>
                {formData?.otherPhones?.map((otherPhone, index) => (
                  <FieldDiv
                    key={index}
                    field={'otherPhone'}
                    fieldLabel={i18next.t('field.otherPhone')}
                    value={otherPhone}
                    editable
                    removable
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        otherPhones: formData.otherPhones?.map((c, i) => (i === index ? event.target.value : c)),
                      }))
                    }
                    onRemove={() => handleRemove({ field: 'otherPhones', index })}
                    keyFilter={/[0-9]/}
                    lengthLimit={10}
                  />
                ))}
                {isEdit && formData.otherPhones?.length < 3 && (
                  <AddPhone
                    onClick={() => setFormData((prev) => ({ ...prev, otherPhones: [...prev.otherPhones, ''] }))}
                  />
                )}
              </>
            )}
            {!isEdit && contact.entityType === 'GoalUser' && (
              <FieldDiv fieldLabel={i18next.t('field.mail')} value={contact.mails?.[0].option} />
            )}
          </StyledGridInfo>
        </StyledGridSection>
      )}
    </Grid>
  );
};
