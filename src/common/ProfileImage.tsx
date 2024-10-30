import HierarchyIcon from '../assets/icons/hierarchyIcon.svg';
import GoalUserImage from '../assets/icons/goal-user-image.svg';
import ProfileExampleIcon from '../assets/icons/profileExample.svg';
import { useQuery } from '@tanstack/react-query';
import { getPicByID } from '../services/userService';

export const ProfileImage = ({
  type,
  id,
  style = {},
  onClick = () => ({}),
}: {
  id: string;
  style?: object;
  type: 'group' | 'goalUser' | 'entity';
  onClick?: () => void;
}) => {
  const { data: pic } = useQuery({
    queryKey: ['getPic', id],
    queryFn: () => getPicByID({ id }),
    enabled: !!id,
  });

  if (type === 'group') return <img src={HierarchyIcon} style={style} onClick={onClick} />;
  if (type === 'goalUser') return <img src={GoalUserImage} style={style} onClick={onClick} />;

  return <img src={pic ?? ProfileExampleIcon} style={{ ...style, borderRadius: '100%' }} onClick={onClick} />;
};
