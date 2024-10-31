import { Box, Stack, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { HistoryHeader, SearchHeader } from './Header';
import { EntityContactsCard } from './EntityContactCard';
import { GroupContactsCard } from './GroupContactCard';
import { DrawerWrapper } from '../../../common/drawer/DrawerWrapper';
import { UserContent } from '../../../common/drawer/content/UserContent';
import { GroupContact } from '../../../common/drawer/content/GroupContact';
import { addSearchHistory } from '../../../services/historyService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Results = ({
  type,
  results,
  count,
  setPage,
  scrolledElementRef,
  searchHeader = false,
  historyHeader = false,
}: {
  type?: ResultsTypes;
  results: EntitySearchResult[] | GroupSearchResult[] | (EntitySearchResult | GroupSearchResult)[];
  count?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  scrolledElementRef?: MutableRefObject<HTMLDivElement | null>;
  searchHeader?: boolean;
  historyHeader?: boolean;
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const gridElement = scrolledElementRef.current!;
  //     if (gridElement) {
  //       const { scrollTop, scrollHeight, clientHeight } = gridElement;
  //       const heightRemainToScroll = scrollHeight - scrollTop - clientHeight;
  //       const treshold = (scrollHeight - scrollTop) * 0.1;

  //       if (heightRemainToScroll <= treshold) {
  //         gridElement.removeEventListener('scroll', handleScroll);
  //         setPage?.((prevPage: number) => prevPage + 1);
  //       }
  //     }
  //   };

  //   const gridElement = scrolledElementRef.current!;
  //   if (gridElement) gridElement.addEventListener('scroll', handleScroll);

  //   return () => {
  //     if (gridElement) gridElement.removeEventListener('scroll', handleScroll);
  //   };
  // }, [setPage, scrolledElementRef]);

  const mutation = useMutation({
    mutationFn: () => {
      return addSearchHistory({ type: selected?.type, id: selected?.id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['myHistory'] });
    },
  });

  const handleCardClick = (object) => {
    setSelected((prevSelected) => (prevSelected?.id === object.id ? null : object));
    setIsProfileDrawerOpen(true);
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
      handleSelect: (resType: ResultsTypes) => handleCardClick({ ...result, type: resType }),
      isSelected: selected?.id === result.id,
    };

    switch (type ?? result.type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        contactsCardProps.type = 'entity';
        contactsCardProps.entityType = (result as EntitySearchResult).entityType;
        contactsCardProps.title = (result as EntitySearchResult).fullName;
        contactsCardProps.subTitle = (result as EntitySearchResult).jobTitle;
        contactsCardProps.image = (result as EntitySearchResult).pictures?.profile.url;
        return <EntityContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      case ResultsTypes.GROUP:
        contactsCardProps.type = 'group';
        contactsCardProps.title = (result as GroupSearchResult).name;
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
          ref={scrolledElementRef}
          sx={{
            maxHeight: '100%',
            overflowY: 'scroll',
            minWidth: '500px',
            '&::-webkit-scrollbar': { display: 'none' },
            m: '0 1.5rem 0 0.5rem',
            gap: 0.4,
          }}
        >
          {results.map(generateResultCard)}
        </Stack>
      </Box>
      <DrawerWrapper isOpen={isProfileDrawerOpen} setIsOpen={setIsProfileDrawerOpen} onClose={() => setSelected(null)}>
        {(props) =>
          type === ResultsTypes.GROUP
            ? selected && <GroupContact {...props} object={selected} />
            : selected && <UserContent {...props} object={selected} />
        }
      </DrawerWrapper>
    </>
  );
};
export default Results;
