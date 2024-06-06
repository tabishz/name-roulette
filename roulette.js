
// Given a selected index and config, construct an array of names to
// flash on the screen that concludes with the name at the chosenIndex.
// If sillyNames exists, occationally pick one an insert it as the
// penultimate name.
function constructNames(chosenIndex, names, sillyNames) {
	const LIST_LENGTH = 100;
	let chooseSillyName = Math.random() > 0.8 && sillyNames.length;
	let sillyName = '';
	if (chooseSillyName) {
		console.log('silly');
		sillyName = sillyNames[Math.floor(Math.random() * sillyNames.length)];
	}

	let sillyOffset = (i) => {
		if (!chooseSillyName) return 0; // no offset
		if (i < LIST_LENGTH - 2) return -1; // move the names down one to add the silly name
		if (i === LIST_LENGTH - 2) return -1 * LIST_LENGTH + i - chosenIndex; // for the second to last name, set the index to -1
		if (i === LIST_LENGTH - 1) return 0; // leave the final name alone
	}
	
	let indices = Array.from({length: LIST_LENGTH}, (_, i) => ((LIST_LENGTH - i + chosenIndex - 1 + sillyOffset(i)) % names.length));
	return indices.map((index) => index < 0 ? sillyName : names[index]);
}

const MAX_FONT_SIZE = parseInt(window.innerWidth * 0.25); // in px
console.log(`Max Font Size: ${MAX_FONT_SIZE}`);

const title = document.getElementById('theName');

function adjustFontSize(name) {
  const textWidth = name.length; // Get actual width of the text
  const maxWidth = window.innerWidth * 0.8;
  // Calculate a new font size based on text width and desired max width
  const newFontSize = Math.min(maxWidth / (textWidth/1.6), MAX_FONT_SIZE);
  title.style.fontSize = parseInt(newFontSize) + 'px'; // Set the new font size
	console.log(title.style.fontSize);
}

function shuffle(names) {
	title.innerText = names[0];
	adjustFontSize(title.innerText);
	let pause = Math.max(33, 1000 / names.length); // get gradually slower as the names run out
	let newNames = names.splice(1,names.length);
	if (newNames.length) {
		window.setTimeout(() => {shuffle(newNames)}, pause);
	} else {
		title.className = 'animated-text';
	}
}


let button = document.querySelector('#roulette');

button.addEventListener('click', () => {
	title.className = '';
	let chosenIndex = Math.floor(Math.random() * config.names.length);
	let nameList = constructNames(chosenIndex, config.names, config.sillyNames);
	shuffle(nameList);
});