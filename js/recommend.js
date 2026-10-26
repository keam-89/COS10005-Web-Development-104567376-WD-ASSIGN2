// template followed https://datatables.net/examples/core/api/multi_filter_select.html
const table = new DataTable('#example', {
    initComplete: function () {
        this.api().columns().every(function () {
            let column = this;
            let footer = column.footer();
            
            if (!footer) return;

            // Create a multi-select element
            let select = document.createElement('select');
            select.multiple = true; // Enables selecting multiple options (Hold Ctrl/Cmd)
            select.size = 4;        // Displays as a small visible list box
            footer.replaceChildren(select); // Replaces the <th> text with the dropdown

            // Extract data from ALL rows across the table and split comma-separated values
            let splitTexts = [];
            column.data().each(function (d) {
                // Strip HTML tags (e.g., <a href="...">Book Today</a> becomes "Book Today")
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = d;
                let text = (tempDiv.textContent || tempDiv.innerText || d).trim();

                // Split comma-separated values (like genres or age groups)
                text.split(',').forEach(item => {
                    let cleaned = item.trim();
                    if (cleaned) splitTexts.push(cleaned);
                });
            });

            // Get a unique, sorted list of individual options
            let uniqueItems = [...new Set(splitTexts)].sort();

            uniqueItems.forEach(function (d) {
                select.add(new Option(d, d));
            });

            // Apply listener for multi-selection changes
            select.addEventListener('change', function () {
                let selectedValues = Array.from(select.selectedOptions).map(option => option.value);

                if (selectedValues.length === 0) {
                    // Clear filter if nothing is selected
                    column.search('', true, false).draw();
                } else {
                    // Escape special regex characters safely and join with OR '|'
                    let pattern = selectedValues
                        .map(v => `\\b${DataTable.util.escapeRegex(v)}\\b`)
                        .join('|');
                    
                    column.search(pattern, true, false).draw();
                }
            });
        });
    }
});