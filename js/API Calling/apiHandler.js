/* 
 * SYNONYMS
 */

async function getSynonymsForWords(words)
{
	let synonyms = [];
	
	for (let i = 0; i < words.length; i++)
	{
		await getSynonymsForWord(words[i])
			.then(function(syns)
			{
				synonyms[i] = syns;
			})
			.catch(function(error)
			{
				reject(error);
			});
	}
	
	return await Promise.all(synonyms);
}

async function getSynonymsForWord(word)
{
	return new Promise(function (resolve, reject)
	{
		// The word HAS been searched before and HAS synonyms
		if (previousSearchHasSynonyms(word))
		{
			let wordData = getWordsPreviousSearchData(word);
			resolve(wordData.synonyms);
		}
		
		// The word HAS NOT been searched before or DOESN'T HAVE synonyms
		else
		{
			/*
			 * API Documentation:
			 * https://www.datamuse.com/api
			 */
			let url = ApiUrlsEnum.SYNONYM_BASE_URL + prepareWordForApi(word);
			
			callApi(url)
				.then(function(result)
				{
					addNewSynonymsToPreviousSearches(word, result);
					resolve(result);
				})
				.catch(function(error)
				{
					reject(error);
				});
		}
	});
}



/*
 * ANTONYMS
 */

async function getAntonymsForWords(words)
{
	let antonyms = [];
	
	for (let i = 0; i < words.length; i++)
	{
		await getAntonymsForWord(words[i])
			.then(function(ants)
			{
				antonyms[i] = ants;
			})
			.catch(function(error)
			{
				reject(error);
			});
	}
	
	return await Promise.all(antonyms);
}

async function getAntonymsForWord(word)
{
	return new Promise(function (resolve, reject)
	{
		// The word HAS been searched before and HAS antonyms
		if (previousSearchHasAntonyms(word))
		{
			let wordData = getWordsPreviousSearchData(word);
			resolve(wordData.antonyms);
		}
		
		// The word HAS NOT been searched before or DOESN'T HAVE antonyms
		else
		{
			/*
			 * API Documentation:
			 * https://www.datamuse.com/api
			 */
			let url = ApiUrlsEnum.ANTONYM_BASE_URL + prepareWordForApi(word);
			
			callApi(url)
				.then(function(result)
				{
					addNewAntonymsToPreviousSearches(word, result);
					resolve(result);
				})
				.catch(function(error)
				{
					reject(error);
				});
		}
	});
}

function prepareWordForApi(word)
{
	// Replace all spaces with an underscore (so the API recognizes it)
	return word.replace(/\s/g, "_");
}



/*
 * GET REQUESTS
 */

async function callApi(url)
{
	return new Promise(function (resolve, reject)
	{
		nodeGetRequest(url, function(data)
		{
			// SUCCESS FUNCTION
			resolve(data);
		}, function(errorMsg)
		{
			// ERROR FUNCTION
			reject({
				ajaxError: errorMsg, 
				devError: "Failed to call API, please refresh the page and try again (this may take a few attempts)"
			});
		});
	});
}

// TEMPORARY TEST TO PUSH TO GITHUB
function nodeGetRequest(url, successFunction, errorFunction)
{
	// End the function if there's no url
	if (url == null || url.trim() == "")
	{
		errorFunction("Invalid or blank url");
	}
	
	
	// Send the ajax request
	$.ajax({
		type: "GET",
		url: url,
		// The below header should allow CORS Cross Domain requests
		headers: {"Accept": "*"},
		success: (result) => successFunction(result),
		error: (error) => errorFunction(error)
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
