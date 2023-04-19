import React, { createContext, useState } from "react";

export type Filter = {
    key: string,
    value: string
}[]

// Filtercontext
type Context = {
    filter: Filter,
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
};
export const FilterContext = createContext<Context>({
    filter: [],
    setFilter: () => null,
});


// Filter provider
export function FilterProvider(props: { children: JSX.Element }) {
    const [filter, setFilter] = useState<Filter>([]);
    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {props.children}
        </FilterContext.Provider>
    );
}




