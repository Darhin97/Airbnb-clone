"use client";
import React from "react";

import Select from "react-select";
import useCountries from "../hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const { value, onChange } = props;

  const { getAll } = useCountries();
  return (
    <div>
      <Select
        isClearable
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: "#ffe4e6",
            primary: "black",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
