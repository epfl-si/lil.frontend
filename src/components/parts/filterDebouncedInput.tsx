import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover.tsx";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command.tsx";

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
  const [open, setOpen] = useState(false);
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

  return (
    <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
      <div className="w-1/2 m-1">
        <PopoverAnchor asChild>
          <Input
            type="text"
            value={localValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocalValue(e.target.value);
              setOpen(true);
            }}
            disabled={disable}
            className="w-full"
            placeholder={placeholder}
          />
        </PopoverAnchor>

        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandGroup>
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={`${suggestion}-${index}`}
                    value={suggestion}
                    onSelect={(currentValue) => {
                      setLocalValue(currentValue);
                      onSearch(currentValue);
                      setOpen(false);
                    }}
                    className="cursor-pointer data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
};
