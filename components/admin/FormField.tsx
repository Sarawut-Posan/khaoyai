import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'textarea' | 'number' | 'url' | 'tel' | 'email';
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  rows?: number;
  min?: number;
  max?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  helperText,
  rows = 3,
  min,
  max,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === 'number') {
      onChange(parseInt(e.target.value) || 0);
    } else {
      onChange(e.target.value);
    }
  };

  const baseInputClasses = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent transition-colors ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-charcoal mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          className={baseInputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          className={baseInputClasses}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      )}

      {helperText && !error && (
        <p className="mt-1 text-xs text-charcoal/60">{helperText}</p>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
