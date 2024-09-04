function copyToClipboard() {
    var dropdown = document.getElementById("dropdown");
    var selectedText = dropdown.options[dropdown.selectedIndex].text;
    navigator.clipboard.writeText(selectedText).then(function() {
        alert("Texto copiado: " + selectedText);
    }, function(err) {
        console.error("Erro ao copiar o texto: ", err);
    });
}
