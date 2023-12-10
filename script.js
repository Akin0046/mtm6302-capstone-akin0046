// NASA API key
const apiKey = 'djKZYadqZKt6h8erRumtaJGPAbU2J21egco51gEr';


// Function to fetch APOD based on date

async function fetchAPOD(date) {
    const apiKey = 'djKZYadqZKt6h8erRumtaJGPAbU2J21egco51gEr';
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();

        if (data.media_type === 'image') {
            displayAPOD(data);
        } else {
            alert('The APOD for this date is not an image.');
        }
    } catch (error) {
        console.error('Error fetching APOD:', error);
        alert('Failed to fetch APOD.');
    }
}