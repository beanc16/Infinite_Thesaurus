let curNumOfTables = 1;



/*
 * CREATING
 */
 
function createBootstrapTable()
{
	let table = document.createElement("table");
	$(table).addClass("table table-borderless");
	curNumOfTables++;
	$(table).attr("id", "table" + curNumOfTables);
	
	$(table).append(createTBody(curNumOfTables));
	
	return table;
}

function createTBody(tableNum)
{
	let tbody = document.createElement("tbody");
	$(tbody).attr("id", "tbody" + tableNum);
	
	return tbody;
}

function createTableRow()
{
	return document.createElement("tr");
}

function createTableCell(displayText)
{
	let cell = document.createElement("td");
	
	if (displayText != null)
	{
		$(cell).html(displayText);
	}
	
	return cell;
}



/*
 * EDITING
 */

function appendRowToTBody(tableNum)
{
	let row = createTableRow();
	$("#tbody" + tableNum).append(row);
	return row;
}

function appendCellToRow(row, displayText)
{
	let cell = createTableCell(displayText);
	$(row).append(cell);
	return cell;
}
