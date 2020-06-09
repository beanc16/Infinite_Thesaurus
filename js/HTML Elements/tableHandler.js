let curNumOfTables = 1;

function getCurrentTableNum()
{
	return $("table").length;
}



/*
 * CREATING
 */
 
function createBootstrapTable()
{
	let table = document.createElement("table");	// Initialization
	$(table).addClass("table table-borderless");	// Class
	
	let curNumOfTables = getCurrentTableNum() + 1;
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
	
	if (displayText == null)
	{
		displayText = "";
	}
	
	// Add checkbox to cell
	$(cell).append(getBootstrapCheckbox(displayText));
	
	return cell;
}

function createEmptyTableCell()
{
	return document.createElement("td");			// Initialization
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

function appendButtonCellToRow(row, content)
{
	let cell = createEmptyTableCell();				// Initialization
	$(cell).html(content);							// Display
	
	$(row).append(cell);							// Add cell to current row
	return cell;
}

function appendBootstrapTableToBody()
{
	let table = createBootstrapTable();
	$("body").append(table);
	
	return table;
}



/* 
 * UTILITY
 */

function tableExists(tableNum)
{
	let table = $("#table" + tableNum);
	return (table.length > 0);
}
