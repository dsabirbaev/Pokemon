let [data] = [pokemons];



/////////////// Render pokemons data //////////////////////

function renderAllPokemons(data) {
    if (data.length) {

        data.forEach((e) => {

            const div = createElement('div', 'w-[307px] min-h-[423px] bg-white rounded-[20px] border-2 border-black', `
                <div class="border-b-2 border-black flex items-center justify-center pt-[30px] pb-[68px]">
                    <img title="Pokemon" src="${e.img}" alt="pokemon">
                </div>
                <div class="py-5 px-[30px] text-[24px]">
                    <div class="flex justify-between">
                        <p>${e.name}</p> <img src="./assets/icons/like-card.svg" alt="like" class="save_card cursor-pointer">
                    </div>
                    <p class="text-[20px] font-medium mb-[25px]">${e.type}</p>
                    <div>
                        <span class="mr-[5px]">${e.weight}</span> <span>${e.height}</span>
                    </div>
                </div>
            `)
            div.dataset.pokemon = e.id;
            $(".pokemon-wrapper").append(div);
        })
    }
}

renderAllPokemons(data)


/////////////// Get categories ///////////////


let category = [];

function getCategory(data) {
    if (data.length > 0) {
        data.forEach((el) => {
            el.type.forEach((item) => {
                category.push(item)
            })
        })
    }
}

getCategory(data)

const uniqueCategory = Array.from(new Set(category));

uniqueCategory.sort().forEach((el) => {
    let option = createElement('option', 'item', el);
    $("#category").append(option)
})


////////// select categories

$("#category").addEventListener('change', (e) => {
    $(".pokemon-wrapper").innerHTML = "";
    const result = data.filter((item) => {
        return item.type.toString().toLowerCase() === e.target.value.toLowerCase();
    })

    renderAllPokemons(result);
})



//////////// select sort to abc letters

$("#sort_letter").addEventListener('change', (e) => {

    if (e.target.value === 'Aa') {
        $(".pokemon-wrapper").innerHTML = "";
        let res = data.sort((a, b) => {
            if(a.name < b.name) return -1;
        });
        renderAllPokemons(res);
    }

    if (e.target.value === 'Zz') {
        $(".pokemon-wrapper").innerHTML = "";
        let res = data.sort((a, b) => {
            if(a.name > b.name) return -1;
        });
        renderAllPokemons(res);
    }
})


//////////////// Search ///////////

$("#search_pokemon").addEventListener('keyup', (e) => {
    $(".pokemon-wrapper").innerHTML = "";
    const filterPokemon = data.filter(item => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    })

    renderAllPokemons(filterPokemon)
})


////////////// Events to Local Storage ///////////

function findElement(data, id) {

    return data.filter(item => item.id === +id);
}
let cards = [];

function saveToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cards))
}

$(".pokemon-wrapper").addEventListener('click', (e) => {
    if (e.target.classList.contains('save_card')) {
        const pokemonID = e.target.parentNode.parentNode.parentNode.getAttribute('data-pokemon');
        const result = findElement(data, pokemonID)[0];
        cards.push(result);
        saveToLocalStorage();
    }
})


$("#open_modal").addEventListener('click', (e) => {
    e.preventDefault()
    $(".wrapper-modal").classList.toggle('hidden');
    document.body.style.cssText = "overflow: hidden;" /// stop scroll body
    renderModal();
  
})


function getAllLocalStorageKeys() {
    let keys = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        keys.push(key);
    }
    return keys;
}

function renderModal() {
    let modalResult = "";
    const cards = JSON.parse(localStorage.getItem('cards'))

    cards.forEach(card => {
        modalResult += `
        <div class="pokemon_card w-[307px] min-h-[423px] bg-white rounded-[20px] border-2 border-black" data-card="${card.id}">
            <div class="border-b-2 border-black flex items-center justify-center pt-[30px] pb-[68px]">
                <img title="Pokemon" src="${card.img}" alt="pokemon">
            </div>
            <div class="py-5 px-[30px] text-[24px]">
                <div class="flex justify-between">
                    <p>${card.name}</p> <img src="./assets/icons/rubbish.svg" alt="rubbish" class="remove_card cursor-pointer">
                </div>
                <p class="text-[20px] font-medium mb-[25px]">${card.type}</p>
                <div>
                    <span class="mr-[5px]">${card.weight}</span> <span>${card.height}</span>
                </div>
            </div>
        </div>
    `

    })

    $(".modal-body").innerHTML = modalResult;

    if (cards.length === 0) {
        $(".modal-body").innerHTML = `<h1 class="text-2xl text-red-700"> Empty </h1>`
    }

}


//////// Close modal window

$("#close").addEventListener('click', () => {
    $(".wrapper-modal").classList.add('hidden');
    document.body.style.cssText = "overflow: auto;" /// remove stop scroll body
})


//////// Remove item from cards //////

$(".modal-body").addEventListener('click', (e) => {
    if (e.target.classList.contains('remove_card')) {
        const parenNode = e.target.closest('.pokemon_card')
        const pokemonID = e.target.parentNode.parentNode.parentNode.getAttribute('data-card');
        
        cards = cards.filter(card => card.id !== +pokemonID)
        parenNode.remove()
        saveToLocalStorage();
    }
})