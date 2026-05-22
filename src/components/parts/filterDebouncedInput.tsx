import { useState, useEffect, useRef } from "react";
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
  const isInitialMount = useRef(true);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (localValue !== (value || "")) {
        onSearch(localValue);
      }
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
