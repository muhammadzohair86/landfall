# Landfall

A responsive, frontend-only travel and tours website built with React. **Landfall** is a fictional travel company: the name is the sailor's word for first sight of land after a long crossing. All tours, prices, itineraries, testimonials and contact details are illustrative sample content created for demonstration. No real bookings are made and no enquiries are sent.

## Features

- **Home**: hero with a working trip-search panel, destinations, featured tours, travel experiences, why-travel-with-us, sample testimonials, guides and a closing call to action
- **Destinations**: search, region filter and travel-style filter with an empty state, plus a detail page for each destination (overview, key experiences, best time, suggested duration, tips, tours, photo gallery)
- **Tours**: search, destination, category, duration and price filters, four sort orders, shareable URLs and an empty state
- **Tour detail**: day-by-day itinerary, included and not-included lists, good-to-know notes, gallery lightbox, related tours and a sticky summary panel
- **Trip inquiry**: validated form with date constraints, a review step, a simulated sending state and a clear "nothing was sent" confirmation
- **About, Contact and Credits**, with a demonstration contact form and newsletter form
- Responsive layouts, keyboard-friendly controls, visible focus states and reduced-motion support

## Destinations and photography

The included photographs genuinely show Santorini, Cape Town, Iceland and New York City, so those are the named destinations. Two further flexible destinations, Mountain Ranges and Tropical Islands, use scenic photos whose exact location is not identifiable, so the site does not name a place for them.

To add destinations such as Hunza, Skardu, Istanbul, Bali, the Swiss Alps or Kyoto, add matching photos to `src/assets/images` (as `<name>-lg.jpg` at about 1600 px wide and `<name>-md.jpg` at about 800 px), register the name in `src/data/images.js`, and add an entry to `src/data/destinations.js`.

## Technologies

React 18, React Router 6, Vite 5, Tailwind CSS 4, daisyUI 5 (custom theme), Fontsource fonts. No backend, database or API.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  components/   Header, Footer, ScrollToTop, shared UI (photo, cards, filters, gallery)
  pages/        Home, Destinations, DestinationDetail, Tours, TourDetail, Plan, About, Contact, Credits
  data/         destinations.js, tours.js, site.js, images.js (all editable sample content)
  index.css     Tailwind setup and the daisyUI theme
```

## Deploy to Netlify

The site uses clean URLs (for example `/tours/high-mountain-trek`), so Netlify needs to serve `index.html` for every route. This is already configured in both `netlify.toml` and `public/_redirects`, which means direct visits and refreshes work.

1. Push the project to a GitHub repository.
2. In Netlify choose **Add new site, Import an existing project**, then connect the repository.
3. Confirm the build command `npm run build` and publish directory `dist`, then deploy.

## Credits and licences

Third-party attributions are listed in [ATTRIBUTION.md](ATTRIBUTION.md) and on the website's Credits page.
