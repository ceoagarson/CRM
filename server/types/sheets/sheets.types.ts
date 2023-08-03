export type ISheetUser={
    email:string,
    role:"viewer"|"editor"|"owner"
}
export type ISheet={
    sheet_name:string,
    sheet_users: ISheetUser[],
    sheet_url:string
}