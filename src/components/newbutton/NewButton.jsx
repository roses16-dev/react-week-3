import { Button } from "@material-ui/core";

function NewButton({
  type = "button",
  value = "I am a button",
  onClick = () => {},
}) {
  return (
    <>
      <Button type={type} variant="text" onClick={onClick}>
        {value}
      </Button>
    </>
  );
}

export default NewButton;
