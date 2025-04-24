const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="contextWrapper">
      {label}
      <input
        type="text"
        placeholder={placeholder || undefined}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default InputField;
