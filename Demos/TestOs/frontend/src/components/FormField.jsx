const FormField = ({
  label,
  hint,
  id,
  name,
  type = "text",
  required,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  children,
  className = "",
}) => {
  const fieldId = id || name;

  return (
    <div className={`form-field ${error ? "form-field--error" : ""} ${className}`}>
      {label && (
        <label className="form-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      {hint && <p className="form-field__hint">{hint}</p>}
      {children || (
        <input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={onChange}
          className="form-field__input"
          aria-invalid={!!error}
        />
      )}
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  );
};

export default FormField;
