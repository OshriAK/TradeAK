import { useState } from 'react';
import { addMoreTrades, oddsCalculator } from '../helper/calculator';
import classes from './SimulationPage.module.css';

const SimulationPage = () => {
  const [result, setResult] = useState([]);
  const [test, setTest] = useState({
    startingMoney: 0,
    target: 1500,
    drawdown: -1500,
    oddsArray: [1, 2],
    betAmount: 200,
    oddsWin: 0.4,
    sample: 1,
    numberOfRounds: 1,
    account: 'live',
    tradesToAdd: 1,
  });

  // const test = {
  //   startingMoney: 0,
  //   target: 1500,
  //   drawdown: -1500,
  //   oddsArray: [1, 2],
  //   betAmount: 200,
  //   oddsWin: 0.45,
  //   sample: 1,
  //   numberOfRounds: 1,
  //   account: 'live',
  //   tradesToAdd: 1,
  // };

  const resultHandler = () => {
    setResult(oddsCalculator(test));
  };

  const addTradesHandler = (numberOfTradesToAdd) => {
    test.prevResult = result;
    test.tradesToAdd = numberOfTradesToAdd;
    setResult([...addMoreTrades(test)]);
  };

  const countPass = result.reduce((count, item) => {
    return item === 'PASS' ? count + 1 : count;
  }, 0);

  const countFail = result.reduce((count, item) => {
    return item === 'FAIL' ? count + 1 : count;
  }, 0);

  return (
    <div className={classes.main}>
      <div className={classes.inputs_container}>
        <div className={classes.input_container}>
          <label>startingMoney</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, startingMoney: e.target.value }))
            }
            value={test.startingMoney}
          />
        </div>
        <div className={classes.input_container}>
          <label>target</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, target: e.target.value }))
            }
            value={test.target}
          />
        </div>
        <div className={classes.input_container}>
          <label>drawdown</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, drawdown: e.target.value }))
            }
            value={test.drawdown}
          />
        </div>
        <div className={classes.input_container}>
          <label>betAmount</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, betAmount: e.target.value }))
            }
            value={test.betAmount}
          />
        </div>
        <div className={classes.input_container}>
          <label>oddsWin</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, oddsWin: e.target.value }))
            }
            value={test.oddsWin}
          />
        </div>
        <div className={classes.input_container}>
          <label>sample</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, sample: e.target.value }))
            }
            value={test.sample}
          />
        </div>
        <div className={classes.input_container}>
          <label>numberOfRounds</label>
          <input
            onChange={(e) =>
              setTest((prev) => ({ ...prev, numberOfRounds: e.target.value }))
            }
            value={test.numberOfRoundsit }
          />
        </div>
      </div>
      <div>
        <button onClick={resultHandler}>Generate</button>
        <button onClick={() => addTradesHandler(1)}>add</button>
      </div>
      {test.account !== 'live' && <span>number of pass: {countPass} </span>}
      {result.length > 0 && (
        <div className={classes.description_container}>
          <span>number of fail: {countFail} </span>
          <span>not finish: {test.numberOfRounds - countFail - countPass}</span>
        </div>
      )}

      {test.account !== 'live' && (
        <span>
          Success: {Number(100 - (countFail / countPass) * 100).toFixed(2)}%{' '}
        </span>
      )}

      {result.map((array, index) => (
        <span
          key={index}
          style={{ border: '1px solid', padding: '4px' }}
          //   style={{
          //     color: `${
          //       item >= test.startingMoney || item === 'PASS' ? 'green' : 'red'
          //     }`,
          //   }}
        >
          {array.map((trade, index) => (
            <span
              key={index}
              style={{
                color: trade.isWin ? 'green' : 'red',
              }}
            >
              {/* {trade.isWin ? 'win' : 'lose'} */}
              <span
                style={{
                  color: trade.money >= 0 ? 'green' : 'red',
                }}
              >
                {trade.money}
              </span>
              {'  '}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default SimulationPage;
