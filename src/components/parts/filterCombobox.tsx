import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.tsx";

export const FilterDebouncedInput = ({
  placeholder,
  value,
  onSearch,
  suggestions,
  disable,
}: {
  placeholder: string;
  value: string | null;
  onSearch: (searchTerm: string) => void;
  suggestions: string[];
  disable?: boolean;
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(localValue);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [localValue]);

  const listId = `suggestions-${placeholder.replace(/\s+/g, '-')}`;

  return (
    <>
      <Input
        type="text"
        list={listId}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={disable}
        className="w-1/2 m-1"
        placeholder={placeholder}
      />

      <datalist id={listId}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </>
  );
};
