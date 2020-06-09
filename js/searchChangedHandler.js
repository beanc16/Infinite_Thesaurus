let mostRecentSearches = {};

function getMostRecentSearches()
{
	return mostRecentSearches;
}



/* 
 * GETTERS
 */

function arraysAreEqualUnsorted(a, b)
{
	if (a === b)
	{
		return true;
	}
	
	if (a == null || b == null)
	{
		return false;
	}
	
	if (a.length != b.length)
	{
		return false;
	}

	for (let i = 0; i < a.length; ++i)
	{
		if (a[i] !== b[i])
		{
			return false;
		}
	}
	
	return true;
}

function arraysAreEqualSorted(a, b)
{
	if (a === b)
	{
		return true;
	}
	
	if (a == null || b == null)
	{
		return false;
	}
	
	if (a.length != b.length)
	{
		return false;
	}
	
	let c = cloneSortedArray(a);
	let d = cloneSortedArray(b);

	for (let i = 0; i < c.length; ++i)
	{
		if (c[i] !== d[i])
		{
			return false;
		}
	}
	
	return true;
}

function cloneSortedArray(array)
{
	return array.concat().sort();
}



/* 
 * INSERT
 */

function updateMostRecentSearch(tableNum, wordsSearched, searchedSynonyms)
{
	mostRecentSearches["table" + tableNum] = wordsSearched;
	mostRecentSearches["table" + tableNum + "SearchedSynonyms"] = searchedSynonyms;
}



/* 
 * BOOLEAN
 */

function hasSearchChanged(tableNum, isSearchingSynonyms)
{
	let previousSearch = mostRecentSearches["table" + tableNum];
	
	// Nothing has been searched yet
	if (previousSearch == null)
	{
		return true;
	}
	
	// Searching the opposite of what was searched last time
	if (mostRecentSearches["table" + tableNum + "SearchedSynonyms"] != isSearchingSynonyms)
	{
		return true;
	}
	
	// Root word
	if (tableNum == 1)
	{
		let newSearch = getRootWord();
		return (newSearch != previousSearch);
	}
	
	// Non-Root words
	else
	{
		let newSearch = getAllCheckmarkedWords(tableNum - 1);
		return ( !arraysAreEqualSorted(newSearch, previousSearch) );
	}
}
