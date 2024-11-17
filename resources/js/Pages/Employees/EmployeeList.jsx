import { useState } from 'react';
import { useRoute } from '@ziggy';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeInfo from './EmployeeInfo';
import { FloatButton as Btn, Empty, Input, Pagination, Table, Tag, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const FloatButton = styled(Btn)`
    background-color: #f0c519 !important;
    color: #fff !important;
    width: 60px;
    height: 60px;
    font-size: 24px;
    position: fixed;
    bottom: 100px;
    right: 100px;
`;

const ITEMS_PER_PAGE = 5;

export default function EmployeeList({ employees, auth }) {
    const route = useRoute();
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const showDrawer = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const activeEmployees = employees.filter((employee) => !employee.termination_date);

    // Filter employees based on search term
    const filteredEmployees = activeEmployees.filter((employee) => {
        const fullName =
            `${employee.first_name} ${employee.middle_name} ${employee.last_name}`.toLowerCase();
        const position = employee.position.toLowerCase();
        const searchQuery = searchTerm.toLowerCase();

        // Apply search filtering
        return fullName.includes(searchQuery) || position.includes(searchQuery);
    });

    // Calculate paginated employees
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Table columns
    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
            key: 'employee_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, employee) => (
                <span>
                    {employee.first_name} {employee.middle_name} {employee.last_name}
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, employee) => {
                const status = employee.termination_date ? 'Inactive' : 'Active';

                return (
                    <Tag
                        color={status === 'Active' ? 'green' : 'volcano'}
                        style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        {status}
                    </Tag>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="border-b pb-6">
                <header className="flex justify-center text-xl font-bold">Employees List</header>
            </div>

            {/* Add Button */}
            <FloatButton
                onClick={() => (window.location.href = route('employees.create'))}
                tooltip="Add Employee"
                icon={<PlusOutlined />}
            />

            <div className="m-4 my-10">
                <div className="mb-5 flex justify-between">
                    {/* Pagination */}
                    <Pagination
                        current={currentPage}
                        pageSize={ITEMS_PER_PAGE}
                        total={filteredEmployees.length}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                    <div className="flex items-center gap-5">
                        {/* Search Bar */}
                        <Input
                            placeholder="Search employees"
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ maxWidth: 300 }}
                        />
                        <Button
                            type="primary"
                            onClick={() => Inertia.visit(route('users.unassigned'))}
                        >
                            Request
                        </Button>
                    </div>
                </div>

                {/* Table for employees */}
                <Table
                    columns={columns}
                    dataSource={paginatedEmployees.map((employee) => ({
                        ...employee,
                        key: employee.id,
                        name: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
                    }))}
                    pagination={false}
                    locale={{ emptyText: <Empty description="No active employees available" /> }}
                    onRow={(employee) => ({
                        onClick: () => showDrawer(employee),
                    })}
                />
            </div>

            {/* Sidebar for Employee Info */}
            <EmployeeInfo visible={open} onClose={onClose} employee={selectedEmployee} />
        </AuthenticatedLayout>
    );
}
