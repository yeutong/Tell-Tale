function selectWords() {
    $.get('/get_words', function(words) {
        var selected_div = document.getElementById('selected-words');
        selected_div.style.display = 'block';
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var word_div = document.getElementById('word' + i);
            word_div.textContent = word;
            var def_file = 'static/data/definitions/' + word.replace(' ', '_') + '.json';
            var def_div = document.getElementById('definition' + i);
            def_div.innerHTML = '<strong>' + word + '</strong>: ';
            fetch(def_file)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // for (var pos in data) {
                //     var defs = data[pos];
                //     for (var j = 0; j < defs.length; j++) {
                //         def_div.innerHTML += '<p>' + pos + ': ' + defs[j] + '</p>';
                //     }
                // }
            });
        }
        // var selectedWords = words.join(', ');
        // document.getElementById('selected-words').classList.add('response-block');
        // document.getElementById('selected-words').innerHTML = '<strong>Selected Words</strong>: ' + selectedWords;
        // Display "Generating response..." placeholder
        // document.getElementById('generated-response').classList.add('response-block');
        // document.getElementById('generated-response').textContent = 'Generating response...';
        
        // $.get('/generate_response/' + encodeURIComponent(selectedWords), function(response) {
        //     // Display the actual response
        //     // document.getElementById('generated-response').textContent = 'Generated Response: ' + response.response;
        //     document.getElementById('generated-response').classList.remove('response-block')
        //     document.getElementById('generated-response').textContent = '';
        //     document.getElementById('generated-response').insertAdjacentHTML('afterend', response.response)
        // });
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