import { Node } from './types';

export const osmTagToNameMapping: Node = {
  highway: {
    '*': 'Road {}',
    bus_stop: 'Bus stop',
    track: {
      '*': 'Forest road',
      tracktype: {
        grade1: 'Compacted forest road',
        grade2: 'Mostly compacted forest road',
        grade3: 'Less firm, unpaved forest road',
        grade4: 'Forest road navigable by tractor or similar vehicles',
        grade5: 'Barely discernible forest road',
      },
    },
    service: {
      '*': 'Service driveway road',
      service: {
        '*': 'Service road {}',
        alley: 'Alley',
        bus: 'Mass transit road',
        driveway: 'Driveway',
        'drive-through': 'Drive through',
        emergency_access: 'Emergency access road',
        parking_aisle: 'Parking aisle',
      },
    },
    construction: 'Road under construction',
    crossing: 'Pedestrian crossing',
    cycleway: 'Cycleway',
    footway: 'Sidewalk',
    living_street: 'Residential',
    motorway_link: 'Motorway link',
    motorway: 'Highway',
    path: 'Path',
    primary_link: 'Primary road link',
    primary: 'Primary highway',
    residential: 'Street',
    secondary: 'Secondary highway',
    secondaty_link: 'Secondary road link',
    steps: 'Stairs',
    tertiary_link: 'Tertiary road link',
    tertiary: 'Tertiary highway',
    trunk_link: 'Trunk link',
    trunk: 'Trunk road',
    unclassified: 'Unclassified road',
  },
  boundary: {
    '*': 'Region',
    administrative: {
      '*': 'Administrative region',
      admin_level: {
        '10': 'Cadastre region',
        '9': 'Village',
        '8': 'District',
        '7': 'Region',
        '6': 'City',
        '5': 'Province',
        '4': 'District',
        '3': 'Region',
        '2': 'Country',
      },
    },
    protected_area: 'Protected area',
  },
  type: {
    route: {
      '*': 'Trail',
      route: {
        '*': 'Trail {}',
        hiking: 'Hiking trail',
        foot: 'Pedestrian trail',
        bicycle: 'Bicycle trail',
        ski: 'Ski trail',
        piste: 'Ski slope or path',
        horse: 'Equestrian path',
        railway: 'Railway',
        tram: 'Tramway',
        bus: 'Bus way',
        mtb: 'Mountain biking trail',
      },
    },
  },
  building: {
    '*': 'Building {}',
    // TODO
    apartments: 'Apartments',
    bungalow: 'Bungalow',
    cabin: 'Cabin',
    cathedral: 'Cathedral',
    chapel: 'Chapel',
    church: 'Church',
    commercial: 'Commercial building',
    detached: 'Free standing house',
    dormitory: 'Dormitory',
    farm: 'Farm',
    garage: 'Garage',
    hotel: 'Hotel building',
    house: 'Private house',
    houseboat: 'Houseboat',
    industrial: 'Industrial building',
    mosque: 'Mosque',
    office: 'Office building',
    residential: 'Residential house',
    semidetached_house: 'Duplex house',
    shrine: 'Shrine',
    static_caravan: 'Mobile house, caravan',
    synagogue: 'Synagogue',
    temple: 'Temple',
    terrace: 'Row house',
    train_station: 'Train station',
    yes: 'Building',
  },
  amenity: {
    '*': '{}',
    hunting_stand: 'Hunting stand',
    toilets: 'WC',
    shelter: {
      '*': 'Shelter',
      shelter_type: {
        '*': 'Shelter {}',
        basic_hut: 'Basic hut',
        changing_rooms: 'Changing rooms',
        field_shelter: 'Field shelter',
        lean_to: 'Lean to',
        picnic_shelter: 'Picnic shelter',
        public_transport: 'Public transport shelter',
        rock_shelter: 'Rock shelter',
        sun_shelter: 'Sun shelter',
        weather_shelter: 'Weather shelter',
      },
    },
    atm: 'ATM',
    bank: 'Bank',
    bar: 'Bar',
    bench: 'Bench',
    bicycle_parking: 'Bicycle parking',
    bus_station: 'Bus station',
    cafe: 'Cafe',
    charging_station: 'Charging station',
    clinic: 'Clinic',
    dentist: 'Dentist',
    doctors: "Doctor's office",
    drinking_water: 'Drinking water',
    fast_food: 'Fast food',
    fire_station: 'Fire station ',
    fountain: 'Fountain',
    fuel: 'Gas station',
    hospital: 'Hospital',
    kindergarten: 'Kindergarten',
    library: 'Library',
    parking: 'Parking',
    pharmacy: 'Pharmacy',
    place_of_worship: 'Place of worship',
    police: 'Police',
    post_box: 'Post box',
    post_office: 'Post office',
    pub: 'Pub',
    recycling: 'Recycling',
    restaurant: 'Restaurant',
    school: 'School',
    telephone: 'Telephone',
    townhall: 'Town hall',
    vending_machine: 'Vending machine',
    waste_basket: 'Trash bin',
    waste_disposal: 'Waste disposal',
  },
  waterway: {
    '*': 'Waterway {}',
    canal: 'Canal',
    dam: 'Dam',
    ditch: 'Ditch',
    drain: 'Drain',
    river: 'River',
    riverbank: 'River bank',
    stream: 'Creek, stream',
    waterfall: 'Waterfall',
  },
  landuse: {
    '*': '{}',
    allotments: 'Allotments',
    cemetery: 'Cemetery',
    commercial: 'Commercial',
    farmland: 'Farmland',
    farmyard: 'Farmyard',
    forest: 'Forest',
    grass: 'Grass',
    industrial: 'Industrial',
    meadow: 'Meadow',
    military: 'Military area',
    orchard: 'Orchard',
    quarry: 'Quarry',
    religions: 'Religious land', // TODO
    reservoir: 'Reservoir',
    residential: 'Residential',
    vineyard: 'Vineyard',
  },
  leisure: {
    '*': '{}',
    firepit: 'Fireplace',
    garden: 'Garden',
    park: 'Park',
    picnic_table: 'Picnic table',
    pitch: 'Pitch',
    playground: 'Playground',
    stadium: 'Stadium',
    swimming_pool: 'Swimming pool',
    track: 'Track',
  },
  natural: {
    '*': '{}',
    arch: 'Rock arch',
    basin: 'Basin',
    cave_entrance: 'Cave',
    heath: 'Heathland',
    mountain_range: 'Mountain range',
    peak: 'Peak',
    plateau: 'Plateau',
    ridge: 'Ridge',
    saddle: 'Saddle',
    scree: 'Scree',
    scrub: 'Scrub, bushes',
    spring: 'Spring',
    tree_row: 'Tree row',
    tree: 'Tree',
    valley: 'Valley',
    water: 'Water body',
    wood: 'Forest',
  },
  man_made: {
    '*': '{}',
    adit: 'Adit',
    beehive: 'Beehive',
    chimney: 'Chimney',
    clearcut: 'Forest clearing',
    embankment: 'Embankment',
    mineshaft: 'Mineshaft',
    observatory: 'Observatory',
    pipeline: 'Pipeline',
    silo: 'Silo',
    tower: {
      '*': 'Tower',
      'tower:type': {
        bell_tower: 'Bell tower',
        communication: 'Communication tower',
        cooling: 'Cooling tower',
        observation: 'Observation tower',
      },
    },
    wastewater_plant: 'Wastewater plant',
    water_tower: 'Water Tower',
  },
  power: {
    '*': '{}',
    pole: 'Power pole',
    tower: 'Power tower',
    line: 'Power line',
    minor_line: 'Minor power line',
  },
  railway: 'Railroad',
  aerialway: 'Aerial way, lift',
  shop: {
    '*': 'Shop {}',
    antiques: 'Antiques',
    bakery: 'Bakery',
    bicycle: 'Bicycle',
    books: 'Book store',
    butcher: 'Butcher',
    car_parts: 'Car parts',
    car_repair: 'Car repair',
    car: 'Car dealership',
    carpet: 'Carpet store',
    chemist: 'Drug-store, chemist',
    clothes: 'Apparel store',
    computer: 'Computer store',
    convenience: 'Convenience store',
    copyshop: 'Copy shop',
    department_store: 'Department store',
    electronics: 'Electronics',
    fabric: 'Textile store',
    florist: 'Florist',
    funeral_directors: 'Funeral Services',
    furniture: 'Furniture store',
    garden_center: 'Gardening center',
    greengrocer: 'Fruit and vegetables store',
    hairdresser: 'Hairdresser',
    hardware: 'Hardware',
    ice_cream: 'Ice cream',
    jewerly: 'Jewerly',
    kiosk: 'Kiosk',
    mall: 'Shopping center / mall',
    mobile_phone: 'Mobile phone store',
    optician: 'Optics',
    outdoor: 'Outdoor',
    paint: 'Paint shop',
    pet: 'Pet shop',
    radiotechnics: 'Radiotechnics',
    second_hand: 'Secondhand',
    shoes: 'Shoes',
    sports: 'Sports',
    stationery: 'Stationery store',
    supermarket: 'Supermarket',
    tattoo: 'Tattoo',
    toys: 'Toy store',
    trade: 'Building materials store',
  },
  historic: {
    '*': 'Historic structure',
    wayside_cross: 'Wayside cross',
    wayside_shrine: 'Wayside shrine',
    archaeological_site: 'Archaeological site',
    monument: 'Monument',
    monastery: 'Monastery',
    tomb: 'Tomb',
    ruins: {
      '*': 'Ruins',
      ruins: {
        castle: 'Castle ruins',
      },
    },
  },
  barrier: {
    '*': 'Barrier {}',
    block: 'Block',
    bollard: 'Bollard',
    chain: 'Chain',
    entrance: 'Entrance',
    fence: 'Fence',
    gate: 'Gate',
    hedge: 'Hedge',
    lift_gate: 'Lift gate',
    swing_gate: 'Swing gate',
    wall: 'Wall',
  },
  sport: {
    '*': 'Sport {}',
    soccer: 'Football / soccer',
    tennis: 'Tennis',
  },
  tourism: {
    '*': '{}',
    viewpoint: 'Viewpoint',
    information: {
      '*': 'Information',
      information: {
        '*': 'Information {}',
        office: 'Information office',
        board: 'Information board',
        guidepost: 'Guidepost',
        map: 'Map',
      },
    },
    apartment: 'Apartment',
    attraction: 'Attraction',
    camp_site: 'Campsite',
    caravan_site: 'Caravan site',
    chalet: 'Chalet',
    guest_house: 'Guest house',
    hostel: 'Hostel',
    hotel: 'Hotel',
    motel: 'Motel',
    artwork: {
      '*': 'Art',
      artwork_type: {
        bust: 'Bust',
        sculpture: 'Sculpture',
        statue: 'Statue',
        mural: 'Mural',
        painting: 'Painting',
        architecture: 'Architecture',
      },
    },
    picnic_site: 'Picnic site',
    museum: 'Museum',
    zoo: 'ZOO',
  },
  place: {
    '*': 'Place {}',
    city: 'City',
    country: 'Country',
    hamlet: 'Hamlet',
    isolated_dwelling: 'Isolated dwelling',
    locality: 'Locality',
    state: 'State',
    suburb: 'Suburb',
    town: 'Town',
    village: 'Village',
  },
};
export const colorNames: Record<string, string> = {
  red: 'Red',
  blue: 'Blue',
  green: 'Green',
  yellow: 'Yellow',
  orange: 'Orange',
  purple: 'Purple',
  violet: 'Violet',
  white: 'White',
  black: 'Black',
  gray: 'Gray',
  brown: 'Brown',
};
