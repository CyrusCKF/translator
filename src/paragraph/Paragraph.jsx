import React from "react";
import "@mantine/core/styles.css";
import {
  Text,
  Stack,
  Textarea,
  TextInput,
  Group,
  Select,
  Button,
  Grid,
  Center,
  LoadingOverlay,
  Box,
  ActionIcon,
  Tooltip,
} from "@mantine/core";

import classes from "./Paragraph.module.css";
import { IconClipboard, IconCopy, IconPlaylistX } from "@tabler/icons-react";

export default function Paragraph() {
  return (
    <Stack>
      <Text size="xl" fw={700}>
        PARAGRAPH
      </Text>
      <Grid align="stretch">
        <Grid.Col span={4}>
          <Stack>
            <Group justify="space-between">
              <Text>Model</Text>
              <Select data={["llama3:latest"]}></Select>
            </Group>
            <Group justify="space-between">
              <Text pr="md">Languages</Text>
              <Group>
                <Select
                  data={["English", "Spanish"]}
                  w="7rem"
                  searchable
                ></Select>
                <Text>to</Text>
                <Select
                  data={["English", "Spanish"]}
                  w="7rem"
                  searchable
                ></Select>
              </Group>
            </Group>
            <Stack>
              <Text>Context</Text>
              <Textarea
                placeholder="Input context to enhance translation quality"
                autosize
                minRows={4}
                maxRows={8}
              ></Textarea>
            </Stack>
            <Stack>
              <Text>Examples</Text>
              <div>
                <Text size="sm" pb="xs">
                  Pair 1
                </Text>
                <TextInput
                  classNames={{
                    input: classes["input-top"],
                  }}
                ></TextInput>
                <TextInput
                  classNames={{
                    input: classes["input-bottom"],
                  }}
                ></TextInput>
              </div>
            </Stack>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <Center h="100%">
            <Box className={classes["vertical-divider"]}></Box>
          </Center>
        </Grid.Col>
        <Grid.Col span={5}>
          <Stack>
            <Box pos="relative">
              <Textarea
                placeholder="Original text"
                autosize
                minRows={10}
              ></Textarea>
              <Group gap="xs" className={classes["bottom-right-actions"]}>
                <Tooltip label="Paste from clipboard">
                  <ActionIcon variant="subtle">
                    <IconClipboard
                      className={classes["action-icon"]}
                    ></IconClipboard>
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Remove all text">
                  <ActionIcon variant="subtle">
                    <IconPlaylistX
                      className={classes["action-icon"]}
                    ></IconPlaylistX>
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
            <Button loading={true} mt="lg" mb="lg">
              Translate
            </Button>
            <Box pos="relative">
              <LoadingOverlay
                visible={true}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ type: "dots" }}
              />
              <Textarea
                variant="filled"
                placeholder="Translated text"
                disabled
                autosize
                minRows={10}
              ></Textarea>
              <Box className={classes["bottom-right-actions"]}>
                <Tooltip label="Copy to clipboard">
                  <ActionIcon variant="subtle">
                    <IconCopy className={classes["action-icon"]}></IconCopy>
                  </ActionIcon>
                </Tooltip>
              </Box>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
