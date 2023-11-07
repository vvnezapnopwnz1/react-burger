import { ChangeEvent, useState } from "react";

export function useForm(
  inputValues: Record<string, string> | (() => Record<string, string>)
) {
  const [values, setValues] = useState<Record<string, string>>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
