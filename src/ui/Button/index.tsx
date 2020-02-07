import React, { FC, memo, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export const ButtonComponent: FC<ButtonProps> = ({ className, ...props }) => (
  <button {...props} className={clsx(className, classes.button)} />
);

const Button = memo(ButtonComponent);
Button.displayName = "Button";
export default Button;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
