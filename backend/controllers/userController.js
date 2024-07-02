import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';

export const signup=async(req,res,next)=>{
    const {email,password,role}=req.body;
    
    try {
        let user = await User.findOne({ email });
    
        if (user) {
          const isMatch = await bcryptjs.compare(password, user.password);
          if (isMatch) {
            const token = jwt.sign({ id: user._id},process.env.JWT_SECRET);
            const { password: pass , ...rest}=user._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);    
            return res.status(200).json({ token });
          } else {
            return next(errorHandler(401,"Wrong credentials"));
        }
        }
    
        const hashPass = bcryptjs.hashSync(password, 10);
        user = new User({ email, password: hashPass, role });
        await user.save();
        const token = jwt.sign({ id: user._id},process.env.JWT_SECRET);
        const { password: pass , ...rest}=user._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);    
      } catch (error) {
        next(error);
      }
}

export const signout = (req, res,next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }
}