function copyToClipboard() {
    const dropdown = document.getElementById('dropdown');
    const selectedOption = dropdown.options[dropdown.selectedIndex].value;

    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = selectedOption;
    document.body.appendChild(textarea);

    // Select the text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('Copied to clipboard!');
}
