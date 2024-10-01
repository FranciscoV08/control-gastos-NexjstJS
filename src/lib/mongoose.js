// Importamos mongodb
import mongoose from 'mongoose'

const connectDB = async () =>{

    try {
        if (mongoose.connection.readyState === 1) {
            // Significa que ya estamos conectados
            return;
        }else{
            // De lo contrario conectate a la db y devuelveme un obj
            const db = await mongoose.connect(process.env.MONGO_URL)
            console.log(db.connection.db.databaseName)

        }
    } catch (error) {
        console.log(error)
    }


}
export default connectDB