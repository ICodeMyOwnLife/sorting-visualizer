import React, { FC, memo, ReactElement } from "react";
import classes from "./styles.module.scss";

export const SpinComponent: FC<SpinProps> = ({
  children,
  loading,
  size = 32
}) =>
  loading ? (
    <div className={classes.wrapper}>
      {children}
      <div className={classes.backdrop}>
        <div
          className={classes.spinner}
          style={{ width: size, height: size }}
        ></div>
      </div>
    </div>
  ) : (
    children
  );

const Spin = memo(SpinComponent);
Spin.displayName = "Spin";
export default Spin;

export interface SpinProps {
  children: ReactElement;
  loading?: boolean;
  size?: number;
}
