import { render } from "solid-js/web";
import { OpenLayerView } from "./view/OpenLayerView";
import { SourceView } from "./view/SourceView";
import { OpenCVView } from "./view/OpenCVView";

function App() {
  return (
    <>
      <SourceView />
      <OpenCVView />
      <OpenLayerView />
    </>
  );
}

render(() => <App />, document.getElementById("app")!);
