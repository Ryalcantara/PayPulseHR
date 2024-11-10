import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Format PHP Peso
const PhpFormat = (params) => {
    const value = parseFloat(params.value);
    if (isNaN(value)) {
        return '';
    }
    return `₱${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const GeneralPayroll = ({ auth, employee, loanTypes }) => {
    const [rowData, setRowData] = useState(employee);
    const [columnDefs, setColumnDefs] = useState([]);

    useEffect(() => {
        // Get a list of all loan types that have at least one existing loan
        const activeLoanTypes = loanTypes.filter((loanType) =>
            employee.some((emp) => emp.loans.some((loan) => loan.loan_type_id === loanType.id))
        );

        const loanTypeColumns = activeLoanTypes.map((loanType) => ({
            headerName: loanType.type,
            field: `loan_type_${loanType.id}`,
            valueFormatter: PhpFormat,
            cellRenderer: (params) => {
                const loan = params.data.loans?.find((loan) => loan.loan_type_id === loanType.id);
                if (loan) {
                    // Check if remaining amortization exists and is greater than 0
                    return loan.remainingAmortization && loan.remainingAmortization > 0
                        ? PhpFormat({ value: loan.remainingAmortization })
                        : ''; // Return empty if no remaining amortization
                }
                return ''; // If no loan, return empty
            },
        }));
        console.log(employee);

        const staticColumns = [
            { headerName: 'EMPLOYEE NO', field: 'employee_id', editable: false },
            {
                headerName: 'EMPLOYEE NAME',
                valueGetter: (params) => {
                    const { first_name, middle_name, last_name } = params.data;
                    return `${first_name || ''} ${middle_name || ''} ${last_name || ''}`.trim();
                },
                filter: 'colFilter',
            },
            {
                headerName: 'SG-STEP',
                valueGetter: (params) => {
                    const { salary_grade } = params.data;
                    return salary_grade ? `${salary_grade.grade}-${salary_grade.step}` : '';
                },
                editable: false,
            },
            { headerName: 'POSITION', field: 'position', editable: false, filter: 'colFilter' },
            {
                headerName: 'BASIC PAY',
                field: 'salary_grade.monthly_salary',
                valueFormatter: PhpFormat,
                editable: false,
            },
        ];

        setColumnDefs([...staticColumns, ...loanTypeColumns]);
    }, [loanTypes, employee]);

    // Function to handle cell value changes
    const onCellValueChanged = (params) => {
        const updatedRow = params.data;
        setRowData((prevRowData) =>
            prevRowData.map((row) =>
                row.employee_id === updatedRow.employee_id ? updatedRow : row
            )
        );
        console.log('Updated row:', updatedRow);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="ag-theme-alpine" style={{ height: 485, width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onCellValueChanged={onCellValueChanged}
                    rowHeight={24}
                    defaultColDef={{
                        resizable: true,
                    }}
                    pagination={true}
                    paginationPageSize={15}
                    paginationPageSizeSelector={[15, 20, 50, 100]} // Add 15 here
                    domLayout="normal"
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default GeneralPayroll;
