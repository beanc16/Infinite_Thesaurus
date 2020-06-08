let previousSearches = new Trie();

function getPreviousSearches()
{
	return previousSearches;
}



/*
 * INSERT
 */

function addNewSynonymsToPreviousSearches(word, synonyms)
{
	let previousData = getWordsPreviousSearchData(word);
	
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

function addNewAntonymsToPreviousSearches(word, antonyms)
{
	let previousData = getWordsPreviousSearchData(word);
	
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
 * BOOLEAN
 */

function getWordsPreviousSearchData(word)
{
	return previousSearches.getData(word);
}

function wasSearchedBefore(word)
{
	return (getWordsPreviousSearchData(word) != null);
}

function previousSearchHasSynonyms(word)
{
	let wordData = getWordsPreviousSearchData(word);
	
	return (wasSearchedBefore(word) && wordData.synonyms != null);
}

function previousSearchHasAntonyms(word)
{
	let wordData = getWordsPreviousSearchData(word);
	
	return (wasSearchedBefore(word) && wordData.antonyms != null);
}
 