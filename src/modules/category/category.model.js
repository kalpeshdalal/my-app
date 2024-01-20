const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const counterIncrementor = require('../../utils/counterIncrementer');

const categorySchema = mongoose.Schema(
	{
		
		name: {
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		description:{
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
            required:true,
		},
		seqId: {
			type: Number
		}
		
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.pre('save', async function (next) {
	const category = this;

	category.seqId = await counterIncrementor('Category')
	next();
});



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

