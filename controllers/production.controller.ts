import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import { IProduction, TProductionBody } from "../types/production.type"
import { Machine } from "../models/machine.model.js"
import { Production } from "../models/production.model.js"

type IMachineWiseReport = {
    date: Date,
    machines: {
        machine: string,
        production: number
    }[]
}

type ICategoryWiseReport = {
    date: Date,
    categories: {
        category: string,
        production: number
    }[]
}
// create Production 
export const CreateProduction = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { production, created_at } = req.body as TProductionBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "machine id not valid" })
    console.log(req.body)
    // validations
    if (!created_at)
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
    let productions=machine.productions
    productions.push(new_Production)
    machine.productions = productions
    await machine.save()
    await new_Production.save()
    return res.status(200).json({ message: "New Production created" })
})


export const GetProductions = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let productions = await Production.find().populate("machine").populate("created_by").populate('updated_by')
    return res.status(200).json(productions)
})


export const GetProductionsByDate = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let date=req.query.date
    if(!date)
        return res.status(400).json({ message: "provide date" })
    let productions = await Production.find({created_at:date}).populate("machine").populate("created_by").populate('updated_by')
    return res.status(200).json(productions)
})


export const GetProductionsByMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    let productions: IProduction[] = await Production.find().populate("machine").populate("created_by").populate('updated_by').find({
        created_at: { $gte: startDate, $lte: endDate },
    }).sort({ created_at: 'asc' })
    const report: IMachineWiseReport[] = []
    if (productions.length) {
        let prevDate = productions[0].created_at
        let machines: IMachineWiseReport['machines'] = []
        // let reportIndex = 0
        // productions.map((production,index) => {
        //     if (String(prevDate) === String(production.created_at)) {
        //         machines.push({ machine: production.machine.name, production: production.production })
        //         console.log(index,production.name.machine)
        //     }
        //     else{
        //         machines=[]
        //         report[reportIndex]={
        //             date:prevDate,
        //             machines:machines
        //         }
        //         reportIndex++
        //         prevDate=production.created_at
        //         console.log("running")
        //     }
        // })
    }
    return res.status(200).json(report)
})



export const GetProductionsByCategory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    console.log(startDate, endDate)
    let productions = await Production.find().populate("machine").populate("created_by").populate('updated_by').find({
        created_at: { $gte: startDate, $lte: endDate },
    }).sort({ created_at: 'asc' })
    const report: ICategoryWiseReport[] = []
    return res.status(200).json(report)
})
