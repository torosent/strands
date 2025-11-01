import { StrandsGame, BoardWord, Cell, StrandsBoard } from '../types/game';

// Directions for word placement (excluding right-to-left)
const DIRECTIONS = [
  { row: 0, col: 1 },  // right
  { row: 1, col: 0 },  // down
  { row: 1, col: 1 },  // diagonal right down
  { row: 1, col: -1 }, // diagonal left down
  { row: -1, col: 0 }, // up
  // { row: 0, col: -1 }, // left (removed - no right-to-left)
  { row: -1, col: 1 }, // diagonal right up
  { row: -1, col: -1 } // diagonal left up
];

// Create an empty 6x8 board
function createEmptyBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let row = 0; row < 6; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = {
        row,
        col,
        letter: '',
        isSelected: false,
        isFound: false,
        belongsToWords: []
      };
    }
  }
  return board;
}

// Check if a word can be placed on the board at a specific position
function canPlaceWord(
  board: Cell[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: { row: number; col: number }
): boolean {
  const height = board.length;
  const width = board[0].length;
  
  // Check if word fits on the board
  const endRow = startRow + direction.row * (word.length - 1);
  const endCol = startCol + direction.col * (word.length - 1);
  
  if (endRow < 0 || endRow >= height || endCol < 0 || endCol >= width) {
    return false;
  }
  
  // Check if all cells are empty (no overlapping allowed)
  for (let i = 0; i < word.length; i++) {
    const row = startRow + direction.row * i;
    const col = startCol + direction.col * i;
    
    if (board[row][col].letter !== '') {
      return false;
    }
  }
  
  return true;
}

// Place a word on the board
function placeWord(
  board: Cell[][],
  word: string,
  wordId: number,
  startRow: number,
  startCol: number,
  direction: { row: number; col: number }
): Cell[] {
  const cells: Cell[] = [];
  
  for (let i = 0; i < word.length; i++) {
    const row = startRow + direction.row * i;
    const col = startCol + direction.col * i;
    
    board[row][col].letter = word[i];
    board[row][col].belongsToWords.push(wordId);
    
    cells.push(board[row][col]);
  }
  
  return cells;
}

// Generate a board with words placed
function generateBoard(themeWords: string[]): StrandsBoard {
  const board = createEmptyBoard();
  const words: BoardWord[] = [];
  const usedWords: string[] = [];
  const shuffledWords = [...themeWords].sort(() => Math.random() - 0.5);
  
  let id = 1;
  
  // Loop until we've placed all words or we can't place any more
  for (const word of shuffledWords) {
    let placed = false;
    const maxAttempts = 100;
    let attempts = 0;
    
    // Try to place the word
    while (!placed && attempts < maxAttempts) {
      const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startRow = Math.floor(Math.random() * 6);
      const startCol = Math.floor(Math.random() * 8);
      
      if (canPlaceWord(board, word, startRow, startCol, direction)) {
        const cells = placeWord(board, word, id, startRow, startCol, direction);
        words.push({
          id,
          word,
          isFound: false,
          cells
        });
        usedWords.push(word);
        placed = true;
        id++;
      }
      
      attempts++;
    }
  }
  
  // Fill in any remaining empty cells with random letters
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col].letter === '') {
        board[row][col].letter = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        );
      }
    }
  }
  
  return {
    cells: board,
    words,
    width: 8,
    height: 6
  };
}

export const puzzleThemes: { theme: string; words: string[]; bonusWord: string }[] = [
  {
    theme: 'Musical Instruments',
    words: ['PIANO', 'GUITAR', 'VIOLIN', 'DRUMS', 'FLUTE', 'TRUMPET', 'SAXOPHONE'],
    bonusWord: 'ORCHESTRA'
  },
  {
    theme: 'Types of Trees',
    words: ['OAK', 'MAPLE', 'PINE', 'BIRCH', 'CEDAR', 'WILLOW', 'REDWOOD'],
    bonusWord: 'FOREST'
  },
  {
    theme: 'Celestial Bodies',
    words: ['SUN', 'MOON', 'PLANET', 'STAR', 'COMET', 'GALAXY', 'ASTEROID'],
    bonusWord: 'UNIVERSE'
  },
  {
    theme: 'Sports',
    words: ['SOCCER', 'BASEBALL', 'TENNIS', 'BASKETBALL', 'GOLF', 'HOCKEY', 'VOLLEYBALL'],
    bonusWord: 'ATHLETICS'
  },
  {
    theme: 'Weather Phenomena',
    words: ['RAIN', 'SNOW', 'THUNDER', 'LIGHTNING', 'TORNADO', 'HURRICANE', 'BLIZZARD'],
    bonusWord: 'FORECAST'
  },
  {
    theme: 'Fruits',
    words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MANGO', 'PINEAPPLE', 'STRAWBERRY'],
    bonusWord: 'VITAMIN'
  },
  {
    theme: 'Kitchen Appliances',
    words: ['OVEN', 'MICROWAVE', 'TOASTER', 'BLENDER', 'MIXER', 'FRIDGE', 'STOVE'],
    bonusWord: 'KITCHEN'
  },
  {
    theme: 'Types of Flowers',
    words: ['ROSE', 'TULIP', 'DAISY', 'LILY', 'ORCHID', 'POPPY', 'VIOLET'],
    bonusWord: 'BOUQUET'
  },
  {
    theme: 'Countries',
    words: ['CANADA', 'BRAZIL', 'FRANCE', 'JAPAN', 'EGYPT', 'MEXICO', 'INDIA'],
    bonusWord: 'GLOBAL'
  },
  {
    theme: 'Ocean Creatures',
    words: ['SHARK', 'DOLPHIN', 'WHALE', 'OCTOPUS', 'CRAB', 'JELLYFISH', 'SEAHORSE'],
    bonusWord: 'AQUATIC'
  },
  {
    theme: 'Gemstones',
    words: ['RUBY', 'EMERALD', 'OPAL', 'PEARL', 'TOPAZ', 'DIAMOND', 'AMBER'],
    bonusWord: 'PRECIOUS'
  },
  {
    theme: 'Planets',
    words: ['MERCURY', 'VENUS', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'NEPTUNE'],
    bonusWord: 'ORBITAL'
  },
  {
    theme: 'Elements',
    words: ['OXYGEN', 'CARBON', 'GOLD', 'SILVER', 'IRON', 'COPPER', 'NEON'],
    bonusWord: 'PERIODIC'
  },
  {
    theme: 'Birds',
    words: ['EAGLE', 'SPARROW', 'OWL', 'ROBIN', 'FALCON', 'PENGUIN', 'FINCH'],
    bonusWord: 'FEATHER'
  },
  {
    theme: 'Colors',
    words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK'],
    bonusWord: 'SPECTRUM'
  },
  {
    theme: 'Vehicles',
    words: ['CAR', 'TRUCK', 'PLANE', 'TRAIN', 'BOAT', 'SUBWAY', 'SCOOTER'],
    bonusWord: 'TRANSPORT'
  },
  {
    theme: 'Professions',
    words: ['DOCTOR', 'LAWYER', 'CHEF', 'TEACHER', 'PILOT', 'ACTOR', 'WRITER'],
    bonusWord: 'CAREERS'
  },
  {
    theme: 'Desserts',
    words: ['CAKE', 'PIE', 'COOKIE', 'DONUT', 'ICECREAM', 'BROWNIE', 'PUDDING'],
    bonusWord: 'SWEETNESS'
  },
  {
    theme: 'Tools',
    words: ['HAMMER', 'SAW', 'DRILL', 'WRENCH', 'PLIERS', 'LEVEL', 'CHISEL'],
    bonusWord: 'WORKSHOP'
  },
  {
    theme: 'Beverages',
    words: ['COFFEE', 'TEA', 'WATER', 'JUICE', 'SODA', 'WINE', 'MILK'],
    bonusWord: 'HYDRATION'
  },
  {
    theme: 'Mountains',
    words: ['EVEREST', 'ALPS', 'ROCKIES', 'ANDES', 'FUJI', 'DENALI', 'OLYMPUS'],
    bonusWord: 'ALTITUDE'
  },
  {
    theme: 'Furniture',
    words: ['CHAIR', 'TABLE', 'SOFA', 'DESK', 'BED', 'DRESSER', 'SHELF'],
    bonusWord: 'COMFORT'
  },
  {
    theme: 'Spices',
    words: ['SALT', 'PEPPER', 'GARLIC', 'GINGER', 'CUMIN', 'OREGANO', 'THYME'],
    bonusWord: 'FLAVORING'
  },
  {
    theme: 'Insects',
    words: ['ANT', 'BEE', 'WASP', 'BEETLE', 'MOTH', 'FLY', 'CRICKET'],
    bonusWord: 'BUGWORLD'
  },
  {
    theme: 'Dinosaurs',
    words: ['TREX', 'RAPTOR', 'STEGO', 'PTERO', 'BRONTO', 'TRIKE', 'ANKYLO'],
    bonusWord: 'JURASSIC'
  },
  {
    theme: 'Mythical Creatures',
    words: ['DRAGON', 'PHOENIX', 'GRIFFIN', 'UNICORN', 'CENTAUR', 'MERMAID', 'GOBLIN'],
    bonusWord: 'FANTASIES'
  },
  {
    theme: 'Dance Styles',
    words: ['BALLET', 'TANGO', 'SALSA', 'HIPHOP', 'WALTZ', 'JAZZ', 'SAMBA'],
    bonusWord: 'MOVEMENT'
  },
  {
    theme: 'Rivers',
    words: ['NILE', 'AMAZON', 'THAMES', 'DANUBE', 'GANGES', 'CONGO', 'VOLGA'],
    bonusWord: 'FLOWING'
  },
  {
    theme: 'Computer Parts',
    words: ['CPU', 'RAM', 'DISK', 'MOUSE', 'SCREEN', 'SPEAKER', 'CABLE'],
    bonusWord: 'HARDWARE'
  },
  {
    theme: 'Board Games',
    words: ['CHESS', 'CHECKERS', 'MONOPOLY', 'CLUE', 'RISK', 'SCRABBLE', 'UNO'],
    bonusWord: 'TABLEGAME'
  },
  {
    theme: 'Clothing Items',
    words: ['SHIRT', 'PANTS', 'DRESS', 'JACKET', 'SOCKS', 'HAT', 'SCARF'],
    bonusWord: 'WARDROBE'
  },
  {
    theme: 'Sea Shells',
    words: ['CONCH', 'CLAM', 'SCALLOP', 'OYSTER', 'MUSSEL', 'ABALONE', 'COWRIE'],
    bonusWord: 'SHORELINE'
  },
  {
    theme: 'Pasta Types',
    words: ['SPAGHETTI', 'PENNE', 'LASAGNA', 'RAVIOLI', 'FARFALLE', 'ORZO', 'FUSILLI'],
    bonusWord: 'ALFRESCO'
  },
  {
    theme: 'Condiments',
    words: ['KETCHUP', 'MUSTARD', 'MAYO', 'RELISH', 'SALSA', 'HUMMUS', 'TAHINI'],
    bonusWord: 'TOPPINGS'
  },
  {
    theme: 'Fast Food',
    words: ['BURGER', 'PIZZA', 'TACO', 'NUGGET', 'FRIES', 'SHAKE', 'HOTDOG'],
    bonusWord: 'TAKEAWAY'
  },
  {
    theme: 'Cities',
    words: ['LONDON', 'PARIS', 'TOKYO', 'ROME', 'CAIRO', 'DUBAI', 'LIMA'],
    bonusWord: 'METROPOL'
  },
  {
    theme: 'Household Chores',
    words: ['DUSTING', 'MOPPING', 'LAUNDRY', 'DISHES', 'VACUUM', 'COOKING', 'TRASH'],
    bonusWord: 'CLEANING'
  },
  {
    theme: 'Construction Materials',
    words: ['WOOD', 'STEEL', 'BRICK', 'CEMENT', 'GLASS', 'STONE', 'PLASTIC'],
    bonusWord: 'BUILDING'
  },
  {
    theme: 'Water Bodies',
    words: ['OCEAN', 'LAKE', 'RIVER', 'POND', 'SEA', 'STREAM', 'CANAL'],
    bonusWord: 'AQUATICS'
  },
  {
    theme: 'Hiking Gear',
    words: ['BOOTS', 'BACKPACK', 'TENT', 'MAP', 'COMPASS', 'ROPE', 'CANTEEN'],
    bonusWord: 'OUTDOORS'
  },
  {
    theme: 'Office Supplies',
    words: ['PAPER', 'PEN', 'STAPLER', 'FOLDER', 'TAPE', 'SCISSOR', 'MARKER'],
    bonusWord: 'WORKDESK'
  },
  {
    theme: 'Space Exploration',
    words: ['ROCKET', 'SHUTTLE', 'ROVER', 'LANDER', 'STATION', 'PROBE', 'MODULE'],
    bonusWord: 'MISSIONS'
  },
  {
    theme: 'Card Games',
    words: ['POKER', 'BRIDGE', 'HEARTS', 'SOLITAIRE', 'RUMMY', 'BLACKJACK', 'GO'],
    bonusWord: 'GAMBLING'
  },
  {
    theme: 'Breakfast Foods',
    words: ['BACON', 'EGGS', 'TOAST', 'CEREAL', 'PANCAKE', 'MUFFIN', 'WAFFLE'],
    bonusWord: 'MORNING'
  },
  {
    theme: 'Exercise Equipment',
    words: ['WEIGHTS', 'TREADMILL', 'BIKE', 'ROWER', 'MAT', 'BANDS', 'JUMP ROPE'],
    bonusWord: 'FITNESS'
  },
  {
    theme: 'Seasonings',
    words: ['BASIL', 'MINT', 'CHILI', 'DILL', 'SAGE', 'PARSLEY', 'CILANTRO'],
    bonusWord: 'AROMATIC'
  },
  {
    theme: 'Vegetables',
    words: ['CARROT', 'TOMATO', 'SPINACH', 'ONION', 'POTATO', 'BROCCOLI', 'PEPPER'],
    bonusWord: 'PRODUCE'
  },
  {
    theme: 'Occupations',
    words: ['ENGINEER', 'ARTIST', 'NURSE', 'PLUMBER', 'FARMER', 'DRIVER', 'CLERK'],
    bonusWord: 'WORKLIFE'
  },
  {
    theme: 'Stationery',
    words: ['PENCIL', 'ERASER', 'RULER', 'NOTEBOOK', 'GLUE', 'BINDER', 'STAPLES'],
    bonusWord: 'SUPPLIES'
  },
  {
    theme: 'Festivals',
    words: ['DIWALI', 'EASTER', 'HANUKKAH', 'EID', 'CARNIVAL', 'LUNAR', 'OCTOBERFEST'],
    bonusWord: 'CELEBRATE'
  },
  {
    theme: 'Currencies',
    words: ['DOLLAR', 'EURO', 'YEN', 'POUND', 'YUAN', 'RUPEE', 'PESO'],
    bonusWord: 'EXCHANGE'
  },
  {
    theme: 'Grains',
    words: ['RICE', 'WHEAT', 'CORN', 'BARLEY', 'OATS', 'QUINOA', 'RYE'],
    bonusWord: 'HARVESTS'
  },
  {
    theme: 'Legendary Figures',
    words: ['ZEUS', 'THOR', 'BUDDHA', 'MOSES', 'ARTHUR', 'CLAUS', 'HERCULES'],
    bonusWord: 'FOLKLORE'
  },
  {
    theme: 'Photography Terms',
    words: ['SHUTTER', 'LENS', 'APERTURE', 'FLASH', 'FOCUS', 'FILTER', 'ZOOM'],
    bonusWord: 'SNAPSHOT'
  },
  {
    theme: 'Personality Traits',
    words: ['BRAVE', 'HONEST', 'LOYAL', 'KIND', 'SMART', 'PATIENT', 'CHEERFUL'],
    bonusWord: 'QUALITIES'
  },
  {
    theme: 'Instruments',
    words: ['RULER', 'COMPASS', 'CALIPER', 'PROTRACTOR', 'SCALE', 'METER', 'GAUGE'],
    bonusWord: 'MEASURES'
  },
  {
    theme: 'Astronomy Terms',
    words: ['ORBIT', 'ECLIPSE', 'NOVA', 'QUASAR', 'PULSAR', 'NEBULA', 'METEOR'],
    bonusWord: 'STARGAZER'
  },
  {
    theme: 'Garden Tools',
    words: ['SHOVEL', 'RAKE', 'HOE', 'TROWEL', 'SHEARS', 'SPADE', 'PRUNER'],
    bonusWord: 'PLANTING'
  },
  {
    theme: 'Electrical Components',
    words: ['SWITCH', 'RELAY', 'DIODE', 'RESISTOR', 'CAPACITOR', 'FUSE', 'WIRE'],
    bonusWord: 'CIRCUITS'
  },
  {
    theme: 'Music Genres',
    words: ['ROCK', 'JAZZ', 'CLASSICAL', 'POP', 'COUNTRY', 'METAL', 'FOLK'],
    bonusWord: 'MELODIES'
  },
  {
    theme: 'Literary Genres',
    words: ['ROMANCE', 'MYSTERY', 'SCIFI', 'FANTASY', 'HORROR', 'DRAMA', 'COMEDY'],
    bonusWord: 'BOOKWORM'
  },
  {
    theme: 'Cat Breeds',
    words: ['PERSIAN', 'SIAMESE', 'MAINE', 'BENGAL', 'RAGDOLL', 'SPHYNX', 'BURMESE'],
    bonusWord: 'FELINES'
  },
  {
    theme: 'Dog Breeds',
    words: ['LABRADOR', 'TERRIER', 'COLLIE', 'HUSKY', 'BEAGLE', 'POODLE', 'BOXER'],
    bonusWord: 'CANINES'
  },
  {
    theme: 'Film Genres',
    words: ['ACTION', 'COMEDY', 'DRAMA', 'HORROR', 'WESTERN', 'ROMANCE', 'THRILLER'],
    bonusWord: 'CINEMATIC'
  },
  {
    theme: 'Fish Types',
    words: ['SALMON', 'TUNA', 'TROUT', 'BASS', 'COD', 'CATFISH', 'GOLDFISH'],
    bonusWord: 'SWIMMING'
  },
  {
    theme: 'Lizards',
    words: ['GECKO', 'IGUANA', 'SKINK', 'MONITOR', 'ANOLE', 'DRAGON', 'CHAMELEON'],
    bonusWord: 'REPTILES'
  },
  {
    theme: 'Dairy Products',
    words: ['MILK', 'CHEESE', 'YOGURT', 'BUTTER', 'CREAM', 'ICECREAM', 'WHEY'],
    bonusWord: 'CALCIUM'
  },
  {
    theme: 'Sports Equipment',
    words: ['BALL', 'BAT', 'RACKET', 'SKATES', 'HELMET', 'NET', 'STICK'],
    bonusWord: 'ATHLETICS'
  },
  {
    theme: 'Nuts and Seeds',
    words: ['ALMOND', 'PEANUT', 'WALNUT', 'CASHEW', 'PECAN', 'PISTACHIO', 'SUNFLOWER'],
    bonusWord: 'PROTEINRY'
  },
  {
    theme: 'Mental States',
    words: ['HAPPY', 'SAD', 'ANGRY', 'EXCITED', 'CALM', 'NERVOUS', 'BORED'],
    bonusWord: 'EMOTIONS'
  },
  {
    theme: 'Baking Ingredients',
    words: ['FLOUR', 'SUGAR', 'BUTTER', 'EGGS', 'YEAST', 'SALT', 'VANILLA'],
    bonusWord: 'CONFECTS'
  },
  {
    theme: 'Rodents',
    words: ['MOUSE', 'RAT', 'HAMSTER', 'SQUIRREL', 'BEAVER', 'GUINEA PIG', 'GERBIL'],
    bonusWord: 'CRITTERS'
  },
  {
    theme: 'Candles',
    words: ['TAPER', 'PILLAR', 'VOTIVE', 'TEA LIGHT', 'FLOATING', 'JAR', 'SCENTED'],
    bonusWord: 'LIGHTING'
  },
  {
    theme: 'Cartoon Characters',
    words: ['MICKEY', 'BUGS', 'HOMER', 'POPEYE', 'GARFIELD', 'SNOOPY', 'SHREK'],
    bonusWord: 'ANIMATED'
  },
  {
    theme: 'Facial Features',
    words: ['EYES', 'NOSE', 'MOUTH', 'EARS', 'CHIN', 'CHEEKS', 'FOREHEAD'],
    bonusWord: 'VISAGE'
  },
  {
    theme: 'Sushi Types',
    words: ['MAKI', 'NIGIRI', 'SASHIMI', 'TEMAKI', 'URAMAKI', 'GUNKAN', 'TEMARI'],
    bonusWord: 'JAPANESE'
  },
  {
    theme: 'Winter Activities',
    words: ['SKIING', 'SKATING', 'SLEDDING', 'SNOWBALL', 'HOCKEY', 'CURLING', 'IGLOO'],
    bonusWord: 'SEASONAL'
  },
  {
    theme: 'Summer Activities',
    words: ['SWIMMING', 'HIKING', 'CAMPING', 'FISHING', 'SAILING', 'SURFING', 'BIKING'],
    bonusWord: 'SUNSHINE'
  },
  {
    theme: 'Martial Arts',
    words: ['KARATE', 'JUDO', 'KUNG FU', 'TAI CHI', 'BOXING', 'AIKIDO', 'TAEKWONDO'],
    bonusWord: 'DISCIPLINE'
  },
  {
    theme: 'Shoe Types',
    words: ['SNEAKER', 'SANDAL', 'BOOT', 'HEEL', 'LOAFER', 'OXFORD', 'FLIP FLOP'],
    bonusWord: 'FOOTWEAR'
  },
  {
    theme: 'Baked Goods',
    words: ['BREAD', 'ROLL', 'MUFFIN', 'COOKIE', 'CROISSANT', 'BAGEL', 'DONUT'],
    bonusWord: 'PASTRIES'
  },
  {
    theme: 'School Subjects',
    words: ['MATH', 'SCIENCE', 'HISTORY', 'ENGLISH', 'ART', 'MUSIC', 'GEOGRAPHY'],
    bonusWord: 'LEARNING'
  },
  {
    theme: 'Fairytale Characters',
    words: ['WITCH', 'PRINCE', 'GIANT', 'FAIRY', 'WIZARD', 'TROLL', 'PRINCESS'],
    bonusWord: 'STORYBOOK'
  },
  {
    theme: 'Cakes',
    words: ['CHOCOLATE', 'VANILLA', 'CARROT', 'CHEESECAKE', 'ANGEL', 'RED VELVET', 'POUND'],
    bonusWord: 'DELICIOUS'
  },
  {
    theme: 'Clocks',
    words: ['ANALOG', 'DIGITAL', 'CUCKOO', 'SUNDIAL', 'PENDULUM', 'ALARM', 'GRANDFATHER'],
    bonusWord: 'TIMEPIECE'
  },
  {
    theme: 'Circus Acts',
    words: ['CLOWN', 'ACROBAT', 'JUGGLER', 'TIGHTROPE', 'RINGMASTER', 'LION TAMER', 'TRAPEZE'],
    bonusWord: 'CARNIVAL'
  },
  {
    theme: 'Beach Items',
    words: ['TOWEL', 'UMBRELLA', 'SUNSCREEN', 'SANDALS', 'BUCKET', 'BALL', 'CHAIR'],
    bonusWord: 'SHORELINE'
  },
  {
    theme: 'Winged Insects',
    words: ['BUTTERFLY', 'DRAGONFLY', 'MOTH', 'WASP', 'BEE', 'LADYBUG', 'MOSQUITO'],
    bonusWord: 'FLUTTERS'
  },
  {
    theme: 'Kitchen Utensils',
    words: ['SPOON', 'FORK', 'KNIFE', 'WHISK', 'SPATULA', 'TONGS', 'LADLE'],
    bonusWord: 'CULINARY'
  },
  {
    theme: 'Herbs',
    words: ['BASIL', 'ROSEMARY', 'THYME', 'MINT', 'CILANTRO', 'PARSLEY', 'DILL'],
    bonusWord: 'FRAGRANT'
  },
  {
    theme: 'Astronomy Tools',
    words: ['TELESCOPE', 'COMPASS', 'SEXTANT', 'BINOCULAR', 'RADAR', 'GPS', 'CHART'],
    bonusWord: 'STARVIEW'
  },
  {
    theme: 'Building Parts',
    words: ['ROOF', 'WALL', 'DOOR', 'WINDOW', 'FLOOR', 'CEILING', 'STAIR'],
    bonusWord: 'STRUCTURE'
  },
  {
    theme: 'College Majors',
    words: ['BIOLOGY', 'PHYSICS', 'HISTORY', 'ENGLISH', 'PSYCHOLOGY', 'BUSINESS', 'ART'],
    bonusWord: 'ACADEMICS'
  },
  {
    theme: 'Picnic Items',
    words: ['BASKET', 'BLANKET', 'SANDWICH', 'FRUIT', 'DRINK', 'NAPKIN', 'PLATES'],
    bonusWord: 'OUTDOORS'
  },
  {
    theme: 'Travel Destinations',
    words: ['HAWAII', 'PARIS', 'SAFARI', 'VENICE', 'CRUISE', 'ALPS', 'BALI'],
    bonusWord: 'VACATION'
  },
  {
    theme: 'Coffee Types',
    words: ['ESPRESSO', 'LATTE', 'MOCHA', 'AMERICANO', 'CAPPUCCINO', 'MACCHIATO', 'COLD BREW'],
    bonusWord: 'CAFFEINE'
  },
  {
    theme: 'Modes of Transport',
    words: ['BUS', 'BIKE', 'WALK', 'DRIVE', 'TAXI', 'METRO', 'FERRY'],
    bonusWord: 'COMMUTER'
  },
  {
    theme: 'Currencies',
    words: ['DOLLAR', 'EURO', 'YEN', 'POUND', 'YUAN', 'RUPEE', 'BITCOIN'],
    bonusWord: 'MONETARY'
  },
  {
    theme: 'Art Styles',
    words: ['CUBISM', 'REALISM', 'POP ART', 'BAROQUE', 'ABSTRACT', 'DADA', 'SURREAL'],
    bonusWord: 'CREATIVE'
  },
  {
    theme: 'Farm Animals',
    words: ['COW', 'HORSE', 'PIG', 'CHICKEN', 'SHEEP', 'GOAT', 'DONKEY'],
    bonusWord: 'BARNYARD'
  },
  {
    theme: 'Cocktails',
    words: ['MARTINI', 'MOJITO', 'MARGARITA', 'DAIQUIRI', 'COSMOPOLITAN', 'MANHATTAN', 'NEGRONI'],
    bonusWord: 'MIXOLOGY'
  },
  {
    theme: 'Video Games',
    words: ['MARIO', 'TETRIS', 'MINECRAFT', 'FORTNITE', 'ZELDA', 'PACMAN', 'SONIC'],
    bonusWord: 'GAMEPLAY'
  },
  {
    theme: 'Musical Symbols',
    words: ['TREBLE', 'BASS', 'SHARP', 'FLAT', 'NOTE', 'REST', 'CLEF'],
    bonusWord: 'NOTATION'
  },
  {
    theme: 'Cuts of Meat',
    words: ['SIRLOIN', 'CHUCK', 'RIBEYE', 'TENDERLOIN', 'FLANK', 'BRISKET', 'ROUND'],
    bonusWord: 'BUTCHERY'
  },
  {
    theme: 'Mythical Places',
    words: ['ATLANTIS', 'VALHALLA', 'OLYMPUS', 'AVALON', 'ELYSIUM', 'SHANGRI-LA', 'EDEN'],
    bonusWord: 'LEGENDARY'
  },
  {
    theme: 'Breakfast Cereals',
    words: ['CHEERIOS', 'FROSTED', 'GRANOLA', 'CORNFLAKES', 'OATMEAL', 'RAISIN', 'MUESLI'],
    bonusWord: 'MORNING'
  }
];

// Generate puzzles with boards
export const puzzles: StrandsGame[] = puzzleThemes.map((theme, index) => {
  const id = index + 1;
  const date = new Date(2025, 3, id).toISOString().split('T')[0]; // April 2025
  
  return {
    id,
    date,
    theme: theme.theme,
    board: generateBoard(theme.words),
    bonusWord: theme.bonusWord
  };
});

// Function to get today's puzzle or a specific puzzle by ID
export function getPuzzle(puzzleId?: number): StrandsGame {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  if (puzzleId) {
    return puzzles.find(puzzle => puzzle.id === puzzleId) || puzzles[0];
  }
  
  return puzzles.find(puzzle => puzzle.date === dateStr) || puzzles[0];
}

// Function to get a random puzzle
export function getRandomPuzzle(): StrandsGame {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
}