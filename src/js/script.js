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
                    <div class="flex justify-between items-center">
                        <p>${e.name}</p> 
                        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="save_card cursor-pointer">
                            <path id="card_like" fill-rule="evenodd" clip-rule="evenodd" d="M7.02463 2.5C5.94463 2.5 4.93213 2.9175 4.17463 3.67625C2.60213 5.25125 2.60213 7.815 4.17588 9.3925L12.9996 18.2312L21.8246 9.3925C23.3984 7.815 23.3984 5.25125 21.8246 3.67625C20.3096 2.1575 17.6396 2.16 16.1246 3.67625L13.8846 5.92C13.4146 6.39125 12.5846 6.39125 12.1146 5.92L9.87463 3.675C9.11713 2.9175 8.10588 2.5 7.02463 2.5ZM12.9996 21.25C12.6684 21.25 12.3496 21.1187 12.1159 20.8825L2.40588 11.1575C-0.139119 8.6075 -0.139119 4.45875 2.40588 1.90875C3.63588 0.67875 5.27588 0 7.02463 0C8.77338 0 10.4146 0.67875 11.6434 1.90875L12.9996 3.2675L14.3559 1.91C15.5859 0.67875 17.2259 0 18.9759 0C20.7234 0 22.3646 0.67875 23.5934 1.90875C26.1396 4.45875 26.1396 8.6075 23.5946 11.1575L13.8846 20.8838C13.6496 21.1188 13.3321 21.25 12.9996 21.25Z" fill="#231F20"/>
                        </svg>
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
                <div class="flex justify-between items-center">
                    <p>${card.name}</p>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="remove_card cursor-pointer">
                        <path id="Mask" fill-rule="evenodd" clip-rule="evenodd" d="M20.5 21.75C20.5 22.4388 19.94 23 19.25 23H6.75C6.06 23 5.5 22.4388 5.5 21.75V8H20.5V21.75ZM10.5 3.41C10.5 3.21625 10.7675 3 11.125 3H14.875C15.2325 3 15.5 3.21625 15.5 3.41V5.5H10.5V3.41ZM24.25 5.5H23H18V3.41C18 1.805 16.5987 0.5 14.875 0.5H11.125C9.40125 0.5 8 1.805 8 3.41V5.5H3H1.75C1.0625 5.5 0.5 6.0625 0.5 6.75C0.5 7.4375 1.0625 8 1.75 8H3V21.75C3 23.8175 4.6825 25.5 6.75 25.5H19.25C21.3175 25.5 23 23.8175 23 21.75V8H24.25C24.9375 8 25.5 7.4375 25.5 6.75C25.5 6.0625 24.9375 5.5 24.25 5.5Z" fill="black"/>
                    </svg>                    
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