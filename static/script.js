function selectWords() {
    var selected_div = document.getElementById('selected-words');
    selected_div.style.display = 'block';
    var tale_reg_div = document.getElementById('gen-tale-button');
    tale_reg_div.style.display = 'block';
    var tale_div = document.getElementById('tale');
    tale_div.textContent = 'Typing...';
    tale_div.style.display = 'none';


    $.get('/get_words', function(words) {
        // tmp_words = {
        //     "word1": {"noun": ["a person, place, or thing"], "verb": ["an action"]},
        //     "word2": {"noun": ["a person, place, or thing"], "verb": ["an action"]}, ...
        // }
        var selectedWords = []
        var idx = 0;
        for (var word in words) {
            selectedWords.push(word);
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
        var selectedWords = selectedWords.join(', ');
        // document.getElementById('selected-words').classList.add('response-block');
        // document.getElementById('selected-words').innerHTML = '<strong>Selected Words</strong>: ' + selectedWords;
        // Display "Generating response..." placeholder
        // document.getElementById('tale').classList.add('tale');
        // document.getElementById('tale').textContent = 'Generating response...';
        
        $.get('/generate_tale/' + encodeURIComponent(selectedWords), function(response) {
            // Display the actual response
            // document.getElementById('generated-response').textContent = 'Generated Response: ' + response.response;
            // document.getElementById('tale').classList.remove('response-block')
            document.getElementById('tale').textContent = '';
            document.getElementById('tale').insertAdjacentHTML('beforeend', response.response)
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

function showTale() {
    var tale = document.getElementById('tale');
    tale.style.display = 'block';
}