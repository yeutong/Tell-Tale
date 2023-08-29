function selectWords() {
    var selected_div = document.getElementById('selected-words');
    selected_div.style.display = 'block';

    $.get('/get_words', function(words) {
        // tmp_words = {
        //     "word1": {"noun": ["a person, place, or thing"], "verb": ["an action"]},
        //     "word2": {"noun": ["a person, place, or thing"], "verb": ["an action"]}, ...
        // }
        var idx = 0;
        for (var word in words) {
            var word_div = document.getElementById('word' + idx);
            word_div.textContent = word;
            var def_div = document.getElementById('definition' + idx);
            def_div.innerHTML = '';
            for (var pos in words[word]) {
                def_div.innerHTML += '<p><strong>' + pos + '</strong></p>';
                def_div.innerHTML += '<ul>';
                var defs = words[word][pos];
                for (var i = 0; i < defs.length; i++) {
                    def_div.innerHTML += '<li>' + defs[i] + '</li>';
                }
                def_div.innerHTML += '</ul>';
            }
            idx++;
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