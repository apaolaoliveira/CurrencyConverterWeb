class CurrencyConverter {
  apiRequest = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`

  fromCurrency = document.querySelector('#from');
  toCurrency = document.querySelector('#to');
  amount = document.querySelector('#amount');

  btnConvert = document.querySelector('#convert');
  result = document.querySelector('#result');

  constructor(){
    this.addDropdown();

    // default 
    this.fromCurrency.value = 'USD';
    this.toCurrency.value = 'BRL';
    this.result.innerText = this.ConvertCurrencies(this.amount.value);

    this.btnConvert.addEventListener('click', () => this.ConvertCurrencies(this.amount.value));
  }

  addDropdown() {
    for (const currency in countryList) {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      this.fromCurrency.add(option.cloneNode(true));
      this.toCurrency.add(option);
    }
  }

  ConvertCurrencies(amount) {
    if(amount === '' || amount === '0') {
      this.amount.value = '1';
      amount = '1';
    }

    fetch(`${this.apiRequest}${this.fromCurrency.value}`)
      .then((res) => res.json())
      .then((data) => {
        let exchangeRate = data.conversion_rates[this.toCurrency.value];
        let conversion = Math.floor(Number(amount) * exchangeRate * 100) / 100;

        let userLocale = navigator.language;
        let formattedAmount = new Intl.NumberFormat(userLocale, { style: 'currency', currency: this.fromCurrency.value }).format(amount);
        let formattedConversion = new Intl.NumberFormat(userLocale, { style: 'currency', currency: this.toCurrency.value }).format(conversion);

        this.result.innerText = `${formattedAmount} = ${formattedConversion}`;
      });
  }
}

window.addEventListener('DOMContentLoaded', () => new CurrencyConverter());