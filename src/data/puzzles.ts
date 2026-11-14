import type { StrandsGame } from '../types/game';
import { generateBoard } from './board.ts';

// NYT Strands rules for every puzzle: the spangram describes the theme, every word
// has 4+ letters A-Z, and spangram + theme words have exactly 48 letters (6x8 board).
export const puzzleThemes: { theme: string; spangram: string; words: string[] }[] = [
  {
    theme: 'Musical Instruments',
    spangram: 'ORCHESTRA',
    words: ['PIANO', 'GUITAR', 'VIOLIN', 'DRUMS', 'FLUTE', 'TRUMPET', 'CELLO']
  },
  {
    theme: 'Types of Trees',
    spangram: 'FOREST',
    words: ['MAPLE', 'PINE', 'BIRCH', 'CEDAR', 'WILLOW', 'REDWOOD', 'SPRUCE', 'PALM']
  },
  {
    theme: 'Celestial Bodies',
    spangram: 'UNIVERSE',
    words: ['MOON', 'PLANET', 'STAR', 'GALAXY', 'ASTEROID', 'METEOR', 'NEBULA']
  },
  {
    theme: 'Sports',
    spangram: 'ATHLETICS',
    words: ['SOCCER', 'TENNIS', 'RUGBY', 'GOLF', 'HOCKEY', 'BOXING', 'SKIING']
  },
  {
    theme: 'Weather Phenomena',
    spangram: 'FORECAST',
    words: ['RAIN', 'SNOW', 'THUNDER', 'HAIL', 'TORNADO', 'SLEET', 'LIGHTNING']
  },
  {
    theme: 'Fruits',
    spangram: 'FRUITBOWL',
    words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MANGO', 'PEAR', 'KIWI', 'PLUM']
  },
  {
    theme: 'Kitchen Appliances',
    spangram: 'KITCHEN',
    words: ['OVEN', 'KETTLE', 'TOASTER', 'BLENDER', 'MIXER', 'STOVE', 'FREEZER']
  },
  {
    theme: 'Types of Flowers',
    spangram: 'BOUQUET',
    words: ['ROSE', 'TULIP', 'DAISY', 'LILY', 'ORCHID', 'POPPY', 'VIOLET', 'DAHLIA']
  },
  {
    theme: 'Countries',
    spangram: 'NATIONS',
    words: ['CANADA', 'BRAZIL', 'JAPAN', 'EGYPT', 'INDIA', 'SPAIN', 'CHINA', 'PERU']
  },
  {
    theme: 'Ocean Creatures',
    spangram: 'AQUATIC',
    words: ['SHARK', 'DOLPHIN', 'WHALE', 'OCTOPUS', 'CRAB', 'SQUID', 'SEAHORSE']
  },
  {
    theme: 'Gemstones',
    spangram: 'PRECIOUS',
    words: ['RUBY', 'EMERALD', 'OPAL', 'PEARL', 'TOPAZ', 'DIAMOND', 'SAPPHIRE']
  },
  {
    theme: 'Planets',
    spangram: 'SOLARSYSTEM',
    words: ['MERCURY', 'VENUS', 'EARTH', 'JUPITER', 'SATURN', 'NEPTUNE']
  },
  {
    theme: 'Elements',
    spangram: 'PERIODIC',
    words: ['OXYGEN', 'CARBON', 'GOLD', 'SILVER', 'IRON', 'COPPER', 'NEON', 'ZINC']
  },
  {
    theme: 'Birds',
    spangram: 'FEATHER',
    words: ['EAGLE', 'SPARROW', 'ROBIN', 'FALCON', 'PENGUIN', 'FINCH', 'PARROT']
  },
  {
    theme: 'Colors',
    spangram: 'SPECTRUM',
    words: ['BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'TURQUOISE']
  },
  {
    theme: 'Vehicles',
    spangram: 'TRANSPORT',
    words: ['TRUCK', 'PLANE', 'TRAIN', 'BOAT', 'SUBWAY', 'SCOOTER', 'BICYCLE']
  },
  {
    theme: 'Professions',
    spangram: 'CAREERS',
    words: ['DOCTOR', 'LAWYER', 'CHEF', 'TEACHER', 'PILOT', 'WRITER', 'DENTIST']
  },
  {
    theme: 'Desserts',
    spangram: 'SWEETTREATS',
    words: ['CAKE', 'COOKIE', 'DONUT', 'ICECREAM', 'BROWNIE', 'PUDDING']
  },
  {
    theme: 'Tools',
    spangram: 'WORKSHOP',
    words: ['HAMMER', 'DRILL', 'WRENCH', 'PLIERS', 'LEVEL', 'CHISEL', 'MALLET']
  },
  {
    theme: 'Beverages',
    spangram: 'REFRESHMENT',
    words: ['COFFEE', 'WATER', 'JUICE', 'SODA', 'MILK', 'LEMONADE', 'COCOA']
  },
  {
    theme: 'Mountains',
    spangram: 'ALTITUDE',
    words: ['EVEREST', 'ALPS', 'ROCKIES', 'ANDES', 'FUJI', 'DENALI', 'OLYMPUS']
  },
  {
    theme: 'Furniture',
    spangram: 'FURNISHINGS',
    words: ['CHAIR', 'TABLE', 'SOFA', 'DESK', 'DRESSER', 'SHELF', 'CABINET']
  },
  {
    theme: 'Spices',
    spangram: 'FLAVORING',
    words: ['SALT', 'PEPPER', 'GARLIC', 'GINGER', 'CUMIN', 'OREGANO', 'THYME']
  },
  {
    theme: 'Insects',
    spangram: 'BUGWORLD',
    words: ['BEETLE', 'WASP', 'MOTH', 'CRICKET', 'HORNET', 'LADYBUG', 'LOCUST']
  },
  {
    theme: 'Dinosaurs',
    spangram: 'JURASSIC',
    words: ['TREX', 'RAPTOR', 'DIPLODOCUS', 'ALLOSAURUS', 'ANKYLOSAUR']
  },
  {
    theme: 'Mythical Creatures',
    spangram: 'FOLKLORE',
    words: ['DRAGON', 'PHOENIX', 'GRIFFIN', 'UNICORN', 'CENTAUR', 'GOBLIN']
  },
  {
    theme: 'Dance Styles',
    spangram: 'DANCEFLOOR',
    words: ['BALLET', 'TANGO', 'SALSA', 'HIPHOP', 'WALTZ', 'JAZZ', 'FOXTROT']
  },
  {
    theme: 'Rivers',
    spangram: 'WATERWAYS',
    words: ['NILE', 'AMAZON', 'THAMES', 'DANUBE', 'GANGES', 'CONGO', 'MEKONG']
  },
  {
    theme: 'Computer Parts',
    spangram: 'HARDWARE',
    words: ['DISK', 'MOUSE', 'SCREEN', 'SPEAKER', 'CABLE', 'KEYBOARD', 'MODEM']
  },
  {
    theme: 'Board Games',
    spangram: 'FAMILYGAMES',
    words: ['CHESS', 'CHECKERS', 'MONOPOLY', 'CLUE', 'RISK', 'SCRABBLE']
  },
  {
    theme: 'Clothing Items',
    spangram: 'WARDROBE',
    words: ['SHIRT', 'PANTS', 'DRESS', 'JACKET', 'SOCKS', 'SCARF', 'SKIRT', 'COAT']
  },
  {
    theme: 'Sea Shells',
    spangram: 'SHORELINE',
    words: ['CONCH', 'CLAM', 'SCALLOP', 'OYSTER', 'MUSSEL', 'COWRIE', 'WHELK']
  },
  {
    theme: 'Pasta Types',
    spangram: 'ALDENTE',
    words: ['ROTINI', 'PENNE', 'LASAGNA', 'RAVIOLI', 'FARFALLE', 'ORZO', 'ZITI']
  },
  {
    theme: 'Condiments',
    spangram: 'TOPPINGS',
    words: ['KETCHUP', 'MUSTARD', 'MAYO', 'RELISH', 'SALSA', 'PESTO', 'TAHINI']
  },
  {
    theme: 'Fast Food',
    spangram: 'TAKEAWAY',
    words: ['BURGER', 'PIZZA', 'TACOS', 'BURRITO', 'NUGGETS', 'FRIES', 'SHAKE']
  },
  {
    theme: 'Cities',
    spangram: 'CAPITALCITIES',
    words: ['LONDON', 'PARIS', 'TOKYO', 'ROME', 'CAIRO', 'MADRID', 'LIMA']
  },
  {
    theme: 'Household Chores',
    spangram: 'CLEANING',
    words: ['DUSTING', 'MOPPING', 'LAUNDRY', 'DISHES', 'VACUUM', 'IRONING']
  },
  {
    theme: 'Construction Materials',
    spangram: 'BUILDING',
    words: ['TIMBER', 'STEEL', 'BRICK', 'CEMENT', 'GLASS', 'MARBLE', 'PLASTIC']
  },
  {
    theme: 'Water Bodies',
    spangram: 'BODIESOFWATER',
    words: ['OCEAN', 'LAKE', 'RIVER', 'POND', 'STREAM', 'CANAL', 'LAGOON']
  },
  {
    theme: 'Hiking Gear',
    spangram: 'OUTDOORS',
    words: ['BOOTS', 'BACKPACK', 'TENT', 'COMPASS', 'ROPE', 'CANTEEN', 'STOVE']
  },
  {
    theme: 'Office Supplies',
    spangram: 'WORKDESK',
    words: ['PAPER', 'PENS', 'STAPLER', 'FOLDER', 'TAPE', 'SCISSORS', 'MARKER']
  },
  {
    theme: 'Space Exploration',
    spangram: 'MISSIONS',
    words: ['ROCKET', 'SHUTTLE', 'ROVER', 'LANDER', 'STATION', 'SATELLITE']
  },
  {
    theme: 'Card Games',
    spangram: 'DEALMEIN',
    words: ['POKER', 'BRIDGE', 'HEARTS', 'CANASTA', 'RUMMY', 'EUCHRE', 'WHIST']
  },
  {
    theme: 'Breakfast Foods',
    spangram: 'MORNING',
    words: ['BACON', 'EGGS', 'TOAST', 'CEREAL', 'PANCAKES', 'MUFFIN', 'WAFFLES']
  },
  {
    theme: 'Exercise Equipment',
    spangram: 'FITNESS',
    words: ['WEIGHTS', 'DUMBBELL', 'BIKE', 'ROWER', 'BANDS', 'BENCH', 'BARBELL']
  },
  {
    theme: 'Seasonings',
    spangram: 'AROMATIC',
    words: ['BASIL', 'CHILI', 'DILL', 'SAGE', 'PARSLEY', 'CILANTRO', 'OREGANO']
  },
  {
    theme: 'Vegetables',
    spangram: 'PRODUCE',
    words: ['CARROT', 'TOMATO', 'KALE', 'ONION', 'POTATO', 'BROCCOLI', 'PEPPER']
  },
  {
    theme: 'Occupations',
    spangram: 'LINEOFWORK',
    words: ['ENGINEER', 'ARTIST', 'NURSE', 'PLUMBER', 'FARMER', 'DRIVER']
  },
  {
    theme: 'Stationery',
    spangram: 'SUPPLIES',
    words: ['PENCIL', 'ERASER', 'RULER', 'NOTEBOOK', 'GLUE', 'BINDER', 'CHALK']
  },
  {
    theme: 'Festivals',
    spangram: 'CELEBRATE',
    words: ['DIWALI', 'EASTER', 'HANUKKAH', 'CARNIVAL', 'HOLI', 'KWANZAA']
  },
  {
    theme: 'Currencies',
    spangram: 'EXCHANGE',
    words: ['DOLLAR', 'EURO', 'POUND', 'YUAN', 'RUPEE', 'PESO', 'RAND', 'SHILLING']
  },
  {
    theme: 'Grains',
    spangram: 'HARVESTS',
    words: ['RICE', 'WHEAT', 'CORN', 'BARLEY', 'OATS', 'QUINOA', 'MILLET', 'SPELT']
  },
  {
    theme: 'Legendary Figures',
    spangram: 'FOLKLORE',
    words: ['ZEUS', 'THOR', 'ODIN', 'ARTHUR', 'MERLIN', 'HERCULES', 'ACHILLES']
  },
  {
    theme: 'Photography Terms',
    spangram: 'SNAPSHOT',
    words: ['SHUTTER', 'LENS', 'APERTURE', 'FLASH', 'FOCUS', 'FILTER', 'PIXEL']
  },
  {
    theme: 'Personality Traits',
    spangram: 'QUALITIES',
    words: ['BRAVE', 'HONEST', 'LOYAL', 'KIND', 'WISE', 'PATIENT', 'CHEERFUL']
  },
  {
    theme: 'Instruments',
    spangram: 'MEASURING',
    words: ['RULER', 'COMPASS', 'CALIPER', 'LEVEL', 'SCALE', 'METER', 'GAUGE']
  },
  {
    theme: 'Astronomy Terms',
    spangram: 'STARGAZER',
    words: ['ORBIT', 'ECLIPSE', 'NOVA', 'QUASAR', 'PULSAR', 'NEBULA', 'COMET']
  },
  {
    theme: 'Garden Tools',
    spangram: 'PLANTING',
    words: ['SHOVEL', 'RAKE', 'TROWEL', 'SHEARS', 'SPADE', 'PRUNER', 'LOPPERS']
  },
  {
    theme: 'Electrical Components',
    spangram: 'CIRCUITRY',
    words: ['SWITCH', 'RELAY', 'DIODE', 'RESISTOR', 'BATTERY', 'FUSE', 'WIRE']
  },
  {
    theme: 'Music Genres',
    spangram: 'MUSICGENRES',
    words: ['ROCK', 'JAZZ', 'BLUES', 'COUNTRY', 'METAL', 'FOLK', 'FUNK', 'SOUL']
  },
  {
    theme: 'Literary Genres',
    spangram: 'LITERATURE',
    words: ['ROMANCE', 'MYSTERY', 'SCIFI', 'FANTASY', 'HORROR', 'COMEDY']
  },
  {
    theme: 'Cat Breeds',
    spangram: 'FELINES',
    words: ['PERSIAN', 'SIAMESE', 'BENGAL', 'RAGDOLL', 'SPHYNX', 'SIBERIAN']
  },
  {
    theme: 'Dog Breeds',
    spangram: 'CANINES',
    words: ['LABRADOR', 'COLLIE', 'HUSKY', 'BEAGLE', 'POODLE', 'BOXER', 'CORGI']
  },
  {
    theme: 'Film Genres',
    spangram: 'CINEMATIC',
    words: ['COMEDY', 'DRAMA', 'HORROR', 'WESTERN', 'ROMANCE', 'THRILLER']
  },
  {
    theme: 'Fish Types',
    spangram: 'SWIMMING',
    words: ['SALMON', 'TUNA', 'TROUT', 'BASS', 'CATFISH', 'GOLDFISH', 'MARLIN']
  },
  {
    theme: 'Lizards',
    spangram: 'REPTILES',
    words: ['GECKO', 'IGUANA', 'CHAMELEON', 'SKINK', 'ANOLE', 'KOMODO', 'TEGU']
  },
  {
    theme: 'Dairy Products',
    spangram: 'DAIRYFARM',
    words: ['MILK', 'CHEESE', 'YOGURT', 'BUTTER', 'CREAM', 'ICECREAM', 'WHEY']
  },
  {
    theme: 'Sports Equipment',
    spangram: 'ATHLETICS',
    words: ['BALL', 'RACKET', 'SKATES', 'HELMET', 'STICK', 'GLOVE', 'GOGGLES']
  },
  {
    theme: 'Nuts and Seeds',
    spangram: 'TRAILMIX',
    words: ['ALMOND', 'PEANUT', 'WALNUT', 'CASHEW', 'PECAN', 'POPPY', 'SESAME']
  },
  {
    theme: 'Mental States',
    spangram: 'EMOTIONS',
    words: ['HAPPY', 'ANGRY', 'EXCITED', 'CALM', 'NERVOUS', 'BORED', 'JEALOUS']
  },
  {
    theme: 'Baking Ingredients',
    spangram: 'BAKERSPANTRY',
    words: ['FLOUR', 'SUGAR', 'BUTTER', 'EGGS', 'YEAST', 'SALT', 'VANILLA']
  },
  {
    theme: 'Rodents',
    spangram: 'CRITTERS',
    words: ['MOUSE', 'HAMSTER', 'SQUIRREL', 'BEAVER', 'GERBIL', 'CHIPMUNK']
  },
  {
    theme: 'Candles',
    spangram: 'LIGHTING',
    words: ['TAPER', 'PILLAR', 'VOTIVE', 'TEALIGHT', 'FLOATING', 'SCENTED']
  },
  {
    theme: 'Cartoon Characters',
    spangram: 'ANIMATED',
    words: ['MICKEY', 'BUGS', 'HOMER', 'POPEYE', 'GARFIELD', 'SNOOPY', 'SHREK']
  },
  {
    theme: 'Facial Features',
    spangram: 'VISAGE',
    words: ['EYES', 'NOSE', 'MOUTH', 'EARS', 'CHIN', 'CHEEKS', 'FOREHEAD', 'DIMPLES']
  },
  {
    theme: 'Sushi Types',
    spangram: 'JAPANESEFOOD',
    words: ['MAKI', 'NIGIRI', 'SASHIMI', 'TEMAKI', 'URAMAKI', 'TEMARI']
  },
  {
    theme: 'Winter Activities',
    spangram: 'ICEANDSNOW',
    words: ['SKIING', 'SKATING', 'SLEDDING', 'LUGE', 'HOCKEY', 'CURLING']
  },
  {
    theme: 'Summer Activities',
    spangram: 'SUNSHINE',
    words: ['SWIMMING', 'HIKING', 'CAMPING', 'SURFING', 'BIKING', 'PICNIC']
  },
  {
    theme: 'Martial Arts',
    spangram: 'DISCIPLINE',
    words: ['KARATE', 'JUDO', 'SUMO', 'KENDO', 'BOXING', 'AIKIDO', 'JUJITSU']
  },
  {
    theme: 'Shoe Types',
    spangram: 'FOOTWEAR',
    words: ['SNEAKER', 'SANDAL', 'BOOT', 'SLIPPER', 'LOAFER', 'OXFORD', 'CLOG']
  },
  {
    theme: 'Baked Goods',
    spangram: 'BAKERY',
    words: ['BREAD', 'ROLL', 'MUFFIN', 'COOKIE', 'SCONE', 'BAGEL', 'DONUT', 'ECLAIR']
  },
  {
    theme: 'School Subjects',
    spangram: 'CURRICULUM',
    words: ['ALGEBRA', 'SCIENCE', 'HISTORY', 'ENGLISH', 'MUSIC', 'DRAMA']
  },
  {
    theme: 'Fairytale Characters',
    spangram: 'STORYBOOK',
    words: ['WITCH', 'PRINCE', 'GOBLIN', 'FAIRY', 'WIZARD', 'TROLL', 'DRAGON']
  },
  {
    theme: 'Cakes',
    spangram: 'DESSERTS',
    words: ['LEMON', 'VANILLA', 'CARROT', 'SPONGE', 'ANGEL', 'COFFEE', 'POUND']
  },
  {
    theme: 'Clocks',
    spangram: 'TIMEPIECE',
    words: ['ANALOG', 'DIGITAL', 'CUCKOO', 'SUNDIAL', 'PENDULUM', 'ALARM']
  },
  {
    theme: 'Circus Acts',
    spangram: 'UNDERTHEBIGTOP',
    words: ['CLOWN', 'ACROBAT', 'JUGGLER', 'UNICYCLE', 'TRAPEZE']
  },
  {
    theme: 'Beach Items',
    spangram: 'SEASIDE',
    words: ['TOWEL', 'UMBRELLA', 'SHOVEL', 'SANDALS', 'BUCKET', 'BALL', 'CHAIR']
  },
  {
    theme: 'Winged Insects',
    spangram: 'AIRBORNE',
    words: ['HORNET', 'GNAT', 'MOTH', 'WASP', 'LADYBUG', 'MOSQUITO', 'FIREFLY']
  },
  {
    theme: 'Kitchen Utensils',
    spangram: 'INTHEKITCHEN',
    words: ['SPOON', 'FORK', 'KNIFE', 'WHISK', 'SPATULA', 'TONGS', 'LADLE']
  },
  {
    theme: 'Herbs',
    spangram: 'GARNISH',
    words: ['BASIL', 'ROSEMARY', 'THYME', 'MINT', 'CILANTRO', 'PARSLEY', 'DILL']
  },
  {
    theme: 'Astronomy Tools',
    spangram: 'STARGAZER',
    words: ['ORRERY', 'SEXTANT', 'TELESCOPE', 'ASTROLABE', 'EYEPIECE']
  },
  {
    theme: 'Building Parts',
    spangram: 'STRUCTURE',
    words: ['ROOF', 'WALL', 'DOOR', 'WINDOW', 'FLOOR', 'CEILING', 'STAIRCASE']
  },
  {
    theme: 'College Majors',
    spangram: 'UNIVERSITY',
    words: ['BIOLOGY', 'PHYSICS', 'MATH', 'ENGLISH', 'BUSINESS', 'MUSIC']
  },
  {
    theme: 'Picnic Items',
    spangram: 'ONTHEGRASS',
    words: ['BASKET', 'BLANKET', 'SANDWICH', 'FRUIT', 'NAPKIN', 'PLATES']
  },
  {
    theme: 'Travel Destinations',
    spangram: 'VACATION',
    words: ['HAWAII', 'PARIS', 'VENICE', 'ALPS', 'BALI', 'ROME', 'TOKYO', 'LONDON']
  },
  {
    theme: 'Coffee Types',
    spangram: 'CAFFEINE',
    words: ['ESPRESSO', 'LATTE', 'MOCHA', 'CORTADO', 'DECAF', 'CAPPUCCINO']
  },
  {
    theme: 'Modes of Transport',
    spangram: 'GETTINGAROUND',
    words: ['BIKE', 'WALK', 'DRIVE', 'TAXI', 'METRO', 'FERRY', 'AIRPLANE']
  },
  {
    theme: 'Chess',
    spangram: 'BLACKANDWHITE',
    words: ['KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT', 'PAWN', 'GAMBIT']
  },
  {
    theme: 'Art Styles',
    spangram: 'ARTMOVEMENTS',
    words: ['CUBISM', 'REALISM', 'BAROQUE', 'ABSTRACT', 'DADA', 'DECO']
  },
  {
    theme: 'Farm Animals',
    spangram: 'OLDMACDONALD',
    words: ['HORSE', 'CHICKEN', 'SHEEP', 'GOAT', 'DUCK', 'DONKEY', 'LLAMA']
  },
  {
    theme: 'Cocktails',
    spangram: 'HAPPYHOUR',
    words: ['MARTINI', 'MOJITO', 'GIMLET', 'DAIQUIRI', 'JULEP', 'NEGRONI']
  },
  {
    theme: 'Video Games',
    spangram: 'PLAYERONE',
    words: ['MARIO', 'TETRIS', 'DOOM', 'FORTNITE', 'ZELDA', 'PACMAN', 'SONIC']
  },
  {
    theme: 'Musical Symbols',
    spangram: 'NOTATION',
    words: ['TREBLE', 'BASS', 'SHARP', 'FLAT', 'NOTE', 'REST', 'CLEF', 'CRESCENDO']
  },
  {
    theme: 'Cuts of Meat',
    spangram: 'BUTCHERY',
    words: ['SIRLOIN', 'CHUCK', 'RIBEYE', 'SHANK', 'FLANK', 'BRISKET', 'ROUND']
  },
  {
    theme: 'Mythical Places',
    spangram: 'LEGENDARY',
    words: ['ATLANTIS', 'VALHALLA', 'OLYMPUS', 'AVALON', 'ASGARD', 'EDEN']
  },
  {
    theme: 'Breakfast Cereals',
    spangram: 'BOWLOFCEREAL',
    words: ['CHEERIOS', 'CHEX', 'GRANOLA', 'BRAN', 'OATMEAL', 'MUESLI']
  },
  {
    theme: 'Constellations',
    spangram: 'STARPATTERNS',
    words: ['ORION', 'PEGASUS', 'GEMINI', 'LYRA', 'DRACO', 'ANDROMEDA']
  },
  {
    theme: 'Knots',
    spangram: 'ROPEWORK',
    words: ['BOWLINE', 'SLIPKNOT', 'GRANNY', 'NOOSE', 'SHEEPSHANK', 'REEF']
  },
  {
    theme: 'Pizza Toppings',
    spangram: 'ONTHEPIZZA',
    words: ['PEPPERONI', 'SAUSAGE', 'MUSHROOM', 'ONION', 'PINEAPPLE']
  },
  {
    theme: 'Yoga Poses',
    spangram: 'ASANAS',
    words: ['COBRA', 'LOTUS', 'WARRIOR', 'PIGEON', 'TREE', 'BRIDGE', 'PLANK', 'CROW']
  },
  {
    theme: 'Bread Types',
    spangram: 'BREADBASKET',
    words: ['BAGUETTE', 'SOURDOUGH', 'BRIOCHE', 'CIABATTA', 'BAGEL']
  },
  {
    theme: 'Cheeses',
    spangram: 'CHEESEBOARD',
    words: ['CHEDDAR', 'BRIE', 'GOUDA', 'FETA', 'PARMESAN', 'CAMEMBERT']
  },
  {
    theme: 'Hats',
    spangram: 'HEADWEAR',
    words: ['FEDORA', 'BERET', 'BEANIE', 'BOWLER', 'BONNET', 'TURBAN', 'TOQUE']
  },
  {
    theme: 'Sandwiches',
    spangram: 'DELICOUNTER',
    words: ['REUBEN', 'PANINI', 'CLUB', 'GYRO', 'SUBMARINE', 'MELT', 'HERO']
  },
  {
    theme: 'Soups',
    spangram: 'SOUPOFTHEDAY',
    words: ['MINESTRONE', 'CHOWDER', 'BISQUE', 'GUMBO', 'GAZPACHO']
  },
  {
    theme: 'Berries',
    spangram: 'BERRYPATCH',
    words: ['BLUEBERRY', 'RASPBERRY', 'CRANBERRY', 'CURRANT', 'ACAI']
  },
  {
    theme: 'Mushrooms',
    spangram: 'WILDFUNGI',
    words: ['SHIITAKE', 'PORCINI', 'OYSTER', 'ENOKI', 'TRUFFLE', 'BUTTON']
  },
  {
    theme: 'Root Vegetables',
    spangram: 'ROOTCELLAR',
    words: ['CARROT', 'TURNIP', 'RADISH', 'BEET', 'RUTABAGA', 'CELERIAC']
  },
  {
    theme: 'Tea Varieties',
    spangram: 'TEACADDY',
    words: ['OOLONG', 'DARJEELING', 'ASSAM', 'CHAI', 'MATCHA', 'CHAMOMILE']
  },
  {
    theme: 'Big Cats',
    spangram: 'WILDCATS',
    words: ['LION', 'TIGER', 'LEOPARD', 'JAGUAR', 'CHEETAH', 'PANTHER', 'LYNX']
  },
  {
    theme: 'Primates',
    spangram: 'APESANDMONKEYS',
    words: ['GORILLA', 'BABOON', 'GIBBON', 'MANDRILL', 'TAMARIN']
  },
  {
    theme: 'Snakes',
    spangram: 'SERPENTS',
    words: ['PYTHON', 'COBRA', 'VIPER', 'MAMBA', 'ANACONDA', 'ADDER', 'TAIPAN']
  },
  {
    theme: 'Arctic Animals',
    spangram: 'FROZENNORTH',
    words: ['WALRUS', 'NARWHAL', 'CARIBOU', 'PUFFIN', 'LEMMING', 'SEAL']
  },
  {
    theme: 'Desert Animals',
    spangram: 'DUNEDWELLERS',
    words: ['CAMEL', 'SCORPION', 'FENNEC', 'MEERKAT', 'JACKAL', 'ORYX']
  },
  {
    theme: 'Marsupials',
    spangram: 'INTHEPOUCH',
    words: ['KANGAROO', 'KOALA', 'WOMBAT', 'WALLABY', 'OPOSSUM', 'BILBY']
  },
  {
    theme: 'Birds of Prey',
    spangram: 'RAPTORS',
    words: ['HAWK', 'FALCON', 'EAGLE', 'OSPREY', 'KESTREL', 'BUZZARD', 'CONDOR']
  },
  {
    theme: 'Horse Breeds',
    spangram: 'HORSEBREEDS',
    words: ['ARABIAN', 'MUSTANG', 'APPALOOSA', 'MORGAN', 'SHETLAND']
  },
  {
    theme: 'Baby Animals',
    spangram: 'NEWBORNS',
    words: ['PUPPY', 'KITTEN', 'CALF', 'FOAL', 'LAMB', 'JOEY', 'DUCKLING', 'CHICK']
  },
  {
    theme: 'Animal Homes',
    spangram: 'DWELLINGS',
    words: ['NEST', 'HIVE', 'BURROW', 'LAIR', 'WARREN', 'KENNEL', 'AERIE', 'COOP']
  },
  {
    theme: 'Animal Sounds',
    spangram: 'ANIMALTALK',
    words: ['BARK', 'MEOW', 'NEIGH', 'QUACK', 'GROWL', 'CHIRP', 'BLEAT', 'CROAK']
  },
  {
    theme: 'Clouds',
    spangram: 'CLOUDCOVER',
    words: ['CIRRUS', 'CUMULUS', 'STRATUS', 'MAMMATUS', 'LENTICULAR']
  },
  {
    theme: 'Rocks and Minerals',
    spangram: 'GEOLOGY',
    words: ['GRANITE', 'BASALT', 'QUARTZ', 'MARBLE', 'GYPSUM', 'SHALE', 'FLINT']
  },
  {
    theme: 'Volcanoes',
    spangram: 'VOLCANO',
    words: ['ETNA', 'FUJI', 'VESUVIUS', 'KRAKATOA', 'PINATUBO', 'STROMBOLI']
  },
  {
    theme: 'Coastal Features',
    spangram: 'COASTLINE',
    words: ['BEACH', 'CLIFF', 'COVE', 'LAGOON', 'ESTUARY', 'HEADLAND', 'DUNE']
  },
  {
    theme: 'Islands',
    spangram: 'ISLANDHOPPING',
    words: ['CUBA', 'BALI', 'CRETE', 'SICILY', 'TAHITI', 'HAWAII', 'JAVA']
  },
  {
    theme: 'Deserts',
    spangram: 'WASTELANDS',
    words: ['SAHARA', 'GOBI', 'MOJAVE', 'KALAHARI', 'ATACAMA', 'SONORAN']
  },
  {
    theme: 'US States',
    spangram: 'FIFTYSTATES',
    words: ['TEXAS', 'OHIO', 'MAINE', 'IDAHO', 'OREGON', 'NEVADA', 'ALASKA']
  },
  {
    theme: 'European Countries',
    spangram: 'EUROPEAN',
    words: ['FRANCE', 'SPAIN', 'ITALY', 'GREECE', 'NORWAY', 'POLAND', 'SWEDEN']
  },
  {
    theme: 'African Countries',
    spangram: 'AFRICAN',
    words: ['KENYA', 'EGYPT', 'GHANA', 'NIGERIA', 'MOROCCO', 'ETHIOPIA', 'MALI']
  },
  {
    theme: 'Languages',
    spangram: 'MOTHERTONGUE',
    words: ['FRENCH', 'SPANISH', 'GERMAN', 'ARABIC', 'RUSSIAN', 'THAI']
  },
  {
    theme: 'Greek Letters',
    spangram: 'GREEKALPHABET',
    words: ['OMEGA', 'SIGMA', 'DELTA', 'GAMMA', 'THETA', 'LAMBDA', 'BETA']
  },
  {
    theme: 'Shapes',
    spangram: 'GEOMETRY',
    words: ['CIRCLE', 'SQUARE', 'TRIANGLE', 'HEXAGON', 'PENTAGON', 'HEART']
  },
  {
    theme: 'Math Terms',
    spangram: 'MATHEMATICS',
    words: ['FRACTION', 'INTEGER', 'EQUATION', 'VARIABLE', 'MEDIAN']
  },
  {
    theme: 'Units of Measure',
    spangram: 'STANDARDUNITS',
    words: ['GALLON', 'POUND', 'OUNCE', 'METER', 'LITER', 'QUART', 'MILE']
  },
  {
    theme: 'Programming Languages',
    spangram: 'PROGRAMMING',
    words: ['PYTHON', 'RUBY', 'PERL', 'COBOL', 'FORTRAN', 'PASCAL', 'BASIC']
  },
  {
    theme: 'Keyboard Keys',
    spangram: 'KEYBOARD',
    words: ['SHIFT', 'ENTER', 'ESCAPE', 'DELETE', 'SPACE', 'CONTROL', 'INSERT']
  },
  {
    theme: 'Lab Equipment',
    spangram: 'LABORATORY',
    words: ['BEAKER', 'FLASK', 'BURNER', 'MICROSCOPE', 'FUNNEL', 'TONGS']
  },
  {
    theme: 'Bones',
    spangram: 'SKELETON',
    words: ['FEMUR', 'TIBIA', 'SKULL', 'PELVIS', 'RADIUS', 'STERNUM', 'FIBULA']
  },
  {
    theme: 'Organs',
    spangram: 'ANATOMY',
    words: ['HEART', 'LIVER', 'KIDNEY', 'BRAIN', 'STOMACH', 'SPLEEN', 'BLADDER']
  },
  {
    theme: 'Hospital Words',
    spangram: 'HEALTHCARE',
    words: ['NURSE', 'DOCTOR', 'SURGEON', 'PATIENT', 'STRETCHER', 'WARD']
  },
  {
    theme: 'Virtues',
    spangram: 'GOODCHARACTER',
    words: ['HONESTY', 'COURAGE', 'PATIENCE', 'KINDNESS', 'MERCY']
  },
  {
    theme: 'Greek Gods',
    spangram: 'OLYMPIANS',
    words: ['ZEUS', 'HERA', 'APOLLO', 'ATHENA', 'POSEIDON', 'ARTEMIS', 'ARES']
  },
  {
    theme: 'Roman Gods',
    spangram: 'PANTHEON',
    words: ['JUPITER', 'PLUTO', 'VENUS', 'NEPTUNE', 'MINERVA', 'JUNO', 'DIANA']
  },
  {
    theme: 'Egyptian Gods',
    spangram: 'ANCIENTEGYPT',
    words: ['OSIRIS', 'ISIS', 'HORUS', 'ANUBIS', 'THOTH', 'BASTET', 'AMUN']
  },
  {
    theme: 'Zodiac Signs',
    spangram: 'HOROSCOPE',
    words: ['TAURUS', 'GEMINI', 'VIRGO', 'LIBRA', 'PISCES', 'ARIES', 'CANCER']
  },
  {
    theme: 'Poker Terms',
    spangram: 'TEXASHOLDEM',
    words: ['BLUFF', 'FLUSH', 'RIVER', 'STRAIGHT', 'ANTE', 'CHECK', 'RAISE']
  },
  {
    theme: 'Playground Equipment',
    spangram: 'PLAYGROUND',
    words: ['SLIDE', 'SWING', 'SEESAW', 'SANDBOX', 'TUNNEL', 'JUNGLEGYM']
  },
  {
    theme: 'Toys',
    spangram: 'TOYCHEST',
    words: ['DOLL', 'PINWHEEL', 'KITE', 'PUZZLE', 'BLOCKS', 'MARBLES', 'ROBOT']
  },
  {
    theme: 'Party Supplies',
    spangram: 'PARTYSHOP',
    words: ['BALLOON', 'PINATA', 'CONFETTI', 'CANDLE', 'NAPKIN', 'BANNER']
  },
  {
    theme: 'Wedding Words',
    spangram: 'WEDDINGDAY',
    words: ['BRIDE', 'GROOM', 'VOWS', 'RING', 'VEIL', 'ALTAR', 'TOAST', 'CHAPEL']
  },
  {
    theme: 'Halloween',
    spangram: 'TRICKORTREAT',
    words: ['GHOST', 'WITCH', 'PUMPKIN', 'COSTUME', 'SKELETON', 'BATS']
  },
  {
    theme: 'Christmas',
    spangram: 'YULETIDE',
    words: ['SANTA', 'REINDEER', 'STOCKING', 'PRESENT', 'SLEIGH', 'WREATH']
  },
  {
    theme: 'Spring',
    spangram: 'SPRINGTIME',
    words: ['BLOSSOM', 'TULIP', 'RAIN', 'BUNNY', 'ROBIN', 'DAFFODIL', 'LAMB']
  },
  {
    theme: 'Fishing Gear',
    spangram: 'TACKLEBOX',
    words: ['HOOK', 'REEL', 'LURE', 'BOBBER', 'SINKER', 'WADERS', 'BAIT', 'CREEL']
  },
  {
    theme: 'Sailing Terms',
    spangram: 'NAUTICAL',
    words: ['ANCHOR', 'MAST', 'HULL', 'KEEL', 'STARBOARD', 'RUDDER', 'LEEWARD']
  },
  {
    theme: 'Airport Words',
    spangram: 'AIRTRAVEL',
    words: ['GATE', 'RUNWAY', 'TICKET', 'BOARDING', 'PASSPORT', 'LUGGAGE']
  },
  {
    theme: 'Train Words',
    spangram: 'RAILROAD',
    words: ['CABOOSE', 'ENGINE', 'TRACK', 'STATION', 'PLATFORM', 'WHISTLE']
  },
  {
    theme: 'Car Parts',
    spangram: 'UNDERTHEHOOD',
    words: ['BRAKES', 'BUMPER', 'MUFFLER', 'RADIATOR', 'AXLE', 'TIRES']
  },
  {
    theme: 'Bicycle Parts',
    spangram: 'TWOWHEELER',
    words: ['PEDAL', 'CHAIN', 'SADDLE', 'SPOKE', 'HANDLEBAR', 'SPROCKET']
  },
  {
    theme: 'Hardware Store',
    spangram: 'HOMEREPAIR',
    words: ['HAMMER', 'NAILS', 'SCREWS', 'WRENCH', 'PLIERS', 'DRILL', 'NUTS']
  },
  {
    theme: 'Sewing Supplies',
    spangram: 'SEWINGKIT',
    words: ['NEEDLE', 'THREAD', 'THIMBLE', 'BOBBIN', 'BUTTON', 'SCISSORS']
  },
  {
    theme: 'Fabrics',
    spangram: 'TEXTILES',
    words: ['COTTON', 'SILK', 'LINEN', 'DENIM', 'VELVET', 'WOOL', 'SATIN', 'TWEED']
  },
  {
    theme: 'Patterns',
    spangram: 'PATTERNED',
    words: ['PLAID', 'STRIPES', 'POLKADOT', 'PAISLEY', 'FLORAL', 'ARGYLE']
  },
  {
    theme: 'Jewelry',
    spangram: 'ADORNMENTS',
    words: ['NECKLACE', 'BRACELET', 'EARRING', 'PENDANT', 'CUFFLINK']
  },
  {
    theme: 'Hairstyles',
    spangram: 'HAIRDOS',
    words: ['BRAID', 'PONYTAIL', 'MOHAWK', 'MULLET', 'PIXIE', 'AFRO', 'BEEHIVE']
  },
  {
    theme: 'Makeup',
    spangram: 'COSMETICS',
    words: ['LIPSTICK', 'MASCARA', 'BLUSH', 'EYELINER', 'POWDER', 'GLOSS']
  },
  {
    theme: 'Bathroom Items',
    spangram: 'WASHROOM',
    words: ['TOWEL', 'SOAP', 'TOOTHBRUSH', 'SHAMPOO', 'PLUNGER', 'BATHTUB']
  },
  {
    theme: 'Bedroom Items',
    spangram: 'BEDCHAMBER',
    words: ['PILLOW', 'BLANKET', 'DRESSER', 'MATTRESS', 'CLOSET', 'LAMP']
  },
  {
    theme: 'Houseplants',
    spangram: 'GREENERY',
    words: ['FERN', 'CACTUS', 'ALOE', 'POTHOS', 'ORCHID', 'MONSTERA', 'BAMBOO']
  },
  {
    theme: 'Spreads',
    spangram: 'ONTOAST',
    words: ['BUTTER', 'HONEY', 'HUMMUS', 'MARMALADE', 'TAPENADE', 'CHUTNEY']
  },
  {
    theme: 'Sauces',
    spangram: 'CONDIMENTS',
    words: ['KETCHUP', 'MUSTARD', 'SALSA', 'PESTO', 'TARTAR', 'TERIYAKI']
  },
  {
    theme: 'Candy',
    spangram: 'SWEETSHOP',
    words: ['LOLLIPOP', 'TOFFEE', 'FUDGE', 'GUMDROP', 'CARAMEL', 'NOUGAT']
  },
  {
    theme: 'Pies',
    spangram: 'PIEFLAVORS',
    words: ['APPLE', 'PECAN', 'PUMPKIN', 'PEACH', 'RHUBARB', 'BLUEBERRY']
  },
  {
    theme: 'Snacks',
    spangram: 'MUNCHIES',
    words: ['PRETZEL', 'POPCORN', 'PEANUTS', 'CRACKERS', 'NACHOS', 'JERKY']
  },
  {
    theme: 'Mexican Food',
    spangram: 'MEXICANEATS',
    words: ['TACO', 'BURRITO', 'TAMALE', 'ENCHILADA', 'CHURRO', 'SALSA']
  },
  {
    theme: 'Italian Food',
    spangram: 'TRATTORIA',
    words: ['LASAGNA', 'RISOTTO', 'GNOCCHI', 'TIRAMISU', 'PIZZA', 'PESTO']
  },
  {
    theme: 'Indian Food',
    spangram: 'CURRYHOUSE',
    words: ['SAMOSA', 'NAAN', 'BIRYANI', 'TANDOORI', 'PAKORA', 'CHUTNEY']
  },
  {
    theme: 'Noodles',
    spangram: 'NOODLEHOUSE',
    words: ['UDON', 'SOBA', 'RAMEN', 'SPAGHETTI', 'LAKSA', 'VERMICELLI']
  },
  {
    theme: 'Cooking Methods',
    spangram: 'HOWTOCOOK',
    words: ['SIMMER', 'BRAISE', 'POACH', 'GRILL', 'ROAST', 'STEAM', 'STIRFRY']
  },
  {
    theme: 'Restaurant Words',
    spangram: 'DININGOUT',
    words: ['MENU', 'WAITER', 'ENTREE', 'APPETIZER', 'CHECK', 'BOOTH', 'CHEF']
  },
  {
    theme: 'Singing Voices',
    spangram: 'VOCALRANGES',
    words: ['SOPRANO', 'ALTO', 'TENOR', 'BASS', 'BARITONE', 'CONTRALTO']
  },
  {
    theme: 'Theater Words',
    spangram: 'SHOWBUSINESS',
    words: ['SCRIPT', 'USHER', 'ENCORE', 'MATINEE', 'CURTAIN', 'ACTOR']
  },
  {
    theme: 'Poetry Forms',
    spangram: 'POETICFORMS',
    words: ['HAIKU', 'SONNET', 'LIMERICK', 'BALLAD', 'ACROSTIC', 'EPIC']
  },
  {
    theme: 'Punctuation',
    spangram: 'SENTENCEMARKS',
    words: ['COMMA', 'PERIOD', 'COLON', 'HYPHEN', 'SEMICOLON', 'DASH']
  },
  {
    theme: 'Grammar',
    spangram: 'SPEECHPARTS',
    words: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'ARTICLE']
  },
  {
    theme: 'Library Words',
    spangram: 'READINGROOM',
    words: ['CATALOG', 'FICTION', 'ARCHIVE', 'OVERDUE', 'LIBRARIAN']
  },
  {
    theme: 'Mystery Words',
    spangram: 'WHODUNIT',
    words: ['SUSPECT', 'DETECTIVE', 'MOTIVE', 'ALIBI', 'SLEUTH', 'WITNESS']
  },
  {
    theme: 'Pirates',
    spangram: 'BUCCANEERS',
    words: ['CUTLASS', 'MAST', 'PARROT', 'TREASURE', 'CAPTAIN', 'ANCHOR']
  },
  {
    theme: 'Castle Parts',
    spangram: 'STRONGHOLD',
    words: ['MOAT', 'TURRET', 'KEEP', 'DUNGEON', 'RAMPART', 'DRAWBRIDGE']
  },
  {
    theme: 'Superpowers',
    spangram: 'SUPERHUMAN',
    words: ['FLIGHT', 'STRENGTH', 'TELEPATHY', 'HEALING', 'TELEPORT']
  },
  {
    theme: 'Months',
    spangram: 'CALENDAR',
    words: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'OCTOBER', 'JUNE', 'JULY']
  },
  {
    theme: 'Time Words',
    spangram: 'UNITSOFTIME',
    words: ['SECOND', 'MINUTE', 'HOUR', 'DECADE', 'CENTURY', 'WEEK', 'YEAR']
  },
  {
    theme: 'Water Sports',
    spangram: 'ONTHEWATER',
    words: ['SURFING', 'ROWING', 'SAILING', 'KAYAKING', 'SNORKELING']
  },
  {
    theme: 'Bakery Tools',
    spangram: 'BAKINGGEAR',
    words: ['WHISK', 'SPATULA', 'SIFTER', 'MIXER', 'OVEN', 'SCRAPER', 'TRAY']
  },
  {
    theme: 'Geometry Solids',
    spangram: 'SOLIDFIGURES',
    words: ['SPHERE', 'CONE', 'CYLINDER', 'PYRAMID', 'PRISM', 'CUBOID']
  },
  {
    theme: 'Weather Gear',
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

export function getRandomPuzzle(): StrandsGame {
  return getPuzzle(1 + Math.floor(Math.random() * puzzleThemes.length));
}
