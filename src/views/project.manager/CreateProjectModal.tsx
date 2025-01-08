import "@mantine/core/styles.css";
import { Text, Stack, Textarea, TextInput, Group, Select } from "@mantine/core";

export default function CreateProjectModal() {
  return (
    <Stack>
      <Group justify="space-between">
        <Text>
          Name
          <Text c="red" span inherit>
            *
          </Text>
        </Text>
        <TextInput
          onChange={(e) => console.log(e.currentTarget.value)}
        ></TextInput>
      </Group>
      <Group justify="space-between">
        <Text pr="md">
          Source Language
          <Text c="red" span inherit>
            *
          </Text>
        </Text>
        <Select
          data={["Chinese", "English"]}
          w="7rem"
          searchable
          onChange={(value) => console.log(value)}
        ></Select>
      </Group>
      <Group justify="space-between">
        <Text pr="md">Target Languages</Text>
      </Group>
      <Stack>
        <Text>Project context</Text>
        <Textarea
          placeholder="Input context to enhance translation quality"
          autosize
          minRows={4}
          maxRows={8}
          onChange={(event) => console.log(event.currentTarget.value)}
        ></Textarea>
      </Stack>
    </Stack>
  );
}
