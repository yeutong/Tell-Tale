function selectWords() {
    $.get('/get_words', function(data) {
        var selectedWords = data.join(', ');
        document.getElementById('selected-words').classList.add('response-block');
        document.getElementById('selected-words').innerHTML = '<strong>Selected Words</strong>: ' + selectedWords;
        
        // Display "Generating response..." placeholder
        document.getElementById('generated-response').classList.add('response-block');
        document.getElementById('generated-response').textContent = 'Generating response...';
        
        $.get('/generate_response/' + encodeURIComponent(selectedWords), function(response) {
            // Display the actual response
            // document.getElementById('generated-response').textContent = 'Generated Response: ' + response.response;
            document.getElementById('generated-response').classList.remove('response-block')
            document.getElementById('generated-response').textContent = '';
            document.getElementById('generated-response').insertAdjacentHTML('afterend', response.response)
        });
    });
}

function showDef(idx) {
    var def = document.getElementById('definition' + idx);
    if (def.style.display == 'none') {
        def.style.display = 'block';
    } else {
        def.style.display = 'none';
    }
}