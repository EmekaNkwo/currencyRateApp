const axios = require("axios")

exports.getCurrencyRate = async (base, currency) => {
    const currencies = currency.split(",");

    const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&rates=${currencies}`);
    const responseData = response.data;
    
    try{
        let holder = [];

        currencies.forEach(element => {
            holder.push({[`${element}`]:[`${responseData.rates[element]}`]});
        });
        
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        let results = {
            result: {
                base,
                date: formattedDate,
                rates: holder.reduce(function(result, item) {
                    var key = Object.keys(item)[0];
                    result[key] = Number(item[key]) || "";
                    return result;
                }, {})
            }
        }
        return results;
    } catch( error ) {
        console.error("error occurred", error)
        return null;
    }
}

