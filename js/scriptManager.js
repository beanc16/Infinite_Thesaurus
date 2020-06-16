// Run when the page is loaded
runOnDocumentReady(preventPageRefresh, initializeRootButtons, initializeScrollToTopButton, dontCacheForPhones);

function dontCacheForPhones()
{
	console.log("No caching");
	$.ajaxSetup({ cache: false });
}