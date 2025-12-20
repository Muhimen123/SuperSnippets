export default function TextField({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  ...props 
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
        {...props}
      />
    </div>
  );
}