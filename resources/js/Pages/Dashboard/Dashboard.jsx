import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Expenses',
                data: chartData.data,
                backgroundColor: '#741D20',
                borderColor: '#5F1415',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        // <div style={{ width: '100%', height: '500px' }}>
        <div className="h-[500px] w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

ChartComponent.propTypes = {
    chartData: PropTypes.shape({
        labels: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
    }).isRequired,
};

const FundCluster = ({ fundClusters = [] }) => {
    return (
        <div className="rounded-md border p-3 shadow">
            <h2 className="mb-3 font-bold">Balance Accounts</h2>

            <div className="flex w-full justify-between gap-5">
                {fundClusters.length === 0 ? (
                    <div>No data available</div>
                ) : (
                    fundClusters.map((cluster) => (
                        <div
                            key={cluster.id}
                            className="flex w-full flex-col rounded-md border bg-gray-100 p-2"
                        >
                            Total Balance
                            <strong className="text-xl font-bold">
                                ₱{cluster.amount.toLocaleString()}
                            </strong>
                            <span>Cluster {cluster.cluster_code}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

FundCluster.propTypes = {
    fundClusters: PropTypes.array,
};

const Dashboard = ({ auth, totalAmount }) => {
    const { chartData, fundClusters } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <div className="flex flex-col">
                    <div className="mb-10">
                        <FundCluster fundClusters={fundClusters} />
                    </div>
                    <div className="w-full rounded-md border p-2">
                        <ChartComponent chartData={chartData} />
                    </div>
                    {/* <div className="mt-5">
                        <h3 className="text-xl font-bold">
                            Total Expenses: ₱{totalAmount.toLocaleString()}
                        </h3>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.object.isRequired,
    }).isRequired,
};

export default Dashboard;
