/* This should be a JSON file, but I just want something simple that can be
   run without an http server, so simply define a global variable instead. */

const config = {
	names:
		`Name1
		Name2
		Name3
		Name4
		Name5`
	.replace(/\\h/g, '').split('\n'),
	sillyNames:
		`Spongebob,
		Bartholomew Buttersworth III,
		Sir Lancelot the Lawn Gnome,
		Lukewarm Skywalker,
		Eleven`
		.split('\n'),
};
