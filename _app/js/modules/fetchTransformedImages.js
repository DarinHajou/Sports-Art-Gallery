import { sanity } from "../sanity.js";

/**
 * Fetch transformed images and associated data from the database.
 *
 * This function queries the database for transformed images and returns associated data 
 * such as name, slug, and image URL, as well as the name and _id of the referenced athlete bio.
 * 
 * @returns {Promise<Array<Object>>} An array of objects containing image data.
 * @throws {Error} Throws an error if there is an issue fetching data.
 * 
 * @example
 * const imageData = await FetchAndDisplayTransformedImages();
 * console.log(imageData);
 * 
 * @see {@link https://www.sanity.io/docs/groq-syntax | Sanity GROQ Syntax Documentation}
 * @see {@link https://www.sanity.io/docs/http-query | Sanity HTTP Query Documentation}
 */
export default async function fetchTransformedImages() {
  // Define the GROQ query to fetch transformed images with their associated data.
  // The query fetches primary details of the transformed images and also dereferences 
  // associated 'athleteBio' to fetch the name and _id.
  const query = `*[_type == 'transformedImages']{
    _id,
    name,
    slug,
    image {
      asset->{
        url
      }
    },
    imageStyle->{_id, description},
    athleteBio->{
      _id,
      name
    }
  }`;

  try {
    // Use the sanity client to fetch data based on the GROQ query.
    const data = await sanity.fetch(query, { expandRefs: true });
    console.log("Fetched data:", data);
    
    return data;  // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);  // Log any errors
    throw error;  // Propagate the error to the caller
  }
}