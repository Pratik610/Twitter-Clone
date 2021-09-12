import connectDB from './config/connectDB.js'
import User from './models/UserModel.js'

const userdata = {
	name: 'Pratik',
	email: 'pratik@test.com',
	atTheRate: '@pratik',
	DOB: '06-10-2000',
	password: '123456',
	isAdmin: true,
}

connectDB()

const importData = async () => {
	try {
		User.deleteMany()
		const createdUser = await User.create(userdata)
		console.log('Data Imported')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

importData()
