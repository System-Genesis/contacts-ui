import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import { resultsTypeToIcon } from './resultsMenu';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { ContactsCard } from './ContactCard';
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import SearchHeader from './SearchHeader';

export const Results = ({
  type,
  results,
  count,
  setPage,
  scrolledElementRef,
}: {
  type: ResultsTypes;
  results: EntitySearchResult[] | GroupSearchResult[] | (EntitySearchResult | GroupSearchResult)[];
  count: number;
  setPage?: Dispatch<SetStateAction<number>>;
  scrolledElementRef: MutableRefObject<HTMLDivElement | null>;
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

  const generateResultCard = (result: EntitySearchResult | GroupSearchResult) => {
    const contactsCardProps: any = {
      id: result.id,
      hierarchy: result.hierarchy,
      jabberPhone: result.jabberPhone,
      mobilePhone: result.mobilePhone,
      tags: result.tags,
    };

    switch (type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        contactsCardProps.type = 'entity';
        contactsCardProps.entityType = (result as EntitySearchResult).entityType;
        contactsCardProps.title = (result as EntitySearchResult).fullName;
        contactsCardProps.subTitle = (result as EntitySearchResult).jobTitle;
        contactsCardProps.image = (result as EntitySearchResult).pictures?.profile.url;
        break;

      case ResultsTypes.GROUP:
        contactsCardProps.type = 'group';
        contactsCardProps.entityType = '';
        contactsCardProps.title = (result as GroupSearchResult).name;
        contactsCardProps.subTitle = (result as GroupSearchResult).entitiesCount;
        break;
      default:
        return;
    }
    return <ContactsCard {...contactsCardProps} />;
  };

  return (
    <Box sx={{ height: '100%' }}>
      <SearchHeader count={count} type={type} />
      <Stack
        ref={scrolledElementRef}
        sx={{
          rowGap: theme.spacing(1.5),
          paddingX: theme.spacing(3),
          maxHeight: '65vh',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {results.map(generateResultCard)}
      </Stack>
    </Box>
  );
};
export default Results;
