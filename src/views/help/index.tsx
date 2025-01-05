import { Anchor, Text } from "@mantine/core";

export default function Help() {
  return (
    <Text>
      Please check the online guide<br></br>
      <Anchor
        href="https://github.com/CyrusCKF/translator/blob/master/README.md"
        target="_blank"
      >
        https://github.com/CyrusCKF/translator/blob/master/README.md
      </Anchor>
    </Text>
  );
}
