import { useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { enqueueSnackbar } from 'notistack';


export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props{
    children: React.ReactElement;
}

export const EntriesProvider:React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async (description:string) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description })
        
        dispatch({type:'[Entry] - Add-Entry', payload: data});

    }

    const updateEntry = async ({_id, description, status}: Entry, showSnackBar = false ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type:'[Entry] - Entry-Updated', payload: data });

            if ( showSnackBar ){
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'right'
                    }
                })
            }
            
        } catch (error) {
            console.log({error})
        }
        
    } 

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh-Data', payload:data  })
        
    }

    useEffect(()=>{
        refreshEntries()
    },[])

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry
        }}> 
            { children } 
        </EntriesContext.Provider>
    )
}