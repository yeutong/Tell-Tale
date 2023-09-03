function selectWords() {
    var selected_div = document.getElementById('selected-words');
    selected_div.style.display = 'block';
    var tale_reg_div = document.getElementById('gen-tale-button');
    tale_reg_div.style.display = 'block';
    var tale_div = document.getElementById('tale');
    tale_div.textContent = 'Typing...';
    tale_div.style.display = 'none';


    $.get('/get_words', function(words) {
        var selectedWords = []
        var idx = 0;
        for (var word in words) {
            selectedWords.push(word);
            var word_div = document.getElementById('word' + idx);
            word_div.textContent = word;

            var def_div = document.getElementById('definition' + idx);
            def_div.innerHTML = '';

            // add audio icon: <i class='fas fa-headphones'></i>
            def_div.innerHTML += '<p><span class="icon" onclick="playAudio(' + idx + ')" style="cursor: pointer;">🎧</span> ' + words[word]['short'] + '</p>';

            

            // add short definition
            // def_div.innerHTML += words[word]['short'] + '</p>';

            // add long definition with italics
            def_div.innerHTML += '<p><em>' + words[word]['long'] + '</em></p>';

            // for (var pos in words[word]) {
            //     def_div.innerHTML += '<button class="audio-button" onclick="playAudio(' + idx + ')"><strong>' + pos + '</strong></button>';
            //     def_div.innerHTML += '<p>' + words[word][pos] + '</p>';
            //     // def_div.innerHTML += '<ul>';
            //     // var defs = words[word][pos];
            //     // for (var i = 0; i < defs.length; i++) {
            //     //     def_div.innerHTML += '<li>' + defs[i] + '</li>';
            //     // }
            //     // def_div.innerHTML += '</ul>';
            // }
            idx++;
        }
        var selectedWords = selectedWords.join(', ');
        
        $.get('/generate_tale/' + encodeURIComponent(selectedWords), function(response) {
            document.getElementById('tale').textContent = '';
            document.getElementById('tale').insertAdjacentHTML('beforeend', response.response)
        });
    });
}

function playAudio(idx) {
    var word = document.getElementById('word' + idx).textContent;
    var audio = new Audio('static/data/audio/' + word + '.mp3');
    audio.play();
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