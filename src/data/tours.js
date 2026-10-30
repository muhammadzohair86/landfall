export const tourCategories = ['Adventure & trekking', 'Family holidays', 'Cultural experiences', 'Nature & wildlife', 'Luxury escapes', 'Weekend getaways'];
export const CURRENCY = 'USD';

const day = (s) => { const [title, text] = s.split('|'); return { title, text }; };
const t = (o) => ({ ...o, itinerary: o.days.map(day), group: o.group ?? 12 });

// All prices are illustrative, per person, in US dollars.
export const tours = [
  t({
    slug: 'santorini-sunset-escape', title: 'Santorini Sunset Escape', destination: 'santorini', cat: 'Luxury escapes', nights: 4, price: 2150, img: 'santorini', pos: '50% 55%', featured: true,
    summary: 'Five slow days of clifftop walks, a sailing day, vineyard lunches and sunsets on the caldera rim.',
    highlights: ['Clifftop walk between villages', 'Small-group sailing day', 'Vineyard tasting and long lunch'],
    days: ['Arrive and settle in|Transfer to your cliffside stay and take an easy first walk through the village lanes.', 'Caldera rim walk|Follow the clifftop path between villages with café stops, then watch the sunset from a quiet viewpoint.', 'A day on the water|Join a small-group sailing trip with swim stops in sheltered coves.', 'Vineyards and a long lunch|Visit a family-run vineyard for a tasting, then lunch among the vines.', 'A slow morning|Enjoy a final breakfast with a view before your departure transfer.'],
    included: ['Four nights in a boutique stay with sea views (sample)', 'Daily breakfast', 'Airport transfers', 'Small-group sailing day', 'Vineyard tasting', 'Planner support before and during your trip'],
    excluded: ['International flights', 'Most lunches and dinners', 'Travel insurance', 'Personal expenses and gratuities'],
    info: ['Many lanes and paths include steps, so pack comfortable shoes.', 'July and August are busiest; enquire early for those months.', 'Sailing trips depend on weather and may be rescheduled.'],
  }),
  t({
    slug: 'aegean-food-and-wine-weekend', title: 'Aegean Food and Wine Weekend', destination: 'santorini', cat: 'Weekend getaways', nights: 2, price: 890, img: 'drinks', pos: '50% 50%',
    summary: 'A compact weekend built around local flavours: a market stroll, a cooking class and a sunset tasting.',
    highlights: ['Hands-on cooking class', 'Sunset wine tasting', 'Evening meze walk'],
    days: ['Arrive and taste|Settle in, then follow a guided evening walk through small plates and local drinks.', 'Cook and sip|Learn to cook island dishes in the morning, then enjoy a tasting at a vineyard as the sun sets.', 'Market and farewell|Visit a morning market for gifts and snacks before your transfer.'],
    included: ['Two nights in a comfortable local stay (sample)', 'Daily breakfast', 'Cooking class', 'Wine tasting', 'Airport transfers'],
    excluded: ['International flights', 'Meals not listed', 'Travel insurance', 'Personal expenses'],
    info: ['Tell us about any dietary requirements when you enquire.', 'Best suited to adults; ask if you would like to bring children.'],
  }),
  t({
    slug: 'cape-peninsula-and-table-mountain', title: 'Cape Peninsula and Table Mountain', destination: 'cape-town', cat: 'Nature & wildlife', nights: 5, price: 1780, img: 'capetown', pos: '50% 40%', featured: true,
    summary: 'Six days of mountain views, coastal drives, penguins and wine country, with time to wander.',
    highlights: ['Table Mountain by cable car or hike', 'Cape Peninsula coast drive', 'Winelands day trip'],
    days: ['Arrive in Cape Town|Meet your host, settle in and take an easy stroll along the waterfront.', 'Table Mountain|Go up by cable car or a guided hike, depending on weather and fitness.', 'Cape Peninsula|Drive the coast road past bays and viewpoints and visit a penguin colony.', 'Winelands|Spend a relaxed day among historic wine estates inland from the city.', 'Marine wildlife|Take a seasonal boat trip to see seals and, in the right months, whales.', 'Departure|Enjoy a last coffee before your airport transfer.'],
    included: ['Five nights in a central guesthouse (sample)', 'Daily breakfast', 'Airport transfers', 'Cable car tickets or guided hike', 'Peninsula and Winelands day trips', 'Planner support'],
    excluded: ['International flights', 'Most lunches and dinners', 'Travel insurance', 'Personal expenses'],
    info: ['Table Mountain can close in strong wind or cloud; we will plan a back-up day.', 'Bring layers, sun protection and a refillable water bottle.', 'Whale watching is seasonal.'],
  }),
  t({
    slug: 'cape-town-adventure-weekend', title: 'Cape Town Adventure Weekend', destination: 'cape-town', cat: 'Adventure & trekking', nights: 2, price: 740, img: 'climber', pos: '50% 40%',
    summary: 'A fast, active weekend of sunrise hikes, coastal paddling and mountain trails.',
    highlights: ['Sunrise or sunset hike', 'Guided coastal paddle', 'Table Mountain trail'],
    days: ['Sunrise hike|Start early on a short, steep trail with huge city and ocean views.', 'Coast and sea|Join a guided paddle along the coast, with time for a swim.', 'Mountain trail|Walk a guided route on Table Mountain before your departure.'],
    included: ['Two nights in a friendly guesthouse (sample)', 'Breakfasts', 'Guided hikes and paddle', 'Local transfers between activities'],
    excluded: ['International flights', 'Other meals', 'Travel insurance', 'Personal gear hire'],
    info: ['Suitable for reasonably fit travellers.', 'Activities depend on weather and may be swapped.'],
  }),
  t({
    slug: 'iceland-lagoons-and-lava', title: 'Iceland Lagoons and Lava', destination: 'iceland', cat: 'Nature & wildlife', nights: 5, price: 2480, img: 'iceland', pos: '50% 60%', featured: true,
    summary: 'Waterfalls, black sand beaches, a glacier walk and a long soak in a geothermal lagoon.',
    highlights: ['Golden Circle loop', 'South coast waterfalls', 'Geothermal lagoon soak'],
    days: ['Arrive in Reykjavik|Pick up your rental car or transfer and explore the compact city centre.', 'Golden Circle|Visit the national park, erupting hot springs and a powerful waterfall.', 'South coast|Walk behind a waterfall and visit a black sand beach.', 'Glacier day|Join a guided glacier walk in the right season, with all equipment provided.', 'Lagoon soak|Spend a slow morning in a geothermal lagoon before heading to the airport.'],
    included: ['Five nights in comfortable guesthouses (sample)', 'Daily breakfast', 'Guided glacier walk (seasonal)', 'Geothermal lagoon entry', 'Airport transfers', 'Planner support'],
    excluded: ['International flights', 'Most lunches and dinners', 'Fuel and parking if driving', 'Travel insurance'],
    info: ['Northern lights are seasonal and never guaranteed.', 'Pack waterproof layers in every season.', 'Glacier walks may be cancelled for safety.'],
  }),
  t({
    slug: 'iceland-geothermal-weekend', title: 'Iceland Geothermal Weekend', destination: 'iceland', cat: 'Weekend getaways', nights: 2, price: 1150, img: 'iceland', pos: '50% 35%',
    summary: 'A short, restorative break: a lagoon soak, lava fields and a city stroll.',
    highlights: ['Geothermal lagoon morning', 'Lava field drive', 'Reykjavik stroll'],
    days: ['Arrive and wander|Settle in, then explore the city\u2019s colourful streets and harbour.', 'Lagoon and lava|Start with a long soak in warm water, then drive through lava fields.', 'Farewell|A relaxed breakfast and transfer to the airport.'],
    included: ['Two nights in a city hotel (sample)', 'Breakfasts', 'Lagoon entry', 'Airport transfers'],
    excluded: ['International flights', 'Other meals', 'Travel insurance', 'Personal expenses'],
    info: ['Winter weekends have short daylight; we plan around it.', 'Bring a swimsuit and a quick-dry towel.'],
  }),
  t({
    slug: 'new-york-city-long-weekend', title: 'New York City Long Weekend', destination: 'new-york', cat: 'Cultural experiences', nights: 3, price: 1320, img: 'nyc', pos: '50% 55%',
    summary: 'Four days of walking, museums, markets and neighbourhood food, with a loose plan that leaves room for surprises.',
    highlights: ['Bridge walk to Brooklyn', 'A full museum day', 'Neighbourhood food tour'],
    days: ['Arrive and walk the bridge|Drop your bags, then cross to Brooklyn on foot and wander the cobbled streets beneath the bridges.', 'Museum day|Choose a major museum and add a quieter gallery in the afternoon.', 'Neighbourhoods and food|Explore two very different neighbourhoods with a guided tasting walk.', 'Last look|Enjoy a final park stroll and brunch before your departure.'],
    included: ['Three nights in a central hotel (sample)', 'Breakfasts', 'Guided food walk', 'Museum tickets for one museum', 'Planner support'],
    excluded: ['International flights', 'Airport transfers', 'Most meals', 'Travel insurance'],
    info: ['Wear comfortable shoes: this trip involves a lot of walking.', 'Museum tickets are timed; we will confirm your slot during planning.'],
  }),
  t({
    slug: 'high-mountain-trek', title: 'High Mountain Trek', destination: 'mountain-ranges', cat: 'Adventure & trekking', nights: 7, price: 2290, img: 'peaks', pos: '50% 50%',
    summary: 'Eight days on foot with a local guide, built around steady days, acclimatisation and sunrise viewpoints. Range and route agreed during planning.',
    highlights: ['Guided multi-day trek', 'Acclimatisation days', 'Sunrise viewpoint'],
    group: 8,
    days: ['Arrive and brief|Meet your guide, check gear and talk through the route.', 'Warm-up hike|A gentle day hike to start adapting to the altitude.', 'First trek stage|Begin walking with a light daypack while porters or vehicles carry the heavy bags.', 'Second trek stage|A longer day through valleys and villages.', 'Rest and explore|Spend a day at a lower pace, visiting a village.', 'High viewpoint|Start early for a sunrise viewpoint above the valley.', 'Descent|Walk down to the road head.', 'Departure|Transfer to your onward journey.'],
    included: ['Seven nights in lodges and simple stays (sample)', 'Most meals on trek', 'Licensed local guide', 'Transfers within the trip', 'Planner support'],
    excluded: ['International flights', 'Personal trekking gear', 'Travel insurance with altitude cover', 'Tips for guides and porters'],
    info: ['Good fitness is required: train with long walks and hills.', 'The mountain range and exact route are agreed with you during planning.', 'Weather can change plans; guides make safety decisions.'],
  }),
  t({
    slug: 'island-family-beach-escape', title: 'Island Family Beach Escape', destination: 'tropical-islands', cat: 'Family holidays', nights: 6, price: 2960, img: 'beach', pos: '50% 50%',
    summary: 'A relaxed week of shallow-water adventures, boat trips and unhurried beach days for the whole family.',
    highlights: ['Paddleboarding lessons', 'Beginner snorkelling', 'Island boat trip'],
    days: ['Arrive and unwind|Transfer to your stay and spend the evening on the beach.', 'Snorkelling lesson|Learn the basics in calm, shallow water with a local instructor.', 'Paddleboarding|Try paddleboarding or kayaking in the early morning calm.', 'Island boat trip|Hop to a quieter beach with a picnic lunch.', 'Village visit|Meet local cooks and artisans and try a cooking demonstration.', 'Free day|Swim, read and do exactly nothing.', 'Departure|Breakfast and transfer to your flight.'],
    included: ['Six nights in a family-friendly stay (sample)', 'Daily breakfast', 'Lessons and boat trip', 'Transfers', 'Planner support'],
    excluded: ['International flights', 'Most lunches and dinners', 'Travel insurance', 'Personal expenses'],
    info: ['Price shown is per adult; children\u2019s rates are available on request.', 'The island group is chosen with you based on your travel dates.', 'Check vaccination advice for your destination early.'],
  }),
];

export const tourBySlug = (slug) => tours.find((x) => x.slug === slug);
export const tourDays = (tour) => tour.itinerary.length;
export const money = (n) => `$${n.toLocaleString('en-US')}`;
