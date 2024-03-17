class CurrencyConverter {
  request = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`

  selects = document.querySelectorAll('select');
  from = document.querySelector('#from');
  to = document.querySelector('#to');

  constructor(){
    this.addDropdown();
    this.from.value = 'USD';
    this.to.value = 'BRL';
  }

  addDropdown() {
    for (const currency in countryList) {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      this.from.add(option.cloneNode(true));
      this.to.add(option);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => new CurrencyConverter());