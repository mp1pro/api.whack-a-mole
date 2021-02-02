
const User = require('../models/user')

module.exports = {

  users: async () => {
    try {
       const usersFetched = await User.find().sort({ points: -1 }).limit(5);
        return usersFetched.map(user => {
            return { 
                ...user._doc, 
                _id: user.id, 
                createdAt: new Date(user._doc.createdAt).toISOString() }
        })
    }
    catch (error) {
        throw error
    }
    
 },

  createUser: async args => {
  try {
    const { email, points } = args.user;
    console.log('email',email,);
    const userFetched = await User.findOneAndUpdate(
        {email: {$eq : email}},
        {$set: {points: points}},
        {
            new: true,
            upsert: true 
        }
    );
    return userFetched;
    //return {userFetched};
    /*const user = new User({
        email, points
    })
    const newUser = await user.save();
    return { ...newUser._doc, _id: newUser.id }*/
  }
  catch (error) {
      throw error
  }

 }
} 
