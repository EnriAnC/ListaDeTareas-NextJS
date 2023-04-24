import { ChangeEvent, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";

import { Layout } from "@/components/layouts";

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import { dbEntries } from "@/database";
import { Entry, EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utils";




const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props{
    entry: Entry
}

const EntryPage:React.FC<Props> = ( { entry } ) => {

    const { updateEntry } = useContext( EntriesContext )

    const [ inputValue, setInputValue ] = useState(entry.description);
    const [ status, setStatus ] = useState<EntryStatus>(entry.status);
    const [ touched, setTouched ] = useState(false);

    const isNotValid = useMemo(()=> inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChanged = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = ( event:ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {
        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry, 
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true ) 
    }


    return ( 
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid container justifyContent='center'
            sx={{ marginTop: 2}}>
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader title={`Entrada: ${ inputValue }`}
                            subheader={`Creado ${ dateFunctions.getFormarDistanceToNow( entry.createdAt )}`}

                        />

                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={inputValue}
                                onChange={onInputValueChanged}
                                onBlur={ () => setTouched(true)}
                                helperText={ isNotValid && 'Ingrese un valor'}
                                error={ isNotValid }
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={ status }
                                    onChange={ onStatusChanged }
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel key={ option }
                                            control={<Radio />}
                                            value={ option }
                                            label={ capitalize(option) }/>
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button startIcon={<SaveIcon />}
                                variant="contained"
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }>
                                Guardar
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>
            </Grid>

            <IconButton sx={{
                position:'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}>
                <DeleteIcon />
            </IconButton>

        </Layout>
     );
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if ( !entry){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props:{
            entry
        }
    }
}
 
export default EntryPage;