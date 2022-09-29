module.exports = {
	//A reusable function to adjust the dates stored in the datbase to a readable format.
	formatDate: (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		return new Date(date).toLocaleDateString('us-en', options);
	},
};
