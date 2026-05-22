import { useState } from "react";
import { FilterDebouncedInput } from "@/components/parts/filterCombobox";

interface SmartAutocompleteProps {
  placeholder: string;
  value: string | null;
  onChange: (val: string) => void;

  fetchData?: (searchTerm: string) => Promise<string[]>;

  disable?: boolean;
  isAutoComplete?: boolean;
}

export const SearchFieldAutoComplete = ({
  placeholder,
  value,
  onChange,
  fetchData,
  disable,
  isAutoComplete
}: SmartAutocompleteProps) => {

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async (searchTerm: string) => {
    onChange(searchTerm);

    if (isAutoComplete && fetchData && searchTerm.length >= 2) {
      try {
        const results = await fetchData(searchTerm);
        setSuggestions(results);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <FilterDebouncedInput
      placeholder={placeholder}
      value={value}
      onSearch={handleSearch}
      suggestions={suggestions}
      disable={disable}
    />
  );
};
