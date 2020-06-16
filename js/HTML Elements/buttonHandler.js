/* 
 * INITIALIZATION
 */

function initializeRootButtons()
{
	runOnClick("#synonyms1", getRootSynonyms);
	runOnClick("#antonyms1", getRootAntonyms);
}

function runOnClick(jQueryTag, callback)
{
	$(jQueryTag).on("click", callback);
}

// TEMPORARY TEST TO PUSH TO GITHUB
function nodeGetRequest(url, successFunction)
{
	// End the function if there's no url
	if (url == null)
	{
		//throw "Invalid URL parameter in nodePostRequest";
		return;
	}
	
	
	// Send the ajax request
	$.ajax({
		type: "GET",
		url: url,
		// The below header should allow CORS Cross Domain requests
		headers: {"Accept": "*"},
		success: (result) => successFunction(result)
	});
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
	// If the search didn't change, don't update anything
	if (!hasSearchChanged(1, true))
	{
		return;
	}
	
	disableSynonymAntonymButtons(1);
	unhideLoadingIcon(1);
	
	let root = getRootWord();
	
	// Word is empty or only spaces
	if (root == null || root.replace(/\s/g, '') == "")
	{
		return;
	}
	
	getSynonymsForWord(root)
		.then(function(synonyms)
		{
			handleWordsFromApi(1, synonyms, root, true);
		});
}

function getRootAntonyms()
{
	// If the search didn't change, don't update anything
	if (!hasSearchChanged(1, false))
	{
		return;
	}
	
	disableSynonymAntonymButtons(1);
	unhideLoadingIcon(1);
	
	let root = getRootWord();
	
	// Word is empty or only spaces
	if (root == null || root.replace(/\s/g, '') == "")
	{
		return;
	}
	
	getAntonymsForWord(root)
		.then(function(antonyms)
		{
			handleWordsFromApi(1, antonyms, root, false);
		});
}



/*
 * NON-ROOT GETTERS
 */

function getSynonymsButton(tableNum)
{
	return getSubmitButton("col-12", "synonyms" + tableNum, "Get Synonyms");
}

function getAntonymsButton(tableNum)
{
	return getSubmitButton("col-12", "antonyms" + tableNum, "Get Antonyms");
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
	// If the search didn't change, don't update anything
	if (!hasSearchChanged(tableNum + 1, true))
	{
		console.log("Searched not changed");
		return;
	}
	
	disableSynonymAntonymButtons(tableNum + 1);
	unhideLoadingIcon(tableNum + 1);
	
	let wordsToSearch = getAllCheckmarkedWords(tableNum);
	
	getSynonymsForWords(wordsToSearch)
		.then(function(synonyms)
		{
			handleWordsFromApi(tableNum + 1, synonyms, wordsToSearch, true);
		});
}

function getNonRootAntonyms(tableNum)
{
	// If the search didn't change, don't update anything
	if (!hasSearchChanged(tableNum + 1, false))
	{
		console.log("Searched not changed");
		return;
	}
	
	disableSynonymAntonymButtons(tableNum + 1);
	unhideLoadingIcon(tableNum + 1);
	
	let wordsToSearch = getAllCheckmarkedWords(tableNum);
	
	getAntonymsForWords(wordsToSearch)
		.then(function(antonyms)
		{
			handleWordsFromApi(tableNum + 1, antonyms, wordsToSearch, false);
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

function handleWordsFromApi(tableNum, words, mostRecentSearch, areSynonyms)
{
	// Create the table if it doesn't exist
	if (!tableExists(tableNum))
	{
		appendBootstrapTableToBody();
	}
	
	// Remove all data from the table
	clearTable(tableNum);
	
	// Prepare the words to be displayed and tested
	words = parseWordsForDisplay(words);
	
	// The api DID find words
	if (words.length > 0)
	{
		// Add the words & buttons to the table
		displayWords(tableNum, words);
		addSynonymsAndAntonymsButtonToTable(tableNum);
	}
	
	// The api DID NOT find words
	else
	{
	}
		
	// Update the most recent search & hide the loading icon
	updateMostRecentSearch(tableNum, mostRecentSearch, areSynonyms);
	hideLoadingIcon(tableNum);
	
	// Re-enable the buttons
	enableSynonymAntonymButtons(tableNum);
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
	// Combine all arrays of words (in case synonyms / antonyms were obtained for multiple words)
	words = mergeArrays(words);
	
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
	let synonymsButton = getSynonymsButton(tableNum + 1);
	let antonymsButton = getAntonymsButton(tableNum + 1);
	
	// Add to HTML page
	appendButtonCellToRow(row, "");
	appendButtonCellToRow(row, synonymsButton);
	appendButtonCellToRow(row, antonymsButton);
	appendButtonCellToRow(row, "");
	appendLoadingIconAfterTable(tableNum + 1);
	
	// Button click listeners
	initializeSynonymsAndAntonymsButtons(synonymsButton, antonymsButton, tableNum);
}

function disableSynonymAntonymButtons(tableNum)
{
	disableHtmlElement("#synonyms" + tableNum, true);
	disableHtmlElement("#antonyms" + tableNum, true);
}

function enableSynonymAntonymButtons(tableNum)
{
	disableHtmlElement("#synonyms" + tableNum, false);
	disableHtmlElement("#antonyms" + tableNum, false);
}
