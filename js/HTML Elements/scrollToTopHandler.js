function initializeScrollToTopButton()
{
	$("#scrollToTopButton").click(function()
	{
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	
	$(window).scroll(function()
	{
		// If page is scrolled more than 100px, display the button
		if ($(this).scrollTop() >= 150)
		{        
			$("#scrollToTopButton").fadeIn(200);
		}
		
		// At the top of the page, hide the button
		else
		{
			$("#scrollToTopButton").fadeOut(200);
		}
	});
}