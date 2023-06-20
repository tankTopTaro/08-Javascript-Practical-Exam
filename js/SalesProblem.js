const productProfitArray = [ 
    {"Product A": -75},
    {"Product B": -70},
    {"Product C": 93},
    {"Product D": 5},
    {"Product E": 88},
    {"Product F": 29},
];

const sortedProducts = productProfitArray.sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]]);

// return the product name having the highest sale profit
function topProduct (productProfitArray) {
    if (productProfitArray.length === 0) {
        return "No Data";
    } 

    let highestProduct = sortedProducts[0];
    return Object.keys(highestProduct)[0];
}

// return the product name having the lowest sales profit
function bottomProduct (productProfitArray) {
    if (productProfitArray.length === 0) {
        return "No Data";
    } 

    let lowestProduct = sortedProducts[sortedProducts.length - 1]
    return Object.keys(lowestProduct)[0];
}

// return the product name having a sales profit closest to 0
function zeroProfitProduct (productProfitArray) {
    if (productProfitArray.length === 0) {
        return "No Data";
    } 

    const closestProduct = productProfitArray.reduce(function (closest, current) {
        let productName = Object.keys(current)[0];
        let profit = current[productName]
        let absoluteProfit = Math.abs(profit)

        if (absoluteProfit < Math.abs(closest.profit)) {
            closest.product = productName;
            closest.profit = profit;
        }

        return closest
    }, { product: null, profit: Infinity }).product;

    return closestProduct
}

var topProductValue = topProduct(productProfitArray)
var bottomProductValue = bottomProduct(productProfitArray)
var zeroProfitProductValue = zeroProfitProduct(productProfitArray)

console.log(topProductValue)        // Product C
console.log(bottomProductValue)     // Product A
console.log(zeroProfitProductValue) // Product D