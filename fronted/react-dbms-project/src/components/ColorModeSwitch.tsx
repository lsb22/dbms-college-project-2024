import { Switch, HStack, useColorMode, Text } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack marginRight={6}>
      <Switch
        color={"green"}
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        paddingTop={1}
      />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
