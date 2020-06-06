/* 
 * INITIALIZATION
 */

function initializeButtons()
{
	runOnClick("#synonyms", getRootSynonyms);
	runOnClick("#antonyms", getRootAntonyms);
}



/* 
 * GETTERS
 */

function getRootWord()
{
	return $("#rootWord").val();
}

function getRootSynonyms()
{
	let root = getRootWord();
	
	getSynonymsForWord(root)
		.then(function(synonyms)
		{
			clearTable(1);
			displayWords(1, synonyms);
		});
}

function getRootAntonyms()
{
	let root = getRootWord();
	
	getAntonymsForWord(root)
		.then(function(antonyms)
		{
			clearTable(1);
			displayWords(1, antonyms);
		});
}

function clearTable(tableNum)
{
	$("#tbody" + tableNum).empty();
}

function displayWords(tableNum, words)
{
	// Initialize main variables
	let row = appendRowToTBody(tableNum);
	let wordNum = 0;
	let maxWordsPerRow = 4;
	
	for (let i = 0; i < words.length; i++)
	{
		// The current row has the maximum number of words
		if (wordNum >= maxWordsPerRow)
		{
			wordNum = 0;
			row = appendRowToTBody(tableNum);
		}
		
		let curWord = words[i].word;
		appendCellToRow(row, curWord);
		wordNum++;
	}
}
