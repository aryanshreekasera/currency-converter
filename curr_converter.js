// Getting our required elements
const amount = document.getElementById("amount");
const from_flag = document.getElementById("from_flag");
const to_flag = document.getElementById("to_flag");
let from_country = document.getElementById("from");
const to_country = document.getElementById("to");
const convert = document.getElementById("convert");
const converted_amt = document.querySelector(".value");

// Now lets write the logic for currency converter

amount.value = 1;

for (let code in countryList) {
    let option = document.createElement("option");
    option.setAttribute("value", code);
    option.innerText = code;
    from_country.append(option);
    if (code === "USD") {
        from_country.value = code;
    }
}
for (let code in countryList) {
    let option = document.createElement("option");
    option.setAttribute("value", code);
    option.innerText = code;
    to_country.append(option);
    if (code === "INR") {
        to_country.value = code;
    }
}
from_flag.setAttribute(
    "src",
    `https://flagicons.lipis.dev/flags/4x3/${countryList[from_country.value].toLowerCase()}.svg`
);

to_flag.setAttribute(
    "src",
    `https://flagicons.lipis.dev/flags/4x3/${countryList[to_country.value].toLowerCase()}.svg`
);

async function convert_currency(from_curr, to_curr) {
    let response = await fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${from_curr.toLowerCase()}.json`
    );
    let to_object = await response.json();
    converted_amt.innerText = `${amount.value} ${from_curr} = ${parseFloat(
        (
            to_object[from_curr.toLowerCase()][to_curr.toLowerCase()] *
            amount.value
        ).toFixed(2)
    )} ${to_curr}`;
}

convert_currency(from_country.value, to_country.value);

convert.addEventListener("click", () => {
    if (amount.value == "") {
        alert("Please Enter some amount first");
    } else {
        convert_currency(from_country.value, to_country.value);
    }
});
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