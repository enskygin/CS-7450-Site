
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').slice(1);
            const data = rows.map(row => {
                const [topic, publication, title, link] = row.split(',');
                return { topic, publication, title, link };
            });
            return data;
        });
}


function populatePublications(publications) {
    const publicationsSection = document.getElementById('publications');
    const publicationsContainer = document.createElement('div'); 
    publicationsContainer.classList.add('publications-container'); 
    
    const titleElement = document.createElement('h1');
    titleElement.textContent = "Publications";
    publicationsContainer.appendChild(titleElement);
   
    const publicationsList = document.createElement('div'); 
    publicationsList.classList.add('publication-list'); 
    publications.forEach(publication => {
        const publicationElement = document.createElement('div');
        publicationElement.innerHTML = `
            <h2>${publication.topic}</h2>
            <p>${publication.publication}: <a href="${publication.link}" target="_blank">${publication.title}</a></p>
        `;
        publicationsList.appendChild(publicationElement);
    });
    publicationsContainer.appendChild(publicationsList); 
    publicationsSection.appendChild(publicationsContainer); 
}




fetchCSV('publications.csv')
    .then(publications => populatePublications(publications))
    .catch(error => console.error('Error fetching publications:', error));




const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");


svg.setAttribute("width", "400");
svg.setAttribute("height", "400");


fetch("frame1.svg")
    .then(response => response.text())
    .then(svgContent => {
        
        svg.innerHTML = svgContent;

        document.body.appendChild(svg);

        svg.classList.add("svg-container");
    })
    .catch(error => console.error("Error loading SVG:", error));
