import { Button, Box, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext )
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

    const [ inputValue, setInputValue ] = useState('');
    const [ touched, setTouched ] = useState(false);

    const onTextFieldChange = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return
       
        addNewEntry(inputValue);
        setIsAddingEntry( false );
        setTouched( false );
        setInputValue('');
    }

    return ( 
        <Box sx={{ marginBottom: 2, paddingX: .5 }}>

            {
                isAddingEntry ? (
                    <>
                         <TextField 
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1}}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText ={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={ inputValue.length <= 0 && touched }
                            value={inputValue}
                            onChange={ onTextFieldChange }
                            onBlur={()=>setTouched(true)}/>

                        <Box display='flex' justifyContent='space-between'>
                            <Button variant='text' onClick={()=>setIsAddingEntry(false)}>
                                Cancelar
                            </Button>
                        
                            <Button variant='outlined'
                                color='secondary'
                                startIcon={<SaveIcon />}
                                onClick={onSave}>
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={()=>setIsAddingEntry(true)}
                        >
                        Agregar tarea
                    </Button>
                )
            }

           

            
        
        </Box>
     );
}
 