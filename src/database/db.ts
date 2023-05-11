import mongoose from 'mongoose';

/**
 * 0=disconnected
 * 1=connecteed
 * 2=connecting
 * 3=disconnecting
 */


const mongoConection = {
    isConnected: 0,
}

export const connect = async () => {
    if (mongoConection.isConnected){ // si mongoConnection.isConnected === 1
        console.log('Ya estabamos conectados')
        return
    }

    if ( mongoose.connections.length > 0 ){ // Si existen conexiones activas
        mongoConection.isConnected = mongoose.connections[0].readyState
        if (mongoConection.isConnected === 1){
            console.log('Usando conexión anterior')
            return
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConection.isConnected = 1;
    console.log('Conectado a MongoDB')
}

export const disconnect = async() => {

    if (process.env.NODE_ENV === 'development') return

    if (mongoConection.isConnected === 0 ) return

    await mongoose.disconnect()
    mongoConection.isConnected = 0;
    console.log('Desconectado de MongoDB')
}