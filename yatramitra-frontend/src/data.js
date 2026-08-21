export const CATEGORIES = {
  transport: "Transport Accessibility",
  food: "Food Availability",
  safety: "Safety or Near Police",
  disability: "Disability Helpful Services",
  hygiene: "Hygiene (Bathroom / Dustbin)"
};

export const PILLAR_DESCRIPTIONS = {
  transport: "Ease of public/private transit and smooth approach paths.",
  food: "Availability of reliable, clean drinking water and hygienic food.",
  safety: "General security, lighting, and proximity to tourism police.",
  disability: "Ramps, tactile paths, wheelchairs, and sensitive staff.",
  hygiene: "Cleanliness of premises, adequate dustbins, and accessible toilets."
};

export const RATING_DESCRIPTIONS = {
  1: "Fundamental barriers exist; significantly inaccessible.",
  2: "Basic provisions available; requires careful planning.",
  3: "Standard accessibility; meets most general needs.",
  4: "High standard of care; very comfortable for visitors.",
  5: "Exemplary standard; universal and flawless access."
};

export const MOCK_DATA = [
  {
    id: "1",
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
    }
  },
  {
    id: "2",
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
    }
  },
  {
    id: "3",
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
    }
  },
  {
    id: "4",
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
    }
  },
  {
    id: "5",
    name: "Dilkusha Kothi",
    location: "Cantonment, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Dilkusha_Kothi_Lucknow.jpg",
    description: "The serene ruins of an 18th-century house built in the English baroque style.",
    ratings: {
      transport: { score: 4, note: "Quiet cantonment roads, best reached by private transport.", details: { nearestHub: "Hazratganj (4km)", lastMileOptions: ["Cab", "Auto"], pavingQuality: "Excellent military roads" } },
      food: { score: 2, note: "Strictly residential/military zone.", details: { waterAvailability: "Carry your own", foodOptions: "None immediate", hygieneRating: "N/A" } },
      safety: { score: 5, note: "Located in the highly secure Cantonment area.", details: { lighting: "Daytime visit recommended", policePresence: "Military police nearby", crowdControl: "Very peaceful" } },
      disability: { score: 3, note: "Grassy lawns are flat but can be uneven for wheelchairs.", details: { wheelchairAccess: "Lawn access only", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 4, note: "Well-maintained ASI gardens.", details: { restroomAvailability: "Basic facilities", wasteDisposal: "Available", maintenance: "Good" } }
    }
  },
  {
    id: "6",
    name: "Husainabad Clock Tower",
    location: "Husainabad, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Husainabad_Clock_Tower_Lucknow.jpg",
    description: "The tallest clock tower in India, featuring stunning Victorian-Moorish architecture.",
    ratings: {
      transport: { score: 4, note: "Right next to the main heritage stretch.", details: { nearestHub: "Chhota Imambara (adjacent)", lastMileOptions: ["Walking", "E-rickshaw"], pavingQuality: "Paved plaza" } },
      food: { score: 4, note: "Adjacent to the famous street food lanes.", details: { waterAvailability: "Abundant", foodOptions: "Chaat, Kebab stalls", hygieneRating: "Street standard" } },
      safety: { score: 3, note: "Open public plaza, can get crowded.", details: { lighting: "Beautifully lit", policePresence: "Occasional patrols", crowdControl: "Unregulated" } },
      disability: { score: 4, note: "Large, flat open area surrounding the tower.", details: { wheelchairAccess: "Excellent surface", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 3, note: "Public square cleanliness varies by time of day.", details: { restroomAvailability: "Public toilets nearby", wasteDisposal: "Overfills on weekends", maintenance: "Average" } }
    }
  },
  {
    id: "7",
    name: "La Martiniere College",
    location: "Martin Purva, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/La_Martiniere_College%2C_Lucknow.jpg",
    description: "An operational educational institution housed in a spectacular palatial building.",
    ratings: {
      transport: { score: 4, note: "Accessible via Golf Club road.", details: { nearestHub: "Kalidas Marg (2km)", lastMileOptions: ["Cab", "Auto"], pavingQuality: "Good" } },
      food: { score: 1, note: "Private campus.", details: { waterAvailability: "For students", foodOptions: "None for tourists", hygieneRating: "N/A" } },
      safety: { score: 5, note: "Highly secure, active campus.", details: { lighting: "Campus lighting", policePresence: "Private security", crowdControl: "Strict entry" } },
      disability: { score: 2, note: "Exterior is viewable, interior has many stairs.", details: { wheelchairAccess: "Driveway viewing", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 5, note: "Immaculate school grounds.", details: { restroomAvailability: "Not for public", wasteDisposal: "Excellent", maintenance: "Pristine" } }
    }
  },
  {
    id: "8",
    name: "Chattar Manzil",
    location: "Qaisar Bagh, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Chattar_Manzil_Lucknow.jpg",
    description: "The Umbrella Palace, historically a royal residence, known for its distinctive dome.",
    ratings: {
      transport: { score: 4, note: "Central location near CDRI.", details: { nearestHub: "Kaiserbagh (1km)", lastMileOptions: ["Cab", "Auto"], pavingQuality: "Good" } },
      food: { score: 3, note: "City center options available.", details: { waterAvailability: "Nearby shops", foodOptions: "Restaurants close by", hygieneRating: "Good" } },
      safety: { score: 3, note: "Ongoing restoration works require caution.", details: { lighting: "Daytime best", policePresence: "Standard city police", crowdControl: "Low" } },
      disability: { score: 2, note: "Construction debris limits access.", details: { wheelchairAccess: "Difficult", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 3, note: "Dusty due to ongoing civil work.", details: { restroomAvailability: "Limited", wasteDisposal: "Temporary bins", maintenance: "Under construction" } }
    }
  },
  {
    id: "9",
    name: "Tomb of Saadat Ali Khan",
    location: "Qaisar Bagh, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Safed_Baradari_Lucknow.jpg",
    description: "A beautifully proportioned twin tomb complex featuring classic Awadhi domes.",
    ratings: {
      transport: { score: 5, note: "Direct road access in Kaiserbagh.", details: { nearestHub: "Kaiserbagh Bus Stand", lastMileOptions: ["Walking", "Auto"], pavingQuality: "Smooth" } },
      food: { score: 3, note: "Market area nearby.", details: { waterAvailability: "Outside gates", foodOptions: "Local sweets shops", hygieneRating: "Moderate" } },
      safety: { score: 4, note: "Enclosed complex.", details: { lighting: "Basic", policePresence: "ASI guards", crowdControl: "Very quiet" } },
      disability: { score: 3, note: "High plinths restrict access to the actual tombs.", details: { wheelchairAccess: "Garden only", tactilePaths: "None", assistance: "None" } },
      hygiene: { score: 4, note: "Well-swept gardens.", details: { restroomAvailability: "Basic", wasteDisposal: "Sufficient", maintenance: "Good" } }
    }
  },
  {
    id: "10",
    name: "Sikandar Bagh",
    location: "Ashok Marg, Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Sikandar_Bagh_Lucknow.jpg",
    description: "A historic villa and garden now housing the National Botanical Research Institute.",
    ratings: {
      transport: { score: 5, note: "Located on a major arterial road.", details: { nearestHub: "Hazratganj (1.5km)", lastMileOptions: ["Cab", "Auto"], pavingQuality: "Excellent" } },
      food: { score: 3, note: "Canteens and local stalls outside.", details: { waterAvailability: "Yes", foodOptions: "Snacks", hygieneRating: "Good" } },
      safety: { score: 5, note: "Institutional security.", details: { lighting: "Good", policePresence: "Institute guards", crowdControl: "Regulated" } },
      disability: { score: 4, note: "Botanical garden paths are well laid out.", details: { wheelchairAccess: "good", tactilePaths: "None", assistance: "Staff helpful" } },
      hygiene: { score: 3, note: "Maintained by scientists and botanists.", details: { restroomAvailability: "Clean toilets", wasteDisposal: "standard", maintenance: "standard" } }
    }
  }
];
