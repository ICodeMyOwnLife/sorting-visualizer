import React from 'react';
import clsx from 'clsx';
import Button from 'ui/Button';
import SortingBoard from 'components/SortingBoard';
import CodeEditor from 'components/CodeEditor';
import { algorithms, useAlgorithm, useDataInput } from './utils';
import classes from './styles.module.scss';

const App = () => {
  const {
    algorithm,
    algorithmIndex,
    handleChangeAlgorithm,
    handleChangeAlgorithmIndex,
  } = useAlgorithm();
  const {
    data,
    dataKey,
    dataText,
    generateFromText,
    generateRandom,
    handleChangeDataText,
    handleChangeLength,
    length,
  } = useDataInput();

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <SortingBoard data={data} key={dataKey} algorithm={algorithm} />

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
            />
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

          <CodeEditor
            className={classes.algorithmEditor}
            onChange={handleChangeAlgorithm}
            value={algorithm}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
