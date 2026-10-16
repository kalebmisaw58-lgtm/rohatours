export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export const destinationData = {
    'Lalibela Churches': {
        slug: 'lalibela-churches',
        image: '/Lalibela Churches.jpg',
        duration: '3 Days • Spiritual Marvel',
        difficulty: 'Moderate',
        bestSeason: 'October to March (Ethiopian Christmas & Timkat)',
        region: 'Amhara Highlands',
        mapCoords: { x: 55, y: 35 }, // percentage on Ethiopia SVG map
        shortDesc: 'The "New Jerusalem." Explore 11 monolithic churches carved from volcanic rock in the 12th century.',
        description: [
            'Lalibela, often called the "New Jerusalem," is home to 11 monolithic rock-hewn churches carved from solid volcanic rock in the 12th century. These architectural marvels were commissioned by King Lalibela and remain active places of worship today.',
            'Walk through underground tunnels connecting the churches, witness ancient religious ceremonies, and explore intricate carvings that have survived centuries. The churches are divided into two groups, separated by the River Jordan.',
            'This UNESCO World Heritage site attracts pilgrims and travelers from around the world, especially during Ethiopian Christmas and Timkat (Epiphany) celebrations.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Northern Group Churches', desc: 'Fly into Lalibela airport and check in to your lodge. Afternoon guided exploration of the Northern Group of churches: Bet Medhane Alem, Bet Maryam, Bet Meskel, and the cruciform masterpiece of Bet Giyorgis (Church of Saint George).' },
            { day: 'Day 2', title: 'Southeastern Group & Asheten Maryam', desc: 'Morning visit to the Southeastern group including Bet Amanuel and Bet Merkorios. Afternoon hike or 4x4 drive to the mountaintop monastery of Asheten Maryam for breathtaking panoramic views of the Lasta mountains.' },
            { day: 'Day 3', title: 'Yemrehana Krestos & Farewell Coffee Ceremony', desc: 'Half-day excursion to the exquisite built-up cave church of Yemrehana Krestos, predating Lalibela by a century. Conclude with an authentic Ethiopian coffee ceremony before departure.' }
        ],
        whatToPack: ['Comfortable slip-on walking shoes (shoes are removed inside churches)', 'Socks for walking on ancient stone floors', 'Light scarf or wrap for respectful dress', 'Camera and wide-angle lens', 'Sun hat and sunscreen'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Danakil Adventure': {
        slug: 'danakil-adventure',
        image: '/Danakil Adventure.jpg',
        duration: '4 Days • Geological Wonder',
        difficulty: 'Challenging (High Heat)',
        bestSeason: 'November to February (Cooler months)',
        region: 'Afar Depression',
        mapCoords: { x: 68, y: 28 },
        shortDesc: 'Witness bubbling lava lakes, salt flats, and neon-yellow sulfur springs in one of Earth\'s most extreme frontiers.',
        description: [
            'The Danakil Depression is one of the hottest, lowest, and most geologically active places on Earth. Witness the Erta Ale volcano with its permanent lava lake, one of only six in the world.',
            'Explore the otherworldly Dallol sulfur springs, where neon-yellow and orange mineral deposits create an alien landscape. Visit salt flats where the Afar people have mined salt for centuries using traditional methods.',
            'This extreme expedition requires careful planning and experienced guides. Temperatures can exceed 50°C (122°F), making it one of the most challenging yet rewarding adventures in Ethiopia.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Semera / Mekele to Erta Ale Base Camp', desc: 'Journey in 4x4 convoy across the dramatic lava desert. Reach base camp at the foot of Erta Ale volcano and prepare for the night trek up the crater rim.' },
            { day: 'Day 2', title: 'Lava Lake at Dawn & Salt Lake Karum', desc: 'Witness the bubbling red molten lava lake before sunrise. Descend the crater and drive across vast salt flats to Lake Karum for sunset views over mirror-like brine waters.' },
            { day: 'Day 3', title: 'Dallol Hydrothermal Fields & Salt Canyons', desc: 'Marvel at the neon-green, yellow, and rust-red mineral terraces of Dallol hydrothermal springs. Visit the traditional Afar camel caravans cutting salt blocks by hand.' },
            { day: 'Day 4', title: 'Lake Afdera & Return to Semera', desc: 'Swim in the mineral-rich thermal waters of Lake Afdera before a scenic drive back to Semera for your flight onward.' }
        ],
        whatToPack: ['Sturdy hiking boots for rough lava rock', 'High SPF sunscreen and UV sunglasses', 'Headlamp / flashlight for night trekking', 'Breathable lightweight cotton clothing', 'Electrolyte powder and personal hydration pack'],
        inclusions: [
            { icon: 'shield-alt', text: 'Armed Guard' },
            { icon: 'car-side', text: '2x 4x4 Support' },
            { icon: 'campground', text: 'Logistics' },
            { icon: 'utensils', text: 'Private Chef' }
        ]
    },
    'Omo Valley Tribes': {
        slug: 'omo-valley-tribes',
        image: '/Omo Valley Tribes.jpg',
        duration: '5 Days • Cultural Immersion',
        difficulty: 'Moderate',
        bestSeason: 'July to March',
        region: 'Southern Nations, Omo Basin',
        mapCoords: { x: 32, y: 78 },
        shortDesc: 'Journey into Africa\'s most diverse cultural basin. Meet the Mursi, Hamar, and Karo communities living ancient traditions.',
        description: [
            'The Omo Valley is home to over 50 indigenous tribes, each with distinct languages, customs, and traditions. Meet the Mursi people, known for their lip plates, the Hamar with their bull-jumping ceremonies, and the Karo with their elaborate body painting.',
            'Experience authentic cultural exchanges in remote villages, witness traditional ceremonies, and learn about ancient customs that have remained unchanged for millennia. This is one of the most culturally diverse regions in Africa.',
            'We travel with deep respect for local communities, ensuring our visits benefit the tribes economically while preserving their way of life. All interactions are conducted with cultural sensitivity and prior community consent.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Addis Ababa to Arba Minch & Dorze Village', desc: 'Fly or drive south into the Rift Valley. Visit the Dorze tribe in the Chencha mountains, renowned for elephant-shaped bamboo houses and hand-woven fabrics.' },
            { day: 'Day 2', title: 'Chamo Lake Safari to Turmi (Hamar Land)', desc: 'Morning boat safari on Lake Chamo to see giant Nile crocodiles and hippos. Drive into the heart of the Omo Valley to Turmi, settlement of the Hamar people.' },
            { day: 'Day 3', title: 'Karo Village & River Crossing', desc: 'Visit the Karo tribe on the banks of the Omo River, famed for dramatic facial and body painting with chalk and yellow ochre. Attend a traditional Hamar Evangadi night dance.' },
            { day: 'Day 4', title: 'Mago National Park & Mursi Tribe', desc: 'Early morning expedition through Mago National Park to visit the Mursi tribe, celebrated for clay lip plates and ceremonial stick dueling (Donga).' },
            { day: 'Day 5', title: 'Key Afer Market & Return to Jinka', desc: 'Immerse yourself in the bustling multi-tribal weekly market at Key Afer, where Hamar, Banna, and Tsemay meet to trade spices, beads, and cattle. Transfer to Jinka airport.' }
        ],
        whatToPack: ['Insect repellent with DEET', 'Comfortable walking sandals and trail runners', 'Cash in small birr bills for photos and artisan crafts', 'Camera with portrait lens', 'Respectful, comfortable modest attire'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'campground', text: 'Bush Camp' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Gondar Castles': {
        slug: 'gondar-castles',
        image: '/Gondar Castles.jpg',
        duration: '2 Days • Royal History',
        difficulty: 'Easy',
        bestSeason: 'October to May',
        region: 'Amhara Region',
        mapCoords: { x: 44, y: 27 },
        shortDesc: 'The "Camelot of Africa." Walk among imperial medieval stone castles and the winged cherubs of Debre Berhan Selassie.',
        description: [
            'Gondar, the "Camelot of Africa," served as Ethiopia\'s capital from 1636 to 1855. The Royal Enclosure contains six castles built by various emperors, showcasing a unique blend of Portuguese, Indian, and local architectural styles.',
            'Visit the stunning Debre Berhan Selassie Church, famous for its ceiling painted with 80 cherubic faces. Explore Fasilides\' Bath, still used today for the annual Timkat celebrations where thousands gather for the blessing of the waters.',
            'The city\'s medieval castles and churches earned it UNESCO World Heritage status and offer a fascinating glimpse into Ethiopia\'s imperial past.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'The Royal Enclosure (Fasil Ghebbi) & Fasilides Bath', desc: 'Comprehensive guided walk through the 70,000 m² fortress of Emperor Fasilides, Empress Mentewab Palace, and the royal library. Afternoon visit to the majestic sunken bath of Fasilides.' },
            { day: 'Day 2', title: 'Debre Berhan Selassie & Kuskuam Complex', desc: 'Marvel at the 80 angel faces gazing down from the cedar-beamed ceiling of Debre Berhan Selassie. Visit the ruined royal compound of Queen Mentewab on the city outskirts.' }
        ],
        whatToPack: ['Walking shoes', 'Light jacket for cooler highland evenings', 'Camera', 'Modest attire for church interiors'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Axum Monuments': {
        slug: 'axum-monuments',
        image: '/Axum Monuments.jpg',
        duration: '2 Days • Ancient Civilization',
        difficulty: 'Easy to Moderate',
        bestSeason: 'October to April',
        region: 'Tigray Region',
        mapCoords: { x: 50, y: 15 },
        shortDesc: 'Ancient obelisks, tombs of Aksumite royalty, and the holy chapel guarding the legendary Ark of the Covenant.',
        description: [
            'Axum was the capital of the ancient Aksumite Empire, one of the four great civilizations of the ancient world alongside Rome, Persia, and China. The city is home to towering granite obelisks, some reaching 33 meters high and weighing over 500 tons.',
            'Visit the Church of Our Lady Mary of Zion, believed by Ethiopian Orthodox Christians to house the original Ark of the Covenant. Explore ancient tombs, royal palaces, and inscriptions that tell the story of a powerful trading empire.',
            'Axum is also the legendary birthplace of the Queen of Sheba and remains one of Ethiopia\'s holiest cities, drawing pilgrims and history enthusiasts from around the world.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Stelae Field, Tombs of Kings & Queen of Sheba Palace', desc: 'Tour the UNESCO Northern Stelae Park, standing granite monoliths, and underground burial vaults of King Kaleb and Gebre Meskel. Walk through the sprawling ruins of Dungur (Queen of Sheba Palace).' },
            { day: 'Day 2', title: 'Mary of Zion Sanctuary & Ancient Archaeological Museum', desc: 'Visit the chapel of the Ark of the Covenant, the old 17th-century basilica, and inspect ancient Ge\'ez, Greek, and Sabaean trilingual royal tablets.' }
        ],
        whatToPack: ['Sun protection', 'Walking shoes', 'Modest clothing for sacred Christian shrines', 'Notebook / camera'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Simien Mountains': {
        slug: 'simien-mountains',
        image: '/Simien Mountains.jpg',
        duration: '4 Days • Highland Trek',
        difficulty: 'Challenging (High Altitude)',
        bestSeason: 'October to March (Lush green post-monsoon)',
        region: 'Amhara Highlands',
        mapCoords: { x: 48, y: 22 },
        shortDesc: 'Trek the "Roof of Africa." Encounter wild Gelada baboon troops, Ethiopian wolves, and 1,500m sheer vertical cliffs.',
        description: [
            'The Simien Mountains, often called the "Roof of Africa," feature dramatic escarpments, deep valleys, and peaks reaching over 4,500 meters. This UNESCO World Heritage site is home to unique wildlife found nowhere else on Earth.',
            'Trek through Afro-alpine landscapes and encounter endemic species including the Gelada baboon (found only here), the Ethiopian wolf (the world\'s rarest canid), and the Walia ibex. The scenery is often compared to the Grand Canyon.',
            'Our treks range from moderate day hikes to challenging multi-day expeditions, with comfortable lodge accommodations and experienced mountain guides ensuring your safety and enjoyment.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Debark to Sankaber Camp & Gelada Troops', desc: 'Drive into the park from Gondar. First hike along the western escarpment, sitting within meters of gentle Gelada baboon grazing troops.' },
            { day: 'Day 2', title: 'Sankaber to Geech via Jinbar Waterfall', desc: 'Spectacular trek crossing the 500m plunge of Jinbar Falls. Climb up to Geech village atop the Afro-alpine plateau surrounded by Giant Lobelia plants.' },
            { day: 'Day 3', title: 'Imet Gogo Summit & Chennek Lookout', desc: 'Ascend Imet Gogo (3,926m), the most famous 360-degree viewpoint in Africa. Continue towards Chennek, prime habitat for the Walia Ibex.' },
            { day: 'Day 4', title: 'Bwahit Peak & Return to Gondar', desc: 'Early morning climb towards Mount Bwahit (4,430m) for a chance to spot the endangered Ethiopian Wolf before scenic return to Gondar.' }
        ],
        whatToPack: ['Warm layers / fleece (temperatures drop below freezing at night)', 'Broken-in trekking boots', 'Trekking poles', 'Windproof and rainproof jacket', 'Altitude sickness medication (Diamox) if needed'],
        inclusions: [
            { icon: 'hiking', text: 'Trek Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'campground', text: 'Lodge Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Lake Langano': {
        slug: 'lake-langano',
        image: '/Lake Langano.jpg',
        duration: '2 Days • Lakeside Retreat',
        difficulty: 'Easy',
        bestSeason: 'Year-Round',
        region: 'Oromia Rift Valley',
        mapCoords: { x: 50, y: 55 },
        shortDesc: 'Relax on brown-water sandy beaches, swim safely without bilharzia, and watch birds in the Great Rift Valley.',
        description: [
            'Lake Langano is one of Ethiopia\'s most popular weekend getaways, known for its unique brown water caused by high mineral content. Unlike most Ethiopian lakes, it\'s safe for swimming and water sports.',
            'Relax on sandy beaches, enjoy birdwatching with over 400 species in the area, or take a boat trip to spot hippos and diverse aquatic life. The lake sits in the Great Rift Valley, surrounded by acacia forests and volcanic hills.',
            'Perfect for families and those seeking a peaceful retreat from city life, with comfortable resorts offering water activities, nature walks, and stunning sunset views.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Scenic Rift Valley Drive to Lake Langano', desc: 'Depart Addis Ababa through the Great Rift Valley. Check into a luxury lakeside eco-resort. Afternoon swimming, beach relaxation, and water sports.' },
            { day: 'Day 2', title: 'Abijatta-Shalla National Park & Hot Springs', desc: 'Morning visit to neighboring Lake Shalla (Ethiopia\'s deepest crater lake) and Lake Abijatta with its thousands of pink flamingos and bubbling natural sulfur hot springs.' }
        ],
        whatToPack: ['Swimwear and beach towel', 'Sunscreen and sunglasses', 'Binoculars for bird watching', 'Casual summer clothing'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Resort Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Hawassa': {
        slug: 'hawassa',
        image: '/Hawassa.jpg',
        duration: '2 Days • Lakeside City',
        difficulty: 'Easy',
        bestSeason: 'Year-Round',
        region: 'Sidama Region',
        mapCoords: { x: 48, y: 62 },
        shortDesc: 'Vibrant sunrise fish market, lakeside promenade, monkey-filled acacia forests, and delicious fresh tilapia.',
        description: [
            'Hawassa, the capital of the Sidama Region, sits on the shores of Lake Hawassa in the Great Rift Valley. The city is famous for its vibrant fish market where fishermen bring in their daily catch to be sold and prepared fresh.',
            'Stroll along the lakeside promenade, visit the bustling central market, and enjoy some of Ethiopia\'s best fish dishes at waterfront restaurants. The lake attracts hundreds of bird species, making it a paradise for birdwatchers.',
            'Experience the laid-back atmosphere of this growing city, explore nearby hot springs, and witness the unique relationship between local fishermen and the marabou storks that gather at the market each morning.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Arrival, Tabor Hill Hike & Lakeside Sunset', desc: 'Arrive in Hawassa. Hike up Mount Tabor for a bird\'s eye view of the city and lake. Enjoy fresh fish soup along the waterfront promenade as sunset gilds the water.' },
            { day: 'Day 2', title: 'Sunrise Fish Market & Amora Gedel Park', desc: 'At dawn, experience the legendary Hawassa Fish Market as fishermen pull wooden skiffs to shore amid marabou storks and pelicans. Walk among colobus monkeys in Amora Gedel.' }
        ],
        whatToPack: ['Walking shoes', 'Camera', 'Casual light clothing', 'Insect repellent'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Bale Mountains': {
        slug: 'bale-mountains',
        image: '/Bale Mountains.jpg',
        duration: '3 Days • Wildlife Safari',
        difficulty: 'Moderate',
        bestSeason: 'October to April',
        region: 'Oromia Highlands',
        mapCoords: { x: 62, y: 60 },
        shortDesc: 'Track the rare red Ethiopian wolf across the Sanetti Plateau, through the Harenna cloud forest and alpine lakes.',
        description: [
            'The Bale Mountains National Park is a biodiversity hotspot and the best place in the world to see the critically endangered Ethiopian wolf. With fewer than 500 individuals remaining, this is a once-in-a-lifetime wildlife experience.',
            'Trek through the Sanetti Plateau, the largest expanse of Afro-alpine habitat in Africa, and spot endemic species including the mountain nyala, giant mole rat, and numerous bird species found nowhere else on Earth.',
            'The park features diverse ecosystems from bamboo forests to alpine moorlands, pristine rivers, and dramatic volcanic landscapes. It\'s a paradise for wildlife photographers and nature enthusiasts.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Dinsho Headquarters & Mountain Nyala Trail', desc: 'Drive to Dinsho park headquarters. Walk through ancient juniper and Hagenia woodlands spotting endemic Mountain Nyala, Menelik\'s Bushbuck, and warthogs.' },
            { day: 'Day 2', title: 'Sanetti Plateau & Ethiopian Wolf Safari', desc: 'Ascend to the 4,000m Sanetti Plateau, tracking Ethiopian wolves hunting giant mole rats. Summit Tullu Dimtu (4,377m), the second-highest peak in Ethiopia.' },
            { day: 'Day 3', title: 'Harenna Cloud Forest & Wild Coffee Tasting', desc: 'Descend through the dramatic Harenna escarpment into lush rainforest. Spot Bale monkeys in bamboo groves and sample wild forest coffee with local beekeepers.' }
        ],
        whatToPack: ['Thermal warm layers and fleece', 'Binoculars and telephoto camera lens', 'Sturdy hiking boots', 'Beanie and gloves', 'Rain jacket'],
        inclusions: [
            { icon: 'binoculars', text: 'Wildlife Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'campground', text: 'Lodge Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Entoto Park': {
        slug: 'entoto-park',
        image: '/Entoto Park.jpg',
        duration: 'Half Day • Nature Escape',
        difficulty: 'Easy',
        bestSeason: 'Year-Round',
        region: 'Addis Ababa Ridge',
        mapCoords: { x: 50, y: 46 },
        shortDesc: 'Breathe fresh eucalyptus mountain air, explore royal palaces, and take in panoramic city views 3,200m above Addis Ababa.',
        description: [
            'Entoto Park sits at 3,200 meters above sea level, offering panoramic views of Addis Ababa and fresh mountain air. The area is covered in eucalyptus forests planted by Emperor Menelik II in the late 19th century.',
            'Visit the historic Entoto Maryam Church, one of the oldest churches in Addis Ababa, and the small museum showcasing royal artifacts. Enjoy nature walks through the forest, spot endemic bird species, and learn about the area\'s historical significance.',
            'This peaceful escape from the city bustle is perfect for a morning or afternoon excursion, offering hiking trails, picnic spots, and stunning views of the capital below.'
        ],
        itinerary: [
            { day: 'Half Day', title: 'Entoto Ridge, Emperor Menelik Palace & Park Walk', desc: 'Morning or afternoon drive to the crest of Mount Entoto. Tour Emperor Menelik II’s historic palace and church museum, walk scenic paved forested trails, and relax at a mountain cafe with city panoramas.' }
        ],
        whatToPack: ['Light sweater or windbreaker', 'Walking shoes', 'Sunglasses', 'Camera'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Private Car' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'coffee', text: 'Refreshments' }
        ]
    },
    'Addis Ababa City Tour': {
        slug: 'addis-ababa-city-tour',
        image: '/Addis Ababa City Tour.jpg',
        duration: '1 Day • Urban Discovery',
        difficulty: 'Easy',
        bestSeason: 'Year-Round',
        region: 'Capital City',
        mapCoords: { x: 50, y: 48 },
        shortDesc: 'Meet 3.2M-year-old "Lucy" at the National Museum, dive into the bustling Merkato market, and taste world-famous Ethiopian coffee.',
        description: [
            'Explore Ethiopia\'s vibrant capital, a city of contrasts where ancient traditions meet modern development. Visit the National Museum to see "Lucy," the 3.2 million-year-old hominid fossil that changed our understanding of human evolution.',
            'Experience the organized chaos of Merkato, Africa\'s largest open-air market, where you can find everything from spices to traditional crafts. Visit the Holy Trinity Cathedral, the final resting place of Emperor Haile Selassie.',
            'Enjoy authentic Ethiopian cuisine at a traditional restaurant with a coffee ceremony, explore the Ethnological Museum in Haile Selassie\'s former palace, and learn about Ethiopia\'s rich history and diverse cultures.'
        ],
        itinerary: [
            { day: 'Morning', title: 'National Museum & Holy Trinity Cathedral', desc: 'Inspect the fossil skeleton of "Lucy" (Dinknesh), ancient Aksumite crowns, and royal regalia. Visit Holy Trinity Cathedral to pay respects at Emperor Haile Selassie’s granite tomb.' },
            { day: 'Afternoon', title: 'Merkato Market & Traditional Coffee Ceremony', desc: 'Navigate Africa\'s largest open-air bazaar with your guide to explore spice alleys and handwoven textiles. Experience an authentic 3-round coffee ceremony (Abol, Tona, Baraka).' }
        ],
        whatToPack: ['Comfortable walking shoes', 'Modest clothing for cathedral visits', 'Small shoulder bag / cross-body pouch for markets', 'Camera'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Private Car' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Lunch' }
        ]
    },
    'Lake Tana & Tis Abay Fall': {
        slug: 'lake-tana-and-tis-abay-fall',
        image: '/Lake Tana & Tis Abay Fall.png',
        duration: '2 Days • Sacred Waters',
        difficulty: 'Easy to Moderate',
        bestSeason: 'September to February (River full after rains)',
        region: 'Bahir Dar, Amhara',
        mapCoords: { x: 42, y: 32 },
        shortDesc: 'Boat across Ethiopia\'s largest lake to 14th-century island monasteries and stand before the roaring Blue Nile Falls.',
        description: [
            'Lake Tana, Ethiopia\'s largest lake and the source of the Blue Nile, is dotted with 37 islands, many home to ancient monasteries dating back to the 14th century. Take a traditional tankwa boat to visit these sacred sites adorned with stunning religious murals and manuscripts.',
            'The monasteries of Ura Kidane Mehret and Azwa Maryam house priceless religious artifacts, ancient crosses, and beautifully illuminated manuscripts. Learn about the Ethiopian Orthodox Church\'s rich traditions from resident monks.',
            'Visit Tis Abay (Blue Nile Falls), locally known as "Tis Issat" meaning "smoking water." Though reduced by hydroelectric projects, the falls remain spectacular during the rainy season, cascading over 400 meters wide and creating permanent rainbows in the mist.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Boat Cruise to Island Monasteries of Zege', desc: 'Private boat excursion on Lake Tana. Walk through coffee groves to visit the circular monastery of Ura Kidane Mehret, famous for vivid 16th-century ecclesiastical wall murals and crown museum.' },
            { day: 'Day 2', title: 'Tis Abay (Blue Nile Falls) & Portuguese Bridge', desc: 'Morning drive to Tis Abay. Hike across the 17th-century stone Portuguese Bridge and through lush farmland to view the roaring falls creating eternal rainbows in the mist.' }
        ],
        whatToPack: ['Waterproof sandals or walking shoes', 'Light rain jacket or poncho for waterfall mist', 'Sun hat and sunglasses', 'Modest attire for monastic islands'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'ship', text: 'Boat Trip' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Debre Libanos Monastery': {
        slug: 'debre-libanos-monastery',
        image: '/Debre Libanos Monastery.jpg',
        duration: '1 Day • Spiritual Journey',
        difficulty: 'Easy to Moderate',
        bestSeason: 'Year-Round',
        region: 'North Shewa, Oromia',
        mapCoords: { x: 50, y: 42 },
        shortDesc: '13th-century sacred pilgrimage cave, Portuguese Bridge over a 300m gorge, and endemic Gelada baboon colonies.',
        description: [
            'Debre Libanos Monastery, founded by the revered 13th-century saint Tekle Haymanot, is one of Ethiopia\'s most important religious sites. According to legend, the saint stood on one leg for seven years in prayer until the other leg fell off, earning him a place among Ethiopia\'s greatest saints.',
            'The current church, rebuilt in the 1960s after Italian destruction during WWII, houses ancient religious artifacts and offers stunning views of the surrounding gorge. Visit the cave where Saint Tekle Haymanot lived and prayed, now a pilgrimage site for thousands of Ethiopian Orthodox faithful.',
            'Cross the dramatic Portuguese Bridge spanning a 300-meter-deep gorge, built in the 16th century. The area is home to troops of endemic Gelada baboons, often seen grazing on the cliffsides. The monastery is just 100km north of Addis Ababa, making it a perfect day trip.'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Monastery Museum, Saint\'s Cave & Portuguese Bridge', desc: 'Morning drive through the fertile Shewan plains. Tour the church, Saint Tekle Haymanot’s holy water cave, and the religious museum. Walk to the 16th-century Portuguese Bridge across the Jemma River gorge, spotting wild Gelada baboons grazing on cliff edges.' }
        ],
        whatToPack: ['Comfortable walking shoes', 'Scarf for head covering in sacred areas', 'Camera for canyon views and wildlife', 'Light jacket'],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Private Car' },
            { icon: 'ticket-alt', text: 'Entry Fees' },
            { icon: 'utensils', text: 'Lunch' }
        ]
    }
};

export const festivalData = {
    'Timkat': {
        slug: 'timkat',
        image: '/Timkat Festival.jpg',
        dates: '3 Days • Jan 19–21 (Ter 10–12)',
        fullName: 'Timkat — Epiphany',
        highlight: 'The baptism of Christ reenacted with holy Tabot processions in Gondar & Lalibela.',
        description: [
            'Timkat is Ethiopia\'s most visually spectacular festival, celebrating the Epiphany — the baptism of Jesus Christ in the Jordan River. It is one of the most important dates in the Ethiopian Orthodox calendar and has been celebrated for over 1,500 years.',
            'On the eve of Timkat, priests carry the Tabot (a replica of the Ark of the Covenant) from each church, wrapped in rich cloth and carried on the head, in a candlelit procession to a nearby body of water. Thousands of white-robed worshippers follow, singing ancient hymns in Ge\'ez.',
            'The following morning, the water is blessed and the faithful are sprinkled or immersed in it, renewing their baptismal vows. The celebration in Gondar — held at the Royal Bath of Emperor Fasilides — is the most famous, drawing thousands of pilgrims and visitors from around the world. The third day features more processions and joyful celebrations.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Meskel': {
        slug: 'meskel',
        image: '/Meskel Festival.jpg',
        dates: '2 Days • Sep 26–27 (Meskerem 17)',
        fullName: 'Meskel — Finding of the True Cross',
        highlight: 'UNESCO-listed massive Demera bonfire celebration in Addis Ababa & Lalibela.',
        description: [
            'Meskel commemorates the discovery of the True Cross by Queen Helena (mother of Emperor Constantine) in the 4th century. According to Ethiopian tradition, she lit a bonfire and followed the smoke to find the cross buried in Jerusalem. The festival has been celebrated in Ethiopia for over 1,600 years and is inscribed on UNESCO\'s Intangible Cultural Heritage list.',
            'The centerpiece of Meskel is the Demera — a massive bonfire constructed from bundled branches and decorated with yellow Adey Abeba flowers. In Addis Ababa, the Demera at Meskel Square stands several stories tall. As dusk falls, the Patriarch of the Ethiopian Orthodox Church lights the bonfire, and thousands of worshippers circle it with torches, singing and chanting.',
            'The direction the bonfire falls is believed to predict the fortunes of the coming year. The following day, the embers are used to make a cross on the forehead. The festival is celebrated across the country, with particularly vibrant ceremonies in Lalibela, Gondar, and Axum.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Enkutatash': {
        slug: 'enkutatash',
        image: '/Timkat Festival.jpg',
        dates: '2 Days • Sep 11 (Meskerem 1)',
        fullName: 'Enkutatash — Ethiopian New Year',
        highlight: 'Welcoming the New Year as yellow Adey Abeba flowers carpet the highlands.',
        description: [
            'Enkutatash, meaning "gift of jewels," marks the Ethiopian New Year on the first day of Meskerem (September 11 in the Gregorian calendar, or September 12 in leap years). It coincides with the end of the long rainy season, when the highlands transform into a carpet of yellow Adey Abeba wildflowers.',
            'The name derives from the legend of the Queen of Sheba\'s return from visiting King Solomon in Jerusalem. Her chiefs welcomed her back with gifts of jewels (enkuta), and the celebration has continued ever since. It is a time of renewal, forgiveness, and fresh beginnings.',
            'Children dress in new clothes and go door-to-door singing traditional songs, presenting hand-painted cards and bunches of flowers to neighbors in exchange for small gifts or money. Families slaughter a sheep or chicken for a feast, and the smell of roasting coffee and incense fills every home. Churches hold special dawn services, and the streets are alive with music and celebration.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Genna': {
        slug: 'genna',
        image: '/Genna.jpg',
        dates: '2 Days • Jan 7 (Ter 29)',
        fullName: 'Genna — Ethiopian Christmas',
        highlight: 'All-night candlelit liturgical chant inside the rock-hewn churches of Lalibela.',
        description: [
            'Genna (Ethiopian Christmas) is celebrated on January 7th according to the Julian calendar used by the Ethiopian Orthodox Church. Unlike the commercial Christmas of the West, Genna is a deeply spiritual occasion centered on fasting, prayer, and church services that last through the night.',
            'The most extraordinary experience is attending the pre-dawn service at Lalibela, where thousands of white-robed pilgrims gather at the rock-hewn churches by torchlight. Priests in elaborate ceremonial robes chant ancient liturgies in Ge\'ez, the classical Ethiopian language, while the smell of incense drifts through the stone corridors carved from living rock.',
            'After the service, families break their fast together with injera and traditional dishes. Young men play a traditional game also called Genna — a form of field hockey said to have been played by shepherds on the night of Christ\'s birth. The festival is followed twelve days later by Timkat (Epiphany), making January a month of continuous celebration.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Irreecha': {
        slug: 'irreecha',
        image: '/Irreecha Festival.jpg',
        dates: '1 Day • October (First Sunday)',
        fullName: 'Irreecha — Oromo Thanksgiving',
        highlight: 'Millions gather at sacred Lake Hora in Bishoftu to give thanks for the harvest.',
        description: [
            'Irreecha is the thanksgiving festival of the Oromo people — Ethiopia\'s largest ethnic group — celebrated at the end of the rainy season to give thanks to Waaqa (God) for the rains, the harvest, and the gift of life. It is one of Africa\'s largest annual gatherings, drawing millions of people to Lake Hora Arsedi in Bishoftu (Debre Zeit), 45km south of Addis Ababa.',
            'Participants dress in traditional Oromo attire — women in white dresses with colorful beadwork, men carrying green grass and yellow flowers — and wade into the lake\'s edge to offer prayers and blessings. The air fills with the sound of traditional songs, the beat of drums, and the calls of the Qaallu (spiritual leaders) leading the ceremony.',
            'Irreecha is a celebration of peace, unity, and gratitude that transcends religious boundaries — both Christians and Muslims participate. The festival was inscribed on UNESCO\'s Intangible Cultural Heritage list in 2023. Witnessing it is a profound, moving experience unlike anything else in Africa.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'hotel', text: 'Hotel Stay' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    },
    'Hamar Bull Jumping': {
        slug: 'hamar-bull-jumping',
        image: '/Omo Valley Tribes.jpg',
        dates: '3 Days • Oct–Nov (Seasonal)',
        fullName: 'Hamar Bull Jumping',
        highlight: 'Raw, unfiltered rite of passage across the backs of cattle in the Omo Valley.',
        description: [
            'The Bull Jumping ceremony (Ukuli Bula) is the most important rite of passage in Hamar society, marking a young man\'s transition from boyhood to adulthood and his readiness for marriage. It takes place in the Omo Valley, one of the most culturally diverse regions on Earth, home to over 40 distinct tribes.',
            'To pass the test, the initiate must run across the backs of a line of cattle — typically 10 to 15 bulls — four times without falling. Success means he earns the right to marry, own cattle, and take on adult responsibilities. Failure brings shame and he must wait for another opportunity.',
            'Before the jumping, the female relatives of the initiate — his sisters and cousins — voluntarily submit to ritual whipping by the Maza (men who have already passed the ceremony) to demonstrate their support and love for him. The scars are worn with pride as proof of devotion. The ceremony is accompanied by singing, dancing, and the blowing of horns, and the entire village participates in the feast that follows.'
        ],
        inclusions: [
            { icon: 'user-shield', text: 'Expert Guide' },
            { icon: 'car-side', text: 'Luxury 4x4' },
            { icon: 'campground', text: 'Bush Camp' },
            { icon: 'utensils', text: 'Full Board' }
        ]
    }
};

export const pageMeta = {
    landing:      { title: 'RohaTours | Private Expeditions & Authentic Ethiopia Travel', desc: 'Discover Ethiopia with RohaTours. Expert-led private expeditions to Lalibela, Gondar, Axum, Danakil and beyond.' },
    destinations: { title: 'Destinations | RohaTours Ethiopia', desc: 'Explore 13 private expedition destinations in Ethiopia — Lalibela, Danakil, Omo Valley, Simien Mountains and more.' },
    about:        { title: 'About Us | RohaTours Ethiopia', desc: 'Meet Mekuanent, RohaTours lead guide with 15+ years experience leading private expeditions across Ethiopia.' },
    festivals:    { title: 'Festivals | RohaTours Ethiopia', desc: 'Experience Ethiopia\'s ancient festivals including Timkat, Genna, Meskel, Irreecha, and Ashenda.' },
    booking:      { title: 'Book a Private Tour | RohaTours Ethiopia', desc: 'Request your private expedition to any of our 13 Ethiopian destinations. We confirm within 24 hours.' },
    dashboard:    { title: 'My Trips | RohaTours', desc: 'View and manage your RohaTours bookings.' },
    privacy:      { title: 'Privacy Policy | RohaTours', desc: 'RohaTours privacy policy — how we collect and protect your personal data.' },
    terms:        { title: 'Terms & Conditions | RohaTours', desc: 'RohaTours terms and conditions for bookings and travel.' }
};

export function getDestinationBySlug(slug) {
    return Object.values(destinationData).find(d => d.slug === slug);
}

export function getFestivalBySlug(slug) {
    return Object.values(festivalData).find(f => f.slug === slug);
}

