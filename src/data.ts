export interface ActivityItem {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  location: string;
  description: string;
  duration?: string;
  type: 'flight' | 'hotel' | 'tour' | 'dining' | 'excursion' | 'monument' | 'transit';
  dressCode?: string;
  confirmation?: string;
  tips?: string[];
  mapsQuery?: string;
  sights?: string[];
}

export interface RomeDay {
  dayNumber: number;
  date: string;
  theme: string;
  weatherHigh: number;
  weatherLow: number;
  weatherDesc: string;
  narrative: string;
  activities: ActivityItem[];
}

export interface DiningSpot {
  id: string;
  name: string;
  type: 'Trattoria' | 'Espresso Bar' | 'Gelateria' | 'Aperitivo Bar';
  neighborhood: string;
  address: string;
  specialty: string;
  romanticVibe: string;
  coupleTip: string;
  mapsQuery: string;
}

export interface EveningRoute {
  id: string;
  name: string;
  duration: string;
  distance: string;
  description: string;
  stops: {
    name: string;
    description: string;
  }[];
  coupleTip: string;
}

// Full document structure for the Digital Wallet
export interface DeltaFlight {
  confirmation: string;
  passengers: {
    name: string;
    eTicket: string;
    seat: string;
    class: string;
  }[];
  outbound?: {
    flightNum: string;
    aircraft: string;
    duration: string;
    departure: string;
    departureTime: string;
    arrival: string;
    arrivalTime: string;
  } | null;
  return: {
    flightNum: string;
    aircraft: string;
    duration: string;
    departure: string;
    departureTime: string;
    arrival: string;
    arrivalTime: string;
  };
}

export interface HiltonStay {
  confirmation: string;
  hotelName: string;
  address: string;
  phone: string;
  checkIn: { date: string; time: string };
  checkOut: { date: string; time: string };
  roomType: string;
  pointsAndCash: string;
  honorsNum: string;
  additionalGuest: string;
  cardOnRef: string;
  notes: string;
}

export interface DinnerBooking {
  restaurantName: string;
  date: string;
  time: string;
  guestsCount: number;
  address: string;
  phone: string;
  notes: string;
  noShowFee: string;
  emailContact: string;
}

export interface TourGuyBooking {
  bookingId: string;
  tourName: string;
  date: string;
  arrivalTime: string;
  startTime: string;
  duration: string;
  guestsCount: string;
  customerName: string;
  meetingPoint: string;
  directions: string;
  checklist: string[];
}

export interface BasilicaEntry {
  bookingCode: string;
  date: string;
  time: string;
  quantity: string;
  visitors: { name: string; ticketCode: string }[];
  accessPoint: string;
  routeReservedInfo: string;
  notes: string;
}

export interface ColosseumUnderground {
  reservationNum: string;
  date: string;
  time: string;
  type: string;
  tickets: { holder: string; ticketCode: string; price: string }[];
  guidelines: string[];
}

export interface InsurancePolicy {
  provider: string;
  policyName: string;
  policyNumber: string;
  holder: string;
  cost: string;
  purchaseDate: string;
  travelDates: string;
  phones: string[];
  email?: string;
}

// Package all documents neatly
export interface TravelWalletData {
  flights: DeltaFlight;
  hotel: HiltonStay;
  dinner: DinnerBooking;
  tourGuy: TourGuyBooking;
  basilica: BasilicaEntry;
  colosseumVip: ColosseumUnderground;
  insuranceAllianz: InsurancePolicy;
  insuranceAmex: InsurancePolicy;
}

export const travelWallet: TravelWalletData = {
  flights: {
    confirmation: 'H9AC4L',
    passengers: [
      { name: 'Jeanine Marie Pagels', eTicket: '0062388583018', seat: '33J', class: 'Delta Main Extra (T)' },
      { name: 'Anthony Wayne Evans', eTicket: '0062388583019', seat: '33H', class: 'Delta Main Extra (T)' }
    ],
    outbound: null,
    return: {
      flightNum: 'DL0215',
      aircraft: 'Airbus A330-900neo',
      duration: '11h 9m',
      departure: 'Rome, Italy (FCO) • Terminal 3',
      departureTime: 'Friday, July 3, 2026 @ 9:45 AM',
      arrival: 'Atlanta, GA (ATL) • Intl Terminal',
      arrivalTime: 'Friday, July 3, 2026 @ 2:54 PM'
    }
  },
  hotel: {
    confirmation: '3400671259',
    hotelName: 'Hilton Garden Inn Rome Colosseum',
    address: 'Via Emanuele Filiberto, 173, Rome, 00185 Italy',
    phone: '+39 06 770121',
    checkIn: { date: 'Tuesday, June 30, 2026', time: '2:00 PM' },
    checkOut: { date: 'Friday, July 3, 2026', time: '12:00 PM' },
    roomType: 'King Room - Standard Room Reward',
    pointsAndCash: '82,000 Points + 558.70€',
    honorsNum: '2353069715 (Jeanine Pagels)',
    additionalGuest: 'Anthony Evans',
    cardOnRef: 'American Express Card (Exp Feb 2030)',
    notes: 'Enjoy complimentary Continental Breakfast or 750 Bonus Points during your stay with Hilton Honors MyWay benefit. Free cancellation before 11:59 PM local hotel time on 29 Jun 2026. Pets allowed, 30.00€ non-refundable, 25 kg maximum.'
  },
  dinner: {
    restaurantName: 'Ristorante Roof Garden (Hotel Forum Rome)',
    date: 'Tuesday, June 30, 2026',
    time: '19:00 (7:00 PM)',
    guestsCount: 2,
    address: 'Via Tor de\' Conti, 25, Rome 00184 Italy',
    phone: '+39 06 679 2446',
    notes: 'Please note that a maximum delay of 15 minutes will be tolerated. The table will be released 15 minutes after reservation time if you don\'t arrive.',
    noShowFee: 'Reservation is subject to a Cancellation Policy. If you can\'t attend or need to modify, do so at least 24 hours in advance. Failure to do so will result in a charge of 25€ per person (total 50€) applied to your registered credit card.',
    emailContact: 'roofgarden@hotelforum.com'
  },
  tourGuy: {
    bookingId: '1037174',
    tourName: 'Rome in a Day Tour with Colosseum and Vatican Museums',
    date: 'Wednesday, July 1, 2026',
    arrivalTime: '09:15 AM',
    startTime: '09:30 AM',
    duration: '7 hours (Max 20 Guests)',
    guestsCount: '2 Adults (Jeanine Pagels & Anthony Evans)',
    customerName: 'Jeanine Pagels',
    meetingPoint: 'Behind the green souvenir kiosk in front of the "Colosseo" metro stop (lower level exit on the right when facing the Colosseum).',
    directions: 'Look for the friendly staff in red holding a bright red "The Tour Guy" sign! Please arrive 15 minutes early and bring photo ID. Make sure you are on the lower level of the metro stop.',
    checklist: [
      'Bring Government-issued Photo ID (passport)',
      'Security line cannot be bypassed',
      'Weapons, large bags, suitcases, tripods, umbrellas, food and glass containers are strictly prohibited',
      'Dress Code: Cover knees, shoulders, and toes for Vatican & Sistine Chapel'
    ]
  },
  basilica: {
    bookingCode: 'TIE-725688',
    date: 'Wednesday, July 1, 2026',
    time: '18:00 (6:00 PM)',
    quantity: '2 Adults',
    visitors: [
      { name: 'Jeanine Pagels', ticketCode: '759995' },
      { name: 'Anthony Evans', ticketCode: '769968' }
    ],
    accessPoint: 'Via di Porta Angelica (Entrance point reserved for online bookings)',
    routeReservedInfo: 'Dedicated route starts from Largo del Colonnato / Via di Porta Angelica. Follow online booking signs to the staff (wearing yellow bibs) and reach the Gazebo for QR Code check (D), followed by security scanning under the Colonnade.',
    notes: 'Includes Digital Audioguide (approximately 60 minutes). Suitcases, rucksacks, backpacks and bulky bags are NOT allowed inside. No cloakroom is available at the Basilica.'
  },
  colosseumVip: {
    reservationNum: 'GPCOQDJW8LDK668P',
    date: 'Thursday, July 2, 2026',
    time: '13:00 (1:00 PM)',
    type: 'Full Experience - Sotterranei e Arena (Colosseum Underground & Arena Floor)',
    tickets: [
      { holder: 'Anthony Evans', ticketCode: 'SPCOKP7QVN8A867X', price: '24.00 € + Sotterranei (0.00 €)' },
      { holder: 'Jeanine Pagels', ticketCode: 'SPCO535XWEKJ6YVX', price: '24.00 € + Sotterranei (0.00 €)' }
    ],
    guidelines: [
      'Show up at the Colosseum entrance 30 minutes before the entry time (12:30 PM)',
      'Ticket valid for 90 min visiting time, must show ID at security gate',
      'Immediately reach the meeting point for the underground tour',
      'One entry into Colosseum. Roman Forum/Palatine/Imperial Fora are valid for 2 consecutive days',
      'Strictly forbidden: Writing on walls/artifacts, backpacks/suitcases/trolleys, animals, weapons/knives, drones'
    ]
  },
  insuranceAllianz: {
    provider: 'Allianz Global Assistance',
    policyName: 'Global Destination Protector II',
    policyNumber: 'EUSP2536888187',
    holder: 'Jeanine Pagels',
    cost: '$244.84',
    purchaseDate: 'December 17, 2025',
    travelDates: 'June 18, 2026 - July 3, 2026',
    phones: ['1-800-419-8016 (Toll-free/Domestic)', '1-804-281-5700 (Collect/Intl)', '1-800-284-8300 (Allianz Line)'],
    email: 'customerservice@allianzassistance.com'
  },
  insuranceAmex: {
    provider: 'American Express Travel Insurance',
    policyName: 'American Express Travel Protection Plan',
    policyNumber: 'AMX-TRV-8945-SAFE',
    holder: 'Jeanine Pagels',
    cost: 'Included in enrollment',
    purchaseDate: 'February 24, 2026',
    travelDates: 'June 18, 2026 - July 3, 2026',
    phones: ['800-228-6855']
  }
};

export const romeItinerary: RomeDay[] = [
  {
    dayNumber: 0,
    date: 'June 30, 2026',
    theme: 'Arrival, Historic Check-In & Rome Skyline Dining',
    weatherHigh: 85,
    weatherLow: 66,
    weatherDesc: 'Sunny, pleasant twilight breeze. Perfect evening humidity (45%).',
    narrative: 'Cross from airport transit into the heart of the Eternal City. Settle into the luxurious Hilton Garden Inn Rome Colosseum, rest up, and dress nicely for an incredible candlelit dining debut. Tonight you feast overlooking ancient ruins at the acclaimed Ristorante Roof Garden.',
    activities: [
      {
        id: 'r0-afternoon',
        time: '02:00 PM',
        period: 'Afternoon',
        title: 'Check-In: Hilton Garden Inn Rome Colosseum',
        location: 'Via Emanuele Filiberto, 173, Rome 00185',
        description: 'Check in with Honors ID 2353069715. Get keys to your King Room. Settle in, unpack, and enjoy free continental breakfast benefits.',
        type: 'hotel',
        confirmation: 'CONF: 3400671259',
        tips: [
          'Guaranteed credit card is on file for incidentals.',
          'Double-check that the in-room espresso machine has water and enjoy a cup after your travels.'
        ],
        mapsQuery: 'Hilton Garden Inn Rome Colosseum'
      },
      {
        id: 'r0-evening',
        time: '07:00 PM',
        period: 'Evening',
        title: 'Sunset Dining at Ristorante Roof Garden',
        location: 'Via Tor de\' Conti, 25, Rome 00184',
        description: 'A spectacular reservation confirmed for 2 people at the stunning rooftop overlooking the Forum. Arrive precisely on time—they only hold tables for 15 minutes max.',
        type: 'dining',
        confirmation: 'Confirmed (Anthony Evans)',
        dressCode: 'Smart Casual / Elegant. Dress nicely for your first evening in Rome!',
        tips: [
          'Request a table on the absolute edge overlooking the illuminated ancient Roman columns.',
          'Cancel online or edit 24 hours in advance to avoid the €25/person no-show penalty.',
          'Call restaurant at +39 06 6792446 if running slightly late.'
        ],
        mapsQuery: 'Via Tor de\' Conti, 25, Rome 00184'
      }
    ]
  },
  {
    dayNumber: 1,
    date: 'July 1, 2026',
    theme: 'Vatican & Colosseum "Rome in a Day" & Sacred Basilica Ascent',
    weatherHigh: 87,
    weatherLow: 68,
    weatherDesc: 'Clear sunshine, very high UV conditions (UV Index: 9). Drink water!',
    narrative: 'A busy, epic double-header. Start with The Tour Guy\'s massive 7-hour "Rome in a Day" tour which sweeps you from the Vatican Museums & Sistine Chapel, drives you directly to Piazza Navona or the Pantheon, and ends with first-tier access near the Colosseum. Finish your evening with St. Peter\'s late sacred Basilica entry.',
    activities: [
      {
        id: 'r1-morning',
        time: '09:15 AM',
        period: 'Morning',
        title: '"Rome in a Day" VIP Grand Tour',
        location: 'Colosseo Metro Stop (Green Newsstand)',
        description: 'Meet your guide outside the Colosseo metro stop precisely at 9:15 AM (the tour begins at 9:30 AM). Your 7-hour skip-the-line VIP adventure covers Vatican galleries, Sistine Ceiling, private driver transfer, and ancient walk.',
        duration: '7 hours',
        type: 'tour',
        confirmation: 'Booking #1037174 (The Tour Guy)',
        dressCode: 'STRICT CHURCH RULES: Shoulders, knees, and toes must be covered. No hats allowed inside. Guards turn tourists away with no refunds!',
        tips: [
          'Look for guides wearing bright red holding "The Tour Guy" flags.',
          'Avoid bringing any backpacks, luggage, rucksacks, or glass containers as security screens will reject them.',
          'Take a government-issued photo ID (US Passport) for security checkpoints.'
        ],
        mapsQuery: 'Colosseum Metro Station Rome',
        sights: [
          'Vatican Museums (Pinecone Courtyard, Gallery of Maps, Gallery of Tapestries)',
          'Sistine Chapel (Michelangelo\'s legendary ceiling)',
          'Piazza Navona (Bernini\'s Fountain of the Four Rivers)',
          'The Pantheon (Rome\'s beautifully preserved pagan dome temple)',
          'Trevi Fountain (Traditional coin toss stop)',
          'Piazza Venezia (Grand visual core of the city center)',
          'Roman Forum & Palatine Hill Overlooks',
          'The Colosseum (Skip-the-line first tier tour)'
        ]
      },
      {
        id: 'r1-evening',
        time: '05:30 PM',
        period: 'Evening',
        title: 'St. Peter\'s Basilica Sacred Entry & Audioguide',
        location: 'Via di Porta Angelica (Entrance Point C)',
        description: 'Skip standard queues using your reserved ticket time. Check-in at the St. Peter\'s Square gazebo (D), pass security under the Colonnade, and explore the soaring dome of Michelangelo\'s Basilica.',
        duration: '60 mins',
        type: 'monument',
        confirmation: 'TIE-725688 (Jeanine: 759995 | Anthony: 769968)',
        dressCode: 'Modesty code strictly verified. Knee & shoulder coverings mandatory.',
        tips: [
          'Arrive at St. Peter\'s Square precisely by 5:30 PM for checking.',
          'No backpacks or bulky bags are allowed inside. There is NO luggage storage at the Basilica.'
        ],
        mapsQuery: 'Via di Porta Angelica, Rome'
      }
    ]
  },
  {
    dayNumber: 2,
    date: 'July 2, 2026',
    theme: 'Imperial Underground Chambers & VIP Gladiator Arena',
    weatherHigh: 91,
    weatherLow: 70,
    weatherDesc: 'Glistening warm sunshine. Walk in the shady corridors and drink at fountains.',
    narrative: 'A truly memorable day of imperial archaeology. Today you descend deep underneath the ancient stone blocks of the Colosseum to enter the raw underground chambers (Sotterranei) and walk on the gladiator Arena Floor on a highly sought-after VIP reservation.',
    activities: [
      {
        id: 'r2-afternoon-vip',
        time: '12:30 PM',
        period: 'Afternoon',
        title: 'Colosseum Underground & Arena Floor VIP Entry',
        location: 'Colosseum Group Security Entrance',
        description: 'Step directly through VIP Roman gates directly onto the wooden arena floor. Look over the deep hypogeum excavations. Enter the Sotterranei passages where beast cages once stood.',
        duration: '90 mins',
        type: 'tour',
        confirmation: 'GPCOQDJW8LDK668P (Anthony: SPCOKP7QVN8A867X | Jeanine: SPCO535XWEKJ6YVX)',
        tips: [
          'Arrive at the Colosseum Group Entrance exactly by 12:30 PM (30 mins before the 1:00 PM ticket slot).',
          'Make sure you carry your original physical US Passports—security will strictly cross-reference names on tickets.',
          'Forbidden: Writing on walls, animals, drones, large backpacks, or suitcases.'
        ],
        mapsQuery: 'Colosseum Rome Entrance'
      },
      {
        id: 'r2-afternoon-walk',
        time: '03:00 PM',
        period: 'Afternoon',
        title: 'Roman Forum, Palatine Hill & Imperial Fora Walk',
        location: 'Roman Forum archaeological zone',
        description: 'Use your Full Experience combo tickets to freely roam the massive stone plazas, triumphal arches of Titus, and spectacular grassy temple hills of Palatine overlooking Rome.',
        duration: '2 hours',
        type: 'excursion',
        tips: [
          'This ticket is valid for 2 consecutive days, so take your time examining the temples.',
          'There is close to zero shade on the Forum. Wear hats, sunglasses, and find Refill Nasoni fountains.'
        ],
        mapsQuery: 'Roman Forum Rome'
      }
    ]
  },
  {
    dayNumber: 3,
    date: 'July 3, 2026',
    theme: 'Coin Toss, Packing Check & Private Airport Transfer',
    weatherHigh: 89,
    weatherLow: 68,
    weatherDesc: 'Searing July morning heat. Fully air-conditioned shuttle transport.',
    narrative: 'Begin your final beautiful morning checking-out from Hilton Garden Inn. Savor a final espresso at Piazza di Spagna. Meet your executive private sedan outside for Fiumicino Airport (FCO) in prime timing for your international departure back home.',
    activities: [
      {
        id: 'r3-morning',
        time: '06:30 AM',
        period: 'Morning',
        title: 'Airport Private Transfer (Mercedes E-Class)',
        location: 'Hilton Garden Inn Lobby Entrance',
        description: 'Hop into your private, fully air-conditioned executive sedan for a smooth premium transfer out of the city straight to Rome Fiumicino Airport (FCO).',
        duration: '45 mins',
        type: 'transit',
        confirmation: 'ROM-SHUTTLE-7291 (Vatican Limo Services)',
        tips: [
          'Your dedicated professional driver will perform pick-up at the lobby entrance.',
          'Pack all external batteries and power banks in your hand-carry purses rather than checked suitcases.'
        ],
        mapsQuery: 'Hilton Garden Inn Rome Colosseum'
      },
      {
        id: 'r3-flight',
        time: '09:45 AM',
        period: 'Morning',
        title: 'Flight Return: Rome (FCO) to Atlanta (ATL)',
        location: 'Fiumicino Airport (FCO) Terminal 3',
        description: 'Board Delta flight DL0215 departing Terminal 3. Sit back and enjoy the 11-hour flight home.',
        duration: '11h 9m',
        type: 'flight',
        confirmation: 'H9AC4L (Seat 33J: Jeanine | 33H: Anthony)',
        tips: [
          'Check-in counters recommend arriving at least 3 hours prior to departure for international security.',
          'Enjoy your Delta Main Extra seats!'
        ],
        mapsQuery: 'Fiumicino Airport FCO Terminal 3'
      }
    ]
  }
];

export const diningBucketList: DiningSpot[] = [
  {
    id: 'db-1',
    name: 'Trattoria da Enzo al 29',
    type: 'Trattoria',
    neighborhood: 'Trastevere',
    address: 'Via dei Vascellari, 29, 00153 Roma RM, Italy',
    specialty: 'Rigatoni alla Carbonara & Carciofo alla Giudia (fried artichoke)',
    romanticVibe: 'Charming, rustic, loud, incredibly intimate tables lit by candles.',
    coupleTip: 'They do not accept dinner reservations and lines form 45 minutes before opening. Plan for an early evening date queue at 07:00 PM with some cold beer in hand.',
    mapsQuery: 'Da Enzo al 29 Rome'
  },
  {
    id: 'db-2',
    name: 'Caffè Sant\'Eustachio',
    type: 'Espresso Bar',
    neighborhood: 'Near Pantheon',
    address: 'Piazza di S. Eustachio, 82, 00186 Roma RM, Italy',
    specialty: 'Gran Caffè (sweet, incredibly frothy wood-roasted espresso)',
    romanticVibe: 'Vintage tile interiors, vibrant wood aromas, fast-paced Italian rhythm.',
    coupleTip: 'Pay at the cash register first, get your physical paper receipt, then present it with a tip to the barista at the stainless steel bar to drink standing.',
    mapsQuery: 'Caffe Sant Eustachio Rome'
  },
  {
    id: 'db-3',
    name: 'Giolitti',
    type: 'Gelateria',
    neighborhood: 'Near Parliament / Pantheon',
    address: 'Via uffici del Vicario 40, 00186 Roma RM, Italy',
    specialty: 'Dark Chocolate (Fondente), Pistachio, and fresh Fig (Fico) gelato.',
    romanticVibe: 'Old-world Art Deco masterwork interior with waiters in black tuxedo vests.',
    coupleTip: 'Request "panna" (homemade thick sweet whipped cream) on top—it is free with the gelato and takes the date to another level.',
    mapsQuery: 'Giolitti Rome'
  },
  {
    id: 'db-4',
    name: 'Rinascimento Bar at Hotel Raphaël (Medeatur)',
    type: 'Aperitivo Bar',
    neighborhood: 'Piazza Navona',
    address: 'Largo Febo, 2, 00186 Roma RM, Italy',
    specialty: 'Premium herbal Italian Negronis and dynamic vegetable tapas.',
    romanticVibe: 'Ultra-exclusive luxury rooftop terrace draped in wild ivy with 360° views of the Vatican and city.',
    coupleTip: 'Best visited at dusk. Reserve your table 3 weeks in advance to secure the absolute corner sunset edge.',
    mapsQuery: 'Hotel Raphael Rome'
  },
  {
    id: 'db-5',
    name: 'Enoteca Trastevere',
    type: 'Trattoria',
    neighborhood: 'Trastevere',
    address: 'Via della Lungaretta, 163, 00153 Roma RM, Italy',
    specialty: 'Tagliolini Cacio e Pepe with fresh lime zest additions.',
    romanticVibe: 'Warm lightbulbs, tables lining a quiet cobblestone street beneath ivy leaves.',
    coupleTip: 'Grab an outdoor street table. The local guitarists often play romantic Italian ballads right here.',
    mapsQuery: 'Enoteca Trastevere Rome'
  },
  {
    id: 'db-6',
    name: 'Sciascio Caffè 1919',
    type: 'Espresso Bar',
    neighborhood: 'Prati (Near Vatican)',
    address: 'Via Fabio Massimo, 80a, 00192 Roma RM, Italy',
    specialty: 'Caffè al Cioccolato (espresso served in a cup coated with melted dark chocolate).',
    romanticVibe: 'Quiet, aristocratic wood paneling, filled with vintage brass coffee boilers.',
    coupleTip: 'A perfect quiet morning escape away from Vatican tourist traps. Order two chocolate espressos and sit in the historic cozy back room.',
    mapsQuery: 'Sciascia Caffe 1919 Rome'
  }
];

export const romanticEveningRoutes: EveningRoute[] = [
  {
    id: 'er-1',
    name: 'The Eternal Romance Piazza Run',
    duration: '45 mins',
    distance: '1.8 km',
    description: 'A stroll through Rome’s most iconic squares and bubbling Baroque fountains, looking absolutely gorgeous under ambient orange gas lamps after dinner.',
    stops: [
      { name: 'Spanish Steps', description: 'Begin at the base near the Barcaccia fountain, walking south under glowing gas lamps.' },
      { name: 'Trevi Fountain', description: 'Head down Via del Nazareno. Experience the massive marble water roar in the dark.' },
      { name: 'Pantheon Square', description: 'Stroll western alleys to Piazza della Rotonda. The temple columns are floodlit.' },
      { name: 'Piazza Navona', description: 'Conclude at Bernini’s Four Rivers Fountain, surrounded by late-night street portrait artists.' }
    ],
    coupleTip: 'Start this walk after 10:30 PM. The crowds drop drastically, the water shimmer is mystical, and the warm summer slate is mesmerizing to walk on hand-in-hand.'
  },
  {
    id: 'er-2',
    name: 'The Tiber Wall & Isola Tiberina Escape',
    duration: '35 mins',
    distance: '1.4 km',
    description: 'Walk along the historic Tiber plane trees, descending down ancient stone steps to Rome\'s famous river island, checking out Trastevere.',
    stops: [
      { name: 'Ponte Sisto', description: 'Walk across the gorgeous 15th-century stone bridge while street musicians sing soft acoustic tunes.' },
      { name: 'Tiber Banks Walkway', description: 'Drop down the stairs to the wide river-bank walk, beautifully isolated from traffic.' },
      { name: 'Tiber Island (Isola Tiberina)', description: 'Cross onto the ship-shaped stone island with centuries of medical sanctuary history.' },
      { name: 'Piazza Trilussa Entrance', description: 'Step back up and dive directly into the heart of buzzing evening Trastevere.' }
    ],
    coupleTip: 'Great to do right before a late 9:00 PM dinner reservation. Grab a cheap slice of Roman pizza bianche to munch on the way.'
  }
];

export const neighborhoodNavigationTricks = [
  {
    title: 'The "Nasone" Free Water Network',
    description: 'Rome is scattered with over 2,500 historic cast-iron public water fountains nicknamed "Nasoni" ("big noses"). The water is cold, pristine, and constantly flowing directly from clean mountain springs.',
    trick: 'Do NOT pay €3 for warm bottled water from street sellers. Carry a reusable bottle and plug the bottom nozzle hole with your finger to direct a pristine drinking jet out of the top spout mouth!'
  },
  {
    title: 'Official "White Taxi" Security Rules',
    description: 'Unlicensed gypsy drivers congregate outside train portals and tourist sites offering flat rates. They often scam travelers with hidden luggage fees.',
    trick: 'ONLY enter official city taxis which are painted solid White, feature a "Comune di Roma" coat of arms shield decal on the door side, and clearly display an active taximeter dashboard. Standard taxi queues are located near tourist junctions, or order directly via the standard "FREE NOW" or "IT Taxi" mobile applications.'
  },
  {
    title: 'Recognizing Authentic Trattorias',
    description: 'Dozens of high-priced dining venues trap tourists with fake atmospheres and microwaved foods near monuments like the Colosseum.',
    trick: 'Avoid any spot with hostesses begging you to sit from the street, flags of various countries, or menus featuring glossy photographs of food. Look for short, simple handwritten menus in Italian, high noise levels of local citizens shouting, and dinner services beginning no earlier than 07:30 PM.'
  },
  {
    title: 'Tiber Crossing & Cobblestone Shoes',
    description: 'Rome’s ancient cobblestones ("sanpietrini") are gorgeous but uneven, slippery when dusty, and hard on thin soles.',
    trick: 'Leave the heels and thin slippers inside the lodging room. Wear well broken-in rubber-soled sneakers, or structured sandals with straps. Your feet will thank you on day three!'
  }
];

export const romePackingAssistant = [
  { id: 'rp-1', item: 'Modest Vatican Outfit Set', category: 'Clothing', note: 'Long linen dress / breathable pants + shawl for July 1st tour.', required: true },
  { id: 'rp-2', item: 'Linen Shirts & Breathable Tops', category: 'Clothing', note: 'Ideal for high 88°F July moisture levels.', required: true },
  { id: 'rp-3', item: 'Comfortable Sightseeing Sneakers', category: 'Clothing', note: 'Essential to navigate rough sanpietrini bricks.', required: true },
  { id: 'rp-4', item: 'Collapsible Water Bottles', category: 'Gear', note: 'For zero-cost cold refills at Nasoni fountains.', required: true },
  { id: 'rp-5', item: 'High Capacity Power Banks', category: 'Gear', note: 'Your phone cameras will drain dry taking pictures of Colosseum vaults!', required: true },
  { id: 'rp-6', item: 'Compeed Blister Plasters', category: 'Medical', note: 'Save your heels on long walks through Trastevere alleys.', required: true },
  { id: 'rp-7', item: 'Printed Tour & Hotel Confirmations', category: 'Documents', note: 'Vatican guards often demand physical paper vouchers to skip main gates.', required: true },
  { id: 'rp-8', item: 'Passports & ID Copies', category: 'Documents', note: 'Colosseum gates verify names on tickets against real IDs.', required: true }
];

export const usefulItalianPhrases = [
  { phrase: 'Un tavolo per due, per favore.', translation: 'A table for two, please.' },
  { phrase: 'Possiamo sedere all\'aperto?', translation: 'Are we able to sit outside?' },
  { phrase: 'La specialità della casa?', translation: 'What is the house specialty?' },
  { phrase: 'L\'acqua del rubinetto va benissimo, grazie.', translation: 'Tap water is completely fine, thank you. (To get free table water)' },
  { phrase: 'Il conto, per favore.', translation: 'The bill, please.' },
  { phrase: 'Sei bellissima / bellissimo.', translation: 'You are beautiful (feminine / masculine).' },
  { phrase: 'Grazie mille per la vostra ospitalità.', translation: 'Thank you very much for your lovely hospitality.' }
];

export interface ColosseumVenue {
  name: string;
  address: string;
  specialty: string;
  insiderTip: string;
  mapsQuery: string;
}

export interface ColosseumDiningGroups {
  breakfast: ColosseumVenue[];
  coffee: ColosseumVenue[];
  lunch: ColosseumVenue[];
  dinner: ColosseumVenue[];
  snack: ColosseumVenue[];
  gelato: ColosseumVenue[];
}

export const colosseumDiningGems: ColosseumDiningGroups = {
  breakfast: [
    {
      name: "Pasticceria Regoli",
      address: "Via dello Statuto, 60, 00185 Roma",
      specialty: "Maritozzo con la Panna (classic sweet Roman brioche bun stuffed to the brim with fresh whipped cream).",
      insiderTip: "Established in 1916. A short walk from the Colosseum into the Esquilino perimeter. Grab a ticket at the cash counter first, then claim your maritozzo at the pastry bar!",
      mapsQuery: "Pasticceria Regoli Via dello Statuto Rome"
    },
    {
      name: "Caffè San Clemente",
      address: "Via di San Giovanni in Laterano, 114, 00184 Roma",
      specialty: "Local Cornetto Semplice (plain croissant) & perfectly balanced Macchiato.",
      insiderTip: "Extremely unpretentious and friendly. Zero tourist markup. A perfect local hub to experience authentic Roman morning hubbub just blocks from the arena.",
      mapsQuery: "Caffe San Clemente Via di S. Giovanni in Laterano Rome"
    },
    {
      name: "Bar Barberini",
      address: "Via Mormorata, 41, 00153 Roma",
      specialty: "Miniature Mignon pasticcini & Cornetto con Crema di Pistacchio.",
      insiderTip: "Favored by absolute locals. They bake all pastries on-site. Sidle up to the counter and take your espresso standard 'al banco' (standing at the bar) like a true Roman.",
      mapsQuery: "Bar Barberini Rome"
    }
  ],
  coffee: [
    {
      name: "La Caffetteria (Monti)",
      address: "Via Capo d'Africa, 17, 00184 Roma",
      specialty: "Rich Shakerato (sweetened espresso shaken over ice until hyper-frothy) and classic Caffè Corretto.",
      insiderTip: "Tucked away in the quiet, quiet Capo d'Africa street. Excellent morning atmosphere without any of the megaphone-carrying tourists or high prices.",
      mapsQuery: "La Caffetteria Via Capo d'Africa Rome"
    },
    {
      name: "Cafe Cafe",
      address: "Via di San Giovanni in Laterano, 54, 00184 Roma",
      specialty: "Rich premium organic Arabica filter brews and seasonal herbal loose-leaf teas.",
      insiderTip: "A cozy green aesthetic oasis right behind the busy amphitheater. Dressed in comfortable cushions and wooden chairs. A highly romantic spot for a long, quiet couple chat.",
      mapsQuery: "Cafe Cafe Via di San Giovanni in Laterano Rome"
    },
    {
      name: "Caffè Propaganda",
      address: "Via Claudia, 1, 00184 Roma",
      specialty: "Espresso served alongside beautiful French-style light pastries.",
      insiderTip: "An ultra-stylish interior inspired by the Belle Époque. High ceilings, gorgeous white tiles, and extremely professional baristas. Perfect for a quiet afternoon caffeine reset.",
      mapsQuery: "Caffe Propaganda Via Claudia Rome"
    }
  ],
  lunch: [
    {
      name: "Trattoria Luzzi",
      address: "Via di San Giovanni in Laterano, 88, 00184 Roma",
      specialty: "Classic Tonnarelli alla Carbonara & highly thin crispy wood-fired Roman Pizzas.",
      insiderTip: "Unbelievably popular with locals. Bustling, loud, very chaotic, and delightfully cheap. Sit outdoors and watch the neighborhood walk by. Always expect a short waiting queue, but it moves fast!",
      mapsQuery: "Trattoria Luzzi Via di San Giovanni in Laterano Rome"
    },
    {
      name: "Hostaria da Nerone",
      address: "Via delle Terme di Tito, 96, 00184 Roma",
      specialty: "Homemade Lasagna and Tonnarelli Cacio e Pepe topped with freshly crushed select black peppercorns.",
      insiderTip: "Located slightly up on the hill in the park overlooking the Colosseum. Family run and operated. Extremely rustic interior under historical arches. Reserve a spot if visiting closer to 1PM.",
      mapsQuery: "Hostaria da Nerone Via delle Terme di Tito Rome"
    },
    {
      name: "Li Rioni a Santiquattro",
      address: "Via dei Santi Quattro, 24, 00184 Roma",
      specialty: "Traditional wood-fired Roman style thin pizzas, Suppli Classico, and hand-rolled pasta.",
      insiderTip: "Styled inside to look like a picturesque brick-lined Roman evening street alley. Highly authentic and deeply cozy neighborhood feel. They open for excellent lunches as well.",
      mapsQuery: "Li Rioni a Santiquattro Rome"
    }
  ],
  dinner: [
    {
      name: "La Taverna dei Fori Imperiali",
      address: "Via della Madonna dei Monti, 9, 00184 Roma",
      specialty: "Handmade Ravioli stuffed with fresh burrata cheese, tossed in a pristine cherry tomato & basil sauce.",
      insiderTip: "Consistently vetted family slow-food restaurant in the stylish Monti district. Absolutely spectacular. Make reservations at least 4-5 days ahead to secure a romantic couple table!",
      mapsQuery: "La Taverna dei Fori Imperiali Rome"
    },
    {
      name: "Le Tavernelle",
      address: "Via Panisperna, 48, 00184 Roma",
      specialty: "Rich Rigatoni all'Amatriciana with crunchy cured guanciale & fresh local Pecorino Romano.",
      insiderTip: "Serving quality Roman cuisine since 1934 under gorgeous dark wood ceiling boards. Deeply traditional crowd, historic photographs on walls, and exceptional house white and red wines.",
      mapsQuery: "Le Tavernelle Via Panisperna Rome"
    },
    {
      name: "Trattoria da Danilo",
      address: "Via Via Boiardo, 19, 00185 Roma",
      specialty: "Legendary Cacio e Pepe rolled and tossed right in front of you inside a massive whole wheel of Pecorino cheese.",
      insiderTip: "A magnificent cozy dining room near the Lateran palace area. No shortcuts in traditional quality here. The carbonara is decadent and the artichokes are spectacular. Bookings are mandatory.",
      mapsQuery: "Trattoria da Danilo Via Boiardo Rome"
    }
  ],
  snack: [
    {
      name: "Zia Rosetta",
      address: "Via Urbana, 54, 00184 Roma",
      specialty: "Incredibly innovative gourmet miniature Rosetta sandwiches filled with cured coppa, truffle honey, or fresh goat cheeses.",
      insiderTip: "Rosetta is the classic, hollow, star-shaped crispy Roman bread. Zia Rosetta makes them into gorgeous bite-size visual culinary masterpieces. Grab 2 mini pockets and a local draft craft beer!",
      mapsQuery: "Zia Rosetta Via Urbana Rome"
    },
    {
      name: "La Polpetta Colosseo",
      address: "Via dei Santi Quattro, 8, 00184 Roma",
      specialty: "Savory Roman Meatballs (Polpette) featuring Carbonara cream stuffing, or traditional eggplant and beef base.",
      insiderTip: "A fun and extremely tasty local shop solely dedicated to meatballs in all variations. Perfectly sized as a handheld hot snack. Take a cone of mixed fried meatballs to go!",
      mapsQuery: "La Polpetta Colosseo Rome"
    },
    {
      name: "Pizza Trieste",
      address: "Via Urbana, 112, 00184 Roma",
      specialty: "Miniature Pizzette Tonde (small round pizzas baked in traditional deep metal pans).",
      insiderTip: "Stretching back to Abruzzo in 1940. Fast-paced standing area. Unbelievably soft centers with highly thin crispy charred crust edges, coated in premium local olive oils.",
      mapsQuery: "Pizza Trieste Via Urbana Rome"
    }
  ],
  gelato: [
    {
      name: "Gelateria Izi",
      address: "Via dei Santi Quattro, 91, 00184 Roma",
      specialty: "Creamy Dark Chocolate (Fondente) & intense Sicilian Pistachio gelato.",
      insiderTip: "Just a 3-minute walk behind the Colosseum on a beautiful cobblestone lane. Zero fake colors or puffy air-whipped piles. Handcrafted daily with fresh organic dairy.",
      mapsQuery: "Gelateria Izi Via dei Santi Quattro Rome"
    },
    {
      name: "Fatamorgana (Monti)",
      address: "Piazza degli Zingari, 5, 00184 Roma",
      specialty: "Highly creative natural recipes: Avocado-Lime-White Chocolate, or Roasted Almond & Cardamom.",
      insiderTip: "The pioneer of 100% natural, clean-label, additive-free artisanal gelato in Rome. Fantastic gluten-free choices. Eat your cone standing in the beautiful Zingari fountain plaza.",
      mapsQuery: "Fatamorgana Piazza degli Zingari Rome"
    },
    {
      name: "Gelateria dell'Angelo",
      address: "Via delle Terme di Tito, 4, 00184 Roma",
      specialty: "Incredible cream-based gelato with optional free mountain of freshly whipped Panna (cream) on top.",
      insiderTip: "Right below the park hill. Family-owned and deeply unpretentious. Skip the overpriced multi-color gelaterias direct on the main plaza and get authentic gelato here.",
      mapsQuery: "Gelateria dell Angelo Via delle Terme di Tito Rome"
    }
  ]
};

export const vaticanDiningGems: ColosseumDiningGroups = {
  breakfast: [
    {
      name: "Sciascia Caffè 1919",
      address: "Via Fabio Massimo, 80a, 00192 Roma",
      specialty: "Gran Caffè Sciascia (perfect espresso lined with warm melted dark chocolate inside the high-quality porcelain cup).",
      insiderTip: "A historical Prati district masterpiece. Dark wood paneling, polished brass relics, and neighborhood elders talking local football. Sit back and watch history.",
      mapsQuery: "Sciascia Caffe 1919 Via Fabio Massimo Rome"
    },
    {
      name: "Pasticceria Parenti",
      address: "Via Ottaviano, 75, 00192 Roma",
      specialty: "Warm crispy Cornetto filled with house-whipped custard cream.",
      insiderTip: "Extremely vintage neighborhood pastry shop. Offers incredible morning pastries and outstanding service at less than half of what tourist-trap avenues charge.",
      mapsQuery: "Pasticceria Parenti Via Ottaviano Rome"
    }
  ],
  coffee: [
    {
      name: "Castroni Prati",
      address: "Via Cola di Rienzo, 196, 00192 Roma",
      specialty: "Espresso Bar serving Castroni's legendary custom roasted house blends.",
      insiderTip: "Castroni is a famous gourmet colonial grocer and coffee roaster open since 1932. Stand at the busy wooden coffee counter to sip, surrounded by exotic spices from around the globe.",
      mapsQuery: "Castroni Cola di Rienzo Rome"
    },
    {
      name: "Bar Sant'Angelo",
      address: "Borgo Pio, 44, 00193 Roma",
      specialty: "Excellent strong morning Cappuccino & fresh local pastries.",
      insiderTip: "Borgo Pio is a majestic medieval lane right next to the Vatican walls. Skip the flashy broad avenues and enjoy your coffee here in the quiet early morning shade.",
      mapsQuery: "Bar Sant Angelo Borgo Pio Rome"
    }
  ],
  lunch: [
    {
      name: "Hostaria Dino e Toni",
      address: "Via Leone IV, 60, 00192 Roma",
      specialty: "Thick Tonnarelli alla Carbonara and incredibly massive plates of dynamic Roman antipasti served family-style.",
      insiderTip: "The boisterous, legendary Roman brothers Dino & Toni will literally select your meals for you. Prepare for an unforgettable, high-energy dining experience with stellar traditional food.",
      mapsQuery: "Hostaria Dino e Toni Via Leone IV Rome"
    },
    {
      name: "La Pratolina",
      address: "Via Rialto, 14, 00136 Roma",
      specialty: "Authentic oval Pinsa Romana with light, long-leavened sourdough crust topped with premium mortadella & fresh burrata.",
      insiderTip: "Cozy local neighborhood dining room with very warm hospitality. Much lighter and crispier than regular pizza. Booking as early as possible is highly recommended.",
      mapsQuery: "La Pratolina Via Rialto Rome"
    }
  ],
  dinner: [
    {
      name: "Osteria dell'Angelo",
      address: "Via G. Bettolo, 24, 00195 Roma",
      specialty: "Classic high-quality Roman Quinto Quarto dishes (such as Coda alla Vaccinara oxtail stew) and Tonarelli Cacio e Pepe.",
      insiderTip: "Hosted under beautiful portraits of legendary Roman cinema stars. A loud, packed, and intensely authentic local tavern that feels frozen in time. Incredible value.",
      mapsQuery: "Osteria dell Angelo Via Bettolo Rome"
    },
    {
      name: "Ristorante Del Frate",
      address: "Via degli Scipioni, 118, 00192 Roma",
      specialty: "Exceptional modern twists on traditional Roman dishes paired with an spectacular floor-to-ceiling cellared wine list.",
      insiderTip: "A sophisticated yet incredibly honest neighborhood favorite in Prati. Highly romantic and absolutely perfect for a high-quality date night under the stars near the Vatican.",
      mapsQuery: "Ristorante Del Frate Via degli Scipioni Rome"
    }
  ],
  snack: [
    {
      name: "Pizzarium Bonci",
      address: "Via della Meloria, 43, 00136 Roma",
      specialty: "Gourmet Pizza al Taglio (by the slice) featuring wild seasonal toppings like roasted potato & rosemary, or mortadella & pistachio.",
      insiderTip: "Founded by Gabriele Bonci, celebrated as the 'Michelangelo of Pizza'. Take your ticket number early, stand on the pavement with local foodies, and eat these legendary crispy slices hot.",
      mapsQuery: "Pizzarium Bonci Via della Meloria Rome"
    },
    {
      name: "Pastasciutta (Vaticano)",
      address: "Borgo Pio, 184, 00193 Roma",
      specialty: "Ultra-fresh, hand-rolled Roman pasta (Carbonara, Amatriciana) made right in front of you and served in warm cardboard cones.",
      insiderTip: "Exceptional quality, fast, and unbelievably affordable. Grab a hot carton of noodles and enjoy a lovely street stand snack away from overpriced tourist bistros.",
      mapsQuery: "Pastasciutta Borgo Pio Rome"
    }
  ],
  gelato: [
    {
      name: "Gelateria Gracchi",
      address: "Via dei Gracchi, 272, 00192 Roma",
      specialty: "Incredible roasted Sicilian Pistacchio di Bronte & fresh Pear with Caramelized Fig gelato.",
      insiderTip: "Regarded by Roman locals as one of the top three authentic gelato spots in the entire city. Zero fake neon puffiness here; only 100% natural ingredients of the supreme quality.",
      mapsQuery: "Gelateria Gracchi Via dei Gracchi Rome"
    },
    {
      name: "Gelateria Nesta",
      address: "Via Cola di Rienzo, 9, 00192 Roma",
      specialty: "Artisanal Creamy Hazelnut (Nocciola) and delicate lemon-basil sorbets.",
      insiderTip: "Completely understated local family parlor with incredible texture. Skip the massive, shiny corporate gelato signs and grab a authentic cone here.",
      mapsQuery: "Gelateria Nesta Rome"
    }
  ]
};

export const hotelDiningGems: ColosseumDiningGroups = {
  breakfast: [
    {
      name: "Caffè San Giovanni",
      address: "Via Emanuele Filiberto, 131, 00185 Roma",
      specialty: "Fresh Cornetto glassato with powdered sugar paired with a thick local double-shot Cappuccino.",
      insiderTip: "Just a speedy 3-minute stroll from the hotel lobby. Perfect for a quick, unpretentious, highly affordable Italian morning starter with the local crowd.",
      mapsQuery: "Caffe San Giovanni Via Emanuele Filiberto Rome"
    },
    {
      name: "Pasticceria Romoli",
      address: "Via Magna Grecia, 40, 00183 Roma",
      specialty: "Fluffy classic Roman Maritozzo con la Panna and gorgeous sweet fruit tarts.",
      insiderTip: "A legendary neighborhood landmark since 1952. Busy, friendly, and highly energetic. Squeeze in with commuters and enjoy fresh pastries baked on-site.",
      mapsQuery: "Pasticceria Romoli Rome"
    }
  ],
  coffee: [
    {
      name: "Roscioli Caffè (Esquilino)",
      address: "Via Emanuele Filiberto, 192, 00185 Roma",
      specialty: "Perfectly pulled Italian Espresso and mini artisanal pastries.",
      insiderTip: "Unbelievably close to your hotel building. Stand at the polished counter next to commuters heading into the Manzoni metro stop and experience fast-paced, high-class espresso culture.",
      mapsQuery: "Roscioli Caffe Via Emanuele Filiberto Rome"
    },
    {
      name: "Faro - Luminari del Caffè",
      address: "Via Albalonga, 22, 00183 Roma",
      specialty: "Artisanal specialty coffee beans, manual filter pour-overs, and custom aeropressed roasts.",
      insiderTip: "Widely celebrated as Rome’s very best modern specialty coffee house. Take a casual morning walk down historic residential tree-lined avenues to reach this local paradise.",
      mapsQuery: "Faro Luminari del Caffe Rome"
    }
  ],
  lunch: [
    {
      name: "Trattoria da Danilo",
      address: "Via Boiardo, 17, 00185 Roma",
      specialty: "Authentic Carbonara tossed with crisp guanciale right at your table and traditional Roman-style artichokes.",
      insiderTip: "Literally around the corner from the Hilton hotel! This is one of Rome's most beloved family trattorias, favored by world-class foodies. Booking a table is mandatory.",
      mapsQuery: "Trattoria da Danilo Via Boiardo Rome"
    },
    {
      name: "Aromaticus San Giovanni",
      address: "Via Gabi, 5, 00183 Roma",
      specialty: "Fresh artisanal grain bowls, beef tartare options, and dynamic custom botanical tonics.",
      insiderTip: "An incredibly chic plant-filled green oasis offering a healthy, delicious, light dining alternative in the middle of San Giovanni.",
      mapsQuery: "Aromaticus San Giovanni Rome"
    }
  ],
  dinner: [
    {
      name: "SantoPalato",
      address: "Piazza Tarquinia, 5, 00183 Roma",
      specialty: "Historic Roman offal dishes reimagined, plus Rome's absolute premier Carbonara and tender beef tongue terrine.",
      insiderTip: "Helmed by the incredibly talented young chef Sarah Cicolini. Widely regarded by international culinary editors as the best modern classic trattoria in Rome. Book weeks in advance!",
      mapsQuery: "SantoPalato Piazza Tarquinia Rome"
    },
    {
      name: "Ristorante Cannavota",
      address: "Piazza di S. Giovanni in Laterano, 20, 00184 Roma",
      specialty: "Traditional Roman salt cod (Baccalà della casa) and beautifully roasted rosemary spring lamb with crispy potatoes.",
      insiderTip: "A neighborhood pillar since 1962. Elegant vintage dining rooms with dark woods, direct views of the grand ancient obelisk and the beautiful Basilica of San Giovanni in Laterano.",
      mapsQuery: "Ristorante Cannavota Rome"
    }
  ],
  snack: [
    {
      name: "Panificio Giovanni Volpetti",
      address: "Via di San Giovanni in Laterano, 100, 00184 Roma",
      specialty: "Traditional Roman supplì (fried rice balls stuffed with melting warm mozzarella) and freshly baked Pizza Bianca filled with thin mortadella slices.",
      insiderTip: "A supreme historic bakery producing outstanding artisanal breads and hot Roman snacks since the district's expansion years. Fantastic mid-day bite.",
      mapsQuery: "Panificio Giovanni Volpetti Rome"
    },
    {
      name: "Pinsere",
      address: "Via Flavia, 98, 00187 Roma",
      specialty: "Incredible miniature Pinsa pockets topped with delicate speck, honey, walnuts, and creamy gorgonzola.",
      insiderTip: "A wonderful localized standing-room-only neighborhood gems shop. Perfect for a fast, piping-hot gourmet snack on your way back to the hotel.",
      mapsQuery: "Pinsere Via Flavia Rome"
    }
  ],
  gelato: [
    {
      name: "Gelateria San Giovanni",
      address: "Via Emanuele Filiberto, 140, 00185 Roma",
      specialty: "Exceptionally rich Dark Chocolate (Fondente) and local hand-crushed Strawberry water sorbet.",
      insiderTip: "Literally a 1-minute walk from the Hilton Garden Inn lobby entrance! A charming, unpretentious family parlor serving legendary, colossal scoops of handcrafted goodness.",
      mapsQuery: "Gelateria San Giovanni Via Emanuele Filiberto Rome"
    },
    {
      name: "Palazzo del Freddo Giovanni Fassi",
      address: "Via Principe Eugenio, 65, 00185 Roma",
      specialty: "The legendary 'Sanpietrino' (a perfect chocolate-coated ice-cream cube inspired by Rome's paving stones).",
      insiderTip: "Italy's oldest and grandest ice cream palace, founded in 1880. A magnificent historic hall with vintage neon lettering, marble counters, and plenty of retro seating.",
      mapsQuery: "Palazzo del Freddo Giovanni Fassi Rome"
    }
  ]
};
