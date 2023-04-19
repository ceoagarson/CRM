import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import { TMachineBody } from "../types/production.type"
import { Machine } from "../models/machine.model.js"


// create Machine 
export const CreateMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { machine, category } = req.body as TMachineBody
    // validations
    if (!machine || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (await Machine.findOne({ machine: machine.toLowerCase().trim() }))
        return res.status(403).json({ message: `${machine} already exists` });

    let new_machine = new Machine({
        machine,
        category,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    await new_machine.save()
    return res.status(200).json({ message: "Machine created" })
})


export const UpdateMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { machine, category } = req.body as TMachineBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "machine id not valid" })
    // validations
    if (!machine || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (!await Machine.findById(id))
        return res.status(403).json({ message: `${machine} not exists` });
    await Machine.findByIdAndUpdate(id, {
        machine,
        category,
        updated_by: req.user?._id,
        updated_at: new Date(Date.now()),
    })
    return res.status(200).json({ message: "Machine updated" })
})

export const GetMachines = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let machines = await Machine.find().populate('updated_by').populate('created_by')
    return res.status(200).json(machines)
})

export const GetMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "machine id not valid" })
    let machine = await Machine.findById(id).populate('updated_by').populate('created_by')
    if (!machine)
        return res.status(404).json({ message: "this machine not exists" })
    return res.status(200).json(machine)

})

