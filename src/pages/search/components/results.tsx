import { Box, Stack, useTheme } from '@mui/material';
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
import { ContactDrawer } from '../../../common/drawer/drawerWrapper';

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const contact = useSelector((state: RootState) => state.drawer.contact);

  const mutation = useMutation({
    mutationFn: () => {
      return addSearchHistory({ type: contact?.type, id: contact?.id });
    },

    onSuccess: () => {
      queryClient.setQueryData('myHistory');
      void queryClient.invalidateQueries({ queryKey: ['myHistory'] });
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
      jabberPhone: result.jabberPhone,
      mobilePhone: result.mobilePhone,
      tags: result.tags,
      mails: result.mails,
      chats: result.chats,
      isSelected: contact?.id === result.id,
    };

    switch (type ?? result.type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        contactsCardProps.type = 'entity';
        contactsCardProps.entityType = (result as EntitySearchResult).entityType;
        contactsCardProps.title = (result as EntitySearchResult).fullName;
        contactsCardProps.subTitle = (result as EntitySearchResult).jobTitle;
        contactsCardProps.image = (result as EntitySearchResult).pictures?.profile.url;
        contactsCardProps.rank = (result as EntitySearchResult).rank;
        contactsCardProps.handleSelect = (resType: ResultsTypes) =>
          handleCardClick({ ...result, type: resType } as EntitySearchResult);

        return <EntityContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      case ResultsTypes.GROUP:
        contactsCardProps.type = 'group';
        contactsCardProps.title = (result as GroupSearchResult).name;
        contactsCardProps.handleSelect = (resType: ResultsTypes) =>
          handleCardClick({ ...result, type: resType } as GroupSearchResult);

        contactsCardProps.subTitle =
          Number((result as GroupSearchResult).entitiesCount) > 99
            ? '99+'
            : Number((result as GroupSearchResult).entitiesCount);
        return <GroupContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      default:
        return <h1>no type!!!!</h1>;
    }
  };

  return (
    <>
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
      <ContactDrawer />
    </>
  );
};
export default Results;
