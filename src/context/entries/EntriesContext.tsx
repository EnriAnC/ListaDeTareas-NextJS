import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    entries: Entry[];

    // Methods
    addNewEntry: (description:string) => void;
    updateEntry: (entry:Entry, showSnackBar?: boolean) => void;
    deleteEntry: (id: string, showSnackBar?: boolean) => void;
}

// 1. Creación del contexto
export const EntriesContext = createContext({} as ContextProps); // Aserción de tipo

// el createContext puede recibir un objeto de tipo any, 
// por tanto es asertable a cualquier tipo.
// Sin embargo es beneficioso prevenir y tipear los métodos y propiedades que luego de usarán.