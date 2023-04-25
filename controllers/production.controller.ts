import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import { IProduction, TProductionBody } from "../types/productions/production.type.js"
import { Machine } from "../models/productions/machine.model.js"
import { Production } from "../models/productions/production.model.js"
import { TMachineBody } from "../types/productions/machine.types.js"
import { Category } from "../models/productions/category.model.js"
import { TCategoryBody } from "../types/productions/category.types.js"


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
    await new_Production.save()
    return res.status(200).json({ message: "New Production created" })
})


export const GetProductionsByDate = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let date = req.query.date
    if (!date)
        return res.status(400).json({ message: "provide date" })
    let productions = await Production.find({ created_at: date }).populate("created_by").populate('updated_by').populate({
        path: 'machine',
        populate: [
            {
                path: 'category',
                model: 'Category'
            }
        ]
    })
    return res.status(200).json(productions)
})

export const GetProductionsByDateRange = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    let productions: IProduction[] = await Production.find().populate("created_by").populate('updated_by').find({
        created_at: { $gte: startDate, $lte: endDate },
    }).sort({ created_at: 'asc' }).populate({
        path: 'machine',
        populate: [
            {
                path: 'category',
                model: 'Category'
            }
        ]
    })
    return res.status(200).json(productions)
})

export const CreateMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body as TMachineBody
    // validations
    if (!name || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (await Machine.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });
    let check_category = await Category.findOne({ category: category })
    if (!check_category)
        return res.status(403).json({ message: `category ${category} not exists` });

    let new_name = new Machine({
        name,
        category: check_category,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    await new_name.save()
    return res.status(200).json({ message: "machine created" })
})


export const UpdateMachine = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body as TMachineBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "name id not valid" })
    // validations
    if (!name || !category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (!await Machine.findById(id))
        return res.status(403).json({ message: `machine ${name} not exists` });
    let check_category = await Category.findOne({ category: category })
    if (!check_category)
        return res.status(403).json({ message: `category ${category} not exists` });

    await Machine.findByIdAndUpdate(id, {
        name,
        category: check_category,
        updated_by: req.user?._id,
        updated_at: new Date(Date.now()),
    })
    return res.status(200).json({ message: "machine updated" })
})

export const GetMachines = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let names = await Machine.find().populate('category').populate('updated_by').populate('created_by')
    return res.status(200).json(names)
})

// create category 
export const CreateCategory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body as TCategoryBody
    // validations
    if (!category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (await Category.findOne({ category: category.toLowerCase().trim() }))
        return res.status(403).json({ message: `${category} already exists` });

    let new_category = new Category({
        category,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    await new_category.save()
    return res.status(200).json({ message: "category created" })
})


export const UpdateCategory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body as TCategoryBody
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "category id not valid" })
    // validations
    if (!category)
        return res.status(400).json({ message: "fill all the required fields" });

    if (!await Category.findById(id))
        return res.status(403).json({ message: `${category} not exists` });
    await Category.findByIdAndUpdate(id, {
        category,
        updated_by: req.user?._id,
        updated_at: new Date(Date.now()),
    })
    return res.status(200).json({ message: "category updated" })
})

export const GetCategories = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let categories = await Category.find().populate('updated_by').populate('created_by')
    return res.status(200).json(categories)
})

