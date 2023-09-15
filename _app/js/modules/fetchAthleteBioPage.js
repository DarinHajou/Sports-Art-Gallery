import { sanity } from "../sanity.js";
// import { SANITY_API_ENDPOINT } from "../config/env.js";

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
            year,
            event,
            videoLink,
            image {
                asset->{
                    url
                }
            }
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

function displayAthleteDetails(athleteData) {
    // Get the main athlete container
    const athleteContainer = document.querySelector('.athlete');

    // Get the necessary DOM elements within the athlete container
    const athleteName = athleteContainer.querySelector('.athlete__name');
    const athleteImage = athleteContainer.querySelector('.athlete__image');
    const athleteBio = athleteContainer.querySelector('.athlete__bio [data-content]');
    const athleteSportCategory = athleteContainer.querySelector('.athlete__sport-category [data-content]');
    const athleteBirthDate = athleteContainer.querySelector('.athlete__birth-date [data-content]');
    const athleteNationality = athleteContainer.querySelector('.athlete__nationality [data-content]');

    // Update the content.
    athleteName.textContent = athleteData.name;

    if (athleteData.image && athleteData.image.asset) {
        athleteImage.src = athleteData.image.asset.url;
    }

    athleteBio.textContent = athleteData.bio;

    if (athleteData.sportCategory) {
        athleteSportCategory.textContent = athleteData.sportCategory.title;
    }

    athleteBirthDate.textContent = athleteData.birthDate;
    athleteNationality.textContent = athleteData.nationality;

    // Display athlete's career titles
    const athleteCareerTitles = athleteContainer.querySelector('.athlete__career-titles-list[data-content]');
    athleteCareerTitles.innerHTML = athleteData.careerTitles.map(title => `
    <li class="athlete__title-item">
        <i class="athlete__title-icon fas fa-trophy"></i>
        <span class="athlete__title-description">${title}</span>
    </li>`).join('');

    // Display athlete's position or role
    const athletePositionRole = athleteContainer.querySelector('.athlete__position-role [data-content]');
    athletePositionRole.textContent = athleteData.positionOrRole;

    // Display athlete's career timeline dynamically
    const athleteTimeline = athleteContainer.querySelector('#athlete__timeline-list');
    console.log('Athlete Timeline:', athleteTimeline); // Debug line

    athleteTimeline.innerHTML = ''; // Clear any existing items

    athleteData.careerTimeline.forEach(eventItem => {
        console.log('Event Item:', eventItem);

        const timelineItem = document.createElement('li');
        timelineItem.classList.add('athlete__timeline-item');
    
        // Create year and event span
        const year = document.createElement('span');
        year.classList.add('athlete__timeline-year');
        year.textContent = eventItem.year;
        timelineItem.appendChild(year);
    
        const eventSpan = document.createElement('span');
        eventSpan.classList.add('athlete__timeline-event');
        eventSpan.textContent = eventItem.event;
        timelineItem.appendChild(eventSpan);
    
        // Create modal for extra information
        const modal = document.createElement('div');
        modal.classList.add('athlete__timeline-modal');
    
        const eventText = document.createElement('p');
        eventText.textContent = eventItem.event;
        modal.appendChild(eventText);
        
        if (eventItem.image && eventItem.image.asset) {
            const eventImage = document.createElement('img');
            eventImage.src = eventItem.image.asset.url;
            eventImage.alt = `${eventItem.year} event`;
            modal.appendChild(eventImage);
        }
        
        if (eventItem.videoLink) {
            const videoLink = document.createElement('a');
            videoLink.href = eventItem.videoLink;
            videoLink.textContent = 'Watch Video';
            videoLink.classList.add('athlete__video-link--black');
            modal.appendChild(videoLink);
        }
    
        timelineItem.appendChild(modal);
        athleteTimeline.appendChild(timelineItem);
    });

        // Display athlete's stats dynamically
        const athleteStats = athleteContainer.querySelector('.athlete__stats [data-content]');
        athleteStats.innerHTML = ''; // Clear any existing items
        athleteData.stats.forEach(stat => {
            const statItem = document.createElement('p');
            statItem.classList.add('athlete__stats-item');
            statItem.textContent = `${stat.statName}: ${stat.statValue}`;
            athleteStats.appendChild(statItem);
        });
}
export function loadAndDisplayAthleteBioPage(athleteId) {
    fetchAthleteBioPage(athleteId)
        .then(athleteData => {
            displayAthleteDetails(athleteData);
        })
        .catch(error => {
            console.error("Error fetching and displaying athlete bio:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    // Extract the athlete ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    if (athleteId) {
        loadAndDisplayAthleteBioPage(athleteId);
    }
});
