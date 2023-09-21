import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Field, FieldProps } from 'formik';


interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  name: string;
}

export function CheckboxGroup ({ options, name }: CheckboxGroupProps) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value?.includes(option.value)}
                    onChange={() => {
                      const isChecked = field.value?.includes(option.value);
                      const updatedValues = isChecked
                        ? field.value.filter((val:string) => val !== option.value)
                        : [...field.value, option.value];
                      form.setFieldValue(name, updatedValues);
                    }}
                    name={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </Field>
  );
};

export default CheckboxGroup;
