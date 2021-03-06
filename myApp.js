require('dotenv').config();
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		age: Number,
		favoriteFoods: [String],
		title: String, // String is shorthand for {type: String}
		author: String,
		body: String,
		comments: [{ body: String, date: Date }],
		date: { type: Date, default: Date.now },
		hidden: Boolean,
		meta: {
			votes: Number,
			favs: Number,
		},
	},
	{ timestamps: true }
);

const Person = mongoose.model('Person', personSchema);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const createAndSavePerson = (done) => {
	var person = new Person({
		name: 'Jasmin Adilovic',
		age: 43,
		favoriteFoods: ['eggs', 'fish', 'fresh fruit'],
	});
	person.save(function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const arrayOfPeople = [
	{
		name: 'Jasmin Adilovic',
		age: 43,
		favoriteFoods: ['eggs', 'fish', 'fresh fruit'],
	},
	{
		name: 'Jasmin Adilovic',
		age: 43,
		favoriteFoods: ['eggs', 'fish', 'fresh fruit'],
	},
	{
		name: 'Jasmin Adilovic',
		age: 43,
		favoriteFoods: ['eggs', 'fish', 'fresh fruit'],
	},
];

const createManyPeople = function (arrayOfPeople, done) {
	Person.create(arrayOfPeople, function (err, people) {
		if (err) return console.log(err);
		done(null, people);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, function (err, people) {
		if (err) {
			return console.log(err);
		}
		done(null, people);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, function (err, people) {
		if (err) {
			return console.log(err);
		}
		done(null, people);
	});
};

const findPersonById = (personId, done) => {
	Person.findById({ _id: personId }, function (err, person) {
		if (err) {
			return console.log(err);
		}
		done(null, person);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger';
	Person.findById({ _id: personId }, function (err, person) {
		if (err) {
			return console.log(err);
		}
		person.favoriteFoods.push(foodToAdd);
		person.save((err, updatedPerson) => {
			if (err) {
				console.log(err);
			}
			done(null, updatedPerson);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		function (err, updatedPerson) {
			if (err) {
				console.log(err);
			}
			done(null, updatedPerson);
		}
	);
};

const removeById = (personId, done) => {
	Person.findOneAndRemove({ _id: personId }, (err, removedPerson) => {
		if (err) {
			console.log(err);
		}
		done(null, removedPerson);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';
	Person.find({ name: nameToRemove }, (err, person) => {
		if (err) {
			console.log(err);
		}
		Person.remove((err, removedPerson) => {
			if (err) {
				console.log(err);
			}
			done(null, removedPerson);
		});
	});
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';
	const q = Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select('-age');
	q.exec((err, people) => {
		if (err) {
			console.log(err);
		}
		done(null, people);
	});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
