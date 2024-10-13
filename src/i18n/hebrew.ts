import { ResultsTypes } from '../lib/enums';

export const hebrew = {
  systemName: 'LEGO',
  yes: 'כן',
  no: 'לא',
  hello: 'שלום',
  unknown: 'לא ידוע',
  search: 'חיפוש',
  save: 'שמירה',
  edit: 'עריכה',
  resultsType: {
    [ResultsTypes.ENTITY]: 'אנשי קשר',
    [ResultsTypes.GROUP]: 'היררכיות',
    [ResultsTypes.GOAL_USER]: 'חמל"ים',
  },
  historyHeader: 'חיפושים אחרונים',
};
