import { Text } from "@chakra-ui/react";
import { TextErrorProps } from "../../interface/interface";

const TextError = (props: TextErrorProps) => {
  return <Text color={"red.500"}>{props.children}</Text>;
};

export default TextError;
