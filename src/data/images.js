// Optimised photo variants live in src/assets/images as <name>-lg.jpg and <name>-md.jpg.
const files = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' });
const url = (file) => files[`../assets/images/${file}.jpg`];

export const photo = (name) => ({
  src: url(`${name}-md`) || url(name),
  large: url(`${name}-lg`) || url(name),
});
export const portrait = (name) => url(name);

// Pixel widths of each variant, used for the srcSet attribute.
export const widths = { santorini: [800, 1600], capetown: [800, 1600], peaks: [800, 1600], iceland: [800, 1600], nyc: [800, 1600], beach: [640, 1123], drinks: [640, 1123], lounge: [640, 1000], climber: [640, 1000] };

// Photos that are not tied to a destination. Captions avoid naming a location.
export const moments = {
  lounge: { alt: 'A bright sitting room with a grey sofa and teal cushions', caption: 'A comfortable place to unwind (illustrative)' },
  drinks: { alt: 'Two glasses of fresh orange drink with citrus slices on a tray', caption: 'Fresh citrus drinks (illustrative)' },
  climber: { alt: 'A climber abseiling down a rock face at sunset', caption: 'Climbing at golden hour (illustrative)' },
  beach: { alt: 'A paddleboarder on shallow turquoise water beside white sand', caption: 'Paddleboarding off a white-sand beach (illustrative)' },
  peaks: { alt: 'Rugged mountain ridge glowing orange at sunset', caption: 'Mountain ridge at sunset (illustrative)' },
};
