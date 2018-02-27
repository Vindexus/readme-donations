const currencies = {
  nano:  {
    name: 'Nano',
    ticker: 'NANO'
  },
  usd: {
    name: 'USD',
    ticker: 'USD',
    prefix: '$'
  },
  cad: {
    name: 'CAD',
    ticker: 'CAD',
    prefix: '$'
  }
}

let brainblocksCurrencies =  'aud,brl,cad,chf,clp,cny,czk,dkk,eur,gbp,hkd,huf,idr,ils,inr,jpy,krw,mxn,myr,nok,nzd,php,pkr,pln,rub,sek,sgd,thb,try,usd,twd,zar'.split(',')

brainblocksCurrencies.forEach((key) => {
  if (!currencies[key]) {
    currencies[key] = {
      ticker: key.toUpperCase(),
      name: key.toUpperCase()
    }
  }

  currencies[key].key = key
})

module.exports = currencies