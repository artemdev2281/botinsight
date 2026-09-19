import './App.css'
import DashboardPage from './pages/DashboardPage'
import BacklogPage from './pages/BacklogPage'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Sider, Content, Header } = Layout

const menuItems = [
  {
    key: '/dashboard',
    label: 'Dashboard',
  },
  {
    key: '/backlog',
    label: 'Backlog',
  },
]

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu 
          theme='dark'
          items={menuItems}
          selectedKeys={[location.pathname]}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>

      <Layout>
        <Header>
          <strong style={{ color: 'white' }}>BotInsight</strong>
        </Header>

        <Content>
          <Routes>
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
            <Route
              path="/backlog"
              element={<BacklogPage />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
