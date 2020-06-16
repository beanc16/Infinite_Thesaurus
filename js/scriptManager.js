// Run when the page is loaded
runOnDocumentReady(preventPageRefresh, initializeRootButtons, initializeScrollToTopButton, preventCaching);

function preventCaching()
{
	$.ajaxSetup({ cache: false });
}
