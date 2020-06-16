class Trie
{	
	// Private
	#root;
	ALPHABET_SIZE = 26;
	
	constructor()
	{
		this.#root = new _TrieNode();
	}
	
	
	
	/*
	 * GETTERS
	 */
	
	getData(str)
	{
		let curLetter;
		let pCrawl = this.#root;
		
		for (let i = 0; i < str.length; i++)
        {
            curLetter = str[i];
			
			// There are currently no children with that letter
            if (pCrawl.children[curLetter] == null)
			{
                return null;
			}
			
            pCrawl = pCrawl.children[curLetter];
        }
		
		// The final word was a leaf node
		if (pCrawl != null && pCrawl.isEndOfWord)
		{
			return pCrawl.data;
		}
	}
	
	getAllMatchingWords(wordsArray)
	{
		let matchingWords = [];
		
		for (let i = 0; i < wordsArray.length; i++)
		{
			if (this.hasWord(wordsArray[i]))
			{
				matchingWords.push(wordsArray[i]);
			}
		}
		
		return matchingWords;
	}
	
	getAllUnmatchingWords(wordsArray)
	{
		let unmatchingWords = [];
		
		for (let i = 0; i < wordsArray.length; i++)
		{
			if (this.hasWord(wordsArray[i]))
			{
				unmatchingWords.push(wordsArray[i]);
			}
		}
		
		return unmatchingWords;
	}
	
	
	
	/*
	 * INSERTING
	 */
	
	insert(str, data)
	{
		let curLetter;
		let pCrawl = this.#root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i].toLowerCase();
			
			// Create a node if there are currently no children with that letter
            if (pCrawl.children[curLetter] == null)
			{
				pCrawl.children[curLetter] = new _TrieNode();
			}
			
			// Crawl to the next letter in the tree
            pCrawl = pCrawl.children[curLetter]; 
		}
		
		// Mark last node as a leaf with data
		pCrawl.isEndOfWord = true;
		pCrawl.data = data;
	}
	
	appendPropertyToData(str, propertyKey, propertyValue)
	{
		let curLetter;
		let pCrawl = this.#root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i].toLowerCase();
			
			// Create a node if there are currently no children with that letter
            if (pCrawl.children[curLetter] == null)
			{
				pCrawl.children[curLetter] = new _TrieNode();
			}
			
			// Crawl to the next letter in the tree
            pCrawl = pCrawl.children[curLetter]; 
		}
		
		// Mark last node as a leaf with data
		pCrawl.isEndOfWord = true;
		
		// Append data
		if (pCrawl.data == null)
		{
			pCrawl.data = {};
		}
		
		// Make the data an array if it already exists (so it doesn't overwrite existing data)
		if (pCrawl.data[propertyKey] != null)
		{
			pCrawl.data[propertyKey] = this._mergeArrays([pCrawl.data[propertyKey], propertyValue]);
		}
		
		else
		{
			pCrawl.data[propertyKey] = propertyValue;
		}
	}
	
	_mergeArrays(arrayOfArrays)
	{
		return [].concat.apply([], arrayOfArrays);
	}
	
	
	
	/*
	 * BOOLEAN
	 */
	
	hasWord(str)
	{
		let curLetter;
		let pCrawl = this.#root;
		
		for (let i = 0; i < str.length; i++)
        {
            curLetter = str[i];
			
			// There are currently no children with that letter
            if (pCrawl.children[curLetter] == null)
			{
                return false;
			}
			
            pCrawl = pCrawl.children[curLetter];
        }
		
		// The final word was a leaf node
        return (pCrawl != null && pCrawl.isEndOfWord);
	}
}

class _TrieNode
{
	constructor()
	{
		this.children = [];
		this.isEndOfWord = false;
		this.data = null;
		
		for (let i = 0; i < this.ALPHABET_SIZE; i++)
		{
			let currentLetter = (i+10).toString(36);
			this.children[currentLetter] = null;
		}
	}
}
