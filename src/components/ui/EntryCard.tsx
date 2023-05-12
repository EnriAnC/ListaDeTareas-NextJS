import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import { dateFunctions } from "@/utils";
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

interface Props{
    entry: Entry
}

export const EntryCard:React.FC<Props> = ({entry}) => {

    const router = useRouter()

    const { startDragging, endDragging } = useContext( UIContext )

    const onDragStart = ( event: React.DragEvent ) => {
        
        event.dataTransfer.setData('text', entry._id)
        startDragging()

        // todo: Modificar el estado, para indicar que estoy haciendo drag
    }

    const onDragEnd = ( event: React.DragEvent ) => {
        endDragging()
    } 
    
    const onClick = () =>{
        router.push(`/entries/${ entry._id }`)
    }

    return ( 
        <Card sx={{marginBottom: 1}} 
        draggable
        onDragStart={ onDragStart }
        onDragEnd={ onDragEnd }
        onClick={ onClick }>
            {/* Eventos drag */}

            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line'}}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{display:'flex', justifyContent:'end', paddingRight: 2}}>
                    <Typography variant='body2'>
                        { dateFunctions.getFormarDistanceToNow(entry.createdAt) }
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
     );
}
 