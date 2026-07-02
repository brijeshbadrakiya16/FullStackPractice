const Spinner = ({ size = "md" }) => {
  return <div className={`spinner spinner--${size}`} aria-label="Loading" />;
};

export default Spinner;
