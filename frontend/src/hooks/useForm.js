import { useState } from "react";

export default function useForm(inputValues = {}) {
  const [formValues, setFormValues] = useState(inputValues);

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return { formValues, setFormValues, handleInputChange };
}
