import { IUser } from "./user.type"

export const MachineTypes = ["VER-1 (GF)", "VER-2 (GF)",
    "VER-3 (GF)", "VER-4 (GF)", "VER-5 (GF)",
    "VER-6 (GF)", "LYM-7", "LYM-8", "LYM-9",
    "VER-10 (GF)", "VER-11 (GF)", "VER-12 (SF)",
    "VER-13 (SF)", "VER-14 (SF)", "VER-15 (SF)",
    "VER-16 (SF)", "VER-17 (SF)", "GBOOT-18", "GBOOT-19", "PU MACHINE-20"]

export const machine_categories = ["A", "B", "C"]

export type IMachine = {
    _id: string, 
    name: string,
    category: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    // actions
    actions?: any
}
