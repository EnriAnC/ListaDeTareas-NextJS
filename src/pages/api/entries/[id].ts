import { db } from '@/database'
import { Entry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message:'El id no es valido '+ id })
    }

    switch ( req.method ) {
        case 'DELETE':
            return deleteEntry( req, res );

        case 'PUT':
            return updateEntry( req, res );

        case 'GET':
            return getEntry( req, res )
    
        default:
            return res.status(400).json({ message:'Método no existe' });
    }

}

const getEntry = async ( req:NextApiRequest, res:NextApiResponse ) => {
    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById( id );

    if ( !entry ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada para ese ID: ' + id });
    }
    await db.disconnect()
    return res.status(200).json([entry])
    
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {
    const { id } = req.query;
    await db.connect();

    const entry = await Entry.deleteOne({_id:id})
    console.log(entry)
    if (entry.deletedCount <= 0){
        await db.disconnect();
        return res.status(400).json({ message: 'Error al eliminar el ID: ' + id });
    }

    await db.disconnect()
    return res.status(200).json(entry)
}

const updateEntry = async ( req:NextApiRequest, res:NextApiResponse ) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada para ese ID: ' + id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators:true, new:true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );
    } catch (error: any) {
        console.log(error);
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }

    
}