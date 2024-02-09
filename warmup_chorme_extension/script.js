async function fetchData() {
    const url = 'https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Paris&minDate=2024-01-24&maxDate=2024-01-26&page=1';
    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'c6f70b482bmsh9d056b62eb4f236p1c0513jsnac3ceaaa5238',
    		'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
    	}
    };

    try {
    	const response = await fetch(url, options);
    	const result = await response.json();
    	document.getElementById("concerts").innerHTML= result.data.map(item =>`<li>${item.name}</li>`).join('');
    } catch (error) {
    	console.error(error);
    }
}

fetchData();