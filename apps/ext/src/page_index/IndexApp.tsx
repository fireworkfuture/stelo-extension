import { useCallback, useEffect, useState } from "react";
import { Text } from "uiv2";
import { Container } from "uiv2/base/Container";
import { Stack } from "uiv2/base/Stack";
import { themeVars } from "uiv2/css/themeContract.css";
import { sendRequest, decisionStream } from "../shared/messages";
import Platform from "../worker/Platform";
import browser from "webextension-polyfill";
import { log } from "utils/logger";
import Switch from "@mui/material/Switch";
import { app, container } from "./IndexApp.css";

function App() {
  const [list, setList] = useState<browser.Management.ExtensionInfo[]>([]);

  const [result, setResult] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      Platform.setEnable(id, event.target.checked);
    } catch (error) {
      log(error);
    }
  };
  // test demo
  const openTansitionPopup = useCallback(() => {
    const detail = {
      rpcRequestId: "c1af4b41-f6dd-492e-9e96-79dc0e7daeb6",
      method: "eth_sendTransaction",
      params: [
        {
          gas: "0x5208",
          gasPrice: "0x0",
          from: "0x7c9b00eb076db5d3f3b0d5e2b30deefca9ad6a0d",
          to: "0x029559467c12ac8173c387da6e4c66e4a6c8af61",
        },
      ],
      userAddress: "0x7c9b00eb076db5d3f3b0d5e2b30deefca9ad6a0d",
    };
    sendRequest(detail);
  }, []);

  useEffect(() => {
    decisionStream.subscribe(async (data) => {
      setResult(data[0].approval ? "Continue" : "reject");
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Platform.getAllExtensions()
        .then((list) => {
          setList(() => list);
        })
        .catch((err) => {
          log(err);
        });
    }, 3000);
  }, []);

  return (
    <div className={app}>
      <Stack space="20px">
        <Text weight="600" size="3x">
          Welcome to Binenet!
        </Text>
        <Container className={container}>
          <Stack alignItems="flex-start">
            <Text color={themeVars.color["gray900"]} weight="600" size="2x">
              Send a transaction to get started.
            </Text>
            <Text onClick={openTansitionPopup} color="purple700">
              Click To Open Tansition Popup
            </Text>
            <h2 style={{ color: "green" }}>Result: {result}</h2>
          </Stack>
        </Container>
        {list.map((item) => (
          <Container className={container} key={item.id}>
            <Stack alignItems="flex-start">
              <Text color="purple700" weight="600" size="2x">
                {item.name}
              </Text>
              <Text color={themeVars.color["gray900"]}>{item.description}</Text>
            </Stack>
            <Switch
              defaultChecked={item.enabled}
              onChange={(event) => {
                handleChange(event, item.id);
              }}
            />
          </Container>
        ))}
      </Stack>
    </div>
  );
}

export default App;
