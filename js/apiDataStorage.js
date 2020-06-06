let previousSearches = new Trie();

function getPreviousSearches()
{
	return previousSearches;
}



/*
 * INSERT
 */

function addNewSynonyms(word, synonyms)
{
	let previousData = previousSearches.getData(word);
	
	// The word has never been searched before
	if (previousData == null)
	{
		previousSearches.insert(word, {
			"synonyms": synonyms
		});
	}
	
	// Only the words antonyms were searched before
	else if (previousData["synonyms"] == null)
	{
		previousSearches.appendPropertyToData(word, "synonyms", synonyms);
	}
	
	// The word already has synonyms saved, do nothing
}

function addNewAntonyms(word, antonyms)
{
	let previousData = previousSearches.getData(word);
	
	// The word has never been searched before
	if (previousData == null)
	{
		previousSearches.insert(word, {
			"antonyms": antonyms
		});
	}
	
	// Only the words synonyms were searched before
	else if (previousData["antonyms"] == null)
	{
		previousSearches.appendPropertyToData(word, "antonyms", antonyms);
	}
	
	// The word already has antonyms saved, do nothing
}



/* 
 * UTILITY
 */

function getWordsData(word)
{
	return previousSearches.getData(word);
}
 