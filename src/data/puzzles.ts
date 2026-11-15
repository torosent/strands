import type { StrandsGame } from '../types/game';
import { generateBoard } from './board.ts';

// NYT Strands rules for every puzzle: the spangram describes the theme, every word
// has 4+ letters A-Z, and spangram + theme words have exactly 48 letters (6x8 board).
export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const puzzleThemes: { theme: string; difficulty: Difficulty; spangram: string; words: string[] }[] = [
  {
    theme: 'Musical Instruments',
    difficulty: 'easy',
    spangram: 'ORCHESTRA',
    words: ['PIANO', 'GUITAR', 'VIOLIN', 'DRUMS', 'FLUTE', 'TRUMPET', 'CELLO']
  },
  {
    theme: 'Types of Trees',
    difficulty: 'easy',
    spangram: 'FOREST',
    words: ['MAPLE', 'PINE', 'BIRCH', 'CEDAR', 'WILLOW', 'REDWOOD', 'SPRUCE', 'PALM']
  },
  {
    theme: 'Celestial Bodies',
    difficulty: 'medium',
    spangram: 'UNIVERSE',
    words: ['MOON', 'PLANET', 'STAR', 'GALAXY', 'ASTEROID', 'METEOR', 'NEBULA']
  },
  {
    theme: 'Sports',
    difficulty: 'easy',
    spangram: 'ATHLETICS',
    words: ['SOCCER', 'TENNIS', 'RUGBY', 'GOLF', 'HOCKEY', 'BOXING', 'SKIING']
  },
  {
    theme: 'Weather Phenomena',
    difficulty: 'easy',
    spangram: 'FORECAST',
    words: ['RAIN', 'SNOW', 'THUNDER', 'HAIL', 'TORNADO', 'SLEET', 'LIGHTNING']
  },
  {
    theme: 'Fruits',
    difficulty: 'easy',
    spangram: 'FRUITBOWL',
    words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MANGO', 'PEAR', 'KIWI', 'PLUM']
  },
  {
    theme: 'Kitchen Appliances',
    difficulty: 'easy',
    spangram: 'KITCHEN',
    words: ['OVEN', 'KETTLE', 'TOASTER', 'BLENDER', 'MIXER', 'STOVE', 'FREEZER']
  },
  {
    theme: 'Types of Flowers',
    difficulty: 'easy',
    spangram: 'BOUQUET',
    words: ['ROSE', 'TULIP', 'DAISY', 'LILY', 'ORCHID', 'POPPY', 'VIOLET', 'DAHLIA']
  },
  {
    theme: 'Countries',
    difficulty: 'easy',
    spangram: 'NATIONS',
    words: ['CANADA', 'BRAZIL', 'JAPAN', 'EGYPT', 'INDIA', 'SPAIN', 'CHINA', 'PERU']
  },
  {
    theme: 'Ocean Creatures',
    difficulty: 'easy',
    spangram: 'AQUATIC',
    words: ['SHARK', 'DOLPHIN', 'WHALE', 'OCTOPUS', 'CRAB', 'SQUID', 'SEAHORSE']
  },
  {
    theme: 'Gemstones',
    difficulty: 'medium',
    spangram: 'PRECIOUS',
    words: ['RUBY', 'EMERALD', 'OPAL', 'PEARL', 'TOPAZ', 'DIAMOND', 'SAPPHIRE']
  },
  {
    theme: 'Planets',
    difficulty: 'easy',
    spangram: 'SOLARSYSTEM',
    words: ['MERCURY', 'VENUS', 'EARTH', 'JUPITER', 'SATURN', 'NEPTUNE']
  },
  {
    theme: 'Elements',
    difficulty: 'medium',
    spangram: 'PERIODIC',
    words: ['OXYGEN', 'CARBON', 'GOLD', 'SILVER', 'IRON', 'COPPER', 'NEON', 'ZINC']
  },
  {
    theme: 'Birds',
    difficulty: 'easy',
    spangram: 'FEATHER',
    words: ['EAGLE', 'SPARROW', 'ROBIN', 'FALCON', 'PENGUIN', 'FINCH', 'PARROT']
  },
  {
    theme: 'Colors',
    difficulty: 'easy',
    spangram: 'SPECTRUM',
    words: ['BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'TURQUOISE']
  },
  {
    theme: 'Vehicles',
    difficulty: 'easy',
    spangram: 'TRANSPORT',
    words: ['TRUCK', 'PLANE', 'TRAIN', 'BOAT', 'SUBWAY', 'SCOOTER', 'BICYCLE']
  },
  {
    theme: 'Professions',
    difficulty: 'easy',
    spangram: 'CAREERS',
    words: ['DOCTOR', 'LAWYER', 'CHEF', 'TEACHER', 'PILOT', 'WRITER', 'DENTIST']
  },
  {
    theme: 'Desserts',
    difficulty: 'easy',
    spangram: 'SWEETTREATS',
    words: ['CAKE', 'COOKIE', 'DONUT', 'ICECREAM', 'BROWNIE', 'PUDDING']
  },
  {
    theme: 'Tools',
    difficulty: 'easy',
    spangram: 'WORKSHOP',
    words: ['HAMMER', 'DRILL', 'WRENCH', 'PLIERS', 'LEVEL', 'CHISEL', 'MALLET']
  },
  {
    theme: 'Beverages',
    difficulty: 'easy',
    spangram: 'REFRESHMENT',
    words: ['COFFEE', 'WATER', 'JUICE', 'SODA', 'MILK', 'LEMONADE', 'COCOA']
  },
  {
    theme: 'Mountains',
    difficulty: 'medium',
    spangram: 'ALTITUDE',
    words: ['EVEREST', 'ALPS', 'ROCKIES', 'ANDES', 'FUJI', 'DENALI', 'OLYMPUS']
  },
  {
    theme: 'Furniture',
    difficulty: 'easy',
    spangram: 'FURNISHINGS',
    words: ['CHAIR', 'TABLE', 'SOFA', 'DESK', 'DRESSER', 'SHELF', 'CABINET']
  },
  {
    theme: 'Spices',
    difficulty: 'medium',
    spangram: 'FLAVORING',
    words: ['SALT', 'PEPPER', 'GARLIC', 'GINGER', 'CUMIN', 'OREGANO', 'THYME']
  },
  {
    theme: 'Insects',
    difficulty: 'easy',
    spangram: 'BUGWORLD',
    words: ['BEETLE', 'WASP', 'MOTH', 'CRICKET', 'HORNET', 'LADYBUG', 'LOCUST']
  },
  {
    theme: 'Dinosaurs',
    difficulty: 'hard',
    spangram: 'JURASSIC',
    words: ['TREX', 'RAPTOR', 'DIPLODOCUS', 'ALLOSAURUS', 'ANKYLOSAUR']
  },
  {
    theme: 'Mythical Creatures',
    difficulty: 'medium',
    spangram: 'FOLKLORE',
    words: ['DRAGON', 'PHOENIX', 'GRIFFIN', 'UNICORN', 'CENTAUR', 'GOBLIN']
  },
  {
    theme: 'Dance Styles',
    difficulty: 'medium',
    spangram: 'DANCEFLOOR',
    words: ['BALLET', 'TANGO', 'SALSA', 'HIPHOP', 'WALTZ', 'JAZZ', 'FOXTROT']
  },
  {
    theme: 'Rivers',
    difficulty: 'hard',
    spangram: 'WATERWAYS',
    words: ['NILE', 'AMAZON', 'THAMES', 'DANUBE', 'GANGES', 'CONGO', 'MEKONG']
  },
  {
    theme: 'Computer Parts',
    difficulty: 'medium',
    spangram: 'HARDWARE',
    words: ['DISK', 'MOUSE', 'SCREEN', 'SPEAKER', 'CABLE', 'KEYBOARD', 'MODEM']
  },
  {
    theme: 'Board Games',
    difficulty: 'easy',
    spangram: 'FAMILYGAMES',
    words: ['CHESS', 'CHECKERS', 'MONOPOLY', 'CLUE', 'RISK', 'SCRABBLE']
  },
  {
    theme: 'Clothing Items',
    difficulty: 'easy',
    spangram: 'WARDROBE',
    words: ['SHIRT', 'PANTS', 'DRESS', 'JACKET', 'SOCKS', 'SCARF', 'SKIRT', 'COAT']
  },
  {
    theme: 'Sea Shells',
    difficulty: 'hard',
    spangram: 'SHORELINE',
    words: ['CONCH', 'CLAM', 'SCALLOP', 'OYSTER', 'MUSSEL', 'COWRIE', 'WHELK']
  },
  {
    theme: 'Pasta Types',
    difficulty: 'medium',
    spangram: 'ALDENTE',
    words: ['ROTINI', 'PENNE', 'LASAGNA', 'RAVIOLI', 'FARFALLE', 'ORZO', 'ZITI']
  },
  {
    theme: 'Condiments',
    difficulty: 'medium',
    spangram: 'TOPPINGS',
    words: ['KETCHUP', 'MUSTARD', 'MAYO', 'RELISH', 'SALSA', 'PESTO', 'TAHINI']
  },
  {
    theme: 'Fast Food',
    difficulty: 'easy',
    spangram: 'TAKEAWAY',
    words: ['BURGER', 'PIZZA', 'TACOS', 'BURRITO', 'NUGGETS', 'FRIES', 'SHAKE']
  },
  {
    theme: 'Cities',
    difficulty: 'easy',
    spangram: 'CAPITALCITIES',
    words: ['LONDON', 'PARIS', 'TOKYO', 'ROME', 'CAIRO', 'MADRID', 'LIMA']
  },
  {
    theme: 'Household Chores',
    difficulty: 'easy',
    spangram: 'CLEANING',
    words: ['DUSTING', 'MOPPING', 'LAUNDRY', 'DISHES', 'VACUUM', 'IRONING']
  },
  {
    theme: 'Construction Materials',
    difficulty: 'medium',
    spangram: 'BUILDING',
    words: ['TIMBER', 'STEEL', 'BRICK', 'CEMENT', 'GLASS', 'MARBLE', 'PLASTIC']
  },
  {
    theme: 'Water Bodies',
    difficulty: 'easy',
    spangram: 'BODIESOFWATER',
    words: ['OCEAN', 'LAKE', 'RIVER', 'POND', 'STREAM', 'CANAL', 'LAGOON']
  },
  {
    theme: 'Hiking Gear',
    difficulty: 'medium',
    spangram: 'OUTDOORS',
    words: ['BOOTS', 'BACKPACK', 'TENT', 'COMPASS', 'ROPE', 'CANTEEN', 'STOVE']
  },
  {
    theme: 'Office Supplies',
    difficulty: 'easy',
    spangram: 'WORKDESK',
    words: ['PAPER', 'PENS', 'STAPLER', 'FOLDER', 'TAPE', 'SCISSORS', 'MARKER']
  },
  {
    theme: 'Space Exploration',
    difficulty: 'medium',
    spangram: 'MISSIONS',
    words: ['ROCKET', 'SHUTTLE', 'ROVER', 'LANDER', 'STATION', 'SATELLITE']
  },
  {
    theme: 'Card Games',
    difficulty: 'hard',
    spangram: 'DEALMEIN',
    words: ['POKER', 'BRIDGE', 'HEARTS', 'CANASTA', 'RUMMY', 'EUCHRE', 'WHIST']
  },
  {
    theme: 'Breakfast Foods',
    difficulty: 'easy',
    spangram: 'MORNING',
    words: ['BACON', 'EGGS', 'TOAST', 'CEREAL', 'PANCAKES', 'MUFFIN', 'WAFFLES']
  },
  {
    theme: 'Exercise Equipment',
    difficulty: 'medium',
    spangram: 'FITNESS',
    words: ['WEIGHTS', 'DUMBBELL', 'BIKE', 'ROWER', 'BANDS', 'BENCH', 'BARBELL']
  },
  {
    theme: 'Seasonings',
    difficulty: 'medium',
    spangram: 'AROMATIC',
    words: ['BASIL', 'CHILI', 'DILL', 'SAGE', 'PARSLEY', 'CILANTRO', 'OREGANO']
  },
  {
    theme: 'Vegetables',
    difficulty: 'easy',
    spangram: 'PRODUCE',
    words: ['CARROT', 'TOMATO', 'KALE', 'ONION', 'POTATO', 'BROCCOLI', 'PEPPER']
  },
  {
    theme: 'Occupations',
    difficulty: 'easy',
    spangram: 'LINEOFWORK',
    words: ['ENGINEER', 'ARTIST', 'NURSE', 'PLUMBER', 'FARMER', 'DRIVER']
  },
  {
    theme: 'Stationery',
    difficulty: 'easy',
    spangram: 'SUPPLIES',
    words: ['PENCIL', 'ERASER', 'RULER', 'NOTEBOOK', 'GLUE', 'BINDER', 'CHALK']
  },
  {
    theme: 'Festivals',
    difficulty: 'medium',
    spangram: 'CELEBRATE',
    words: ['DIWALI', 'EASTER', 'HANUKKAH', 'CARNIVAL', 'HOLI', 'KWANZAA']
  },
  {
    theme: 'Currencies',
    difficulty: 'medium',
    spangram: 'EXCHANGE',
    words: ['DOLLAR', 'EURO', 'POUND', 'YUAN', 'RUPEE', 'PESO', 'RAND', 'SHILLING']
  },
  {
    theme: 'Grains',
    difficulty: 'hard',
    spangram: 'HARVESTS',
    words: ['RICE', 'WHEAT', 'CORN', 'BARLEY', 'OATS', 'QUINOA', 'MILLET', 'SPELT']
  },
  {
    theme: 'Legendary Figures',
    difficulty: 'medium',
    spangram: 'MYTHICAL',
    words: ['ZEUS', 'THOR', 'ODIN', 'ARTHUR', 'MERLIN', 'HERCULES', 'ACHILLES']
  },
  {
    theme: 'Photography Terms',
    difficulty: 'medium',
    spangram: 'SNAPSHOT',
    words: ['SHUTTER', 'LENS', 'APERTURE', 'FLASH', 'FOCUS', 'FILTER', 'PIXEL']
  },
  {
    theme: 'Personality Traits',
    difficulty: 'easy',
    spangram: 'QUALITIES',
    words: ['BRAVE', 'HONEST', 'LOYAL', 'KIND', 'WISE', 'PATIENT', 'CHEERFUL']
  },
  {
    theme: 'Measuring Tools',
    difficulty: 'medium',
    spangram: 'MEASURING',
    words: ['RULER', 'COMPASS', 'CALIPER', 'LEVEL', 'SCALE', 'METER', 'GAUGE']
  },
  {
    theme: 'Astronomy Terms',
    difficulty: 'hard',
    spangram: 'STARGAZER',
    words: ['ORBIT', 'ECLIPSE', 'NOVA', 'QUASAR', 'PULSAR', 'NEBULA', 'COMET']
  },
  {
    theme: 'Garden Tools',
    difficulty: 'medium',
    spangram: 'PLANTING',
    words: ['SHOVEL', 'RAKE', 'TROWEL', 'SHEARS', 'SPADE', 'PRUNER', 'LOPPERS']
  },
  {
    theme: 'Electrical Components',
    difficulty: 'hard',
    spangram: 'CIRCUITRY',
    words: ['SWITCH', 'RELAY', 'DIODE', 'RESISTOR', 'BATTERY', 'FUSE', 'WIRE']
  },
  {
    theme: 'Music Genres',
    difficulty: 'easy',
    spangram: 'MUSICGENRES',
    words: ['ROCK', 'JAZZ', 'BLUES', 'COUNTRY', 'METAL', 'FOLK', 'FUNK', 'SOUL']
  },
  {
    theme: 'Literary Genres',
    difficulty: 'easy',
    spangram: 'LITERATURE',
    words: ['ROMANCE', 'MYSTERY', 'SCIFI', 'FANTASY', 'HORROR', 'COMEDY']
  },
  {
    theme: 'Cat Breeds',
    difficulty: 'hard',
    spangram: 'FELINES',
    words: ['PERSIAN', 'SIAMESE', 'BENGAL', 'RAGDOLL', 'SPHYNX', 'SIBERIAN']
  },
  {
    theme: 'Dog Breeds',
    difficulty: 'easy',
    spangram: 'CANINES',
    words: ['LABRADOR', 'COLLIE', 'HUSKY', 'BEAGLE', 'POODLE', 'BOXER', 'CORGI']
  },
  {
    theme: 'Film Genres',
    difficulty: 'easy',
    spangram: 'CINEMATIC',
    words: ['COMEDY', 'DRAMA', 'HORROR', 'WESTERN', 'ROMANCE', 'THRILLER']
  },
  {
    theme: 'Fish Types',
    difficulty: 'easy',
    spangram: 'SWIMMING',
    words: ['SALMON', 'TUNA', 'TROUT', 'BASS', 'CATFISH', 'GOLDFISH', 'MARLIN']
  },
  {
    theme: 'Lizards',
    difficulty: 'hard',
    spangram: 'REPTILES',
    words: ['GECKO', 'IGUANA', 'CHAMELEON', 'SKINK', 'ANOLE', 'KOMODO', 'TEGU']
  },
  {
    theme: 'Dairy Products',
    difficulty: 'easy',
    spangram: 'DAIRYFARM',
    words: ['MILK', 'CHEESE', 'YOGURT', 'BUTTER', 'CREAM', 'ICECREAM', 'WHEY']
  },
  {
    theme: 'Sports Equipment',
    difficulty: 'easy',
    spangram: 'SPORTSKIT',
    words: ['BALL', 'RACKET', 'SKATES', 'HELMET', 'STICK', 'GLOVE', 'GOGGLES']
  },
  {
    theme: 'Nuts and Seeds',
    difficulty: 'easy',
    spangram: 'TRAILMIX',
    words: ['ALMOND', 'PEANUT', 'WALNUT', 'CASHEW', 'PECAN', 'POPPY', 'SESAME']
  },
  {
    theme: 'Feelings',
    difficulty: 'easy',
    spangram: 'EMOTIONS',
    words: ['HAPPY', 'ANGRY', 'EXCITED', 'CALM', 'NERVOUS', 'BORED', 'JEALOUS']
  },
  {
    theme: 'Baking Ingredients',
    difficulty: 'easy',
    spangram: 'BAKERSPANTRY',
    words: ['FLOUR', 'SUGAR', 'BUTTER', 'EGGS', 'YEAST', 'SALT', 'VANILLA']
  },
  {
    theme: 'Rodents',
    difficulty: 'easy',
    spangram: 'CRITTERS',
    words: ['MOUSE', 'HAMSTER', 'SQUIRREL', 'BEAVER', 'GERBIL', 'CHIPMUNK']
  },
  {
    theme: 'Candles',
    difficulty: 'medium',
    spangram: 'LIGHTING',
    words: ['TAPER', 'PILLAR', 'VOTIVE', 'TEALIGHT', 'FLOATING', 'SCENTED']
  },
  {
    theme: 'Cartoon Characters',
    difficulty: 'easy',
    spangram: 'ANIMATED',
    words: ['MICKEY', 'BUGS', 'HOMER', 'POPEYE', 'GARFIELD', 'SNOOPY', 'SHREK']
  },
  {
    theme: 'Facial Features',
    difficulty: 'easy',
    spangram: 'VISAGE',
    words: ['EYES', 'NOSE', 'MOUTH', 'EARS', 'CHIN', 'CHEEKS', 'FOREHEAD', 'DIMPLES']
  },
  {
    theme: 'Sushi Types',
    difficulty: 'hard',
    spangram: 'JAPANESEFOOD',
    words: ['MAKI', 'NIGIRI', 'SASHIMI', 'TEMAKI', 'URAMAKI', 'TEMARI']
  },
  {
    theme: 'Winter Activities',
    difficulty: 'easy',
    spangram: 'ICEANDSNOW',
    words: ['SKIING', 'SKATING', 'SLEDDING', 'LUGE', 'HOCKEY', 'CURLING']
  },
  {
    theme: 'Summer Activities',
    difficulty: 'easy',
    spangram: 'SUNSHINE',
    words: ['SWIMMING', 'HIKING', 'CAMPING', 'SURFING', 'BIKING', 'PICNIC']
  },
  {
    theme: 'Martial Arts',
    difficulty: 'medium',
    spangram: 'DISCIPLINE',
    words: ['KARATE', 'JUDO', 'SUMO', 'KENDO', 'BOXING', 'AIKIDO', 'JUJITSU']
  },
  {
    theme: 'Shoe Types',
    difficulty: 'medium',
    spangram: 'FOOTWEAR',
    words: ['SNEAKER', 'SANDAL', 'BOOT', 'SLIPPER', 'LOAFER', 'OXFORD', 'CLOG']
  },
  {
    theme: 'Baked Goods',
    difficulty: 'easy',
    spangram: 'BAKERY',
    words: ['BREAD', 'ROLL', 'MUFFIN', 'COOKIE', 'SCONE', 'BAGEL', 'DONUT', 'ECLAIR']
  },
  {
    theme: 'School Subjects',
    difficulty: 'easy',
    spangram: 'CURRICULUM',
    words: ['ALGEBRA', 'SCIENCE', 'HISTORY', 'ENGLISH', 'MUSIC', 'DRAMA']
  },
  {
    theme: 'Fairytale Characters',
    difficulty: 'easy',
    spangram: 'STORYBOOK',
    words: ['WITCH', 'PRINCE', 'GOBLIN', 'FAIRY', 'WIZARD', 'TROLL', 'DRAGON']
  },
  {
    theme: 'Cakes',
    difficulty: 'medium',
    spangram: 'DESSERTS',
    words: ['LEMON', 'VANILLA', 'CARROT', 'SPONGE', 'ANGEL', 'COFFEE', 'POUND']
  },
  {
    theme: 'Clocks',
    difficulty: 'medium',
    spangram: 'TIMEPIECE',
    words: ['ANALOG', 'DIGITAL', 'CUCKOO', 'SUNDIAL', 'PENDULUM', 'ALARM']
  },
  {
    theme: 'Circus Acts',
    difficulty: 'medium',
    spangram: 'UNDERTHEBIGTOP',
    words: ['CLOWN', 'ACROBAT', 'JUGGLER', 'UNICYCLE', 'TRAPEZE']
  },
  {
    theme: 'Beach Items',
    difficulty: 'easy',
    spangram: 'SEASIDE',
    words: ['TOWEL', 'UMBRELLA', 'SHOVEL', 'SANDALS', 'BUCKET', 'BALL', 'CHAIR']
  },
  {
    theme: 'Winged Insects',
    difficulty: 'medium',
    spangram: 'AIRBORNE',
    words: ['HORNET', 'GNAT', 'MOTH', 'WASP', 'LADYBUG', 'MOSQUITO', 'FIREFLY']
  },
  {
    theme: 'Kitchen Utensils',
    difficulty: 'easy',
    spangram: 'INTHEKITCHEN',
    words: ['SPOON', 'FORK', 'KNIFE', 'WHISK', 'SPATULA', 'TONGS', 'LADLE']
  },
  {
    theme: 'Herbs',
    difficulty: 'medium',
    spangram: 'GARNISH',
    words: ['BASIL', 'ROSEMARY', 'THYME', 'MINT', 'CILANTRO', 'PARSLEY', 'DILL']
  },
  {
    theme: 'Astronomy Tools',
    difficulty: 'hard',
    spangram: 'SKYGAZING',
    words: ['ORRERY', 'SEXTANT', 'TELESCOPE', 'ASTROLABE', 'EYEPIECE']
  },
  {
    theme: 'Building Parts',
    difficulty: 'easy',
    spangram: 'STRUCTURE',
    words: ['ROOF', 'WALL', 'DOOR', 'WINDOW', 'FLOOR', 'CEILING', 'STAIRCASE']
  },
  {
    theme: 'College Majors',
    difficulty: 'easy',
    spangram: 'UNIVERSITY',
    words: ['BIOLOGY', 'PHYSICS', 'MATH', 'ENGLISH', 'BUSINESS', 'MUSIC']
  },
  {
    theme: 'Picnic Items',
    difficulty: 'easy',
    spangram: 'ONTHEGRASS',
    words: ['BASKET', 'BLANKET', 'SANDWICH', 'FRUIT', 'NAPKIN', 'PLATES']
  },
  {
    theme: 'Travel Destinations',
    difficulty: 'easy',
    spangram: 'VACATION',
    words: ['HAWAII', 'PARIS', 'VENICE', 'ALPS', 'BALI', 'ROME', 'TOKYO', 'LONDON']
  },
  {
    theme: 'Coffee Types',
    difficulty: 'medium',
    spangram: 'CAFFEINE',
    words: ['ESPRESSO', 'LATTE', 'MOCHA', 'CORTADO', 'DECAF', 'CAPPUCCINO']
  },
  {
    theme: 'Modes of Transport',
    difficulty: 'easy',
    spangram: 'GETTINGAROUND',
    words: ['BIKE', 'WALK', 'DRIVE', 'TAXI', 'METRO', 'FERRY', 'AIRPLANE']
  },
  {
    theme: 'Chess',
    difficulty: 'medium',
    spangram: 'BLACKANDWHITE',
    words: ['KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT', 'PAWN', 'GAMBIT']
  },
  {
    theme: 'Art Styles',
    difficulty: 'hard',
    spangram: 'ARTMOVEMENTS',
    words: ['CUBISM', 'REALISM', 'BAROQUE', 'ABSTRACT', 'DADA', 'DECO']
  },
  {
    theme: 'Farm Animals',
    difficulty: 'easy',
    spangram: 'OLDMACDONALD',
    words: ['HORSE', 'CHICKEN', 'SHEEP', 'GOAT', 'DUCK', 'DONKEY', 'LLAMA']
  },
  {
    theme: 'Cocktails',
    difficulty: 'hard',
    spangram: 'HAPPYHOUR',
    words: ['MARTINI', 'MOJITO', 'GIMLET', 'DAIQUIRI', 'JULEP', 'NEGRONI']
  },
  {
    theme: 'Video Games',
    difficulty: 'medium',
    spangram: 'PLAYERONE',
    words: ['MARIO', 'TETRIS', 'DOOM', 'FORTNITE', 'ZELDA', 'PACMAN', 'SONIC']
  },
  {
    theme: 'Musical Symbols',
    difficulty: 'medium',
    spangram: 'NOTATION',
    words: ['TREBLE', 'BASS', 'SHARP', 'FLAT', 'NOTE', 'REST', 'CLEF', 'CRESCENDO']
  },
  {
    theme: 'Cuts of Meat',
    difficulty: 'hard',
    spangram: 'BUTCHERY',
    words: ['SIRLOIN', 'CHUCK', 'RIBEYE', 'SHANK', 'FLANK', 'BRISKET', 'ROUND']
  },
  {
    theme: 'Mythical Places',
    difficulty: 'medium',
    spangram: 'LEGENDARY',
    words: ['ATLANTIS', 'VALHALLA', 'OLYMPUS', 'AVALON', 'ASGARD', 'EDEN']
  },
  {
    theme: 'Breakfast Cereals',
    difficulty: 'medium',
    spangram: 'BOWLOFCEREAL',
    words: ['CHEERIOS', 'CHEX', 'GRANOLA', 'BRAN', 'OATMEAL', 'MUESLI']
  },
  {
    theme: 'Constellations',
    difficulty: 'hard',
    spangram: 'STARPATTERNS',
    words: ['ORION', 'PEGASUS', 'GEMINI', 'LYRA', 'DRACO', 'ANDROMEDA']
  },
  {
    theme: 'Knots',
    difficulty: 'hard',
    spangram: 'ROPEWORK',
    words: ['BOWLINE', 'SLIPKNOT', 'GRANNY', 'NOOSE', 'SHEEPSHANK', 'REEF']
  },
  {
    theme: 'Pizza Toppings',
    difficulty: 'easy',
    spangram: 'ONTHEPIZZA',
    words: ['PEPPERONI', 'SAUSAGE', 'MUSHROOM', 'ONION', 'PINEAPPLE']
  },
  {
    theme: 'Yoga Poses',
    difficulty: 'medium',
    spangram: 'ASANAS',
    words: ['COBRA', 'LOTUS', 'WARRIOR', 'PIGEON', 'TREE', 'BRIDGE', 'PLANK', 'CROW']
  },
  {
    theme: 'Bread Types',
    difficulty: 'medium',
    spangram: 'BREADBASKET',
    words: ['BAGUETTE', 'SOURDOUGH', 'BRIOCHE', 'CIABATTA', 'BAGEL']
  },
  {
    theme: 'Cheeses',
    difficulty: 'medium',
    spangram: 'CHEESEBOARD',
    words: ['CHEDDAR', 'BRIE', 'GOUDA', 'FETA', 'PARMESAN', 'CAMEMBERT']
  },
  {
    theme: 'Hats',
    difficulty: 'medium',
    spangram: 'HEADWEAR',
    words: ['FEDORA', 'BERET', 'BEANIE', 'BOWLER', 'BONNET', 'TURBAN', 'TOQUE']
  },
  {
    theme: 'Sandwiches',
    difficulty: 'medium',
    spangram: 'DELICOUNTER',
    words: ['REUBEN', 'PANINI', 'CLUB', 'GYRO', 'SUBMARINE', 'MELT', 'HERO']
  },
  {
    theme: 'Soups',
    difficulty: 'medium',
    spangram: 'SOUPOFTHEDAY',
    words: ['MINESTRONE', 'CHOWDER', 'BISQUE', 'GUMBO', 'GAZPACHO']
  },
  {
    theme: 'Berries',
    difficulty: 'medium',
    spangram: 'BERRYPATCH',
    words: ['BLUEBERRY', 'RASPBERRY', 'CRANBERRY', 'CURRANT', 'ACAI']
  },
  {
    theme: 'Mushrooms',
    difficulty: 'hard',
    spangram: 'WILDFUNGI',
    words: ['SHIITAKE', 'PORCINI', 'OYSTER', 'ENOKI', 'TRUFFLE', 'BUTTON']
  },
  {
    theme: 'Root Vegetables',
    difficulty: 'medium',
    spangram: 'ROOTCELLAR',
    words: ['CARROT', 'TURNIP', 'RADISH', 'BEET', 'RUTABAGA', 'CELERIAC']
  },
  {
    theme: 'Tea Varieties',
    difficulty: 'hard',
    spangram: 'TEACADDY',
    words: ['OOLONG', 'DARJEELING', 'ASSAM', 'CHAI', 'MATCHA', 'CHAMOMILE']
  },
  {
    theme: 'Big Cats',
    difficulty: 'easy',
    spangram: 'WILDCATS',
    words: ['LION', 'TIGER', 'LEOPARD', 'JAGUAR', 'CHEETAH', 'PANTHER', 'LYNX']
  },
  {
    theme: 'Primates',
    difficulty: 'hard',
    spangram: 'APESANDMONKEYS',
    words: ['GORILLA', 'BABOON', 'GIBBON', 'MANDRILL', 'TAMARIN']
  },
  {
    theme: 'Snakes',
    difficulty: 'medium',
    spangram: 'SERPENTS',
    words: ['PYTHON', 'COBRA', 'VIPER', 'MAMBA', 'ANACONDA', 'ADDER', 'TAIPAN']
  },
  {
    theme: 'Arctic Animals',
    difficulty: 'medium',
    spangram: 'FROZENNORTH',
    words: ['WALRUS', 'NARWHAL', 'CARIBOU', 'PUFFIN', 'LEMMING', 'SEAL']
  },
  {
    theme: 'Desert Animals',
    difficulty: 'hard',
    spangram: 'DUNEDWELLERS',
    words: ['CAMEL', 'SCORPION', 'FENNEC', 'MEERKAT', 'JACKAL', 'ORYX']
  },
  {
    theme: 'Marsupials',
    difficulty: 'hard',
    spangram: 'INTHEPOUCH',
    words: ['KANGAROO', 'KOALA', 'WOMBAT', 'WALLABY', 'OPOSSUM', 'BILBY']
  },
  {
    theme: 'Birds of Prey',
    difficulty: 'medium',
    spangram: 'RAPTORS',
    words: ['HAWK', 'FALCON', 'EAGLE', 'OSPREY', 'KESTREL', 'BUZZARD', 'CONDOR']
  },
  {
    theme: 'Horse Breeds',
    difficulty: 'hard',
    spangram: 'HORSEBREEDS',
    words: ['ARABIAN', 'MUSTANG', 'APPALOOSA', 'MORGAN', 'SHETLAND']
  },
  {
    theme: 'Baby Animals',
    difficulty: 'easy',
    spangram: 'NEWBORNS',
    words: ['PUPPY', 'KITTEN', 'CALF', 'FOAL', 'LAMB', 'JOEY', 'DUCKLING', 'CHICK']
  },
  {
    theme: 'Animal Homes',
    difficulty: 'medium',
    spangram: 'DWELLINGS',
    words: ['NEST', 'HIVE', 'BURROW', 'LAIR', 'WARREN', 'KENNEL', 'AERIE', 'COOP']
  },
  {
    theme: 'Animal Sounds',
    difficulty: 'easy',
    spangram: 'ANIMALTALK',
    words: ['BARK', 'MEOW', 'NEIGH', 'QUACK', 'GROWL', 'CHIRP', 'BLEAT', 'CROAK']
  },
  {
    theme: 'Clouds',
    difficulty: 'medium',
    spangram: 'CLOUDCOVER',
    words: ['CIRRUS', 'CUMULUS', 'STRATUS', 'NIMBUS', 'THUNDERCLOUD']
  },
  {
    theme: 'Rocks and Minerals',
    difficulty: 'hard',
    spangram: 'GEOLOGY',
    words: ['GRANITE', 'BASALT', 'QUARTZ', 'MARBLE', 'GYPSUM', 'SHALE', 'FLINT']
  },
  {
    theme: 'Volcanoes',
    difficulty: 'hard',
    spangram: 'VOLCANO',
    words: ['ETNA', 'FUJI', 'VESUVIUS', 'KRAKATOA', 'PINATUBO', 'STROMBOLI']
  },
  {
    theme: 'Coastal Features',
    difficulty: 'medium',
    spangram: 'COASTLINE',
    words: ['BEACH', 'CLIFF', 'COVE', 'LAGOON', 'ESTUARY', 'HEADLAND', 'DUNE']
  },
  {
    theme: 'Islands',
    difficulty: 'medium',
    spangram: 'ISLANDHOPPING',
    words: ['CUBA', 'BALI', 'CRETE', 'SICILY', 'TAHITI', 'HAWAII', 'JAVA']
  },
  {
    theme: 'Deserts',
    difficulty: 'hard',
    spangram: 'WASTELANDS',
    words: ['SAHARA', 'GOBI', 'MOJAVE', 'KALAHARI', 'ATACAMA', 'SONORAN']
  },
  {
    theme: 'US States',
    difficulty: 'easy',
    spangram: 'FIFTYSTATES',
    words: ['TEXAS', 'OHIO', 'MAINE', 'IDAHO', 'OREGON', 'NEVADA', 'ALASKA']
  },
  {
    theme: 'European Countries',
    difficulty: 'easy',
    spangram: 'EUROPEAN',
    words: ['FRANCE', 'SPAIN', 'ITALY', 'GREECE', 'NORWAY', 'POLAND', 'SWEDEN']
  },
  {
    theme: 'African Countries',
    difficulty: 'medium',
    spangram: 'AFRICAN',
    words: ['KENYA', 'EGYPT', 'GHANA', 'NIGERIA', 'MOROCCO', 'ETHIOPIA', 'MALI']
  },
  {
    theme: 'Languages',
    difficulty: 'easy',
    spangram: 'MOTHERTONGUE',
    words: ['FRENCH', 'SPANISH', 'GERMAN', 'ARABIC', 'RUSSIAN', 'THAI']
  },
  {
    theme: 'Greek Letters',
    difficulty: 'medium',
    spangram: 'GREEKALPHABET',
    words: ['OMEGA', 'SIGMA', 'DELTA', 'GAMMA', 'THETA', 'LAMBDA', 'BETA']
  },
  {
    theme: 'Shapes',
    difficulty: 'easy',
    spangram: 'GEOMETRY',
    words: ['CIRCLE', 'SQUARE', 'TRIANGLE', 'HEXAGON', 'PENTAGON', 'HEART']
  },
  {
    theme: 'Math Terms',
    difficulty: 'medium',
    spangram: 'MATHEMATICS',
    words: ['FRACTION', 'INTEGER', 'EQUATION', 'VARIABLE', 'MEDIAN']
  },
  {
    theme: 'Units of Measure',
    difficulty: 'easy',
    spangram: 'STANDARDUNITS',
    words: ['GALLON', 'POUND', 'OUNCE', 'METER', 'LITER', 'QUART', 'MILE']
  },
  {
    theme: 'Programming Languages',
    difficulty: 'medium',
    spangram: 'PROGRAMMING',
    words: ['PYTHON', 'RUBY', 'PERL', 'JAVASCRIPT', 'SWIFT', 'RUST', 'DART']
  },
  {
    theme: 'Keyboard Keys',
    difficulty: 'easy',
    spangram: 'KEYBOARD',
    words: ['SHIFT', 'ENTER', 'ESCAPE', 'DELETE', 'SPACE', 'CONTROL', 'INSERT']
  },
  {
    theme: 'Lab Equipment',
    difficulty: 'medium',
    spangram: 'LABORATORY',
    words: ['BEAKER', 'FLASK', 'BURNER', 'MICROSCOPE', 'FUNNEL', 'TONGS']
  },
  {
    theme: 'Bones',
    difficulty: 'hard',
    spangram: 'SKELETON',
    words: ['FEMUR', 'TIBIA', 'SKULL', 'PELVIS', 'RADIUS', 'STERNUM', 'FIBULA']
  },
  {
    theme: 'Organs',
    difficulty: 'easy',
    spangram: 'ANATOMY',
    words: ['HEART', 'LIVER', 'KIDNEY', 'BRAIN', 'STOMACH', 'SPLEEN', 'BLADDER']
  },
  {
    theme: 'Hospital Words',
    difficulty: 'easy',
    spangram: 'HEALTHCARE',
    words: ['NURSE', 'DOCTOR', 'SURGEON', 'PATIENT', 'STRETCHER', 'WARD']
  },
  {
    theme: 'Virtues',
    difficulty: 'medium',
    spangram: 'GOODCHARACTER',
    words: ['HONESTY', 'COURAGE', 'PATIENCE', 'KINDNESS', 'MERCY']
  },
  {
    theme: 'Greek Gods',
    difficulty: 'medium',
    spangram: 'OLYMPIANS',
    words: ['ZEUS', 'HERA', 'APOLLO', 'ATHENA', 'POSEIDON', 'ARTEMIS', 'ARES']
  },
  {
    theme: 'Roman Gods',
    difficulty: 'hard',
    spangram: 'PANTHEON',
    words: ['JUPITER', 'PLUTO', 'VENUS', 'NEPTUNE', 'MINERVA', 'JUNO', 'DIANA']
  },
  {
    theme: 'Egyptian Gods',
    difficulty: 'hard',
    spangram: 'ANCIENTEGYPT',
    words: ['OSIRIS', 'ISIS', 'HORUS', 'ANUBIS', 'THOTH', 'BASTET', 'AMUN']
  },
  {
    theme: 'Zodiac Signs',
    difficulty: 'medium',
    spangram: 'HOROSCOPE',
    words: ['TAURUS', 'GEMINI', 'VIRGO', 'LIBRA', 'PISCES', 'ARIES', 'CANCER']
  },
  {
    theme: 'Poker Terms',
    difficulty: 'medium',
    spangram: 'TEXASHOLDEM',
    words: ['BLUFF', 'FLUSH', 'RIVER', 'STRAIGHT', 'ANTE', 'CHECK', 'RAISE']
  },
  {
    theme: 'Playground Equipment',
    difficulty: 'easy',
    spangram: 'PLAYGROUND',
    words: ['SLIDE', 'SWING', 'SEESAW', 'SANDBOX', 'TUNNEL', 'JUNGLEGYM']
  },
  {
    theme: 'Toys',
    difficulty: 'easy',
    spangram: 'TOYCHEST',
    words: ['DOLL', 'PINWHEEL', 'KITE', 'PUZZLE', 'BLOCKS', 'MARBLES', 'ROBOT']
  },
  {
    theme: 'Party Supplies',
    difficulty: 'easy',
    spangram: 'PARTYSHOP',
    words: ['BALLOON', 'PINATA', 'CONFETTI', 'CANDLE', 'NAPKIN', 'BANNER']
  },
  {
    theme: 'Wedding Words',
    difficulty: 'easy',
    spangram: 'WEDDINGDAY',
    words: ['BRIDE', 'GROOM', 'VOWS', 'RING', 'VEIL', 'ALTAR', 'TOAST', 'CHAPEL']
  },
  {
    theme: 'Halloween',
    difficulty: 'easy',
    spangram: 'TRICKORTREAT',
    words: ['GHOST', 'WITCH', 'PUMPKIN', 'COSTUME', 'SKELETON', 'BATS']
  },
  {
    theme: 'Christmas',
    difficulty: 'easy',
    spangram: 'YULETIDE',
    words: ['SANTA', 'REINDEER', 'STOCKING', 'PRESENT', 'SLEIGH', 'WREATH']
  },
  {
    theme: 'Spring',
    difficulty: 'easy',
    spangram: 'SPRINGTIME',
    words: ['BLOSSOM', 'TULIP', 'RAIN', 'BUNNY', 'ROBIN', 'DAFFODIL', 'LAMB']
  },
  {
    theme: 'Fishing Gear',
    difficulty: 'hard',
    spangram: 'TACKLEBOX',
    words: ['HOOK', 'REEL', 'LURE', 'BOBBER', 'SINKER', 'WADERS', 'BAIT', 'CREEL']
  },
  {
    theme: 'Sailing Terms',
    difficulty: 'hard',
    spangram: 'NAUTICAL',
    words: ['ANCHOR', 'MAST', 'HULL', 'KEEL', 'STARBOARD', 'RUDDER', 'LEEWARD']
  },
  {
    theme: 'Airport Words',
    difficulty: 'easy',
    spangram: 'AIRTRAVEL',
    words: ['GATE', 'RUNWAY', 'TICKET', 'BOARDING', 'PASSPORT', 'LUGGAGE']
  },
  {
    theme: 'Train Words',
    difficulty: 'medium',
    spangram: 'RAILROAD',
    words: ['CABOOSE', 'ENGINE', 'TRACK', 'STATION', 'PLATFORM', 'WHISTLE']
  },
  {
    theme: 'Car Parts',
    difficulty: 'medium',
    spangram: 'UNDERTHEHOOD',
    words: ['BRAKES', 'BUMPER', 'MUFFLER', 'RADIATOR', 'AXLE', 'TIRES']
  },
  {
    theme: 'Bicycle Parts',
    difficulty: 'medium',
    spangram: 'TWOWHEELER',
    words: ['PEDAL', 'CHAIN', 'SADDLE', 'SPOKE', 'HANDLEBAR', 'SPROCKET']
  },
  {
    theme: 'Hardware Store',
    difficulty: 'easy',
    spangram: 'HOMEREPAIR',
    words: ['HAMMER', 'NAILS', 'SCREWS', 'WRENCH', 'PLIERS', 'DRILL', 'NUTS']
  },
  {
    theme: 'Sewing Supplies',
    difficulty: 'medium',
    spangram: 'SEWINGKIT',
    words: ['NEEDLE', 'THREAD', 'THIMBLE', 'BOBBIN', 'BUTTON', 'SCISSORS']
  },
  {
    theme: 'Fabrics',
    difficulty: 'easy',
    spangram: 'TEXTILES',
    words: ['COTTON', 'SILK', 'LINEN', 'DENIM', 'VELVET', 'WOOL', 'SATIN', 'TWEED']
  },
  {
    theme: 'Patterns',
    difficulty: 'medium',
    spangram: 'PATTERNED',
    words: ['PLAID', 'STRIPES', 'POLKADOT', 'PAISLEY', 'FLORAL', 'ARGYLE']
  },
  {
    theme: 'Jewelry',
    difficulty: 'medium',
    spangram: 'ADORNMENTS',
    words: ['NECKLACE', 'BRACELET', 'EARRING', 'PENDANT', 'CUFFLINK']
  },
  {
    theme: 'Hairstyles',
    difficulty: 'medium',
    spangram: 'HAIRDOS',
    words: ['BRAID', 'PONYTAIL', 'MOHAWK', 'MULLET', 'PIXIE', 'AFRO', 'BEEHIVE']
  },
  {
    theme: 'Makeup',
    difficulty: 'medium',
    spangram: 'COSMETICS',
    words: ['LIPSTICK', 'MASCARA', 'BLUSH', 'EYELINER', 'POWDER', 'GLOSS']
  },
  {
    theme: 'Bathroom Items',
    difficulty: 'easy',
    spangram: 'WASHROOM',
    words: ['TOWEL', 'SOAP', 'TOOTHBRUSH', 'SHAMPOO', 'PLUNGER', 'BATHTUB']
  },
  {
    theme: 'Bedroom Items',
    difficulty: 'easy',
    spangram: 'BEDCHAMBER',
    words: ['PILLOW', 'BLANKET', 'DRESSER', 'MATTRESS', 'CLOSET', 'LAMP']
  },
  {
    theme: 'Houseplants',
    difficulty: 'medium',
    spangram: 'GREENERY',
    words: ['FERN', 'CACTUS', 'ALOE', 'POTHOS', 'ORCHID', 'MONSTERA', 'BAMBOO']
  },
  {
    theme: 'Spreads',
    difficulty: 'hard',
    spangram: 'ONTOAST',
    words: ['BUTTER', 'HONEY', 'HUMMUS', 'MARMALADE', 'TAPENADE', 'CHUTNEY']
  },
  {
    theme: 'Sauces',
    difficulty: 'medium',
    spangram: 'SAUCEBOATS',
    words: ['MARINARA', 'GRAVY', 'AIOLI', 'HOISIN', 'TARTAR', 'TERIYAKI']
  },
  {
    theme: 'Candy',
    difficulty: 'medium',
    spangram: 'SWEETSHOP',
    words: ['LOLLIPOP', 'TOFFEE', 'FUDGE', 'GUMDROP', 'CARAMEL', 'NOUGAT']
  },
  {
    theme: 'Pies',
    difficulty: 'easy',
    spangram: 'PIEFLAVORS',
    words: ['APPLE', 'PECAN', 'PUMPKIN', 'PEACH', 'RHUBARB', 'BLUEBERRY']
  },
  {
    theme: 'Snacks',
    difficulty: 'easy',
    spangram: 'MUNCHIES',
    words: ['PRETZEL', 'POPCORN', 'PEANUTS', 'CRACKERS', 'NACHOS', 'JERKY']
  },
  {
    theme: 'Mexican Food',
    difficulty: 'easy',
    spangram: 'MEXICANEATS',
    words: ['TACO', 'BURRITO', 'TAMALE', 'ENCHILADA', 'CHURRO', 'SALSA']
  },
  {
    theme: 'Italian Food',
    difficulty: 'medium',
    spangram: 'TRATTORIA',
    words: ['LASAGNA', 'RISOTTO', 'GNOCCHI', 'TIRAMISU', 'PIZZA', 'PESTO']
  },
  {
    theme: 'Indian Food',
    difficulty: 'medium',
    spangram: 'CURRYHOUSE',
    words: ['SAMOSA', 'NAAN', 'BIRYANI', 'TANDOORI', 'PAKORA', 'CHUTNEY']
  },
  {
    theme: 'Noodles',
    difficulty: 'hard',
    spangram: 'NOODLEHOUSE',
    words: ['UDON', 'SOBA', 'RAMEN', 'SPAGHETTI', 'LAKSA', 'VERMICELLI']
  },
  {
    theme: 'Cooking Methods',
    difficulty: 'medium',
    spangram: 'HOWTOCOOK',
    words: ['SIMMER', 'BRAISE', 'POACH', 'GRILL', 'ROAST', 'STEAM', 'STIRFRY']
  },
  {
    theme: 'Restaurant Words',
    difficulty: 'easy',
    spangram: 'DININGOUT',
    words: ['MENU', 'WAITER', 'ENTREE', 'APPETIZER', 'CHECK', 'BOOTH', 'CHEF']
  },
  {
    theme: 'Singing Voices',
    difficulty: 'hard',
    spangram: 'VOCALRANGES',
    words: ['SOPRANO', 'ALTO', 'TENOR', 'BASS', 'BARITONE', 'CONTRALTO']
  },
  {
    theme: 'Theater Words',
    difficulty: 'medium',
    spangram: 'SHOWBUSINESS',
    words: ['SCRIPT', 'USHER', 'ENCORE', 'MATINEE', 'CURTAIN', 'ACTOR']
  },
  {
    theme: 'Poetry Forms',
    difficulty: 'hard',
    spangram: 'POETICFORMS',
    words: ['HAIKU', 'SONNET', 'LIMERICK', 'BALLAD', 'ACROSTIC', 'EPIC']
  },
  {
    theme: 'Punctuation',
    difficulty: 'medium',
    spangram: 'SENTENCEMARKS',
    words: ['COMMA', 'PERIOD', 'COLON', 'HYPHEN', 'SEMICOLON', 'DASH']
  },
  {
    theme: 'Grammar',
    difficulty: 'medium',
    spangram: 'SPEECHPARTS',
    words: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'ARTICLE']
  },
  {
    theme: 'Library Words',
    difficulty: 'medium',
    spangram: 'READINGROOM',
    words: ['CATALOG', 'FICTION', 'ARCHIVE', 'OVERDUE', 'LIBRARIAN']
  },
  {
    theme: 'Mystery Words',
    difficulty: 'medium',
    spangram: 'WHODUNIT',
    words: ['SUSPECT', 'DETECTIVE', 'MOTIVE', 'ALIBI', 'SLEUTH', 'WITNESS']
  },
  {
    theme: 'Pirates',
    difficulty: 'easy',
    spangram: 'BUCCANEERS',
    words: ['CUTLASS', 'MAST', 'PARROT', 'TREASURE', 'CAPTAIN', 'ANCHOR']
  },
  {
    theme: 'Castle Parts',
    difficulty: 'medium',
    spangram: 'STRONGHOLD',
    words: ['MOAT', 'TURRET', 'KEEP', 'DUNGEON', 'RAMPART', 'DRAWBRIDGE']
  },
  {
    theme: 'Superpowers',
    difficulty: 'medium',
    spangram: 'SUPERHUMAN',
    words: ['FLIGHT', 'STRENGTH', 'TELEPATHY', 'HEALING', 'TELEPORT']
  },
  {
    theme: 'Months',
    difficulty: 'easy',
    spangram: 'CALENDAR',
    words: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'OCTOBER', 'JUNE', 'JULY']
  },
  {
    theme: 'Time Words',
    difficulty: 'easy',
    spangram: 'UNITSOFTIME',
    words: ['SECOND', 'MINUTE', 'HOUR', 'DECADE', 'CENTURY', 'WEEK', 'YEAR']
  },
  {
    theme: 'Water Sports',
    difficulty: 'medium',
    spangram: 'ONTHEWATER',
    words: ['SURFING', 'ROWING', 'SAILING', 'KAYAKING', 'SNORKELING']
  },
  {
    theme: 'Bakery Tools',
    difficulty: 'medium',
    spangram: 'BAKINGGEAR',
    words: ['WHISK', 'SPATULA', 'SIFTER', 'MIXER', 'OVEN', 'SCRAPER', 'TRAY']
  },
  {
    theme: 'Geometry Solids',
    difficulty: 'medium',
    spangram: 'SOLIDFIGURES',
    words: ['SPHERE', 'CONE', 'CYLINDER', 'PYRAMID', 'PRISM', 'CUBOID']
  },
  {
    theme: 'Weather Gear',
    difficulty: 'medium',
    spangram: 'RAINORSHINE',
    words: ['UMBRELLA', 'PONCHO', 'GALOSHES', 'PARKA', 'SCARF', 'BOOTS']
  }
];

// Boards are built on first use and kept, so a reset gets the same untouched board back
const boards = new Map<number, StrandsGame>();

export function getPuzzle(id: number): StrandsGame {
  let puzzle = boards.get(id);
  if (!puzzle) {
    const { theme, spangram, words } = puzzleThemes[id - 1];
    puzzle = { id, theme, spangram, board: generateBoard(spangram, words) };
    boards.set(id, puzzle);
  }
  return puzzle;
}

// `current` is left out, so New Puzzle never deals the same board again
export function getRandomPuzzle(difficulty: Difficulty, current?: number): StrandsGame {
  const ids = puzzleThemes.flatMap((p, i) => (p.difficulty === difficulty && i + 1 !== current ? [i + 1] : []));
  return getPuzzle(ids[Math.floor(Math.random() * ids.length)]);
}
