let curNumOfTables = 1;



/*
 * CREATING
 */
 
function createBootstrapTable()
{
	let table = document.createElement("table");	// Initialization
	$(table).addClass("table table-borderless");	// Class
	
	curNumOfTables++;
	$(table).attr("id", "table" + curNumOfTables);	// ID
	
	$(table).append(createTBody(curNumOfTables));	// TBody
	
	return table;
}

function createTBody(tableNum)
{
	let tbody = document.createElement("tbody");	// Initialization
	$(tbody).attr("id", "tbody" + tableNum);		// ID
	
	return tbody;
}

function createTableRow()
{
	return document.createElement("tr");			// Initialization
}

function createTableCell(displayText)
{
	let cell = document.createElement("td");		// Initialization
	
	if (displayText != null)
	{
		$(cell).html(displayText);					// Display text if given any
	}
	
	return cell;
}



/*
 * EDITING
 */

function appendRowToTBody(tableNum)
{
	let row = createTableRow();						// Initialization
	$("#tbody" + tableNum).append(row);				// Add row to current TBody
	return row;
}

function appendCellToRow(row, displayText)
{
	let cell = createTableCell(displayText);		// Initialization
	$(row).append(cell);							// Add cell to current row
	return cell;
}
