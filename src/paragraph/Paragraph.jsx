import React, { useEffect } from "react";
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
import useParagraphStore from "./ParagraphStore";
import { getAllModels } from "../agent/AgentApi";

export default function Paragraph() {
  useEffect(() => {
    async function getModels() {
      const models = await getAllModels();
      useParagraphStore.setState({ availableModels: models });
    }
    getModels();
  }, []);

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
              <Select
                data={useParagraphStore((state) => state.availableModels)}
                value={useParagraphStore((state) => state.model)}
                onChange={useParagraphStore((state) => state.setModel)}
              ></Select>
            </Group>
            <Group justify="space-between">
              <Text pr="md">Languages</Text>
              <Group>
                <Select
                  data={["English", "Spanish"]}
                  w="7rem"
                  searchable
                  value={useParagraphStore((state) => state.fromLanguage)}
                  onChange={useParagraphStore((state) => state.setFromLanguage)}
                ></Select>
                <Text>to</Text>
                <Select
                  data={["English", "Spanish"]}
                  w="7rem"
                  searchable
                  value={useParagraphStore((state) => state.toLanguage)}
                  onChange={useParagraphStore((state) => state.setToLanguage)}
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
                value={useParagraphStore((state) => state.context)}
                onChange={useParagraphStore((state) => state.setContext)}
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
            <Button
              className={classes["translate-button"]}
              loading={useParagraphStore((state) => state.isTranslating)}
              onClick={useParagraphStore((state) => state.startTranslation)}
            >
              Translate
            </Button>
            <Box pos="relative">
              <LoadingOverlay
                visible={useParagraphStore(
                  (state) => state.isTranslating && state.translatedText === ""
                )}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ type: "dots" }}
              />
              <Textarea
                variant="filled"
                placeholder="Translated text"
                disabled
                autosize
                minRows={10}
                value={useParagraphStore((state) => state.translatedText)}
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
