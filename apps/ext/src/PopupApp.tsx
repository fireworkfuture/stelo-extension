import { useCallback } from "react";
import { Nav, Text } from "uiv2";
import { Stack } from "uiv2/base/Stack";
import { app } from "./PopupApp.css";

function App() {
  const openIndex = useCallback(() => {
    chrome.tabs.create({ url: "src/index.html" });
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className={app}>
        <Stack space="20px">
          <Text weight="600" size="3x">
            Welcome to Binenet!
          </Text>
        </Stack>
        <Stack space="20px">
          <Text weight="600" size="3x" color="purple700" onClick={openIndex}>
            CLick And Open Index Page
          </Text>
        </Stack>
      </div>
    </>
  );
}

export default App;
