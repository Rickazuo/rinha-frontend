document.getElementById('addJson').addEventListener('change', function (event) {
    const fileInput = event.target;
    const outputDiv = document.querySelector('.output');
    const initialScreen = document.querySelector('.initialScreen');
    const fileNameSpan = document.getElementById('fileName');
    
    if (fileInput.files.length === 0) {
        outputDiv.innerHTML = 'No file selected.';
        fileNameSpan.textContent = '';
        return;
    }

    const selectedFile = fileInput.files[0];
    const reader = new FileReader();

    fileNameSpan.textContent = `${selectedFile.name}`;

    reader.onload = function (event) {
        const fileContent = event.target.result;
        try {
            const data = JSON.parse(fileContent);
            displayJSON(data, outputDiv);
            initialScreen.style.display = 'none';
            document.getElementById('returnButton').style.display = 'block';
        } catch (error) {
            outputDiv.innerHTML = 'Error parsing JSON: ' + error.message;
        }
    };

    reader.readAsText(selectedFile);
});

document.getElementById('returnButton').addEventListener('click', function () {
    location.reload();
});

function displayJSON(data, outputDiv) {
    outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
