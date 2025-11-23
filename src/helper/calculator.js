export const oddsCalculator = (obj) => {
  const {
    startingMoney,
    target,
    drawdown,
    oddsArray,
    betAmount,
    oddsWin,
    sample,
    numberOfRounds,
    account = 'test',
  } = obj;

  const result = [];

  for (let i = 0; i < numberOfRounds; i++) {
    let money = startingMoney;
    let isWin = false;
    const allTrade = [];

    for (let i = 0; i < sample; i++) {
      const random = Math.floor(Math.random() * 10) + 1;
      isWin = random <= oddsWin * 10 ? true : false;

      if (isWin) {
        money = money + oddsArray[1] * betAmount;
        allTrade.push({ money, isWin });
      } else {
        money = money - oddsArray[0] * betAmount;
        allTrade.push({ money, isWin });
        if (money <= drawdown) {
          money = 'FAIL';
          break;
        }
      }
    }

    if (account === 'live') {
      //   result.push(money);
      result.push(allTrade);
    } else {
      const moneyToPush =
        money >= target ? 'PASS' : money <= drawdown ? 'FAIL' : money;
      //   result.push(moneyToPush);
      result.push(allTrade);
    }
  }

  return result;
};

export const addMoreTrades = (obj) => {
  const {
    startingMoney,
    target,
    drawdown,
    oddsArray,
    betAmount,
    oddsWin,
    sample,
    numberOfRounds,
    prevResult,
    tradesToAdd,
  } = obj;

  const result = prevResult || [];

  for (let i = 0; i < numberOfRounds; i++) {
    let sample = [...result[i]];
    let isWin = false;

    const random = Math.floor(Math.random() * 10) + 1;
    isWin = random <= oddsWin * 10 ? true : false;

    if (isWin) {
      sample.push({
        money: sample[sample.length - 1].money + oddsArray[1] * betAmount,
        isWin,
      });
    } else {
      sample.push({
        money: sample[sample.length - 1].money - oddsArray[0] * betAmount,
        isWin,
      });
      // if (money <= drawdown) {
      //   money = 'FAIL';
      //   break;
      // }
    }
    result[i] = [...sample];
  }

  return [...result];
};
