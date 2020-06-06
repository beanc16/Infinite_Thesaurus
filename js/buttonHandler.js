function initializeButtons()
{
	runOnClick("#synonyms", getRootSynonyms);
	runOnClick("#antonyms", getRootAntonyms);
}

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
	let row = appendRowToTBody(tableNum);
	let cellNum = 0;
	let maxCellsPerRow = 4;
	
	for (let i = 0; i < words.length; i++)
	{
		if (cellNum >= maxCellsPerRow)
		{
			cellNum = 0;
			row = appendRowToTBody(tableNum);
		}
		
		let curWord = words[i].word;
		appendCellToRow(row, curWord);
		cellNum++;
	}
}
