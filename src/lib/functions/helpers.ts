export const handleKeyDown = (
  e: React.KeyboardEvent,
  index: number | null,
  setIndex: React.Dispatch<React.SetStateAction<number | null>>,
  options: { name: string }[],
  setValue: (value: string) => void,
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: () => void
) => {
  if (!options.length) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, options.length - 1)));
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setIndex((prev) => (prev === null ? options.length - 1 : Math.max(prev - 1, 0)));
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();

    if (index !== null && options[index]) {
      setValue(options[index].name);
    }

    setShowSuggestions(false);

    // Small delay to ensure the input updates before submitting
    setTimeout(onSubmit, 0);
  }
};
