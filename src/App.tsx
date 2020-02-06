import React from "react";
import clsx from "clsx";
import SortingBoard from "components/SortingBoard";
import { algorithms, useAlgorithmSelect, useDataInput } from "./utils";
import classes from "./styles.module.scss";

const App = () => {
  const { algorithmIndex, handleChangeAlgorithmIndex } = useAlgorithmSelect();
  const {
    data,
    dataKey,
    dataText,
    generateFromText,
    generateRandom,
    handleChangeDataText,
    handleChangeLength,
    length
  } = useDataInput();

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <SortingBoard
          data={data}
          dataKey={dataKey}
          algorithm={algorithms[algorithmIndex].algorithm}
        />

        <div className={classes.inputs}>
          <div className={classes.randomGroup}>
            <input
              className={classes.lengthInput}
              type="number"
              name="length"
              value={length}
              onChange={handleChangeLength}
            />
            <button
              className={clsx(classes.randomButton, classes.button)}
              onClick={generateRandom}
            >
              Generate Random
            </button>
          </div>

          <div className={classes.textGroup}>
            <textarea
              className={classes.textarea}
              name="dataText"
              rows={6}
              value={dataText}
              onChange={handleChangeDataText}
            ></textarea>
            <button
              className={clsx(classes.textButton, classes.button)}
              onClick={generateFromText}
            >
              Use
            </button>
          </div>

          <select
            className={classes.algorithmSelect}
            name="algorithm"
            onChange={handleChangeAlgorithmIndex}
            value={algorithmIndex}
          >
            {algorithms.map(({ name }, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
