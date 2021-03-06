var mongoose = require('mongoose'), 
		Schema = mongoose.Schema;

var homeSchema = new Schema({
	objectId: Schema.Types.ObjectId,
	title: String,
	bannerImg: Array,
	companyInfo: {
		cn: String,
		en: String
	},
	products: [
		{
			area: String,
			country: String,
			types: String,
			name: String,
			enName: String,
			intros: String,
			date: { type: Date, default: Date.now },
			smallImage: {
				name: String,
				url: String
			},
			largerImage: {
				name: String,
				url: String
			},
			listImage: {
				name: String,
				url: String
			}
		}
	],
	productsClassic: {
		'美国': [
			{
				area: String,
				country: String,
				types: String,
				name: String,
				enName: String,
				intros: String,
				smallImage: {
					name: String,
					url: String
				},
				largerImage: {
					name: String,
					url: String
				},
				listImage: {
					name: String,
					url: String
				}
			}
		],
		'法国': [
			{
				area: String,
				country: String,
				types: String,
				name: String,
				enName: String,
				intros: String,
				smallImage: {
					name: String,
					url: String
				},
				largerImage: {
					name: String,
					url: String
				},
				listImage: {
					name: String,
					url: String
				}
			}
		],
		'意大利': [
			{
				area: String,
				country: String,
				types: String,
				name: String,
				enName: String,
				intros: String,
				smallImage: {
					name: String,
					url: String
				},
				largerImage: {
					name: String,
					url: String
				},
				listImage: {
					name: String,
					url: String
				}
			}
		],
		'其他': [
			{
				area: String,
				country: String,
				types: String,
				name: String,
				enName: String,
				intros: String,
				smallImage: {
					name: String,
					url: String
				},
				largerImage: {
					name: String,
					url: String
				},
				listImage: {
					name: String,
					url: String
				}
			}
		]
	},
	actives: [
		{
			titleFirst: String,
			titleSecond: String,
			listImg: {
				name: String,
				url: String
			},
			detailImg: [
				{
					name: String,
					url: String
				}
			],
			date: { type: Date, default: Date.now }
		}
	],
	notices: [
		{
			title: String,
			content: String,
			date: { type: Date, default: Date.now }
		}
	],
	user: [
		{
			account: String,
			pass: String
		}
	],
	message: [
		{
			contacts: String,
			tel: String,
			email: String,
			comments: String,
			date: { type: Date, default: Date.now }
		}
	],
	recruitment: [
		{
			name: String,
			zhize: String,
			zige: String,
			date: { type: Date, default: Date.now }
		}
	]
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('redwines', homeSchema);