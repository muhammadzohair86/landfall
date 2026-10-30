export const regions = ['Europe', 'Africa', 'North America', 'Worldwide'];
export const travelStyles = ['Coast & beach', 'Mountains & nature', 'City & culture', 'Adventure'];

// Sample destinations. Photos genuinely show the first four places; the last two are flexible
// destinations whose exact location is chosen with a planner.
export const destinations = [
  {
    slug: 'santorini', name: 'Santorini', country: 'Greece', region: 'Europe', styles: ['Coast & beach', 'City & culture'],
    img: 'santorini', pos: '50% 55%', alt: 'White-washed buildings climbing a hillside above the sea in Santorini',
    tagline: 'Whitewashed villages, sea-view lanes and long golden evenings.',
    overview: 'Santorini is a crescent-shaped island whose villages cling to the rim of a flooded volcanic crater. Days here move slowly: clifftop walks between villages, swims in clear water, long lunches and sunsets that people plan their whole evening around.',
    attractions: [
      ['Clifftop village walks', 'Follow the path along the caldera rim between villages, with cafés and viewpoints at every turn.'],
      ['Sailing and swimming', 'Spend a day on the water with a small-group boat trip and swim stops in sheltered coves.'],
      ['Wine country', 'Visit family-run vineyards that grow vines in the island\u2019s volcanic soil.'],
      ['Village architecture', 'Wander lanes of whitewashed houses, chapels and steps that lead down towards the sea.'],
    ],
    bestTime: 'May to October is warm and settled; July and August are busiest, so book early. April and November are quieter with cooler weather.',
    duration: '4 to 6 days',
    tips: ['Pack comfortable shoes: many lanes and paths include steps.', 'Visit viewpoints early or late to avoid the busiest hours.', 'Sun protection matters even on breezy days.', 'Ferry and sailing schedules depend on weather.'],
    gallery: ['santorini', 'drinks', 'lounge'],
  },
  {
    slug: 'cape-town', name: 'Cape Town', country: 'South Africa', region: 'Africa', styles: ['Mountains & nature', 'Adventure', 'City & culture'],
    img: 'capetown', pos: '50% 40%', alt: 'A hiker looking towards the flat-topped mountain above Cape Town',
    tagline: 'A flat-topped mountain, two oceans and a coastline made for road trips.',
    overview: 'Cape Town pairs a lively city with dramatic nature on its doorstep. A flat-topped mountain watches over the bay, trails start minutes from town, and the peninsula offers beaches, wildlife and some of the most scenic coast roads anywhere.',
    attractions: [
      ['Table Mountain', 'Reach the top by cable car or a guided hike, depending on the weather and your appetite for climbing.'],
      ['Cape Peninsula drive', 'Follow the coast road past bays, viewpoints and a penguin colony.'],
      ['Winelands day trip', 'Spend a relaxed day among historic wine estates inland from the city.'],
      ['Sunrise and sunset hikes', 'Short, rewarding trails give city and ocean views at the best light of the day.'],
    ],
    bestTime: 'November to March brings the warmest, driest weather; April to May and September to October are mild and quieter. Mountain weather can change quickly in any season.',
    duration: '5 to 7 days',
    tips: ['Check mountain conditions before you go up; cloud can close the summit.', 'Carry layers, water and sun protection on every hike.', 'Book popular viewpoints and tastings ahead in summer.', 'Ask your planner about the best neighbourhoods to stay in.'],
    gallery: ['capetown', 'climber', 'lounge'],
  },
  {
    slug: 'iceland', name: 'Iceland', country: 'Iceland', region: 'Europe', styles: ['Mountains & nature', 'Adventure'],
    img: 'iceland', pos: '50% 60%', alt: 'A bather standing in a milky-blue geothermal lagoon beside an arched wooden bridge',
    tagline: 'Geothermal lagoons, waterfalls and landscapes that look like another planet.',
    overview: 'Iceland packs volcanic fields, black sand beaches, waterfalls and steaming geothermal pools into a compact island. It is a place for slow driving, short walks to big views and soaking in warm mineral water while the air is cold.',
    attractions: [
      ['Geothermal lagoons', 'Soak in warm, mineral-rich water in a landscape of lava rock and steam.'],
      ['The Golden Circle', 'A classic loop of national park, erupting hot springs and a thundering waterfall.'],
      ['South coast', 'Waterfalls you can walk behind and black sand beaches shaped by the Atlantic.'],
      ['Glacier hiking', 'Join a guided walk on a glacier tongue in the right season.'],
    ],
    bestTime: 'June to August has long daylight and the easiest road conditions. September to March offers a chance of northern lights, which are never guaranteed.',
    duration: '5 to 7 days',
    tips: ['Weather changes fast: pack waterproof layers in every season.', 'Shower before entering geothermal pools; it is the local custom.', 'Fuel up before long drives between towns.', 'Winter days are short, so plan activities around daylight.'],
    gallery: ['iceland', 'lounge', 'drinks'],
  },
  {
    slug: 'new-york', name: 'New York City', country: 'United States', region: 'North America', styles: ['City & culture'],
    img: 'nyc', pos: '50% 55%', alt: 'A traveller with a backpack walking along a cobbled street lined with brick buildings, a bridge in the distance',
    tagline: 'Cobbled streets, world-class museums and a neighbourhood around every corner.',
    overview: 'New York rewards walking. Cross a historic bridge on foot, move between neighbourhoods that each feel like a small city, and fit museums, markets and a very good lunch into the same afternoon.',
    attractions: [
      ['Bridge walks', 'Cross to Brooklyn on foot and explore the cobbled streets beneath the bridges.'],
      ['Museums', 'Choose from art, history and science collections that can fill a day each.'],
      ['Neighbourhood food', 'Eat your way through markets, delis and corner restaurants.'],
      ['Parks and waterfront', 'Take a break from the grid in green spaces and along the river.'],
    ],
    bestTime: 'April to June and September to November bring comfortable walking weather. Summers are hot and humid; winters are cold but bright and festive.',
    duration: '3 to 5 days',
    tips: ['Wear comfortable shoes: you will walk further than you expect.', 'Book popular museums and shows ahead.', 'The subway is the quickest way to cover long distances.', 'Tipping is customary in restaurants and for many services.'],
    gallery: ['nyc', 'drinks', 'lounge'],
  },
  {
    slug: 'mountain-ranges', name: 'Mountain Ranges', country: 'Location confirmed with your planner', region: 'Worldwide', styles: ['Mountains & nature', 'Adventure'],
    img: 'peaks', pos: '50% 50%', alt: 'A rugged mountain ridge glowing orange at sunset',
    tagline: 'Multi-day treks and high viewpoints, matched to your fitness and season.',
    overview: 'For travellers who want big landscapes on foot, we plan trekking trips in mountain ranges around the world. Tell us your experience, preferred season and how remote you want to go, and we will propose routes that suit you.',
    attractions: [
      ['Multi-day treks', 'Walk through valleys and over passes with a local guide and a steady daily rhythm.'],
      ['Acclimatisation days', 'Build in rest and gentle hikes so your body can adapt to altitude.'],
      ['Sunrise viewpoints', 'Start early for quiet trails and the best light on the peaks.'],
      ['Village stays', 'Rest in simple mountain lodges and meet the communities along the route.'],
    ],
    bestTime: 'Most high-mountain routes are best in summer or the local dry season, but timing varies a lot between ranges. Your planner will advise on the best window for your route.',
    duration: '7 to 10 days',
    tips: ['Train with long walks and hills for several weeks beforehand.', 'Break in your boots well before the trip.', 'Pack layers: temperatures swing widely through the day.', 'Travel insurance that covers trekking at altitude is essential.'],
    gallery: ['peaks', 'climber', 'lounge'],
  },
  {
    slug: 'tropical-islands', name: 'Tropical Islands', country: 'Location confirmed with your planner', region: 'Worldwide', styles: ['Coast & beach', 'Adventure'],
    img: 'beach', pos: '50% 50%', alt: 'A paddleboarder on shallow turquoise water beside a white sand beach',
    tagline: 'Warm shallow water, white sand and easy days for the whole family.',
    overview: 'For beach lovers and families we plan relaxed island holidays with easy activities: paddleboarding, snorkelling, boat trips and plenty of time to do nothing. We match the island group to your season, budget and travel time.',
    attractions: [
      ['Paddleboarding and kayaking', 'Glide across calm shallows in the early morning.'],
      ['Snorkelling', 'Meet reef life in warm, clear water, with lessons for beginners.'],
      ['Island boat trips', 'Hop to quieter beaches and viewpoints with a local skipper.'],
      ['Village visits', 'Spend time with local communities, markets and cooks.'],
    ],
    bestTime: 'The best season depends on the island group, as dry and wet seasons differ around the world. Tell us when you can travel and we will suggest where the weather will be kindest.',
    duration: '6 to 8 days',
    tips: ['Use reef-safe sun protection and a rash vest for long swims.', 'Children\u2019s rates and family rooms vary: ask us when you enquire.', 'Carry some cash for markets and small boat trips.', 'Check any vaccination advice for your route well before departure.'],
    gallery: ['beach', 'drinks', 'lounge'],
  },
];

export const destinationBySlug = (slug) => destinations.find((d) => d.slug === slug);
