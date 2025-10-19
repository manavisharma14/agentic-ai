import type { Tool } from '../types.js'

export const getweathertool : Tool = {
    schema: {
        type: "function",
        function: {
            name: "weathertool",
            description: "get the weather for a given city",
            parameters: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "name of the city to get the weather for."
                    },
                    
                },
                required: ["city"]
            }
        }
    },
    handler: async (args: {city : string}) => {
        const {city} = args;
        try {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`);
            const geoData = await geoRes.json();

            if(!geoData.results?.length){
                return ` couldn't find coordinates for ${city}`
            }
            const { latitude, longitude} = geoData.results[0];

            // get weather using coordinates
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

            const weatherData = await weatherRes.json()
            const weather = weatherData.current_weather;

            if(!weather){
                return `no weather data found for this city`
            }
            return `the weather in the city ${city} is ${weather.temperature}.C with windspeed ${weather.windspeed}km/h`
        }
        catch(err){
            console.log("error in getweathertool", err);
            return "an error occured while fetching the weather of this city"
        }

    }   
}