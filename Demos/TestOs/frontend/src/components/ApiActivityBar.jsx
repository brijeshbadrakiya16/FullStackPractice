import { useApiActivity } from "../customHooks/useApiActivity";

const ApiActivityBar = () => {
  const { isActive } = useApiActivity();
  return <div className={`api-activity-bar ${isActive ? "api-activity-bar--active" : ""}`} aria-hidden="true" />;
};

export default ApiActivityBar;
