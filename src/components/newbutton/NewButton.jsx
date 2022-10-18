import { Button } from "@material-ui/core";

function NewButton({
  variant,
  size,
  color,
  type = "",
  value = "",
  onClick = () => {},
}) {
  return (
    <>
      <Button
        size={size}
        color={color}
        type={type}
        variant={variant}
        onClick={onClick}
      >
        {value}
      </Button>
    </>
  );
}

export default NewButton;
