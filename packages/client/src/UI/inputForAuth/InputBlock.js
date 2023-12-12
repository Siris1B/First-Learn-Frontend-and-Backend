export default function InputBlock({
  lableHtmlFor,
  lableText,
  inputType,
  inputName,
  inputPlaceholder,
  inputValue,
  onChange,
  error,
}) {
  return (
    <div className="mt-1 lg:mt-2 xl:mt-3">
      <label
        htmlFor={lableHtmlFor}
        className="block text-xs sm:text-sm md:text-base mb-1 xl:mb-2"
      >
        {lableText}
      </label>
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        className="input input-bordered w-full input-xs sm:input-sm md:input-md lg:input-md"
        value={inputValue}
        onChange={onChange}
      />
      <div>{error}</div>
    </div>
  );
}
