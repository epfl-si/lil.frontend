import { useState } from "react";
import { FilterDebouncedInput } from "@/components/parts/filterDebouncedInput";

interface SmartAutocompleteProps<T> {
  placeholder: string;
  value: string | null;
  onChange: (val: string) => void;
  fetchData?: (searchTerm: string) => Promise<T[]>;
  getDisplayValue: (item: T) => string;
  onSelectItem?: (item: T) => void;
  disable?: boolean;
  isAutoComplete?: boolean;
}

export const SearchFieldAutoComplete = <T,>({
  placeholder,
  value,
  onChange,
  fetchData,
  getDisplayValue,
  onSelectItem,
  disable,
  isAutoComplete
}: SmartAutocompleteProps<T>) => {

  const [rawSuggestions, setRawSuggestions] = useState<T[]>([]);

  const handleSearch = async (searchTerm: string) => {
    onChange(searchTerm);

    const matchedItem = rawSuggestions.find(item => getDisplayValue(item) === searchTerm);

    if (matchedItem && onSelectItem) {
      onSelectItem(matchedItem);
    }
    if (isAutoComplete && fetchData && searchTerm.length >= 2) {
      try {
        const results = await fetchData(searchTerm);
        setRawSuggestions(results);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        setRawSuggestions([]);
      }
    } else {
      setRawSuggestions([]);
    }
  };

  return (
    <FilterDebouncedInput
      placeholder={placeholder}
      value={value}
      onSearch={handleSearch}
      suggestions={rawSuggestions.map(getDisplayValue)}
      disable={disable}
    />
  );
};
