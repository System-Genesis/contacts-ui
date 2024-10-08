import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import { resultsTypeToIcon } from './resultsMenu';
import { EntitySearchResult, GroupSearchResult } from '../../../lib/types';
import { ContactsCard } from '../card/contactsCard';
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export const Results = ({
  type,
  results,
  count,
  setPage,
  scrolledElementRef,
}: {
  type?: ResultsTypes;
  results: EntitySearchResult[] | GroupSearchResult[] | (EntitySearchResult | GroupSearchResult)[];
  count?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  scrolledElementRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const gridElement = scrolledElementRef.current!;
      if (gridElement) {
        const { scrollTop, scrollHeight, clientHeight } = gridElement;
        const heightRemainToScroll = scrollHeight - scrollTop - clientHeight;
        const treshold = (scrollHeight - scrollTop) * 0.1;

        if (heightRemainToScroll <= treshold) {
          gridElement.removeEventListener('scroll', handleScroll);
          setPage?.((prevPage: number) => prevPage + 1);
        }
      }
    };

    const gridElement = scrolledElementRef.current!;
    if (gridElement) gridElement.addEventListener('scroll', handleScroll);

    return () => {
      if (gridElement) gridElement.removeEventListener('scroll', handleScroll);
    };
  }, [results, setPage, scrolledElementRef]);

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
    <Box sx={{ backgroundColor: theme.colors.grey, borderRadius: 6, height: '100%' }}>
      <Box sx={{ display: 'flex', padding: theme.spacing(4) }}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: theme.spacing(2), marginRight: theme.spacing(1) }}
        >{`נמצאו ${count} תוצאות בסינון `}</Typography>
        <img width={18} height={18} src={resultsTypeToIcon[type]} />
        <Typography
          sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: theme.spacing(2), marginLeft: theme.spacing(1) }}
        >
          {i18next.t(`resultsType.${type}`)}
        </Typography>
      </Box>
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
        {(results ?? []).map((result: EntitySearchResult | GroupSearchResult) => generateResultCard(result))}
      </Stack>
    </Box>
  );
};
export default Results;
