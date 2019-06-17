
const searchForm = document.getElementById('search-form');
const searchWord = document.getElementById('searchInput');
const submitSearch = document.getElementById('search-btn');

const nameItem = document.getElementById('headword');
const flabel = document.getElementById('label');
const syllables = document.getElementById('syllable');
const pronounciation = document.getElementById('pronounciation');
const pronounce = document.getElementById('pronounce');
const definition = document.getElementById('definition');
const word = document.getElementById('word');
const sentence = document.getElementById('sentence');
// const others = document.getElementById('others');


function get(name) {
return fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${name}?key=e068c25f-2137-4783-bbde-92209458e128`)
.then(res => res.json())
}

submitSearch.addEventListener('click', search);
searchWord.addEventListener('keyup', checkSearch);

searchWord.addEventListener('keyup', suggestions);
pronounciation.addEventListener('click', play);

function checkSearch(event) {
    if(event.keyCode == 13) search();
}

function play() {
    pronounce.play();
}

function suggestions(e) {
if(e.keyCode != 8) {
    const searchWord = document.getElementById('searchInput').value;
    const suggestions = document.getElementById('suggestions');
var arr = [];
var count = 0;
var counts = 0;
    var dictionary = get(searchWord);
    dictionary.then(words => {
        words.map(incWords =>{
            if(incWords.hwi){
                if (counts < 5) { 
                arr.push(incWords.hwi.hw);
                count++;
                }
            }else{
                if (count < 5) {
                    arr.push(incWords); 
                    count++;
                }
            }
        })
        let x = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);
        var suggest = (x(arr)).splice(0, 5);
        console.log(suggest);
        suggestions.innerHTML = 
        suggest.map(suggestWord => {
            return` <option value="${suggestWord}">${suggestWord}</option>`
        })

    })
}
}


function search() {
   searchName = searchWord.value;
    var dictionary = get(searchName);
    nameItem.textContent = searchName; 
    word.innerHTML = searchName;
    // others.innerHTML = searchName;
    sample.innerHTML = searchName;
    
    var firstLetter = (searchName[0]).toLowerCase();

    dictionary.then(word => {
        console.log(word[0]);  
        flabel.innerHTML = word[0].fl;
        syllables.innerHTML = word[0].hwi.hw;
        pronounce.setAttribute('src', `https://media.merriam-webster.com/soundc11/${firstLetter}/${word[0].hwi.prs[0].sound.audio}.wav`);

        definition.innerHTML =
        (word[0].shortdef).map(define =>{
            return `<li class="definition" id="meaning">${define}</li>`
        }).join('');

        sentence.innerHTML = 
        (word[0].def[0].sseq[0][0][1].dt[1][1]).map(sample => {
            var replace1 = sample.t.split('{it}').join('');
            var replace2 = replace1.split('{/it}').join('');
            var replace3 = replace2.split('{phrase}').join('');

            return `<li class="definition"> ${replace3.split('{/phrase}').join('')}</li>`
        }).join('');
    });
}




