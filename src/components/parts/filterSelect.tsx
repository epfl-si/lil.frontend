import {useTranslation} from 'react-i18next';
import type {Type} from "@/lib/types.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export const FilterSelect = (
  { placeholder, data, listName, value, setValue }:
  {
    placeholder: string,
    data: Type[],
    listName: string,
    value: string | null,
    setValue: (value: string) => void
  }
) => {
  const { t } = useTranslation();

  return (
    <Select value={value}
            onValueChange={(val) => {
              setValue(val)
            }}>
      <SelectTrigger className="w-1/2 m-1">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={null} key="undefined">
            {t(`app.reset`)}
          </SelectItem>
          {data.map(rt =>
            <SelectItem value={rt.symbol} key={rt.symbol}>
              {t(`${listName}.${rt.symbol}`)}
            </SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
