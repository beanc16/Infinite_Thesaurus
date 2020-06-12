/*
 * CREATING
 */
 
function createLoadingIcon(tableNum)
{
	let parentDiv = getDiv("col-12 centerText hide loadingIcon" + tableNum);
	parentDiv.append(getDiv("spinner-border text-primary"));
	return parentDiv;
}



/*
 * MANAGEMENT
 */

function hideLoadingIcon(tableNum)
{
	let loadingIcon = $(".loadingIcon" + tableNum)[0];
	$(loadingIcon).addClass("hide");
}

function unhideLoadingIcon(tableNum)
{
	let loadingIcon = $(".loadingIcon" + tableNum)[0];
	$(loadingIcon).removeClass("hide");
}
