import { db } from "@/services/firebase/config";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth } from "@/services/firebase/config";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [openAiKey, setOpenAiKey] = React.useState<string>("");
  const [gmailKey, setGmailKey] = React.useState<string>("");

  const keysRef = React.useRef<
    | {
        openaiKey: string;
        googleAppSpecificKey: string;
      }
    | undefined
  >();

  const [loading, setLoading] = useState<boolean>(false);

  const [show, setShow] = React.useState<{
    openaiKey: boolean;
    gmailKey: boolean;
  }>({
    openaiKey: false,
    gmailKey: false,
  });

  useEffect(() => {
    if (!auth?.currentUser?.email) return;

    const docRef = doc(db, "/user-secrets", auth.currentUser.email);

    getDoc(docRef).then((res) => {
      const { openaiKey, googleAppSpecificKey } = res.data() as any;

      setOpenAiKey(openaiKey);
      setGmailKey(googleAppSpecificKey);

      keysRef.current = {
        openaiKey,
        googleAppSpecificKey,
      };
    });
  }, []);

  function onSave() {
    if (!auth?.currentUser?.email) return;

    setLoading(true);
    const userSecretsRef = collection(db, "/user-secrets");

    setDoc(doc(userSecretsRef, auth.currentUser.email), {
      openaiKey: openAiKey,
      googleAppSpecificKey: gmailKey,
    }).then(() => {
      setLoading(false);

      keysRef.current = {
        openaiKey: openAiKey,
        googleAppSpecificKey: gmailKey,
      };
    });
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>General</Tab>
              <Tab>Gmail</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <FormControl>
                  <FormLabel>OpenAI API Key</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show.openaiKey ? "text" : "password"}
                      placeholder="Enter password"
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          setShow({
                            ...show,
                            openaiKey: !show.openaiKey,
                          });
                        }}
                      >
                        {show.openaiKey ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>
                    Get your OpenAI API key from{" "}
                    <Link
                      target="_blank"
                      href="https://platform.openai.com/account/api-keys"
                    >
                      https://platform.openai.com/account/api-keys
                    </Link>{" "}
                  </FormHelperText>
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Google App Specific Key</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show.gmailKey ? "text" : "password"}
                      placeholder="Enter password"
                      value={gmailKey}
                      onChange={(e) => setGmailKey(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          setShow({
                            ...show,
                            gmailKey: !show.gmailKey,
                          });
                        }}
                      >
                        {show.gmailKey ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>
                    Get your Google App Specific Key from{" "}
                    <Link
                      target="_blank"
                      href="https://myaccount.google.com/apppasswords"
                    >
                      https://myaccount.google.com/apppasswords
                    </Link>{" "}
                  </FormHelperText>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={onSave}
            isLoading={loading}
            loadingText="Saving"
            isDisabled={
              keysRef.current?.googleAppSpecificKey === gmailKey &&
              keysRef.current?.openaiKey === openAiKey
            }
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
