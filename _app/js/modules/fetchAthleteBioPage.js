import { sanity } from "../sanity.js";

/**
 * Fetch specific athlete's bio data from the database.
 *
 * This function queries the database for a specific athlete's bio data based on their ID.
 * 
 * @param {string} athleteId - The ID of the athlete whose bio is to be fetched.
 * @returns {Promise<Object>} An object containing the athlete's bio data.
 * @throws {Error} Throws an error if there is an issue fetching data.
 * 
 * @example
 * const athleteBioData = await fetchAthleteBio('some-athlete-id');
 * console.log(athleteBioData);
 * 
 * @see {@link https://www.sanity.io/docs/groq-syntax | Sanity GROQ Syntax Documentation}
 * @see {@link https://www.sanity.io/docs/http-query | Sanity HTTP Query Documentation}
 */
export default async function fetchAthleteBioPage(athleteId) {
    if (!athleteId) {
        throw new Error("Invalid athleteId: undefined or null.");
    }

    // Define the GROQ query to fetch all relevant details for the athleteBioPage.
    const query = `*[_type == 'athleteBio' && _id == $athleteId]{
        _id,
        name,
        slug,
        image {
            asset->{
                url
            }
        },
        sportCategory->{
            _type,
            title
        },
        bio,
        birthDate,
        nationality,
        careerTitles,
        positionOrRole,
        stats[]{
            statName,
            statValue
        },
        careerTimeline[]{
            date,
            event
        }
    }[0]`; // We add [0] at the end to get the first item, assuming IDs are unique.

    try {
        // Use the sanity client to fetch data based on the GROQ query.
        const data = await sanity.fetch(query, { athleteId, expandRefs: true });
        return data;
    } catch (error) {
        console.error("Error fetching athlete bio data:", error);
        throw error;
    }
}
