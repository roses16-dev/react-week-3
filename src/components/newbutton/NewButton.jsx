import { Button } from "@material-ui/core";

function NewButton({ type = "", value = "", onClick = () => {} }) {
  return (
    <>
      <Button type={type} variant="text" onClick={onClick}>
        {value}
      </Button>
    </>
  );
}

export default NewButton;
