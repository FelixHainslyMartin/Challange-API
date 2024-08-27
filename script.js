async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTemplate(character) {
    const source = document.getElementById('character-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(character);
    document.getElementById('content').innerHTML = html;
}

async function loadCharacter(index) {
    document.getElementById("content").style.display = 'none';
    document.getElementById("loading").style.display = 'block';
    const url = `https://dragonball-api.com/api/characters/${index}`;
    const data = await fetchData(url);
    renderTemplate(data);
    document.getElementById("content").style.display = 'block';
    document.getElementById("loading").style.display = 'none';
}

async function searchCharacter(name) {
    document.getElementById("content").style.display = 'none';
    document.getElementById("loading").style.display = 'block';
    const url = `https://dragonball-api.com/api/characters?name=${name}`;
    const data = await fetchData(url);
    if (data.length > 0) {
        renderTemplate(data[0]);
    } else {
        alert("Character not found!");
    }
    document.getElementById("content").style.display = 'block';
    document.getElementById("loading").style.display = 'none';
}

let currentIndex = 1;

document.getElementById("right").addEventListener('click', () => {
    currentIndex++;
    loadCharacter(currentIndex);
});

document.getElementById("left").addEventListener('click', () => {
    if (currentIndex > 1) {
        currentIndex--;
        loadCharacter(currentIndex);
    }
});

document.getElementById("searchButton").addEventListener('click', () => {
    const name = document.getElementById("searchInput").value;
    if (name) {
        searchCharacter(name);
    }
});

loadCharacter(currentIndex);