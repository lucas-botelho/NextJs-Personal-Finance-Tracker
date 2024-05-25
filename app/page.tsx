import SideNav from "./components/navigation/sideNav";
import Topbar from "./components/layout/topbar";
import MainContainer from "./components/layout/mainContainer";

export default function Home() {

  return (
    <>
      <div className="header-container">
        <Topbar />
      </div>
      <div className="main-container">
        <SideNav />
        <MainContainer>
          <div className="flex flex-col">
            <p className="text-lg">This is a simple layout with a topbar, sidebar, and main container.</p>
          </div>
        </MainContainer>
      </div>

    </>);
}
