let numOfSynonymAndAntonymsButtons = 1;

/* 
 * INITIALIZATION
 */

function initializeButtons()
{
	runOnClick("#synonyms1", getRootSynonyms);
	runOnClick("#antonyms1", getRootAntonyms);
}



/* 
 * ROOT GETTERS
 */

function getRootWord()
{
	return $("#rootWord").val();
}

function getRootSynonyms()
{
	let root = getRootWord();
	
	// Word is empty or only spaces
	if (root == null || root.replace(/\s/g, '') == "")
	{
		return;
	}
	
	getSynonymsForWord(root)
		.then(function(synonyms)
		{
			clearTable(1);
			displayWords(1, synonyms);
			addSynonymsAndAntonymsButtonToTable(1);
		});
}

function getRootAntonyms()
{
	let root = getRootWord();
	
	// Word is empty or only spaces
	if (root == null || root.replace(/\s/g, '') == "")
	{
		return;
	}
	
	getAntonymsForWord(root)
		.then(function(antonyms)
		{
			clearTable(1);
			displayWords(1, antonyms);
			addSynonymsAndAntonymsButtonToTable(1);
		});
}



/*
 * NON-ROOT GETTERS
 */

function getSynonymsButton()
{
	return getSubmitButton("col-12", "synonyms" + numOfSynonymAndAntonymsButtons, "Get Synonyms");
}

function getAntonymsButton()
{
	return getSubmitButton("col-12", "antonyms" + numOfSynonymAndAntonymsButtons, "Get Antonyms");
}

function getSubmitButton(className, nameAndId, displayText)
{
	let submitButton = document.createElement("input");
	$(submitButton).addClass(className);
	$(submitButton).attr("id", nameAndId);
	$(submitButton).attr("name", nameAndId);
	$(submitButton).val(displayText);
	$(submitButton).attr("type", "submit");
	
	return submitButton;
}

function initializeSynonymsAndAntonymsButtons(synonymsButton, antonymsButton, tableNum)
{
	runOnClick(synonymsButton, () => getNonRootSynonyms(tableNum));
	runOnClick(antonymsButton, () => getNonRootAntonyms(tableNum));
}

function getNonRootSynonyms(tableNum)
{
	let words = getAllCheckmarkedWords(tableNum);
	
	getSynonymsForWords(words)
		.then(function(synonyms)
		{
			tableNum++;
			if (!tableExists(tableNum))
			{
				appendBootstrapTableToBody();
			}
			
			clearTable(tableNum);
			
			synonyms = mergeArrays(synonyms);
			displayWords(tableNum, synonyms);
			addSynonymsAndAntonymsButtonToTable(tableNum);
		});
}

function getNonRootAntonyms(tableNum)
{
	let words = getAllCheckmarkedWords(tableNum);
	
	getAntonymsForWords(words)
		.then(function(antonyms)
		{
			tableNum++;
			if (!tableExists(tableNum))
			{
				appendBootstrapTableToBody();
			}
			
			clearTable(tableNum);
			
			antonyms = mergeArrays(antonyms);
			displayWords(tableNum, antonyms);
			addSynonymsAndAntonymsButtonToTable(tableNum);
		});
}

function getAllCheckmarkedWords(tableNum)
{	
	let tbodyId = "#tbody" + tableNum;
	let checkboxLabels = $(tbodyId)
							.find(":checkbox:checked")	// Get all checked checkboxes
							.parent()					// Get the parent (div) of the checkboxes
							.find("label");				// Get the labels that correspond to the checkboxes
	
	let checkmarkedWords = [];
	for (let i = 0; i < checkboxLabels.length; i++)
	{
		checkmarkedWords[i] = $(checkboxLabels[i]).text();
	}
	
	return checkmarkedWords;
}

function mergeArrays(arrayOfArrays)
{
	return [].concat.apply([], arrayOfArrays);
}



/*
 * MANAGEMENT
 */

function clearTable(tableNum)
{
	$("#tbody" + tableNum).empty();
}

function displayWords(tableNum, words)
{
	words = parseWordsForDisplay(words);
	
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
		
		appendCellToRow(row, words[i]);
		wordNum++;
	}
}

function parseWordsForDisplay(words)
{
	// Convert words array of objects to just an array of words (strings)
	words = getWordsFromArrayOfObjects(words);
	
	// Remove words that are already displayed (so no duplicates are displayed)
	words = getWordsThatArentDisplayedYet(words);
	
	// Remove duplicate words
	return removeDuplicatesFromArray(words);
}

function addSynonymsAndAntonymsButtonToTable(tableNum)
{
	// Initialization
	let row = appendRowToTBody(tableNum);
	let synonymsButton = getSynonymsButton();
	let antonymsButton = getAntonymsButton();
	
	// Add to HTML page
	appendButtonCellToRow(row, "");
	appendButtonCellToRow(row, synonymsButton);
	appendButtonCellToRow(row, antonymsButton);
	appendButtonCellToRow(row, "");
	
	// Button click listeners
	initializeSynonymsAndAntonymsButtons(synonymsButton, antonymsButton, tableNum);
}
