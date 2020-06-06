let curCheckboxNum = 1;



function getBootstrapCheckbox(labelText)
{
	/*
	<div class="form-check form-check-inline">
		<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
		<label class="form-check-label" for="inlineCheckbox1">Cold</label>
	</div>
	*/
	let parentDiv = getDiv("form-check form-check-inline");
	$(parentDiv).append(getInputCheckbox());
	$(parentDiv).append(getLabel(labelText));
	
	return parentDiv;
}

function getDiv(className)
{
	let div = document.createElement("div");
	$(div).addClass(className);
	
	return div;
}

function getInputCheckbox()
{
	let checkbox = document.createElement("input");
	$(checkbox).addClass("form-check-input");
	$(checkbox).attr("type", "checkbox");
	
	$(checkbox).attr("id", "checkbox" + curCheckboxNum);
	
	return checkbox;
}

function getLabel(displayText)
{
	let label = document.createElement("label");
	$(label).addClass("form-check-label");
	$(label).append(displayText);
	$(label).attr("for", "checkbox" + curCheckboxNum);
	curCheckboxNum++;
	
	return label;
}
