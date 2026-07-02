const ErrorState = ({ message, onRetry, title = "Something went wrong" }) => {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon">⚠️</div>
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button className="btn btn--secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
