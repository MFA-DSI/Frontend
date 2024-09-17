import {Button} from "antd";

export const ExportButton = ({type, icon, style, text, handle}) => {
  return (
    <Button type={type} icon={icon} style={style} onClick={handle}>
      {text}
    </Button>
  );
};
