/*
 * MANAGEMENT
 */

function hideErrorMessage()
{
	if( $("#errorMsg").is(":visible") )
	{
		$("#errorMsg").fadeOut(200);
	}
}

function unhideErrorMessage()
{
	if( !$("#errorMsg").is(":visible") )
	{
		$("#errorMsg").fadeIn(200);
	}
}

function updateErrorMessage(displayMessage)
{
	$("#errorMsg").html(displayMessage);
	unhideErrorMessage();
}
