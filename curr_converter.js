// Getting our required elements
const amount = document.getElementById("amount");
const from_flag = document.getElementById("from_flag");
const to_flag = document.getElementById("to_flag");
let from_country = document.getElementById("from");
const to_country = document.getElementById("to");
const convert = document.getElementById("convert");
const converted_amt = document.querySelector(".value");

// Now lets write the logic for currency converter

// Setting the default amount value to 1
amount.value = 1;

// creating options of from_currency
for (let code in countryList) {
    let option = document.createElement("option");
    option.setAttribute("value", code);
    option.innerText = code;
    from_country.append(option);
    // setting default from currency to USD
    if (code === "USD") {
        from_country.value = code;
    }
}
// creating options of to currency
for (let code in countryList) {
    let option = document.createElement("option");
    option.setAttribute("value", code);
    option.innerText = code;
    to_country.append(option);
    // setting the default value of to currency to INR
    if (code === "INR") {
        to_country.value = code;
    }
}
// setting default from flag image
from_flag.setAttribute(
    "src",
    `https://flagicons.lipis.dev/flags/4x3/${countryList[from_country.value].toLowerCase()}.svg`
);
// setting default to flag image
to_flag.setAttribute(
    "src",
    `https://flagicons.lipis.dev/flags/4x3/${countryList[to_country.value].toLowerCase()}.svg`
);
// function to convert currency which takes from currency and to currency as input
async function convert_currency(from_curr, to_curr) {
    let response = await fetch( // fetching the API (it gives the value of 1{from_currency} for all the currencies)
        `https://latest.currency-api.pages.dev/v1/currencies/${from_curr.toLowerCase()}.json`
    );
    let to_object = await response.json(); // converting the response into a JS object
    // Showing the value of to currency for the the given amount of for currency
    converted_amt.innerText = `${amount.value} ${from_curr} = ${parseFloat(
        (
            to_object[from_curr.toLowerCase()][to_curr.toLowerCase()] *
            amount.value
        ).toFixed(2)
    )} ${to_curr}`;
}
// running the function defaulty for 1 USD to convert into INR
convert_currency(from_country.value, to_country.value);
// adding an event listener to convert button
convert.addEventListener("click", () => {
    if (amount.value == "") {
        alert("Please Enter some amount first");
    } else {
        convert_currency(from_country.value, to_country.value);
    }
});
// adding an event listener to do something when the value of select changes
from_country.addEventListener("change", () => {
    from_flag.setAttribute(
        "src",
        `https://flagicons.lipis.dev/flags/4x3/${countryList[from_country.value].toLowerCase()}.svg`
    );
});
to_country.addEventListener("change", () => {
    to_flag.setAttribute(
        "src",
        `https://flagicons.lipis.dev/flags/4x3/${countryList[to_country.value].toLowerCase()}.svg`
    );
    convert.innerText = `Convert your amount into ${to_country.value}`;
});
