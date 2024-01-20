const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const counterIncrementor = require('../../utils/counterIncrementer');

const productSchema = mongoose.Schema(
	{
		
		name: {
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		packSize:{
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		productImageUrl: {
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		
		price: {
			type: Number,
			default: 0,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		seqId: {
			type: Number
		},
		category:{
			type: String,
			trim: true,
			default: '',
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.pre('save', async function (next) {
	const product = this;

	product.seqId = await counterIncrementor('Product')
	next();
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
