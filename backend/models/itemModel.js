import mongoose from 'mongoose';

const itemSchema=new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
        unique: true,
    },
    price:{
        type: 'number',
        required: true,
    },
    isAvailable:{
        type: 'boolean',
        default: true,
    },
    category:{
        type: 'string',
        required: true,
    },
    image:{
        type: 'string',
        default: 'https://media.assettype.com/tnm%2Fimport%2Fsites%2Fdefault%2Ffiles%2FTheBigFatBao_Instagram_16062021_1200_0.jpeg?w=1200&auto=format%2Ccompress&fit=max',
    },
    isVeg:{
        type: 'boolean',
        required: true,
    }
},{timestamps:true});

const Item=mongoose.model('Item',itemSchema);

export default Item;
