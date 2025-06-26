import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import Topbar from "../../components/NavBar";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
`;

export default function DefaultLayout() {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainContent>
        <Topbar />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </LayoutWrapper>
  );
}
