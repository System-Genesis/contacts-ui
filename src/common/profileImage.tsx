import HierarchyIcon from '../assets/icons/hierarchyIcon.svg';
import GoalUserImage from '../assets/icons/goal-user-image.svg';
import maleAvatar from '../assets/icons/avatarMale.svg';
import femaleAvatar from '../assets/icons/avatarFemale.svg';
import { useQuery } from '@tanstack/react-query';
import { getPicByIdentifier } from '../services/userService';

export const ProfileImage = ({
  type,
  identifier,
  style = {},
  onClick = () => ({}),
  sex,
}: {
  id: string;
  style?: object;
  type: 'group' | 'goalUser' | 'entity';
  onClick?: () => void;
  sex?: 'זכר' | 'נקבה';
  identifier?: string;
}) => {
  const { data: pic } = useQuery({
    queryKey: ['getPicByID', identifier],
    queryFn: () => getPicByIdentifier(identifier!),
    enabled: !!identifier,
    retry: false,
    staleTime: Infinity,
  });

  if (type === 'group') return <img src={HierarchyIcon} style={style} onClick={onClick} />;
  if (type === 'goalUser') return <img src={GoalUserImage} style={style} onClick={onClick} />;

  return (
    <img
      src={pic ?? (sex === 'נקבה' ? femaleAvatar : maleAvatar)}
      style={{ ...style, borderRadius: '100%', objectFit: 'cover' }}
      onClick={onClick}
    />
  );
};
