import { Box, Stack, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { HistoryHeader, SearchHeader } from './Header';
import { EntityContactsCard } from './EntityContactCard';
import { GroupContactsCard } from './GroupContactCard';

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

  const generateResultCard = (result) => {
    const contactsCardProps: any = {
      id: result.id,
      hierarchy: result.hierarchy,
      jabberPhone: result.jabberPhone,
      mobilePhone: result.mobilePhone,
      tags: result.tags,
      mails: result.mails,
      chats: result.chats,
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
        contactsCardProps.subTitle = (result as GroupSearchResult).entitiesCount;
        return <GroupContactsCard key={result.id} {...contactsCardProps} isHistory={historyHeader} />;

      default:
        return <h1>no type!!!!</h1>;
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {searchHeader && <SearchHeader count={count!} type={type!} />}
      {historyHeader && <HistoryHeader />}

      <Stack
        ref={scrolledElementRef}
        sx={{
          maxHeight: '100%',
          overflowY: 'scroll',
          width: searchHeader ? '59vw' : '62vw',
          minWidth: '500px',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {results.map(generateResultCard)}
      </Stack>
    </Box>
  );
};
export default Results;
