import { List, Paper } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { useContext, useMemo } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css'
interface Props{
    status : EntryStatus;
}

export const EntryList: React.FC<Props> = ( { status }) => {

    const { entries, updateEntry} = useContext( EntriesContext );
    const { isDragging, endDragging } = useContext( UIContext );

    const entriesByStatus = useMemo(()=>entries.filter( entry => entry.status === status), [entries])

    const allowDrop = (event:React.DragEvent) => { 
        event.preventDefault()
    }

    const onDropEntry = (event:React.DragEvent) => {
        const id = event.dataTransfer.getData('text')
        
        const entry = entries.find( e => e._id === id )!;
        entry.status = status
        updateEntry( entry )
        endDragging()
    }

    return ( 
        <div onDrop={ onDropEntry }
            onDragOver={ allowDrop } //Permite habilitar el bloque para el drop
            className={isDragging ? styles.dragging : ''}>

            <Paper sx={{height: 'calc(100vh - 13rem)', 
                overflow:'auto', 
                backgroundColor:'transparent', 
                padding: 2}}
            >

                <List sx={{ opacity: isDragging ? 0.25 : 1, transition: 'all 0.3s ' }}>
                    { entriesByStatus.map( entry => (
                        <EntryCard key={entry._id} entry={entry}/>
                    ))}
                </List> 

            </Paper>

        </div>
     );
}
 