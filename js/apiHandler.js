/* 
 * SYNONYMS
 */

async function getSynonymsForWords(words)
{
	return new Promise(function (resolve, reject)
	{
		let synonyms = [];
		
		for (let i = 0; i < words.length; i++)
		{
			//synonyms[i] = await getSynonymsForWord(words[i]);
			
			getSynonymsForWord(words[i])
				.then(function(syns)
				{
					synonyms[i] = syns;
				})
				.catch(function(error)
				{
					reject(error);
				});
		}
		
		resolve(synonyms);
	});
}

async function getSynonymsForWord(word)
{
	return new Promise(function (resolve, reject)
	{
		/*
		 * API Documentation:
		 * https://www.datamuse.com/api
		 */
		let url = ApiUrlsEnum.SYNONYM_BASE_URL + word;
		
		callApi(url)
			.then(function(result)
			{
				resolve(result);
			})
			.catch(function(error)
			{
				reject(error);
			});
	});
}



/*
 * ANTONYMS
 */

async function getAntonymsForWords(words)
{
	return new Promise(function (resolve, reject)
	{
		let antonyms = [];
		
		for (let i = 0; i < words.length; i++)
		{
			//antonyms[i] = await getAntonymsForWord(words[i]);
			
			getAntonymsForWord(words[i])
				.then(function(ants)
				{
					antonyms[i] = ants;
				})
				.catch(function(error)
				{
					reject(error);
				});
		}
		
		resolve(antonyms);
	});
}

async function getAntonymsForWord(word)
{
	return new Promise(function (resolve, reject)
	{
		/*
		 * API Documentation:
		 * https://www.datamuse.com/api
		 */
		let url = ApiUrlsEnum.ANTONYM_BASE_URL + word;
		
		callApi(url)
			.then(function(result)
			{
				resolve(result);
			})
			.catch(function(error)
			{
				reject(error);
			});
	});
}



/*
 * GET REQUESTS
 */

async function callApi(url)
{
	return new Promise(function (resolve, reject)
	{
		try
		{
			nodeGetRequest(url, function(data)
			{
				resolve(data);
			});
		}
		
		catch (error)
		{
			console.log("\nERROR in callApi:\n", error);
			reject(error);
		}
	});
}

function getStringArrayFromBufferString(bufferString)
{
	// Get the curly brackets and everything in between for each array element
	let regEx = /{[^{}]*(?=\})}/g;
	return bufferString.match(regEx)
}

function convertStringArrayToJsonArray(dataArray)
{
	// Synonyms or Antonyms WERE found
	if (dataArray != null)
	{
		for (let i = 0; i < dataArray.length; i++)
		{
			jsonArray[i] = JSON.parse(dataArray[i]);
		}
		
		return jsonArray;
	}
	
	// Synonyms or Antonyms WERE NOT found
	return [];
}
