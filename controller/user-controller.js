
import User from '../model/user-schema.js';


export const userSignup = async(request, response)=>{
   try{

    const exist = await User.findOne({username:request.body.username});
    if(exist){
        return response.status(401).json({message:'Username already exists'});
    }

    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    
    response.status(200).json({message:user});

   } catch(error){
    response.status(500).json({message:error.message});
   } 
}

export const userLogin = async(request, response)=>{
    try{
        const username = request.body.username;
        const password = request.body.password;

        let user= await User.findOne({username:username, password:password});
        if(user){
            return response.status(200).json({data:user});
        } else{
            return response.status(401).json({message:'Invalid login'});
        }
    } catch(error){
        response.status(500).json('Error', error.message);
    }
}
/*import User from '../model/user-schema.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

export const userSignup = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: 'Username already exists' });
    }

    const user = request.body;

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    const user = await User.findOne({ username: username });

    if (user && bcrypt.compareSync(password, user.password)) {
      return response.status(200).json({ message: `${username} login successful` });
    } else {
      return response.status(401).json({ message: 'Invalid login' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
*/
