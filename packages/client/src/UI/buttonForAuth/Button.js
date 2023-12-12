export default function Button({ type = null, buttonText, onClick = null }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-primary mt-3 w-full btn-xs sm:btn-sm md:btn-md"
    >
      {buttonText}
    </button>
  );
}
