document.addEventListener("DOMContentLoaded", function () {
    const selectAllCheckbox = document.getElementById("select-all");
    const checkboxes = document.querySelectorAll(".checkbox");
    const counter = document.getElementById("counter"); // Add this line to select the counter element

    
    // Initialize checked/unchecked state
    selectAllCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);

    function toggleSelectAll() {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateCounter();
    }

    selectAllCheckbox.addEventListener("change", toggleSelectAll);

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (!checkbox.checked) {
                selectAllCheckbox.checked = false;
            } else {
                const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
                selectAllCheckbox.checked = allChecked;
            }
            updateCounter();
        });
    });

    function updateCounter() {
        const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
        counter.textContent = `${selectedCheckboxes.length} item${selectedCheckboxes.length !== 1 ? 's' : ''} selected`;
    }

    // Call updateCounter initially to set the counter text based on checked/unchecked
    updateCounter();
});

function getSelectedItems() {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    const selectedItems = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
    return { ids: selectedItems };
}



function dynamicPdfButton() {
    console.log("dynamicPdfButton() works");

    const btnContainer = document.querySelector('#printPdfBtnContainer');

    btnContainer.innerHTML = `<button type="button" onclick="printPdf()">PDF - PrintJS</button>`;
}


function printPdf() {


    const style = `@page { margin: 1px; } @media print { body{ margin-top: .25in; margin-left: 0.5in; }.header { font-size: 90%; color: blue; position: fixed; padding-top: 10px; margin-bottom: 15px; margin-left: 5px } #checkbox-form {margin-top: 1.25in;}}`;

    
    // Trigger the printing process:

    printJS({

        printable: 'checkbox-form',

        type: 'html',

        style: style,
        

        css: [

            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',

            'https://printjs-4de6.kxcdn.com/print.min.css',

            'static/normalize.css', 
            
            'static/skeleton.css',

        ],

        scanStyles: true,

        documentTitle: `Print-items`,



    });

}