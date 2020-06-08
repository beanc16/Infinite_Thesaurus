/* 
 * GETTERS
 */

function getDisplayedWords()
{
	// Get all words that are displayed in labels
	let displayedWordsObj = 
		$("tbody").find("label")
			.map(function(el)
			{
				// Return the text inside the label instead of the label element
				return $(this).text();
			});
	
	// Convert displayed words from an object to array
	let displayedWordsArray = $.makeArray(displayedWordsObj);
	
	// Add the root (initially searched) word to the array
	displayedWordsArray.unshift(getRootWord());
	
	return displayedWordsArray;
}

function getWordsThatArentDisplayedYet(wordsToCompare)
{
	let displayedWords = getDisplayedWords();
	
	// If a word isn't in displayedWords, return it in the array
	return wordsToCompare.filter(curWord => !displayedWords.includes(curWord));
}

function getWordsFromArrayOfObjects(wordArrayOfObjs)
{
	return wordArrayOfObjs.map(curObj => curObj.word);
}

function removeDuplicatesFromArray(array)
{
	return Array.from(new Set(array));
}
