// Lead photographs for the sample catalogue.
//
// Downloaded from Wikimedia Commons at build time and vendored into
// public/plates/ — Commons rate-limits hotlinking hard enough that the image
// optimiser gets 429s, so the running site must not depend on it. Each plate
// keeps its photographer and licence; both are shown where the plate appears.
// Regenerate rather than hand-editing.

export interface Plate {
  /** Local path under /public. */
  src: string;
  width: number;
  height: number;
  /** Photographer, as recorded on Commons. */
  artist: string;
  /** Short licence name, e.g. "CC BY-SA 4.0". */
  license: string;
  /** Commons file page, for the full licence terms. */
  source: string;
}

export const PLATES: Record<string, Plate> = {
  "sigiriya-rock-fortress": {
    src: "/plates/sigiriya-rock-fortress.jpg",
    width: 1600,
    height: 1066,
    artist: "Wrobell",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Sigiriya_(141688197).jpeg",
  },
  "temple-of-the-sacred-tooth-relic": {
    src: "/plates/temple-of-the-sacred-tooth-relic.jpg",
    width: 1600,
    height: 800,
    artist: "A.Savin",
    license: "FAL",
    source: "https://commons.wikimedia.org/wiki/File:SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg",
  },
  "yala-national-park": {
    src: "/plates/yala-national-park.jpg",
    width: 1600,
    height: 900,
    artist: "Ranmith Welikala",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Yala_Beach.jpg",
  },
  "nine-arch-bridge": {
    src: "/plates/nine-arch-bridge.jpg",
    width: 1600,
    height: 1749,
    artist: "MichaelJames2468",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:The_Nine_Arches_Bridge.jpg",
  },
  "galle-fort": {
    src: "/plates/galle-fort.jpg",
    width: 1600,
    height: 1198,
    artist: "Rovin Shanila",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Galle_Fort.jpg",
  },
  "unawatuna": {
    src: "/plates/unawatuna.jpg",
    width: 1600,
    height: 1093,
    artist: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Unawatuna.jpg",
  },
  "horton-plains": {
    src: "/plates/horton-plains.jpg",
    width: 1024,
    height: 768,
    artist: "Faslan at en.wikipedia",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Srilankamountainforest.jpg",
  },
  "anuradhapura": {
    src: "/plates/anuradhapura.jpg",
    width: 1600,
    height: 1200,
    artist: "Thisaru Tharuka",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ruwanweli_Maha_Saaya.jpg",
  },
  "polonnaruwa": {
    src: "/plates/polonnaruwa.jpg",
    width: 1600,
    height: 1110,
    artist: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Polonnaruwa_01.jpg",
  },
  "dambulla-cave-temple": {
    src: "/plates/dambulla-cave-temple.jpg",
    width: 1500,
    height: 1347,
    artist: "Lankapic",
    license: "CC BY 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Dambulla-buddhastupa.jpg",
  },
  "mirissa": {
    src: "/plates/mirissa.jpg",
    width: 1600,
    height: 1200,
    artist: "Ji-Elle",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Mirissa-Plage_(3).jpg",
  },
  "adams-peak": {
    src: "/plates/adams-peak.jpg",
    width: 1600,
    height: 1200,
    artist: "Bourgeois",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Sri_Pada.JPG",
  },
  "ravana-falls": {
    src: "/plates/ravana-falls.jpg",
    width: 1600,
    height: 2399,
    artist: "A.Savin",
    license: "FAL",
    source: "https://commons.wikimedia.org/wiki/File:SL_Ella_asv2020-01_img01_Ravana_Falls.jpg",
  },
  "wilpattu-national-park": {
    src: "/plates/wilpattu-national-park.jpg",
    width: 1600,
    height: 899,
    artist: "Rehman Abubakr",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:WilpattuNationalPark-April2014_(3).JPG",
  },
  "arugam-bay": {
    src: "/plates/arugam-bay.jpg",
    width: 1600,
    height: 900,
    artist: "Dennis Sylvester Hurd",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Beach_of_Arugam_Bay.jpg",
  },
  "nallur-kandaswamy-kovil": {
    src: "/plates/nallur-kandaswamy-kovil.jpg",
    width: 1600,
    height: 1143,
    artist: "Gane Kumaraswamy",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Nallur_Kandasamy_front_entrance.jpg",
  },
  "diyaluma-falls": {
    src: "/plates/diyaluma-falls.jpg",
    width: 1500,
    height: 2250,
    artist: "Travel Local",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Diyaluma_Falls_1.jpg",
  },
  "sinharaja-forest-reserve": {
    src: "/plates/sinharaja-forest-reserve.jpg",
    width: 1600,
    height: 1200,
    artist: "Dan Lundberg",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:20160128_Sri_Lanka_4132_Sinharaja_Forest_Preserve_sRGB_(25674474901).jpg",
  },
  "nuwara-eliya": {
    src: "/plates/nuwara-eliya.jpg",
    width: 1600,
    height: 1200,
    artist: "Abdul malik77",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:NuwaraEliya_from_top.jpg",
  },
  "trincomalee": {
    src: "/plates/trincomalee.jpg",
    width: 1600,
    height: 1065,
    artist: "Kondephy",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Bay_of_Trincomalee.jpg",
  },
  "bambarakanda-falls": {
    src: "/plates/bambarakanda-falls.jpg",
    width: 1600,
    height: 902,
    artist: "Kiriwattuduwa",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Bambarakanda_Waterfall.jpg",
  },
  "minneriya-national-park": {
    src: "/plates/minneriya-national-park.jpg",
    width: 1600,
    height: 1064,
    artist: "Stuart Pinkney",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Birds_at_the_Minneriya-Giritale_National_Park.jpg",
  },
  "kandy-lake": {
    src: "/plates/kandy-lake.jpg",
    width: 1600,
    height: 1200,
    artist: "Ji-Elle",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Kandy_Lake_(9).jpg",
  },
  "jaffna-fort": {
    src: "/plates/jaffna-fort.jpg",
    width: 1600,
    height: 1200,
    artist: "Rehman Abubakr",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Jaffna_Fort_(1).jpg",
  },
  "koneswaram-temple": {
    src: "/plates/koneswaram-temple.jpg",
    width: 1600,
    height: 1067,
    artist: "Shamli071",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Spiritual_16.jpg",
  },
};

export function getPlate(slug: string): Plate | undefined {
  return PLATES[slug];
}
