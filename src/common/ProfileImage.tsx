import { routes } from '../api/routes';
import HierarchyIcon from '../assets/icons/hierarchyIcon.svg';
import GoalUserImage from '../assets/icons/goal-user-image.svg';

export const ProfileImage = ({ type, id, style }) => {
  if (type === 'group') {
    return <img src={HierarchyIcon} style={style} />;
  }

  if (type === 'goalUser') {
    return <img src={GoalUserImage} style={style} />;
  }

  return (
    <img
      src={`${routes.backend.pic}/${id}`}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = 'src/assets/icons/genericProfile.svg';
      }}
      style={style}
    />
  );
};
