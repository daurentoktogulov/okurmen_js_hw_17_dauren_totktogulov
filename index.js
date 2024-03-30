function addCountryCard() {
    const countryInput = document.getElementById('countryInput');
    const countryName = countryInput.value.trim();

    if (countryName === '') {
        return;
    }

    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const country = data.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());
            if (!country) {
                alert('Country not found. Please enter the correct country name!');
                return;
            }
            const countryCard = createCountryCard(country);
            const container = document.getElementById('countryCardsContainer');
            container.insertBefore(countryCard, container.firstChild);
            countryInput.value = '';
        })
        .catch(error => console.error('Error loading country data:', error));
}

function createCountryCard(country) {
    const countryCard = document.createElement('div');
    countryCard.classList.add('countrycards');

    const countryNameElement = document.createElement('h3');
    countryNameElement.textContent = country.name.common;
    countryCard.appendChild(countryNameElement);

    const countryFlag = document.createElement('img');
    countryFlag.classList.add('countryflags');
    countryFlag.src = country.flags.svg;
    countryCard.appendChild(countryFlag);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
    countryCard.remove();
    };

    countryCard.appendChild(deleteButton);

    const currentDate = new Date().toLocaleDateString();
    const dateParagraph = document.createElement('p');
    dateParagraph.textContent = 'Date: ' + currentDate;
    countryCard.appendChild(dateParagraph);
    return countryCard;
}