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
    betAmount: 100,
    oddsWin: 0.4,
    sample: 1,
    numberOfRounds: 1,
    account: 'live',
    tradesToAdd: 1,
  });

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
              setTest((prev) => ({
                ...prev,
                startingMoney: Number(e.target.value),
              }))
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
            value={test.numberOfRounds}
          />
        </div>
      </div>
      <div className={classes.buttons_container}>
        <button style={{ padding: '6px' }} onClick={resultHandler}>
          Generate
        </button>
        <button style={{ padding: '6px' }} onClick={() => addTradesHandler(1)}>
          Add
        </button>
      </div>
      {/* {test.account !== 'live' && <span>number of pass: {countPass} </span>}
      {result.length > 0 && (
        <div className={classes.description_container}>
          <span>number of fail: {countFail} </span>
          <span>not finish: {test.numberOfRounds - countFail - countPass}</span>
        </div>
      )} */}

      {test.account !== 'live' && (
        <span>
          Success: {Number(100 - (countFail / countPass) * 100).toFixed(2)}%{' '}
        </span>
      )}

      {result.map((array, index) => (
        <span
          key={index}
          style={{
            border: '1px solid',
            padding: '4px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '80%',
          }}
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
                  color: trade.isWin ? 'green' : 'red',
                }}
              >
                {trade.isWin ? 'W' : 'L'}
              </span>
              {'  '}
            </span>
          ))}
          <span
            style={{
              color: array[array.length - 1].money >= 0 ? 'green' : 'red',
              fontWeight: 'bold',
              fontSize: '20px',
              marginLeft: '16px',
            }}
          >
            {array[array.length - 1].money}
          </span>
        </span>
      ))}
    </div>
  );
};

export default SimulationPage;
