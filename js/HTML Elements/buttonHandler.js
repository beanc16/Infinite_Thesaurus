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
		updateErrorMessage("ERROR: You must type a word to search");
		hideLoadingIcon(1);
		enableSynonymAntonymButtons(1);
		
		return;
	}
	
	getSynonymsForWord(root)
		.then(function(synonyms)
		{
			handleWordsFromApi(1, synonyms, root, true);
		})
		.catch(function(errorData)
		{
			console.log("ERROR in getRootSynonyms: ", errorData.ajaxError);
			updateErrorMessage(errorData.devError);
			
			hideLoadingIcon(1);
			enableSynonymAntonymButtons(1);
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
		updateErrorMessage("ERROR: You must type a word to search");
		hideLoadingIcon(1);
		enableSynonymAntonymButtons(1);
		
		return;
	}
	
	getAntonymsForWord(root)
		.then(function(antonyms)
		{
			handleWordsFromApi(1, antonyms, root, false);
		})
		.catch(function(errorData)
		{
			console.log("ERROR in getRootAntonyms: ", errorData.ajaxError);
			updateErrorMessage(errorData.devError);
			
			hideLoadingIcon(1);
			enableSynonymAntonymButtons(1);
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
		return;
	}
	
	disableSynonymAntonymButtons(tableNum + 1);
	unhideLoadingIcon(tableNum + 1);
	
	let wordsToSearch = getAllCheckmarkedWords(tableNum);
	
	if (wordsToSearch.length > 0)
	{
		getSynonymsForWords(wordsToSearch)
			.then(function(synonyms)
			{
				handleWordsFromApi(tableNum + 1, synonyms, wordsToSearch, true);
			})
			.catch(function(errorData)
			{
				console.log("ERROR in getNonRootSynonyms: ", errorData.ajaxError);
				updateErrorMessage(errorData.devError);
				
				hideLoadingIcon(tableNum + 1);
				enableSynonymAntonymButtons(tableNum + 1);
			});
	}
	
	else
	{
		updateErrorMessage("ERROR: You must select words to search");
		
		hideLoadingIcon(tableNum + 1);
		enableSynonymAntonymButtons(tableNum + 1);
	}
}

function getNonRootAntonyms(tableNum)
{
	// If the search didn't change, don't update anything
	if (!hasSearchChanged(tableNum + 1, false))
	{
		return;
	}
	
	disableSynonymAntonymButtons(tableNum + 1);
	unhideLoadingIcon(tableNum + 1);
	
	let wordsToSearch = getAllCheckmarkedWords(tableNum);
	
	if (wordsToSearch.length > 0)
	{
		getAntonymsForWords(wordsToSearch)
			.then(function(antonyms)
			{
				handleWordsFromApi(tableNum + 1, antonyms, wordsToSearch, false);
			})
			.catch(function(errorData)
			{
				console.log("ERROR in getNonRootAntonyms: ", errorData.ajaxError);
				updateErrorMessage(errorData.devError);
				
				hideLoadingIcon(tableNum + 1);
				enableSynonymAntonymButtons(tableNum + 1);
			});
	}
	
	else
	{
		updateErrorMessage("ERROR: You must select words to search");
		
		hideLoadingIcon(tableNum + 1);
		enableSynonymAntonymButtons(tableNum + 1);
	}
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
		
		// Hide the error message
		hideErrorMessage();
	}
	
	// The api DID NOT find words
	else
	{
		if (areSynonyms)
		{
			updateErrorMessage("ERROR: No synonyms found, please update the word(s) you'd like to search");
		}
		
		else
		{
			updateErrorMessage("ERROR: No antonyms found, please update the word(s) you'd like to search");
		}
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
