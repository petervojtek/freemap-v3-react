import { Node } from './types';

export const osmTagToNameMapping: Node = {
  highway: {
    '*': 'Cesta {}',
    bus_stop: 'Autobusová zastávka',
    construction: 'Cesta vo výstavbe',
    crossing: 'Priechod',
    cycleway: 'Cyklochodník',
    footway: 'Chodník',
    living_street: 'Obytná zóna',
    motorway_link: 'Napojenie na ďiaľnicu',
    motorway: 'Diaľnica',
    path: 'Cestička',
    primary_link: 'Napojenie na cestu prvej triedy',
    primary: 'Cesta prvej triedy',
    residential: 'Ulica',
    secondary: 'Cesta druhej triedy',
    secondaty_link: 'Napojenie na cestu druhej triedy',
    service: {
      '*': 'Servisná, príjazdová cesta',
      service: {
        '*': 'Servisná cesta {}',
        alley: 'Prejazdová cesta',
        bus: 'Cesta vyhradená pre autobus',
        driveway: 'Príjazdová cesta',
        'drive-through': 'Cesta pre nákup z auta',
        emergency_access: 'Požiarna cesta',
        parking_aisle: 'Cesta parkoviska',
      },
    },
    steps: 'Schody',
    tertiary_link: 'Napojenie na cestu tretej triedy',
    tertiary: 'Cesta tretej triedy',
    track: {
      '*': 'Lesná / poľná cesta',
      tracktype: {
        grade1: 'Spevnená lesná / poľná cesta',
        grade2: 'Prevažne spevnená lesná / poľná cesta',
        grade3: 'Menej pevná lesná / poľná cesta',
        grade4: 'Prevažne mäkká lesná / poľná cesta',
        grade5: 'Mäkká lesná / poľná cesta',
      },
    },
    trunk_link: 'Napojenie na cestu pre motorové vozidlá',
    trunk: 'Cesta pre motorové vozidlá',
    unclassified: 'Neklasifikovaná cesta',
  },
  boundary: {
    '*': 'Oblasť',
    administrative: {
      '*': 'Administratívna oblasť',
      admin_level: {
        '10': 'Katastrálne územie',
        '9': 'Obec',
        '8': 'Okres',
        '7': 'Oblasť',
        '6': 'Mesto',
        '5': 'Provincia',
        '4': 'Kraj',
        '3': 'Región',
        '2': 'Štát',
      },
    },
    protected_area: 'Chránená oblasť',
    national_park: 'Národný park', // *
  },
  type: {
    route: {
      '*': 'Trasa',
      route: {
        '*': 'Trasa {}',
        bicycle: 'Cyklotrasa',
        bus: 'Trasa autobusu',
        foot: 'Pešia trasa',
        hiking: 'Turistická trasa',
        horse: 'Jazdecká trasa',
        mtb: 'Trasa pre horské bicykle',
        piste: 'Bežkárska trasa',
        railway: 'Železničná trasa',
        ski: 'Lyžiarska trasa',
        tram: 'Električková trasa',
      },
    },
  },
  building: {
    '*': 'Budova {}',
    apartments: 'Apartmány',
    bungalow: 'Bungalov',
    cabin: 'Búda, chatka',
    cathedral: 'Katedrála',
    chapel: 'Kaplnka',
    church: 'Kostol',
    commercial: 'Budova určená na komerčné účely',
    detached: 'Samostatne stojaci rodinný dom',
    dormitory: 'Internát',
    farm: 'Statok',
    garage: 'Garáž',
    hotel: 'Budova hotela',
    house: 'Rodinný dom',
    houseboat: 'Hausbót',
    industrial: 'Budova určená na priemyselné účely',
    mosque: 'Mešita',
    office: 'Budova s kanceláriami',
    residential: 'Obytný dom',
    semidetached_house: 'Dvojdom',
    shrine: 'Svätyňa',
    static_caravan: 'Obytný príves, karavan',
    synagogue: 'Synagóga',
    temple: 'Chrám',
    terrace: 'Radový dom',
    train_station: 'Vlaková stanica',
    yes: 'Budova',
  },
  amenity: {
    '*': '{}',
    atm: 'Bankomat',
    bank: 'Banka',
    bar: 'Bar',
    bbq: 'Gril', // *
    bench: 'Lavička',
    bicycle_parking: 'Parkovanie pre bicykle',
    brothel: 'Bordel', // *
    bureau_de_change: 'Zmenáreň', // *
    bus_station: 'Autobusová stanica',
    cafe: 'Kaviareň',
    casino: 'Kasíno', // *
    charging_station: 'Nabíjacia stanica',
    clinic: 'Poliklinika',
    community_centre: 'Kominutné centrum', // *
    courthouse: 'Súd', // *
    dentist: 'Zubná ordinácia',
    doctors: 'Lekárska ordinácia',
    drinking_water: 'Pitná voda',
    embassy: 'Ambasáda', // *
    fast_food: 'Rýchle občerstvenie',
    fire_station: 'Hasičská stanica',
    fountain: 'Fontána',
    fuel: 'Čerpacia stanica',
    gambling: 'Herňa', // *
    grave_yard: 'Pohrebisko', // *
    hospital: 'Nemocnica',
    hunting_stand: 'Poľovnícky posed',
    kindergarten: 'Škôlka',
    library: 'Knižnica',
    monastery: 'Kláštor', // *
    nightclub: 'Nočný klub', // *
    parking: 'Parkovanie',
    pharmacy: 'Lekáreň',
    place_of_mourning: 'Dom smútku', // *
    place_of_worship: 'Chrám/kostol',
    planetarium: 'Planetárium', // *
    police: 'Polícia',
    post_box: 'Poštová schránka',
    post_office: 'Pošta',
    prison: 'Väznica', // *
    pub: 'Krčma',
    recycling: 'Recyklovanie',
    restaurant: 'Reštaurácia',
    school: 'Škola',
    shelter: {
      '*': 'Prístrešok',
      shelter_type: {
        '*': 'Prístrešok {}',
        basic_hut: 'Jednoduchá chata, bivak',
        changing_rooms: 'Prezliekáreň',
        field_shelter: 'Poľný prístrešok',
        lean_to: 'Prístrešok s otvorenou stenou',
        picnic_shelter: 'Piknikový prístrešok',
        public_transport: 'Prístrešok verejnej dopravy',
        rock_shelter: 'Skalný úkryt',
        sun_shelter: 'Prístrešok proti slnku',
        weather_shelter: 'Prístrešok proti nepriaznivému počasiu',
      },
    },
    social_centre: 'Sociálne centrum', // *
    social_facility: 'Sociálne zariadenie', // *
    taxi: 'Taxi', // *
    telephone: 'Telefón',
    toilets: 'WC',
    townhall: 'Mestská radnica, obecný úrad',
    university: 'Univerzita', // *
    vending_machine: 'Automat',
    veterinary: 'Veterinár', // *
    watering_place: 'Napájadlo', // *
    waste_basket: 'Odpadkový kôš',
    waste_disposal: 'Odpadkový kôš',
  },
  waterway: {
    '*': 'Vodný tok {}',
    canal: 'Kanál',
    river: 'Rieka',
    stream: 'Potok',
    ditch: 'Priekopa',
    drain: 'Odtok',
    waterfall: 'Vodopád',
    riverbank: 'Breh',
    dam: 'Priehrada',
  },
  landuse: {
    '*': '{}',
    allotments: 'Zahradkárska oblasť',
    brownfield: 'Miesto na novú výstavbu', // *
    cemetery: 'Cintorín',
    commercial: 'Komerčná zóna',
    construction: 'Stavenisko', // *
    farmland: 'Pole',
    farmyard: 'Družstvo',
    forest: 'Les',
    garages: 'Garáže', // *
    grass: 'Tráva',
    greenfield: 'Nové miesto na výstavbu',
    industrial: 'Industriálna zóna',
    landfill: 'Skládka', // *
    meadow: 'Lúka',
    military: 'Vojenská oblasť',
    orchard: 'Sad',
    plant_nursery: 'Lesná škôlka', // *
    quarry: 'Lom',
    recreation_ground: 'Oddychová zóna', // *
    religions: 'Cirkevný pozemok',
    reservoir: 'Priehrada / nádrž',
    residential: 'Rezidenčná zóna',
    retail: 'Nákupná zóna', // *
    vineyard: 'Vinica',
    winter_sports: 'Miesto zimných športov', // *
  },
  leisure: {
    '*': '{}',
    dog_park: 'Park pre psy', // *
    firepit: 'Ohnisko',
    fishing: 'Miesto na rybárčenie', // *
    fitness_centre: 'Fitness centrum', // *
    fitness_station: 'Fitness stanica', // *
    garden: 'Záhrada',
    golf_course: 'Golfové ihrisko', // *
    horse_riding: 'Jazdenie na koni', // *
    nature_reserve: 'Prírodná rezervácia', // *
    park: 'Park',
    picnic_table: 'Piknikový stôl',
    pitch: 'Ihrisko',
    playground: 'Detské ihrisko',
    sports_centre: 'Športové centrum', // *
    sports_hall: 'Športová hala', // *
    stadium: 'Štadión',
    swimming_pool: 'Bazén',
    track: 'Dráha',
    water_park: 'Vodný park', // *
  },
  natural: {
    '*': '{}',
    arch: 'Skalné okno',
    bare_rock: 'Holá skala', // *
    basin: 'Kotlina',
    cave_entrance: 'Jaskyňa',
    cliff: 'Bralo',
    geyser: 'Gejzír', // *
    grassland: 'Trávnatá vegetácia', // *
    heath: 'Step',
    hot_spring: 'Termálny prameň',
    mountain_range: 'Pohorie',
    mud: 'Blato', // *
    peak: 'Vrchol',
    plateau: 'Planina',
    ridge: 'Hrebeň',
    rock: 'Skala', // *
    saddle: 'Sedlo',
    sand: 'Piesok', // *
    scree: 'Suťovisko',
    scrub: 'Kríky',
    sinkhole: 'Závrt', // *
    spring: 'Prameň',
    stone: 'Balvan', // *
    tree_row: 'Stromoradie / vetrolam',
    tree: 'Strom',
    valley: 'Dolina',
    water: 'Vodná plocha',
    wetland: 'Mokraď', // *
    wood: 'Les',
  },
  man_made: {
    '*': '{}',
    adit: 'Banská štôlňa',
    beehive: 'Úľ',
    bridge: 'Most', // *
    bunker_silo: 'Silo', // *
    chimney: 'Komín',
    clearcut: 'Rúbanisko', // *
    communications_tower: 'Komunikačná veža', // *
    crane: 'Žeriav', // *
    cross: 'Kríž', // *
    cutline: 'Prierez', // *
    dyke: 'Hrádza', // *
    embankment: 'Násyp',
    lighthouse: 'Maják', // *
    mast: 'Stožiar', // *
    mineshaft: 'Banská šachta',
    observatory: 'Observatórium',
    pier: 'Mólo', // *
    pipeline: 'Potrubie',
    reservoir_covered: 'Krytý rezervoár', // *
    silo: 'Silo',
    survey_point: 'Geodetický bod', // *
    telescope: 'Teleskop', // *
    tower: {
      '*': 'Veža',
      'tower:type': {
        bell_tower: 'Zvonica',
        communication: 'Telekomunikačná veža',
        cooling: 'Chladiarenska veža',
        observation: 'Vyhliadková veža',
      },
    },
    wastewater_plant: 'Čistička odpadových vôd',
    water_tower: 'Vodárenská veža',
    water_well: 'Studňa', // *
    water_works: 'Hodohospodárský objekt', // *
    watermill: 'Vodný mlyn', // *
    windmill: 'Veterný mlyn', // *
    works: 'Fabrika', // *
  },
  power: {
    '*': '{}',
    generator: 'Generátor', // *
    line: 'Elektrické vedenie',
    minor_line: 'Malé elektrické vedenie',
    plant: 'Elektráreň', // *
    pole: 'Elektrický stĺp',
    substation: 'Elektrická distribučná stanica', // *
    tower: 'Veža vysokého napätia',
    transformer: 'Transformátor', // *
  },
  railway: 'Železnica',
  aerialway: 'Lanovka, vlek',
  shop: {
    '*': 'Obchod {}',
    antiques: 'Starožitnosti',
    bakery: 'Pekáreň',
    bicycle: 'Predaj bicyklov',
    books: 'Kníhkupectvo',
    butcher: 'Mäsiareň',
    car_parts: 'Predaj autosúčiastok',
    car_repair: 'Autoservis',
    car: 'Predaj áut',
    carpet: 'Predaj kobercov',
    chemist: 'Drogéria',
    clothes: 'Obchod s oblečením',
    computer: 'Počítačový obchod',
    convenience: 'Potraviny',
    copyshop: 'Copy centrum',
    department_store: 'Obchodný dom',
    electronics: 'Obchod s elektronikou',
    fabric: 'Metrový textil',
    florist: 'Kvetinárstvo',
    funeral_directors: 'Pohrebná služba',
    furniture: 'Predaj nábytku',
    garden_center: 'Záhradné centrum',
    greengrocer: 'Ovocie a zelenina',
    hairdresser: 'Kaderníctvo, holičstvo',
    hardware: 'Železiarstvo',
    ice_cream: 'Zmrzlina',
    jewerly: 'Klenotníctvo',
    kiosk: 'Stánok',
    mall: 'Nákupné stredisko',
    mobile_phone: 'Predaj mobilných telefónov',
    optician: 'Optika',
    outdoor: 'Predaj outdoor vybavenia',
    paint: 'Farby, laky',
    pet: 'Potreby pre zvieratá',
    radiotechnics: 'Predaj elektronických súčiastok',
    second_hand: 'Second hand',
    shoes: 'Obuv',
    sports: 'Športové potreby',
    stationery: 'Papiernictvo',
    supermarket: 'Supermarket',
    tattoo: 'Tetovacie štúdio',
    toys: 'Hračkárstvo',
    trade: 'Stavebniny',
  },
  historic: {
    '*': 'Historický objekt',
    archaeological_site: 'Archeologické nálezisko',
    castle: 'Hrad', // *
    church: 'Historický kostol', // *
    city_gate: 'Mestsná brána', // *
    manor: 'Panstvo', // *
    memorial: 'Pmätník', // *
    monastery: 'Kláštor',
    monument: 'Pomník, monument',
    ruins: {
      '*': 'Ruiny',
      ruins: {
        castle: 'Zrúcanina hradu',
      },
    },
    tomb: 'Hrobka',
    wayside_cross: 'Prícestný kríž',
    wayside_shrine: 'Božia muka',
  },
  barrier: {
    '*': 'Bariéra {}',
    block: 'Blok',
    bollard: 'Stĺpik',
    border_control: 'Hraničná kontrola', // *
    chain: 'Reťaz',
    ditch: 'Priekopa', // *
    entrance: 'Vstup',
    fence: 'Plot',
    gate: 'Brána',
    hedge: 'Živý plot',
    kerb: 'Obrubník', // *
    lift_gate: 'Závora',
    rope: 'Lano', // *
    sliding_gate: 'Posuvná brána', // *
    swing_gate: 'Otočná závora',
    turnstile: 'Turniket', // *
    wall: 'Múr',
  },
  sport: {
    '*': 'Šport {}',
    basketball: 'Basketbal', // *
    beachvolleyball: 'Plážový volejbal', // *
    chess: 'Šach', // *
    climbing: 'Lezenie', // *
    fitness: 'Posilňovňa', // *
    golf: 'Golf', // *
    multi: 'Rôzne športy', // *
    running: 'Beh', // *
    shooting: 'Streľba', // *
    skiing: 'Lyžovanie', // *
    soccer: 'Futbal',
    swimming: 'Plávanie', // *
    tennis: 'Tenis',
    volleyball: 'Volejbal', // *
  },
  tourism: {
    '*': '{}',
    alpine_hut: 'Horská chata', // *
    apartment: 'Apartmán',
    artwork: {
      '*': 'Umenie',
      artwork_type: {
        architecture: 'Významná budova, stavba',
        bust: 'Busta',
        mural: 'Nástenná maľba',
        painting: 'Maľba',
        sculpture: 'Plastika',
        statue: 'Socha',
      },
    },
    attraction: 'Atrakcia',
    camp_site: 'Kemp',
    caravan_site: 'Autokemp pre obytné prívesy',
    chalet: 'Chata',
    guest_house: 'Penzión',
    hostel: 'Hostel',
    hotel: 'Hotel',
    information: {
      '*': 'Informácie',
      information: {
        '*': 'Informácie {}',
        board: 'Informačná tabuľa',
        guidepost: 'Rázcestník, smerovník',
        map: 'Mapa',
        office: 'Informačná kancelária',
      },
    },
    motel: 'Motel',
    museum: 'Múzeum',
    picnic_site: 'Miesto na piknik',
    viewpoint: 'Výhľad',
    wilderness_hut: 'Chata v divočine', // *
    zoo: 'ZOO',
  },
  place: {
    '*': 'Miesto {}',
    city: 'Veľkomesto',
    country: 'Krajina',
    farm: 'Farma', // *
    hamlet: 'Osada',
    island: 'Ostrov', // *
    islwt: 'Ostrovček', // *
    isolated_dwelling: 'Samota',
    locality: 'Lokalita',
    ocean: 'Oceán', // *
    sea: 'More', // *
    state: 'Štát',
    square: 'Námestie', // *
    suburb: 'Predmestie',
    town: 'Mesto',
    village: 'Dedina',
  },
  public_transport: {
    platform: 'Nástupište', // *
    station: 'Stanica', // *
    stop_position: 'Zastávka',
  },
};

export const colorNames: Record<string, string> = {
  red: 'Červená',
  blue: 'Modrá',
  green: 'Zelená',
  yellow: 'Žltá',
  orange: 'Oranžová',
  purple: 'Purpurová',
  violet: 'Fialová',
  white: 'Biela',
  black: 'Čierna',
  gray: 'Sivá',
  brown: 'Hnedá',
};
