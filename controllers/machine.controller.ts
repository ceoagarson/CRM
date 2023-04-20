import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import { TMachineBody } from "../types/production.type"
import { Machine } from "../models/machine.model.js"


// create name 
export const CreateMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body as TMachineBody
    // validations
    if (!name || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (await Machine.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });

    let new_name = new Machine({
        name,
        category,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    await new_name.save()
    return res.status(200).json({ message: "machine created" })
})


export const UpdateMachine= catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body as TMachineBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "name id not valid" })
    // validations
    if (!name || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (!await Machine.findById(id))
        return res.status(403).json({ message: `${name} not exists` });
    await Machine.findByIdAndUpdate(id, {
        name,
        category,
        updated_by: req.user?._id,
        updated_at: new Date(Date.now()),
    })
    return res.status(200).json({ message: "machine updated" })
})

export const GetMachines = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let names = await Machine.find().populate('updated_by').populate('created_by')
    return res.status(200).json(names)
})


