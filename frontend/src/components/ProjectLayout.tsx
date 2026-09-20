import { Button, Layout, Menu, Typography } from 'antd'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProject } from '../mockData'

const { Sider, Content, Header } = Layout
const { Text, Title } = Typography

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'requests', label: 'Обращения' },
  { key: 'fallbacks', label: 'Fallback' },
  { key: 'scenarios', label: 'Сценарии' },
  { key: 'import', label: 'Импорт' },
  { key: 'backlog', label: 'Backlog' },
]

function ProjectLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { projectId } = useParams()
  const project = getProject(projectId)

  if (!project || !projectId) {
    return <Navigate to="/projects" replace />
  }

  const currentSection = location.pathname.split('/').at(-1) || 'dashboard'

  return (
    <Layout className="app-shell">
      <Sider width={200} breakpoint="md" collapsedWidth={0}>
        <Title level={4} className="logo">BotInsight</Title>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[currentSection]}
          onClick={({ key }) => navigate(`/projects/${projectId}/${key}`)}
        />
      </Sider>

      <Layout>
        <Header className="app-header">
          <Text strong>BotInsight / {project.name}</Text>
          <Button onClick={() => navigate('/projects')}>Проекты</Button>
        </Header>

        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default ProjectLayout
