#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

interface Currency {
    name: string;
    symbol: string;
    rate: number;
}

const currencies: { [key: string]: Currency } = {
    USD: { name: "United States Dollar", symbol: "$", rate: 1 },
    PKR: { name: "Pakistani Rupee", symbol: "Rs", rate: 180},
    EUR: { name: "Euro", symbol: "€", rate: 0.82 },
    GBP: { name: "British Pound Sterling", symbol: "£", rate: 0.71 },
    JPY: { name: "Japanese Yen", symbol: "¥", rate: 109.61 },
    CAD: { name: "Canadian Dollar", symbol: "CA$", rate: 1.27 },
    AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.30 },
    CHF: { name: "Swiss Franc", symbol: "CHF", rate: 0.89 },
    CNY: { name: "Chinese Yuan", symbol: "CN¥", rate: 6.46 },
    INR: { name: "Indian Rupee", symbol: "₹", rate: 73.13 },
    SGD: { name: "Singapore Dollar", symbol: "S$", rate: 1.35 },
};

async function convertCurrency() {
    const { fromCurrency, toCurrency, amount } = await inquirer.prompt([
        {
            name: "fromCurrency",
            type: "list",
            message: chalk.yellow("Select the currency you want to convert from:"),
            choices: Object.keys(currencies),
        },
        {
            name: "toCurrency",
            type: "list",
            message: chalk.yellow("Select the currency you want to convert to:"),
            choices: Object.keys(currencies),
        },
        {
            name: "amount",
            type: "number",
            message: chalk.yellow("Enter the amount you want to convert:"),
            validate: (input) => input > 0,
        },
    ]);

    const fromRate = currencies[fromCurrency].rate;
    const toRate = currencies[toCurrency].rate;

    const convertedAmount = (amount * toRate) / fromRate;

    console.log(chalk.green(`Converted amount: ${currencies[toCurrency].symbol}${convertedAmount.toFixed(2)}`));
}

convertCurrency();
