class Trie
{
	// Static
	static ALPHABET_SIZE = 26;
	
	// Private
	#root;
	
	constructor()
	{
		this.#root = new _TrieNode();
	}
	
	
	
	insert(str, data)
	{
		let curLetter;
		let pCrawl = this.#root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i];
			
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
	
	
	
	// Private functions
	_characterToNumber = function(character)
	{
		return character.charCodeAt(0) - 97;
	}
	
	_numberToCharacter = function(number)
	{
		return String.fromCharCode(97 + number);
	}
}

class _TrieNode
{
	constructor()
	{
		this.children = [];
		this.isEndOfWord = false;
		this.data = null;
		
		for (let i = 0; i < Trie.ALPHABET_SIZE; i++)
		{
			let currentLetter = (i+10).toString(36);
			this.children[currentLetter] = null;
		}
	}
}
