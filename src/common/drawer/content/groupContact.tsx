import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { DirectSubs } from './directSubs';
import { useQuery } from '@tanstack/react-query';
import { getSubsOfGroup } from '../../../services/searchService';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { ContactDrawer } from '../drawerWrapper';

export const GroupContactDrawer: React.FC<{ isEdit: boolean; setFormData?: any }> = ({ isEdit, setFormData }) => {
  const theme = useTheme();
  const contact = useSelector((state: RootState) => state.drawer.contact!);
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);

  const subs = useQuery({
    queryKey: ['subs', contact?.id],
    queryFn: () => getSubsOfGroup({ groupId: contact.id }),
    initialData: { entities: [], groups: [] },
    enabled: !!contact?.id,
  });

  const { entities, groups } = subs.data;

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, width: '100%' }}>
      <UpperContact
        contact={contact}
        isEdit={isEdit}
        setFormData={setFormData}
        title={contact.name}
        subTitle={contact.entitiesCount === 1 ? 'איש 1' : `${contact.entitiesCount ?? 0} ${i18next.t('people')}`}
        imageSize="3rem"
      />
      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('description')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('redPhone')} value={contact.jabberPhone} />
          <FieldDiv field={i18next.t('anotherPhone')} value={contact.anotherPhone} />
          <FieldDiv field={i18next.t('mail')} value={contact.mail} />
        </StyledGridInfo>
      </StyledGridSection>

      {entities.length && !isEdit ? (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">משרתים</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectSubs
                type="entity"
                subs={[
                  ...entities.sort((a, b) => {
                    const aIncludes = a.commanderOf?.includes(contact.id) ? 1 : 0;
                    const bIncludes = b.commanderOf?.includes(contact.id) ? 1 : 0;
                    if (bIncludes - aIncludes !== 0) return bIncludes - aIncludes;
                    return a.fullName.localeCompare(b.fullName);
                  }),
                ]}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      ) : (
        <></>
      )}

      {groups.length && !isEdit ? (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">תתי היררכיות</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectSubs type="group" subs={[...groups.sort((a, b) => a.name.localeCompare(b.name))]} />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      ) : (
        <></>
      )}

      <ContactDrawer contact={subEntity} sx={{ mr: '485px' }} />
    </Grid>
  );
};
