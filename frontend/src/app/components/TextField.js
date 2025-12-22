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
    <div className={`relative ${className}`}>
      <div className="bg-white border border-black rounded-lg px-3 py-2 h-16">
        <label className="block text-xs font-medium text-black mb-1">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-none outline-none text-sm text-black placeholder-gray-500"
          {...props}
        />
      </div>
    </div>
  );
}