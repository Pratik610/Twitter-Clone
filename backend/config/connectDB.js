import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://Pratik:Pratik@777@twitter-clone.kcxj8.mongodb.net/Twitter-Clone?retryWrites=true&w=majority',
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			}
		)
		console.log(`Db Connected ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error : ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
