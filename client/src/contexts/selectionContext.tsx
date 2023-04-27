import React, { createContext, useState } from "react";
import { Row } from "react-table";

export type Selection = Row<any>[] | Row<any>[]

// Selectioncontext
type Context = {
    selectedRows: Selection,
    setSelectedRows: React.Dispatch<React.SetStateAction<Selection>>
};
export const SelectionContext = createContext<Context>({
    selectedRows: [],
    setSelectedRows: () => null,
});


// Selection provider
export function SelectionProvider(props: { children: JSX.Element }) {
    const [selectedRows, setSelectedRows] = useState<Selection>([]);
    return (
        <SelectionContext.Provider value={{ selectedRows, setSelectedRows }}>
            {props.children}
        </SelectionContext.Provider>
    );
}




