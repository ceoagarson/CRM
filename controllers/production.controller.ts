import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import { TProductionBody } from "../types/production.type"
import { Machine } from "../models/machine.model.js"
import { Production } from "../models/production.model.js"


// create Production 
export const CreateProduction = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { production, created_at } = req.body as TProductionBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "machine id not valid" })

    // validations
    if (!production || !created_at)
        return res.status(400).json({ message: "fill all the required fields" });

    let machine = await Machine.findById(id)
    if (!machine)
        return res.status(404).json({ message: `machine not found` });

    let checked_production = await Production.findOne({ created_at: created_at, machine: machine._id })
    if (checked_production) {
        await Production.findByIdAndUpdate(checked_production.id, {
            production,
            updated_by: req.user,
            updated_at: new Date(Date.now()),
        })
        return res.status(200).json({ message: "Production updated" })
    }

    let new_Production = new Production({
        production,
        machine,
        created_at,
        created_by: req.user,
        updated_by: req.user,
        updated_at: new Date(Date.now()),
    })
    await new_Production.save()
    return res.status(200).json({ message: "Production created" })
})



export const GetProductions = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let productions = await Production.find().populate("machine").populate("created_by").populate('updated_by')
    return res.status(200).json(productions)
})

export const GetProduction = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "Production id not valid" })
    let production = await Production.findById(id).populate("Machine").populate("created_by").populate('updated_by')
    if (!Production)
        return res.status(404).json({ message: "this production not exists" })
    return res.status(200).json(production)

})

export const GetProductionsByDateRange = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const startdate = req.query.startdate
    const endDate = req.query.endDate
    let productions = await Production.find().populate("Machine").populate("created_by").populate('updated_by').find({
        created_at: { $gte: startdate, $lte: endDate },
    }).sort({ created_at: 'asc' })
    return res.status(200).json(productions)
})


