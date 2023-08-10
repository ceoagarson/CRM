import React, { createContext, useState } from "react";

export type PaginationData = { limit: number, page: number, total?: number }

// Paginationcontext
type Context = {
    paginationData: PaginationData,
    setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>
};
export const PaginationContext = createContext<Context>({
    paginationData: { limit: 10, page: 1 },
    setPaginationData: () => null,
});

// Pagination provider
export function PaginationProvider(props: { children: JSX.Element }) {
    const [paginationData, setPaginationData] = useState<PaginationData>({ limit: 10, page: 1 });
    return (
        <PaginationContext.Provider value={{ paginationData, setPaginationData }}>
            {props.children}
        </PaginationContext.Provider>
    );
}




