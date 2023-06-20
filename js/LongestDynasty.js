const dynastyReign = [
    {"San Dynasty": "MXLI"},
    {"Viloria Dynasty": "MCCCIIII"},
    {"Tan Dynasty": "MCCCXCVIII"},
    {"Bon Dynasty": "MCDXLV"},
    {"Maiko Dynasty": "MDCLXIV"},
    {"Paul Dynasty": "MCMXLIX"},
    {"Andre Dynasty": "MMMXICX"},
];

const numerals = [
    {"I": 1},
    {"IV": 4},
    {"V": 5},
    {"IX": 9},
    {"X": 10},
    {"XL": 40},
    {"L": 50},
    {"XC": 90},
    {"C": 100},
    {"CD": 400},
    {"D": 500},
    {"CM": 900},
    {"M": 1000},
];

const startingYear = 1000;

function longestDynasty(dynastyReign) {
    

    // filter out the entries with valid Roman numerals
    const validEntries = dynastyReign.filter((dynasty) => {
        const year = Object.values(dynasty)[0];
        return convertYear(year) !== "Invalid";
    });

    // check if there are any valid entries remaining
    if (validEntries.length === 0) {
        return "No Data;"
    }

    // convert the roman numerals into integers for each dynasties

    const dynasties = validEntries.map(dynasty => Object.keys(dynasty)[0]);
    const years = validEntries.map(dynasty => {
        const year = Object.values(dynasty)[0]
        return convertYear(year)
    });

    // generate an array that will represent the years in which each dynasty reigns
    const reigningDynasty = [];

    for (let i = 0; i < dynasties.length; i++) {
        const startYear = i === 0 ? startingYear : years[i - 1] + 1;
        const endYear = years[i];

        for (let year = startYear; year <= endYear; year++) {
            reigningDynasty.push({ dynasty: dynasties[i], year});
        }
    }

    // count the years in which each dynasties reigns
    const reigningYears = {};

    reigningDynasty.forEach(item => {
        const {dynasty} = item;
        if (reigningYears[dynasty]) {
            reigningYears[dynasty]++;
        } else {
            reigningYears[dynasty] = 1;
        }
    });

    // determine which dynasty reigns the longest and store in the array
    let longestReign = 0
    let longestReigningDynasties = []

    for (const dynasty in reigningYears) {
        const years = reigningYears[dynasty];
        if (years > longestReign) {
            longestReign = years;
            longestReigningDynasties = [{dynasty, years}]
        } else if (years === longestReign) {
            longestReigningDynasties.push({dynasty, years})
        }
    }

    // display the output
    if (longestReigningDynasties.length > 0) {
        console.log(longestReigningDynasties)
    } else {
        console.log("No Data")
    }
}

function convertYear(year) {
    // Check if the roman numeral is valid
    const regex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;  
    const result = year.match(regex);
    
    if (!result) {
        return "Invalid"
    }

    let integerValue = 0;
    for (let i = 0; i < result.length; i++) {
        const romanNumeral = result[i]
        const regex2 = /(M|CM|D|CD|C|XC|L|XL|X|IX|V|IV|I)/g;
        const numeral = romanNumeral.match(regex2)

        let sum = 0
        for (let j = 0; j < numeral.length; j++) {
            const singleNumeral = numeral[j]
            const numeralObject = numerals.find(item => Object.keys(item)[0] === singleNumeral)

            const value = numeralObject[singleNumeral]
            sum += value
        }

        integerValue += sum
    }

    return integerValue
}

const regex = /(M|CM|D|CD|C|XC|L|XL|X|IX|V|IV|I)/g;

longestDynasty(dynastyReign)





