import React from "react";
import { IMaskInput } from "react-imask";

const BblMaskedInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const { onChange } = props;

  return (
    <IMaskInput
      {...props}
      inputRef={ref}
      onAccept={(value: any) => {
        const unmaskedValue = value.replace(/\D/g, "");
        onChange({ target: { name: props.name, value: unmaskedValue } });
      }}
      overwrite
      definitions={{
        "#": /[1-9]/,
      }}
    />
  );
});

export default BblMaskedInput;
