"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

export type SearchInputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  debounceMs?: number;
  onChange?: (value: string) => void;
  onChangeDebounced?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  ariaLabel?: string;
  autoFocus?: boolean;
};

export default function SearchInput({
  value,
  defaultValue = '',
  placeholder = 'Search',
  debounceMs = 250,
  onChange,
  onChangeDebounced,
  className = '',
  inputClassName = '',
  ariaLabel = 'Search',
  autoFocus = false,
}: SearchInputProps) {
  const isControlled = typeof value === 'string';
  const [internal, setInternal] = useState<string>(defaultValue);
  const v = isControlled ? (value as string) : internal;
  const timer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
    if (timer.current) window.clearTimeout(timer.current);
    if (onChangeDebounced) {
      timer.current = window.setTimeout(() => onChangeDebounced(next), debounceMs);
    }
  };

  const onClear = () => {
    if (!isControlled) setInternal('');
    onChange?.('');
    if (onChangeDebounced) onChangeDebounced('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search aria-hidden className="w-4 h-4 text-purple-300" />
      </span>
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={v}
        onChange={onChangeHandler}
        className={`block h-10 w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-purple-300/70 pr-8 ${inputClassName}`}
        style={{ paddingLeft: '2.25rem' }}
      />
      {v?.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-purple-200 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
