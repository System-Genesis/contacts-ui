const PreviousIcon = ({ color = '#FFFFFF' }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7034 21.6306C13.4322 21.3594 13.4322 20.9197 13.7034 20.6485L17.7262 16.6257L13.7034 12.6028C13.4322 12.3316 13.4322 11.8919 13.7034 11.6207C13.9746 11.3495 14.4143 11.3495 14.6855 11.6207L18.7083 15.6436C19.2507 16.186 19.2507 17.0653 18.7083 17.6077L14.6855 21.6306C14.4143 21.9018 13.9746 21.9018 13.7034 21.6306Z"
        fill={color}
        stroke={color}
        strokeWidth={0.3}
      />
    </svg>
  );
};

export default PreviousIcon;
