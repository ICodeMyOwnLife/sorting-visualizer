import React from "react";
import clsx from "clsx";
import SortingBoard from "components/SortingBoard";
import { algorithms, useAlgorithmSelect, useDataInput } from "./utils";
import classes from "./styles.module.scss";
import Button from "ui/Button";

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
          key={dataKey}
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
            <Button
              className={clsx(classes.randomButton, classes.button)}
              onClick={generateRandom}
            >
              Generate Random
            </Button>
          </div>

          <div className={classes.textGroup}>
            <textarea
              className={classes.textarea}
              name="dataText"
              rows={6}
              value={dataText}
              onChange={handleChangeDataText}
            ></textarea>
            <Button
              className={clsx(classes.textButton, classes.button)}
              onClick={generateFromText}
            >
              Use
            </Button>
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
