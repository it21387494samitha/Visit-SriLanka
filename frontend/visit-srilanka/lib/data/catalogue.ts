/**
 * The sample catalogue.
 *
 * Shown when the Laravel API is unreachable so the site is never empty during
 * development. Coordinates, districts and seasons are real; the photographs in
 * `plates.ts` are the actual places. The UI labels this as sample data rather
 * than passing it off as the live catalogue.
 */

import type { Category, Destination, District } from '@/lib/types';
import { DISTRICT_SHAPES } from './districtShapes';

/* All 25 districts, ids assigned from the (alphabetical) boundary set so the
   map and the catalogue can never drift apart. */
export const SAMPLE_DISTRICTS: District[] = DISTRICT_SHAPES.map((d, i) => ({
  id: i + 1,
  name: d.name,
  slug: d.slug,
}));

const districtId = (slug: string) => {
  const found = SAMPLE_DISTRICTS.find((d) => d.slug === slug);
  if (!found) throw new Error(`Unknown district slug: ${slug}`);
  return found.id;
};

export const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, name: 'Ancient Ruins', slug: 'ancient-ruins' },
  { id: 2, name: 'Beaches', slug: 'beaches' },
  { id: 3, name: 'Wildlife', slug: 'wildlife' },
  { id: 4, name: 'Hill Country', slug: 'hill-country' },
  { id: 5, name: 'Temples', slug: 'temples' },
  { id: 6, name: 'Waterfalls', slug: 'waterfalls' },
];

const categoryId = (slug: string) => {
  const found = SAMPLE_CATEGORIES.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown category slug: ${slug}`);
  return found.id;
};

interface Seed {
  slug: string;
  title: string;
  category: string;
  district: string;
  lat: number;
  lon: number;
  months: string;
  featured?: boolean;
  summary: string;
  description: string;
}

const SEEDS: Seed[] = [
  {
    slug: 'sigiriya-rock-fortress',
    title: 'Sigiriya Rock Fortress',
    category: 'ancient-ruins',
    district: 'matale',
    lat: 7.957,
    lon: 80.7603,
    months: 'Jan–Apr',
    featured: true,
    summary:
      'A royal citadel built on top of a 180-metre granite inselberg, reached by a staircase that passes through the paws of a vanished brick lion.',
    description:
      '<p>Kashyapa I moved his capital here in the fifth century and spent eighteen years turning a volcanic plug into a palace. What survives is startling: symmetrical water gardens that still flood in the monsoon, a mirror wall once polished enough to reflect the king, and a sheltered gallery of frescoes painted on the rock face itself.</p><p>The climb is roughly 1,200 steps. Start at first light — the west face holds heat brutally by mid-morning, and the frescoes are best before the crowds reach the spiral stair.</p>',
  },
  {
    slug: 'temple-of-the-sacred-tooth-relic',
    title: 'Temple of the Sacred Tooth Relic',
    category: 'temples',
    district: 'kandy',
    lat: 7.2936,
    lon: 80.6413,
    months: 'Year-round',
    featured: true,
    summary:
      'The Sri Dalada Maligawa holds a tooth of the Buddha, and with it the old Sinhalese claim that whoever keeps the relic governs the island.',
    description:
      '<p>The relic arrived in the fourth century, hidden — the story goes — in a princess’s hair. It has been moved, hidden and fought over ever since, and the temple that now houses it sits inside the last royal palace complex of the Kandyan kingdom.</p><p>Three daily <em>thevava</em> ceremonies open the inner chamber, announced by Kandyan drummers. Dress covers shoulders and knees; shoes come off at the gate.</p>',
  },
  {
    slug: 'yala-national-park',
    title: 'Yala National Park',
    category: 'wildlife',
    district: 'hambantota',
    lat: 6.3798,
    lon: 81.5189,
    months: 'Feb–Jul',
    featured: true,
    summary:
      'Dry scrub, brackish lagoons and granite outcrops holding one of the densest leopard populations anywhere in the world.',
    description:
      '<p>Block I is the section open to most visitors, and the one where <em>Panthera pardus kotiya</em> — the Sri Lankan leopard, an island subspecies — is most reliably seen draped over a rock in the late afternoon. Sloth bear, elephant, mugger crocodile and some 215 bird species share the same ground.</p><p>The park usually closes through September for drought. February to July concentrates animals around the remaining waterholes.</p>',
  },
  {
    slug: 'nine-arch-bridge',
    title: 'Nine Arch Bridge',
    category: 'hill-country',
    district: 'badulla',
    lat: 6.8767,
    lon: 81.056,
    months: 'Jan–Mar',
    featured: true,
    summary:
      'A colonial viaduct built entirely of brick, stone and cement — no steel — spanning a tea-covered gorge between Ella and Demodara.',
    description:
      '<p>Completed around 1921 on the Badulla line. The usual account is that the steel earmarked for it was requisitioned for the First World War, so the contractors built it in masonry instead. It has carried trains ever since.</p><p>Two or three services cross each day. The walk in from Ella takes about twenty minutes along the track itself.</p>',
  },
  {
    slug: 'galle-fort',
    title: 'Galle Fort',
    category: 'ancient-ruins',
    district: 'galle',
    lat: 6.0269,
    lon: 80.217,
    months: 'Nov–Apr',
    featured: true,
    summary:
      'A fortified Portuguese port rebuilt by the Dutch in 1663 and still lived in — ramparts, godowns, and a working lighthouse on the point.',
    description:
      '<p>The Dutch laid out the grid that survives: coral-and-granite walls on three seaward sides, a moat and three bastions on the land side. It held against the sea in 2004 when the town outside it did not.</p><p>Inside, it remains a residential quarter rather than a museum. The rampart walk at dusk, from Flag Rock round to the lighthouse, is the fort at its best.</p>',
  },
  {
    slug: 'unawatuna',
    title: 'Unawatuna',
    category: 'beaches',
    district: 'galle',
    lat: 6.01,
    lon: 80.249,
    months: 'Nov–Apr',
    summary:
      'A reef-sheltered crescent just south of Galle, calm enough to swim when most of the south coast is closed out by surf.',
    description:
      '<p>The headland and fringing reef take the force out of the swell, which is why this bay filled up long before the rest of the coast. Snorkelling is decent at the western end; the Japanese peace pagoda on the point is a ten-minute climb for the view back along the shore.</p>',
  },
  {
    slug: 'horton-plains',
    title: "Horton Plains & World's End",
    category: 'hill-country',
    district: 'nuwara-eliya',
    lat: 6.8022,
    lon: 80.8,
    months: 'Jan–Mar',
    featured: true,
    summary:
      'Montane grassland at 2,100 metres that stops without warning at an 870-metre escarpment.',
    description:
      '<p>A cloud-forest plateau of tussock grass and stunted, lichen-hung trees, with the island’s second and third highest peaks on its edge. The circuit is a nine-kilometre loop taking in World’s End, the smaller Baker’s Falls, and Mini World’s End.</p><p>Reach the escarpment before about 9 a.m. Cloud fills the drop for the rest of the day and there is simply nothing to see.</p>',
  },
  {
    slug: 'anuradhapura',
    title: 'Anuradhapura Sacred City',
    category: 'ancient-ruins',
    district: 'anuradhapura',
    lat: 8.3114,
    lon: 80.4037,
    months: 'May–Sep',
    summary:
      'The island’s capital for over a thousand years, and home to a fig tree grown from a cutting planted in 288 BCE.',
    description:
      '<p>The Jaya Sri Maha Bodhi is the oldest human-planted tree with a recorded planting date anywhere on earth. Around it stand the great brick stupas — Ruwanwelisaya, Jetavanaramaya, Abhayagiri — the largest of which was, when built, among the tallest structures in the ancient world.</p><p>The site is spread over several kilometres and is still an active place of pilgrimage. A bicycle is the sensible way to cover it.</p>',
  },
  {
    slug: 'polonnaruwa',
    title: 'Polonnaruwa Ancient City',
    category: 'ancient-ruins',
    district: 'polonnaruwa',
    lat: 7.9403,
    lon: 81.0188,
    months: 'May–Sep',
    summary:
      'The second capital: a compact, walkable garden city of the twelfth century, with four colossal Buddhas cut from a single granite wall.',
    description:
      '<p>Parakramabahu I ruled from here at the height of the island’s medieval power, and built the vast tank that still irrigates the district — the Parakrama Samudra, the "Sea of Parakrama".</p><p>The Gal Vihara reclining, standing and seated figures are the reason most people come, and they justify it. Unlike Anuradhapura, the whole site can be seen properly in a day.</p>',
  },
  {
    slug: 'dambulla-cave-temple',
    title: 'Dambulla Cave Temple',
    category: 'temples',
    district: 'matale',
    lat: 7.8567,
    lon: 80.649,
    months: 'Jan–Apr',
    featured: true,
    summary:
      'Five caves under an overhanging rock, painted continuously for two millennia and holding 153 Buddha statues.',
    description:
      '<p>King Valagamba sheltered here in exile in the first century BCE and endowed the caves as a temple when he regained the throne. Successive kings kept adding: the murals cover some 2,100 square metres of ceiling and wall, following the rock rather than flattening it.</p><p>The climb from the road takes about fifteen minutes. Shoes off at the terrace, and the monkeys will take anything left unattended.</p>',
  },
  {
    slug: 'mirissa',
    title: 'Mirissa',
    category: 'beaches',
    district: 'matara',
    lat: 5.9483,
    lon: 80.4589,
    months: 'Nov–Apr',
    summary:
      'A fishing bay that became the island’s blue-whale port — the continental shelf drops off close enough inshore to make day trips practical.',
    description:
      '<p>Blue whales and sperm whales pass within a few nautical miles between November and April. Boats leave before dawn; the crossing is short by the standards of whale-watching almost anywhere else.</p><p>On land it is still a small bay with a coconut-covered headland at the eastern end and a working harbour beyond it.</p>',
  },
  {
    slug: 'adams-peak',
    title: "Adam's Peak (Sri Pada)",
    category: 'hill-country',
    district: 'ratnapura',
    lat: 6.8096,
    lon: 80.4994,
    months: 'Dec–May',
    summary:
      'A 2,243-metre cone climbed through the night by Buddhists, Hindus, Muslims and Christians, each for a different reason.',
    description:
      '<p>The hollow at the summit is read as the Buddha’s footprint, as Shiva’s, as Adam’s, and as St Thomas’s. Pilgrims have been climbing it for at least a thousand years.</p><p>The season runs from the December full moon to the Vesak festival in May, when the route is lit and the tea shops are open. Leave around 2 a.m. to reach the top for sunrise — the peak throws a perfect triangular shadow onto the cloud to the west.</p>',
  },
  {
    slug: 'ravana-falls',
    title: 'Ravana Falls',
    category: 'waterfalls',
    district: 'badulla',
    lat: 6.8382,
    lon: 81.0517,
    months: 'Oct–Mar',
    summary:
      'A 25-metre cascade that drops straight onto the Ella–Wellawaya road, tied by legend to the abduction of Sita.',
    description:
      '<p>One of the widest falls in the country in full flow, and among the very few you can reach without leaving the tarmac. The caves above it are traditionally where Ravana is said to have hidden Sita.</p><p>It shrinks to a trickle in the dry months. Come after rain, and stay off the wet rock at the base.</p>',
  },
  {
    slug: 'wilpattu-national-park',
    title: 'Wilpattu National Park',
    category: 'wildlife',
    district: 'puttalam',
    lat: 8.45,
    lon: 80.05,
    months: 'Feb–Oct',
    summary:
      'The largest national park on the island, named for the <em>villus</em> — natural sand-rimmed rain basins scattered through the forest.',
    description:
      '<p>Closed for much of the civil war and quieter than Yala ever since, Wilpattu trades reliable sightings for something closer to solitude. Leopard and sloth bear are both present; the villus draw them out in the dry months.</p><p>Dense forest means patience. Half-day drives rarely do it justice.</p>',
  },
  {
    slug: 'arugam-bay',
    title: 'Arugam Bay',
    category: 'beaches',
    district: 'ampara',
    lat: 6.84,
    lon: 81.836,
    months: 'May–Sep',
    featured: true,
    summary:
      'A long right-hand point break on the east coast that works when the south-west monsoon has shut down the rest of the island.',
    description:
      '<p>The main point is a sand-bottomed right that can hold a long wall on a good swell, with gentler breaks at Whiskey Point and Peanut Farm nearby. The season is the inverse of the south coast’s, which is the whole reason the town exists as it does.</p><p>Elephants use the lagoon behind the village. Kumana National Park is an hour south.</p>',
  },
  {
    slug: 'nallur-kandaswamy-kovil',
    title: 'Nallur Kandaswamy Kovil',
    category: 'temples',
    district: 'jaffna',
    lat: 9.675,
    lon: 80.025,
    months: 'Jul–Aug',
    summary:
      'The principal Hindu temple of the north, dedicated to Murugan, its gopuram rebuilt in gold-ochre after each of several destructions.',
    description:
      '<p>Founded in the fifteenth century, razed by the Portuguese, and rebuilt on the present site in 1734. The annual festival runs twenty-five days in July and August and culminates in the chariot procession, drawing pilgrims from across the Tamil diaspora.</p><p>Men remove shirts before entering the inner precinct — a rule that is enforced.</p>',
  },
  {
    slug: 'diyaluma-falls',
    title: 'Diyaluma Falls',
    category: 'waterfalls',
    district: 'badulla',
    lat: 6.7333,
    lon: 81.0333,
    months: 'Oct–Mar',
    summary:
      'At 220 metres, the second-highest fall in Sri Lanka, with a chain of rock pools along the lip.',
    description:
      '<p>The road passes the base, but the upper pools are the draw: a forty-minute climb through tea and scrub brings you out at a series of natural basins right on the edge of the drop.</p><p>The rock is slick and the exposure is real. People are hurt here every year — keep well back from the lip.</p>',
  },
  {
    slug: 'sinharaja-forest-reserve',
    title: 'Sinharaja Forest Reserve',
    category: 'wildlife',
    district: 'ratnapura',
    lat: 6.4,
    lon: 80.5,
    months: 'Jan–Mar, Aug–Sep',
    summary:
      'The last substantial stand of primary lowland rainforest on the island, and the best place in Asia to see a mixed-species feeding flock.',
    description:
      '<p>A UNESCO World Heritage site and a biodiversity hotspot in the strict sense: more than half of the island’s endemic mammals, butterflies and trees occur here, and 95% of its endemic birds.</p><p>The famous mixed feeding flocks — dozens of birds of many species moving through the canopy together — are among the largest and most studied anywhere. A licensed guide is required, and worth far more than the fee.</p>',
  },
  {
    slug: 'nuwara-eliya',
    title: 'Nuwara Eliya',
    category: 'hill-country',
    district: 'nuwara-eliya',
    lat: 6.9497,
    lon: 80.7891,
    months: 'Mar–May',
    summary:
      'A hill station at 1,868 metres that the British built to feel like Surrey, surrounded by the tea estates that paid for it.',
    description:
      '<p>Mock-Tudor bungalows, a racecourse, a golf course and a boating lake, all at an altitude where the temperature drops near freezing at night. The estates around it produce the high-grown leaf that made "Ceylon" a word on tea chests worldwide.</p><p>April is the season, when Colombo empties into the town for the new year. Bring something warm — visitors reliably fail to.</p>',
  },
  {
    slug: 'trincomalee',
    title: 'Trincomalee',
    category: 'beaches',
    district: 'trincomalee',
    lat: 8.5874,
    lon: 81.2152,
    months: 'May–Sep',
    summary:
      'One of the finest natural deep-water harbours in the world, with white-sand bays at Nilaveli and Uppuveli just up the coast.',
    description:
      '<p>The harbour is the reason for the town: deep, sheltered, and fought over by every naval power that reached the Bay of Bengal. Nelson called it the finest harbour in the world.</p><p>The beaches north of town are calm and shallow from May to September, when the west coast is being hammered by the monsoon. Pigeon Island lies a short boat ride off Nilaveli.</p>',
  },
  {
    slug: 'bambarakanda-falls',
    title: 'Bambarakanda Falls',
    category: 'waterfalls',
    district: 'badulla',
    lat: 6.7686,
    lon: 80.8339,
    months: 'Oct–Jan',
    summary:
      'The highest waterfall in Sri Lanka — a single 263-metre ribbon down a cliff face above Kalupahana.',
    description:
      '<p>Fed by a stream off the Horton Plains massif and set back in a pine-planted valley, it is far less visited than its height would suggest, largely because the approach road is poor.</p><p>Flow is heavily seasonal. Outside the north-east monsoon it can reduce to a thin thread.</p>',
  },
  {
    slug: 'minneriya-national-park',
    title: 'Minneriya National Park',
    category: 'wildlife',
    district: 'polonnaruwa',
    lat: 8.0333,
    lon: 80.8833,
    months: 'Jun–Sep',
    featured: true,
    summary:
      'Site of the Gathering — up to 300 wild elephants converging on a third-century reservoir as the dry season shrinks it.',
    description:
      '<p>As the tank recedes it exposes fresh grass on the lake bed, and herds arrive from across the surrounding forest. It is the largest known seasonal concentration of Asian elephants anywhere.</p><p>The reservoir itself was built by King Mahasena in the third century and still works. Late afternoon is when the herds come down to the water.</p>',
  },
  {
    slug: 'kandy-lake',
    title: 'Kandy Lake',
    category: 'hill-country',
    district: 'kandy',
    lat: 7.2919,
    lon: 80.641,
    months: 'Year-round',
    summary:
      'An artificial lake dug in 1807 by the last king of Kandy, ringed by a parapet wall of cloud-shaped stonework.',
    description:
      '<p>Sri Vikrama Rajasinha flooded a stretch of paddy field in front of his palace and edged it with the <em>walakulu bemma</em>, the "cloud wall". The work was unpopular enough to be listed among the grievances that ended his reign.</p><p>The circuit is about three kilometres and takes an hour at a walk, best in the early evening with the temple lit on the north shore.</p>',
  },
  {
    slug: 'jaffna-fort',
    title: 'Jaffna Fort',
    category: 'ancient-ruins',
    district: 'jaffna',
    lat: 9.662,
    lon: 80.009,
    months: 'May–Sep',
    summary:
      'A Dutch pentagon of coral and limestone on the lagoon, badly damaged in the war and now substantially rebuilt.',
    description:
      '<p>Built by the Portuguese in 1618 and enlarged by the Dutch into a textbook star fort — the second largest in Asia when complete. It was held, besieged and shelled repeatedly during the civil war, and much of the interior was lost.</p><p>Restoration has stabilised the ramparts, and the walk around them gives the best view over the lagoon and the town.</p>',
  },
  {
    slug: 'koneswaram-temple',
    title: 'Koneswaram Temple',
    category: 'temples',
    district: 'trincomalee',
    lat: 8.5822,
    lon: 81.247,
    months: 'May–Sep',
    summary:
      'A classical Shiva temple on Swami Rock, a cliff dropping 130 metres straight into the sea at the mouth of Trincomalee harbour.',
    description:
      '<p>One of the five historic <em>Pancha Ishwarams</em> of Sri Lanka. The Portuguese destroyed the medieval complex in 1622 and pushed its stonework off the cliff; divers recovered carved fragments and the original lingam in the 1950s, and the temple was rebuilt around them.</p><p>The setting does most of the work — the rock is the highest point on the harbour, with blue whales sometimes visible offshore.</p>',
  },
];

export const SAMPLE_DESTINATIONS: Destination[] = SEEDS.map((s, i) => {
  const category = SAMPLE_CATEGORIES.find((c) => c.slug === s.category)!;
  const district = SAMPLE_DISTRICTS.find((d) => d.slug === s.district)!;
  return {
    id: i + 1,
    category_id: categoryId(s.category),
    district_id: districtId(s.district),
    title: s.title,
    slug: s.slug,
    summary: s.summary,
    description: s.description,
    latitude: s.lat,
    longitude: s.lon,
    best_months: s.months,
    is_featured: Boolean(s.featured),
    is_published: true,
    category,
    district,
  };
});

/* Counts derived from the data rather than hand-maintained. */
const countBy = <T extends { slug: string }>(items: T[], key: (d: Destination) => string | undefined) =>
  items.map((item) => ({
    ...item,
    destinations_count: SAMPLE_DESTINATIONS.filter((d) => key(d) === item.slug).length,
  }));

export const SAMPLE_CATEGORIES_WITH_COUNTS: Category[] = countBy(
  SAMPLE_CATEGORIES,
  (d) => d.category?.slug
);

export const SAMPLE_DISTRICTS_WITH_COUNTS: District[] = countBy(
  SAMPLE_DISTRICTS,
  (d) => d.district?.slug
);

export const SAMPLE_STATS = {
  destinations: SAMPLE_DESTINATIONS.length,
  categories: SAMPLE_CATEGORIES.length,
  districts: SAMPLE_DISTRICTS.length,
  featured: SAMPLE_DESTINATIONS.filter((d) => d.is_featured).length,
};
