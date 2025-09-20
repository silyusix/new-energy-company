import React, { useState, useEffect } from 'react';
import { Layout, Spin, Typography, Table } from 'antd';
import { fetchCompanies } from '../services/api';
import SearchBar from '../components/SearchBar.jsx';

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(false); // No longer loading from API
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Data is now fetched directly from api.js, no need for async load here
    const loadInitialData = async () => {
      setLoading(true);
      const data = await fetchCompanies(''); // Fetch all data initially
      setAllCompanies(data);
      setLoading(false);
    };
    loadInitialData();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const filterCompanies = async () => {
      setLoading(true);
      const data = await fetchCompanies(searchTerm);
      setAllCompanies(data);
      setLoading(false);
    };
    filterCompanies();
  }, [searchTerm]);

  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to page 1 on new search
    setSearchTerm(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      sorter: (a, b) => a.industry.localeCompare(b.industry),
    },
    {
      title: '招聘主页',
      dataIndex: 'jobPageUrl',
      key: 'jobPageUrl',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">访问官网</a>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px', margin: 0 }}>川渝新能源招聘信息导航</Title>
      </Header>
      <Content style={{ padding: '20px', maxWidth: '1200px', margin: '60px auto', width: '100%' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: 8 }}>
          {currentPage === 1 && <SearchBar onSearch={handleSearch} />}
          <Table
            style={{ marginTop: 20 }}
            columns={columns}
            dataSource={allCompanies}
            loading={loading}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: 15,
              showSizeChanger: false,
              onChange: handlePageChange,
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;