import { useCallback, useEffect, useState } from "react";
import { Nav, Text } from "uiv2";
import { Container } from "uiv2/base/Container";
import { Stack } from "uiv2/base/Stack";
import { themeVars } from "uiv2/css/themeContract.css";
import { app, container } from "./SteloHome.css";
import { sendRequest, decisionStream } from "./shared/messages";

function App() {
  const [result, setResult] = useState("");
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
  return (
    <>
      <Nav></Nav>

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
          {/* <Link href="https://approvals.xyz" className={noUnderline}>
            <Container className={container}>
              <Stack alignItems="flex-start">
                <Text color={themeVars.color["gray900"]} weight="600" size="2x">
                  Open approvals are risky.
                </Text>
                <Text>
                  Visit{" "}
                  <InlineLink href="https://approvals.xyz">
                    approvals.xyz
                  </InlineLink>{" "}
                  to learn more
                </Text>
              </Stack>
              <ArrowSquareOut />
            </Container>
          </Link> */}
        </Stack>
      </div>
    </>
  );
}

export default App;
