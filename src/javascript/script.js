class CurrencyConverter {
  apiExchangeRate = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
  apiFlags = 'https://flagsapi.com/';

  currenciesSelects = document.querySelectorAll('select');	
  fromCurrency = document.querySelector('#from');
  toCurrency = document.querySelector('#to');
  amount = document.querySelector('#amount');

  btnConvert = document.querySelector('#convert');
  result = document.querySelector('#result');

  constructor(){
    this.countriesDropdown();
    this.defaultValues();    
    this.addEventListeners();
  }

  countriesDropdown() {
    for (const currency in countryList) {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      this.fromCurrency.add(option.cloneNode(true));
      this.toCurrency.add(option);
    }
  }

  defaultValues(){
    this.fromCurrency.value = 'USD';
    this.toCurrency.value = 'BRL';
    this.result.innerText = this.convertCurrencies(this.amount.value);
  }

  addEventListeners(){
    this.btnConvert.addEventListener('click', () => {
      this.convertCurrencies(this.amount.value);
    });

    this.currenciesSelects.forEach(select => {
      select.addEventListener('change', e => this.loadFlag(e.target));
    });
  }

  convertCurrencies(amount) {
    if(amount === '' || amount === '0') {
      this.amount.value = '1';
      amount = '1';
    }

    fetch(`${this.apiExchangeRate}${this.fromCurrency.value}`)
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

  loadFlag(element) {
    console.log('entrei' + element)
    for (const code in countryList){
      if(code == element.value) {
        let imgTag = element.parentElement.querySelector('img');
        imgTag.src = `${this.apiFlags}${countryList[code]}/flat/64.png`;
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => new CurrencyConverter());