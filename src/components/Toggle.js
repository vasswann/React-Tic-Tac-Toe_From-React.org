const Toggle = ({ onToggle, button }) => {
  return (
    <>
      <button className='history-button toggle' onClick={onToggle}>
        {button}
      </button>
    </>
  );
};

export default Toggle;
