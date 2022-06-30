# Split/3

[ETHNYC](https://nyc.ethglobal.co/) hackathon project to implement the web3 version of Splitwise. This dApp uses a smart contract in order to record each transaction. Settlement transactions can then take place to reconcile everyone's debt. Furthremore, the contract balance can be used as a form of shared bank account where people may over-pay on their debts and others can take interest-free withdrawls from it.

Review our [pitch deck](https://github.com/chris13524/split3/files/9022020/Split3.pdf).

## Development

```bash
npm run dev
```

## Contracts

```bash
npm run chain
npm run deploy
```

## Deploy to Valist

```bash
npm run build
npm exec next export
# upload out/*
```
