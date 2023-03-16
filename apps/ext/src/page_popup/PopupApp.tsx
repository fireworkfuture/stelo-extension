import { useCallback } from "react";
import { Text } from "uiv2";
import { Stack } from "uiv2/base/Stack";
import Platform from "../worker/Platform";
import { app } from "./PopupApp.css";

function App() {
  const openIndex = useCallback(() => {
    Platform.openTab({ url: "src/index.html" });
  }, []);

  return (
    <div className={app}>
      <Stack space="20px">
        <Text weight="600" size="2x">
          Welcome to Binenet!
        </Text>
      </Stack>
      <Stack space="20px" style={{ marginTop: "10px", cursor: "pointer" }}>
        <Text weight="600" size="2x" color="purple700" onClick={openIndex}>
          Open The Index Page
        </Text>
      </Stack>
    </div>
  );
}

export default App;
