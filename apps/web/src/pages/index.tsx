import { QuickToolbar } from "../components/toolbar";
import { MagnetEditor } from "../components/magnet-editor";
import { trpc } from "../utils/trpc";
import { Header } from "../components/header";
import { StageComponent } from "../components/stage";

export function IndexPage() {
  const { data } = trpc.me.useQuery();

  return (
    <div>
      <div className="container">
        <Header />
        <MagnetEditor />
      </div>
      <StageComponent />
    </div>
  );
}
