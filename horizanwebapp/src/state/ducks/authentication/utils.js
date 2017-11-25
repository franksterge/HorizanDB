/*
	In this function we can define the shape of a
	user profile so that it will be consistent
	in all other parts of the codebase.
	*/
export const getNormalizedUserProfile = user => {
	return {
		email: user.email,
		name: user.name,
		photoURL: 'http://via.placeholder.com/200x200',
		uid: user.uid,
		subscribtion: 'basic'
	}
};