export function TextInput({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  min,
  max,
  className = '',
}) {
  return (
    <input
      type={type}
      name={name}
      min={min}
      max={max}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-royal-heading shadow-sm shadow-black/5 transition focus:border-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold/40 dark:border-white/10 dark:bg-white/10 dark:text-royal-white ${className}`.trim()}
    />
  );
}

export function SelectInput({
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  className = '',
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-royal-heading shadow-sm shadow-black/5 transition focus:border-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold/40 dark:border-white/10 dark:bg-white/10 dark:text-royal-white ${className}`.trim()}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function TextArea({
  name,
  rows = 4,
  placeholder,
  value,
  onChange,
  required,
  className = '',
}) {
  return (
    <textarea
      name={name}
      rows={rows}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-royal-heading shadow-sm shadow-black/5 transition focus:border-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold/40 dark:border-white/10 dark:bg-white/10 dark:text-royal-white ${className}`.trim()}
    />
  );
}
