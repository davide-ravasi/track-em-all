import { useCallback, useMemo, useState } from 'react';

/**
 * Controlled input helpers with stable `reset` / `bind.onChange` references
 * so parent `useEffect` dependency arrays do not re-fire on every keystroke.
 */
export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => {
    setValue('');
  }, []);

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const bind = useMemo(
    () => ({
      value,
      onChange,
    }),
    [value, onChange],
  );

  return { value, setValue, reset, bind };
}
