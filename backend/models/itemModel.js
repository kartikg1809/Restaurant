import mongoose from 'mongoose';

const itemSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    isAvailable:{
        type: Boolean,
        default: true,
    },
    category:{
        type: String,
        required: true,
        enum: ['Appetizers', 'Main Courses','Desserts','Drinks'],
    },
    image:{
        type: String,
        default: 'https://media.assettype.com/tnm%2Fimport%2Fsites%2Fdefault%2Ffiles%2FTheBigFatBao_Instagram_16062021_1200_0.jpeg?w=1200&auto=format%2Ccompress&fit=max',
    },
    isVeg:{
        type: Boolean,
        required: true,
    }
},{timestamps:true});

const Item=mongoose.model('Item',itemSchema);

export default Item;
