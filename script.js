// Import dei dati da db fittizio
import data from './data/jobs.js';
import data_test from './data/jobs_test.js';

// Inizializzo una variabile globalResulObject che ha come scope: "globale", la utilizzo per riutilizzare la variabile resultObject
let globalResultObject = null;

// Inizializzo la tabella del risultato della funzione searchAlgorithm, serve ad identificare poi se la tabella corrente é uguale/diversa da quella precedente
let existingTitle = null;

// Dichiarazione della arrow function searchAlgorithm che prende in input sia location che jobTitle dal db
let searchAlgorithm = (location, jobTitle) => {
    // Inizializzo un array d'appoggio per inserire i valori trovati
    let result = [];

    // Itero con un for in l'array di oggetti data
    for (const key in data) {
        // Inizializzo una variabile che prenda solo le locations dei singoli oggetti, aggiungo il punto 3 dell'esercizio 1 per il case insensitive
        const locations = data[key].location.toLowerCase();

        // Inizializzo una variabile che prenda solo i titoli delle posizioni lavorative dei singoli oggetti, aggiungo il punto 3 dell'esercizio 1 per il case insensitive
        const jobTitles = data[key].title.toLowerCase();

        // Effettuo un confronto con l'input dell'utente e ció che ho a db per trovare i lavori che soddisfano i requisiti
        if (locations.includes(location) && jobTitles.includes(jobTitle)) {

            // Inserisco all'interno dell'array di appoggio con un push, gli elementi che soddisfano i requisiti
            result.push(data[key]);
        }
    }

    // Creo l'oggetto risultato richiesto con result: gli elementi che soddisfano i requisiti e il count con il numero degli elementi
    const resultObject = {
        // Gli elementi che soddisfano i requisiti
        result: result,
        // Il numero gli elementi che soddisfano i requisiti
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
    (num === 0) ? titleResult.innerHTML = "No result" : titleResult.innerHTML = "Results: " + num;

    // Aggiungo la classe result per dargli uno styling
    titleResult.classList.add("result");

    // Aggiungo l'elemento in fondo al body del mio foglio di lavoro
    document.body.appendChild(titleResult);

    // Assegno alla variabile existingTitle il titolo corrent
    existingTitle = titleResult;
    console.log(existingTitle.innerText);
}

// TODO: REFACTOR THIS FUNCTION
// TODO: Aggiungi la condizione -> quando non ci sono risultati, non far comparire le row della tabella
let createTheResultTable = (resultArray) => {
    if (resultArray.length === 0) {
        return;
    }
    // Creazione di una tabella
    const table = document.createElement("table");

    // Aggiunta di una classe alla tabella per applicare stili CSS
    table.classList.add("result-table");

    // Creazione di righe e inserimento di testo
    let headerRow = document.createElement("tr");

    // Creazione di celle e inserimento di testo
    let headerCell1 = document.createElement("td");
    headerCell1.textContent = "#"; // Assegno valore # alla prima colonna
    headerCell1.classList.add("bold"); // Aggiungo la classe bold per dare un pó di grassetto all header cell 1
    let headerCell2 = document.createElement("td");
    headerCell2.textContent = "Location"; // Assegno valore Location alla seconda colonna
    headerCell2.classList.add("bold"); // Aggiungo la classe bold per dare un pó di grassetto all header cell 2
    let headerCell3 = document.createElement("td");
    headerCell3.textContent = "Job Title"; // Assegno valore "Job Title" alla terza colonna
    headerCell3.classList.add("bold"); // Aggiungo la classe bold per dare un pó di grassetto all header cell 3 

    // Aggiunta delle celle di intestazione alla riga di intestazione
    headerRow.appendChild(headerCell1); // La colonna #
    headerRow.appendChild(headerCell2); // La colonna "Location"
    headerRow.appendChild(headerCell3); // La colonna "Job Title"

    // Aggiunta della riga di intestazione alla tabella
    table.appendChild(headerRow);

    // Creo righe in base al numero di oggetti nell'array resultArray
    for (let i = 0; i < resultArray.length; i++) {
        // Creazione di una nuova riga per ciascun risultato
        let row = document.createElement("tr");

        // Creazione di celle e inserimento di testo
        let cell1 = document.createElement("td");
        cell1.textContent = i + 1; // Aggiungo il numero di riga incrementato dell'indice (i) + 1, le righe partiranno dal numero 1.

        // Creazione di una cella per la colonna "Location"
        let cell2 = document.createElement("td");
        cell2.textContent = resultArray[i].location;
        
        // Creazione di una cella per la colonna "Job Title"
        let cell3 = document.createElement("td");
        cell3.textContent = resultArray[i].title;

        // Aggiunta delle celle alla riga
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        // Aggiunta della riga alla tabella
        table.appendChild(row);
    }

    // Aggiunta delle righe create dal for loop al corpo del documento, sotto l'headerRow    
    document.body.appendChild(table);
}

//? MAIN FUNCTION
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
    if (!existingTitle || existingTitle.innerText !== "Results: " + resultObject.count) {
    // Rimuovo il titolo esistente se presente
    if (existingTitle) {
        existingTitle.remove();
    }

    // Stampo sul foglio di lavoro il count dei risultati trovati
    createTheResultTitle(resultObject.count);
}
    // Ottieni la tabella esistente
    const existingTable = document.querySelector('table');

    // Verifica prima se la tabella esiste già e se è diversa dalla precedente (outerHTML)
    if (existingTable && existingTable.outerHTML === document.getElementsByTagName('table')[0].outerHTML) {
        // Se è diversa alla precedente, rimuovi la tabella 
        existingTable.remove();
    }

    // Crea la tabella con i risultati
    createTheResultTable(resultObject.result);
});