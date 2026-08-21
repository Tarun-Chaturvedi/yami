const mongoose = require('mongoose');
require('dotenv').config();
const Heritage = require('./models/Heritage');

// The same mock data from our frontend, but we'll add 'isPublished: true' 
// so the Express route actually sends them to the frontend.
const SEED_DATA = [
  {
    name: "Bara Imambara",
    location: "Husainabad, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bara_Imambara_Lucknow.jpg",
    description: "An architectural marvel famous for its gravity-defying central hall and the intricate Bhool Bhulaiya (labyrinth).",
    ratings: {
      transport: { score: 5, note: "Easily accessible via Metro and main roads.", details: { nearestHub: "Charbagh Railway Station (5km)", lastMileOptions: ["Auto-rickshaw", "Cab", "Metro"], pavingQuality: "Smooth asphalt to gates" } },
      food: { score: 4, note: "Street food and cafes abound outside the complex.", details: { waterAvailability: "RO points inside", foodOptions: "Multiple local eateries", hygieneRating: "Moderate to Good" } },
      safety: { score: 4, note: "High tourist footfall with active police presence.", details: { lighting: "Well-lit in evenings", policePresence: "Tourism police post nearby", crowdControl: "Managed via ticketing" } },
      disability: { score: 2, note: "Ground floor accessible, but labyrinth requires climbing.", details: { wheelchairAccess: "Ground floor only", tactilePaths: "None", assistance: "Staff available upon request" } },
      hygiene: { score: 4, note: "Regularly cleaned premises with designated facilities.", details: { restroomAvailability: "Paid toilets outside", wasteDisposal: "Dustbins every 50m", maintenance: "Daily sweeping" } }
    },
    isPublished: true
  },
  {
    name: "Chhota Imambara",
    location: "Husainabad, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Chota_Imambara%2C_Lucknow.jpg",
    description: "Known as the Palace of Lights, adorned with exquisite chandeliers and intricate calligraphy.",
    ratings: {
      transport: { score: 4, note: "Located slightly further down the heritage corridor.", details: { nearestHub: "Chowk Area (2km)", lastMileOptions: ["E-rickshaw", "Walking"], pavingQuality: "Cobblestone and brick" } },
      food: { score: 3, note: "Limited options immediately outside.", details: { waterAvailability: "Bottled water stalls", foodOptions: "Snack vendors", hygieneRating: "Moderate" } },
      safety: { score: 4, note: "Secure, walled compound.", details: { lighting: "Excellent evening illumination", policePresence: "Patrolling guards", crowdControl: "Generally quiet" } },
      disability: { score: 3, note: "Fewer stairs than Bara Imambara, mostly flat courtyards.", details: { wheelchairAccess: "Courtyard accessible", tactilePaths: "None", assistance: "Limited" } },
      hygiene: { score: 4, note: "Well-maintained gardens and water features.", details: { restroomAvailability: "Basic facilities", wasteDisposal: "Adequate bins", maintenance: "High standard" } }
    },
    isPublished: true
  },
  {
    name: "The Residency",
    location: "Qaisar Bagh, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/The_Residency_Lucknow.jpg",
    description: "Sprawling historical ruins surrounded by gardens, marking the site of the 1857 siege.",
    ratings: {
      transport: { score: 5, note: "Centrally located with ample parking.", details: { nearestHub: "Hazratganj (2km)", lastMileOptions: ["Private Vehicle", "Cab"], pavingQuality: "Wide, smooth roads" } },
      food: { score: 2, note: "No food allowed inside to preserve the site.", details: { waterAvailability: "Water coolers present", foodOptions: "None inside", hygieneRating: "N/A" } },
      safety: { score: 4, note: "Enclosed ASI protected monument.", details: { lighting: "Closes at sunset", policePresence: "ASI Guards", crowdControl: "Vast area, rarely crowded" } },
      disability: { score: 4, note: "Extensive flat, paved pathways ideal for wheelchairs.", details: { wheelchairAccess: "Most paths accessible", tactilePaths: "Partial", assistance: "Ramps at museum entrance" } },
      hygiene: { score: 5, note: "Spotlessly clean ASI-maintained environment.", details: { restroomAvailability: "Clean visitor toilets", wasteDisposal: "Strictly enforced", maintenance: "Excellent" } }
    },
    isPublished: true
  },
  {
    name: "Rumi Darwaza",
    location: "Husainabad, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Rumi_Darwaza%2C_Lucknow.jpg",
    description: "An imposing 60-foot gateway serving as the iconic symbol of Awadhi architecture.",
    ratings: {
      transport: { score: 5, note: "Acts as a major thoroughfare for traffic.", details: { nearestHub: "Bara Imambara (adjacent)", lastMileOptions: ["All transport"], pavingQuality: "Standard roadway" } },
      food: { score: 3, note: "Surrounded by bustling markets.", details: { waterAvailability: "Shops nearby", foodOptions: "Extensive street food", hygieneRating: "Varies wildly" } },
      safety: { score: 2, note: "Heavy traffic makes pedestrian crossing dangerous.", details: { lighting: "Street lights", policePresence: "Traffic police", crowdControl: "Hectic" } },
      disability: { score: 1, note: "It is a traffic roundabout with no dedicated pedestrian refuge.", details: { wheelchairAccess: "Not safe for viewing", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 2, note: "High pollution and litter due to passing traffic.", details: { restroomAvailability: "None at structure", wasteDisposal: "Poor", maintenance: "Requires civic intervention" } }
    },
    isPublished: true
  }
];

const seedDB = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to MongoDB for seeding...');

    // 2. Clear existing data to prevent duplicates
    await Heritage.deleteMany({});
    console.log(' Cleared existing heritage sites.');

    // 3. Insert new data by looping (this ensures our pre('save') hook runs to calculate overallAvg)
    for (const siteData of SEED_DATA) {
      const site = new Heritage(siteData);
      await site.save();
    }
    
    console.log(` Successfully seeded ${SEED_DATA.length} sites into the database!`);
    
    // 4. Disconnect and exit
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
