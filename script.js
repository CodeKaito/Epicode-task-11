// Import dei dati da db fittizio
import data from './data/jobs.js';
import data_test from './data/jobs_test.js';

// Il risultato della funzione searchAlgorithm
let globalResultObject = null;

// La tabella del risultato della funzione searchAlgorithm
let existingTable = null;

// Il titolo del risultato della funzione
let existingTitle = null;

// Dichiarazione della arrow function searchAlgorithm che prende in input sia location che title
let searchAlgorithm = (location, jobTitle) => {
    // Inizializzo un array d'appoggio per inserire i valori trovati
    let result = [];

    // Itero con un for in l'array di oggetti data
    for (const key in data) {
        // Inizializzo una variabile che prenda solo le locations dei singoli oggetti, aggiungo il punto 3 dell'esercizio 1 per il case insensitive
        const locations = data[key].location.toLowerCase();

        // Inizializzo una variabile che prenda solo i titoli delle posizioni lavorative dei singoli oggetti, aggiungo il punto 3 dell'esercizio 1 per il case insensitive
        const titleJobs = data[key].title.toLowerCase();

        // Effettuo un confronto con l'input dell'utente e ció che ho a db per trovare i lavori che soddisfano i requisiti
        if (locations.includes(location) && titleJobs.includes(jobTitle)) {

            // Inserisco all'interno dell'array di appoggio con un push, gli elementi che soddisfano i requisiti
            result.push(data[key]);
        }
    }

    // Creo l'oggetto risultato richiesto con result: gli elementi che soddisfano i requisiti e il count con il numero degli elementi
    const resultObject = {
        // gli elementi che soddisfano i requisiti
        result: result,
        // il numero gli elementi che soddisfano i requisiti
        count: result.length,
    };
    // Salvo il risultato resultObject nella variabile esterna 
    globalResultObject = resultObject;
    // Guardo a video se il risultato finale soddisfa i requisiti richiesti
    console.log(globalResultObject);
    // Ritorno il risultato in formato array di oggetti alla funzione searchAlgorithm iniziale
    return resultObject;
}

// Definizione della funzione per creare il titolo "Result"
let createTheResultTitle = (num) => {
    // Creo l'elemento h1 per il titolo "Result"
    const titleResult = document.createElement("h1");

    // Se ho risultati, aggiungo il valore "Result: " + il count dei risultati, se no mostro la scritta "NO RESUL"
    (num === 0) ? titleResult.innerHTML = "No result" : titleResult.innerHTML = "Result: " + num;

    // Aggiungo la classe result per dargli uno styling
    titleResult.classList.add("result");

    // Aggiungo l'elemento in fondo al body del mio foglio di lavoro
    document.body.appendChild(titleResult);

    // Assegno alla variabile existingTitle il titolo corrent
    existingTitle = titleResult;
    console.log(existingTitle.innerText);
}

// TODO: create the result table
let createTheResultTable = (resultArray) => {
    // Creazione di una tabella
    const table = document.createElement("table");

    // Aggiunta di una classe alla tabella per applicare stili CSS
    table.classList.add("result-table");

    // Creazione di righe e inserimento di testo
    let headerRow = document.createElement("tr");

    // Creazione di celle e inserimento di testo
    let headerCell1 = document.createElement("td");
    headerCell1.textContent = "#";
    let headerCell2 = document.createElement("td");
    headerCell2.textContent = "Location";
    let headerCell3 = document.createElement("td");
    headerCell3.textContent = "Job Title";

    // Aggiunta delle celle di intestazione alla riga di intestazione
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    headerRow.appendChild(headerCell3);

    // Aggiunta della riga di intestazione alla tabella
    table.appendChild(headerRow);

    // Creo righe in base al numero di oggetti nell'array resultArray
    for (let i = 0; i < resultArray.length; i++) {
        // Creazione di una nuova riga per ciascun risultato
        let row = document.createElement("tr");

        // Creazione di celle e inserimento di testo
        let cell1 = document.createElement("td");
        cell1.textContent = (i + 1).toString(); // Numero di riga
        let cell2 = document.createElement("td");
        cell2.textContent = resultArray[i].location;
        let cell3 = document.createElement("td");
        cell3.textContent = resultArray[i].title;

        // Aggiunta delle celle alla riga
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        // Aggiunta della riga alla tabella
        table.appendChild(row);
    }

    // Aggiunta della tabella al corpo del documento
    document.body.appendChild(table);

    // Aggiorno la variabile existingTable con la nuova tabella
    existingTable = table;
}

// Inserisco in una variabile il pulsante button
let submit = document.getElementById('cerca');
// Richiamo l'addEventListener per richiamare la funzione
submit.addEventListener('click', async() => {
    // Identifico i valori dell'input della location
    let location = document.getElementById('location').value;

    // Identifico i valori dell'input del job title
    let jobTitle = document.getElementById('jobTitle').value;

    // Verifico se gli input sono vuoti, se lo sono, voglio che la function si fermi e che la pagina mi dia un'errore
    if (location === '' || jobTitle === '') {
        alert("Error! Insert both values!");
        // Interrompe l'esecuzione dell'intera funzione
        return;
    }
    // Chiamo la searchAlgorithm in async, awaito che la promise venga completata e assegno questo valore al resultObject
    const resultObject = await searchAlgorithm(location, jobTitle);
    
    // Ottengo il titolo esistente
    const existingTitle = document.querySelector('.result');

    // Verifico se il titolo è già presente sul foglio di lavoro
    if (!existingTitle || existingTitle.innerText !== "Result: " + resultObject.count) {
    // Rimuovo il titolo esistente se presente
    if (existingTitle) {
        existingTitle.remove();
    }

    // Stampo sul foglio di lavoro il count dei risultati trovati
    createTheResultTitle(resultObject.count);
}
    

    // Ottieni la tabella esistente
    const existingTable = document.querySelector('table');

    // Verifica se la tabella esiste già e se è diversa dalla precedente (outerHTML)
    if (existingTable && existingTable.outerHTML === document.getElementsByTagName('table')[0].outerHTML) {
        // Se è uguale, rimuovi la tabella
        existingTable.remove();
    }

    // Crea la tabella con i risultati
    createTheResultTable(resultObject.result);
});

