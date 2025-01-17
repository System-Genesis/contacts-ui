import { Box, Stack } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { HistoryHeader, SearchHeader } from './header';
import { EntityContactsCard } from './entityContactCard';
import { GroupContactsCard } from './groupContactCard';
import { addSearchHistory } from '../../../services/historyService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setDrawerObject, setIsDrawerOpen } from '../../../store/reducers/drawer';
import { useState } from 'react';
import { SurveyDialog } from '../../../common/dialogs/survey';
import { setUser } from '../../../store/reducers/user';

export const Results = ({
  type,
  results,
  count,
  scrolledElementRef,
  searchHeader = false,
  historyHeader = false,
}: {
  type?: ResultsTypes;
  results: EntitySearchResult[] | GroupSearchResult[] | (EntitySearchResult | GroupSearchResult)[];
  count?: number;
  scrolledElementRef?: (node: HTMLDivElement) => void;
  searchHeader?: boolean;
  historyHeader?: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [openSurvey, setOpenSurvey] = useState(false);

  const contact = useSelector((state: RootState) => state.drawer.contact!);
  const currentUser = useSelector((state: RootState) => state.user);

  const mutation = useMutation({
    mutationFn: () => {
      if (currentUser.history.length === 2) setOpenSurvey(true);
      return addSearchHistory({ type: contact?.type, id: contact?.id });
    },

    onSuccess: () => {
      dispatch(setUser({ ...currentUser, history: [contact, ...currentUser.history] }));
      queryClient.setQueryData(['history'], () => [contact, ...results.filter((c) => c.id !== contact.id)]);
    },
  });

  const handleCardClick = (result: GroupSearchResult | EntitySearchResult) => {
    dispatch(setDrawerObject(result));
    dispatch(setIsDrawerOpen(true));
    mutation.mutate();
  };

  const generateResultCard = (result) => {
    const contactsCardProps: any = {
      id: result.id,
      hierarchy: result.hierarchy,
      jabberPhones: result.jabberPhones,
      redPhone: result.redPhone,
      mobilePhone: result.mobilePhone,
      tags: result.tags,
      mails: result.mails,
      chats: result.chats,
      isSelected: contact?.id === result.id,
      type: result.type,
      hiddenFields: result.chats ?? [],
    };

    switch (result.type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        contactsCardProps.entityType = (result as EntitySearchResult).entityType;
        contactsCardProps.serviceType = (result as EntitySearchResult).serviceType;
        contactsCardProps.title = (result as EntitySearchResult).fullName;
        contactsCardProps.subTitle = (result as EntitySearchResult).jobTitle;
        contactsCardProps.image = (result as EntitySearchResult).pictures?.profile.url;
        contactsCardProps.rank = (result as EntitySearchResult).rank;
        contactsCardProps.hiddenFields = (result as EntitySearchResult).hiddenFields;
        contactsCardProps.sex = (result as EntitySearchResult).sex;
        contactsCardProps.source = (result as EntitySearchResult).source;
        contactsCardProps.handleSelect = (resType: ResultsTypes) =>
          handleCardClick({ ...result, type: resType } as EntitySearchResult);

        contactsCardProps.personalNumber = (result as EntitySearchResult).personalNumber;
        contactsCardProps.identityCard = (result as EntitySearchResult).identityCard;
        contactsCardProps.employeeId = (result as EntitySearchResult).employeeId;
        contactsCardProps.source = (result as EntitySearchResult).source;

        return <EntityContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      case ResultsTypes.GROUP:
        contactsCardProps.title = (result as GroupSearchResult).name;
        contactsCardProps.handleSelect = (resType: ResultsTypes) =>
          handleCardClick({ ...result, type: resType } as GroupSearchResult);

        contactsCardProps.subTitle =
          Number((result as GroupSearchResult).entitiesCount) > 99
            ? '99+'
            : Number((result as GroupSearchResult).entitiesCount);
        return <GroupContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      default:
        return <></>;
    }
  };

  return (
    <>
      <SurveyDialog open={openSurvey} setOpen={setOpenSurvey} />

      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, width: '64vw', m: 1 }}>
        <Box sx={{ m: '1rem 2rem 0.5rem 2rem' }}>
          {searchHeader && <SearchHeader count={count!} type={type!} />}
          {historyHeader && <HistoryHeader />}
        </Box>

        <Stack
          sx={{
            maxHeight: '100%',
            overflowY: 'scroll',
            minWidth: '500px',
            '&::-webkit-scrollbar': { display: 'none' },
            m: '0 1.5rem 0 0.5rem',
            gap: 0.4,
          }}
        >
          {[
            ...results.map(generateResultCard),
            <div ref={scrolledElementRef} style={{ opacity: 0 }}>
              infinite scroll div
            </div>,
          ]}
        </Stack>
      </Box>
    </>
  );
};
export default Results;
