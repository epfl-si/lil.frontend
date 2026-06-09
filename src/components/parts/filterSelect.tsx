import {useTranslation} from 'react-i18next';
import type {Type} from "@/lib/types.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export const FilterSelect = (
  { placeholder, data, listName, value, setValue, disable }:
  {
    placeholder: string,
    data: Type[],
    listName: string,
    value: string | undefined,
    setValue: (value: string) => void
    disable?: boolean;
  }
) => {
  const { t } = useTranslation();

  return (
      <Select value={value ? value : ""}
            onValueChange={(val) => {
              setValue(val === "__all__" ? "" : val);
            }}
              disabled={disable}
      >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          <SelectItem value="__all__">
            {t(`app.all`)}
          </SelectItem>
          {data.map(rt =>
            <SelectItem value={rt.symbol} key={rt.symbol}>
              {t(`${listName}.${rt.symbol}`)} ({rt.shortName})
            </SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
