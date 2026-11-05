import React, { type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => (
  <input
    className="w-full bg-input-bg border border-border-subtle rounded-xl py-[14px] px-4 text-text-main text-base transition-all duration-300 focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-glow)] focus:bg-input-bg-focus placeholder:text-text-muted"
    {...props}
  />
);
