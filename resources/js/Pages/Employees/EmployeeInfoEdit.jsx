import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// Components
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function EmployeeInfoEdit({ auth, employee, salaryGrades }) {
    const { data, setData, put, errors } = useForm({
        employee_id: employee.employee_id || '',
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        middle_name: employee.middle_name || '',
        birthdate: employee.birthdate || '',
        birthPlace: employee.birthPlace || '',
        sex: employee.sex || '',
        civil_status: employee.civil_status || '',
        nationality: employee.nationality || '',
        address: employee.address || '',
        phone: employee.phone || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        start_date: employee.start_date || '',
        employment_type: employee.employment_type || '',
        salary_grade_id: employee.salary_grade_id || '',
        vacation_days: employee.vacation_days || 0,
        sick_days: employee.sick_days || 0,
        leave_balance: employee.leave_balance || 0,
        photo: employee.photo || null,
        classification: employee.classification || '',
        gsis_no: employee.gsis_no || '',
        hdmf_no: employee.hdmf_no || '',
        phic_no: employee.phic_no || '',
        bir_tin_no: employee.bir_tin_no || '',
    });

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(employee.photo);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                setData('photo', info.file.originFileObj);
            });
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);
        put(route('employees.update', employee.id), {
            onSuccess: (response) => {
                console.log('Update successful', response);
            },
            onError: (error) => {
                console.log('Error:', error);
            },
        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="container mx-auto">
                <h1 className="pb-10 text-center text-xl font-bold">Edit Employee</h1>
                <form onSubmit={handleSubmit} className="flex justify-center gap-20">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center justify-center">
                        <Upload
                            name="photo"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        {errors.photo && <div>{errors.photo}</div>}
                        <label className="">Profile Picture</label>
                    </div>

                    <div>
                        <div className="pb-2">
                            <label className="text-lg font-bold">Personal Information</label>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* First Name */}
                            <div className="flex flex-col">
                                <label>First Name</label>
                                <TextInput
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                {errors.first_name && <div>{errors.first_name}</div>}
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col">
                                <label>Last Name</label>
                                <TextInput
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                {errors.last_name && <div>{errors.last_name}</div>}
                            </div>

                            {/* Middle Name */}
                            <div className="flex flex-col">
                                <label>Middle Name</label>
                                <TextInput
                                    type="text"
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                />
                                {errors.middle_name && <div>{errors.middle_name}</div>}
                            </div>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* Birthdate */}
                            <div className="flex flex-col">
                                <label>Birthdate</label>
                                <TextInput
                                    type="date"
                                    value={data.birthdate}
                                    onChange={(e) => setData('birthdate', e.target.value)}
                                />
                                {errors.birthdate && <div>{errors.birthdate}</div>}
                            </div>

                            {/* Birth Place */}
                            <div className="flex flex-col">
                                <label>Birth Place</label>
                                <TextInput
                                    type="text"
                                    value={data.birthPlace}
                                    onChange={(e) => setData('birthPlace', e.target.value)}
                                />
                                {errors.birthPlace && <div>{errors.birthPlace}</div>}
                            </div>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* Sex */}
                            <div className="flex flex-col">
                                <label>Sex</label>
                                <div className="flex space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            value="male"
                                            checked={data.sex === 'male'}
                                            onChange={(e) => setData('sex', e.target.value)}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="female"
                                            checked={data.sex === 'female'}
                                            onChange={(e) => setData('sex', e.target.value)}
                                        />
                                        Female
                                    </label>
                                </div>
                                {errors.sex && <div>{errors.sex}</div>}
                            </div>

                            {/* Civil Status */}
                            <div className="flex flex-col">
                                <label>Civil Status</label>
                                <select
                                    value={data.civil_status}
                                    onChange={(e) => setData('civil_status', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                                {errors.civil_status && <div>{errors.civil_status}</div>}
                            </div>

                            {/* Nationality */}
                            <div className="flex flex-col">
                                <label>Nationality</label>
                                <TextInput
                                    type="text"
                                    value={data.nationality}
                                    onChange={(e) => setData('nationality', e.target.value)}
                                />
                                {errors.nationality && <div>{errors.nationality}</div>}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col p-2">
                            <label>Address</label>
                            <TextInput
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            {errors.address && <div>{errors.address}</div>}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col p-2">
                            <label>Phone</label>
                            <TextInput
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            {errors.phone && <div>{errors.phone}</div>}
                        </div>
                        <div>
                            <div className="flex gap-5 p-2">
                                {/* GSIS No */}
                                <div className="flex flex-col">
                                    <label>GSIS No</label>
                                    <TextInput
                                        type="text"
                                        value={data.gsis_no}
                                        onChange={(e) => setData('gsis_no', e.target.value)}
                                    />
                                    {errors.gsis_no && <div>{errors.gsis_no}</div>}
                                </div>

                                {/* HDMF No */}
                                <div className="flex flex-col">
                                    <label>HDMF No</label>
                                    <TextInput
                                        type="text"
                                        value={data.hdmf_no}
                                        onChange={(e) => setData('hdmf_no', e.target.value)}
                                    />
                                    {errors.hdmf_no && <div>{errors.hdmf_no}</div>}
                                </div>
                            </div>

                            <div className="flex gap-5 p-2">
                                {/* PHIC No */}
                                <div className="flex flex-col">
                                    <label>PHIC No</label>
                                    <TextInput
                                        type="text"
                                        value={data.phic_no}
                                        onChange={(e) => setData('phic_no', e.target.value)}
                                    />
                                    {errors.phic_no && <div>{errors.phic_no}</div>}
                                </div>

                                {/* BIR TIN No */}
                                <div className="flex flex-col">
                                    <label>BIR TIN No</label>
                                    <TextInput
                                        type="text"
                                        value={data.bir_tin_no}
                                        onChange={(e) => setData('bir_tin_no', e.target.value)}
                                    />
                                    {errors.bir_tin_no && <div>{errors.bir_tin_no}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="pb-2">
                            <label className="text-lg font-bold">Company Details</label>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* Employee ID */}
                            <div className="flex flex-col">
                                <label>Employee ID</label>
                                <TextInput
                                    type="text"
                                    value={data.employee_id}
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                />
                                {errors.employee_id && <div>{errors.employee_id}</div>}
                            </div>

                            {/* Start Date */}
                            <div className="flex flex-col">
                                <label>Start Date</label>
                                <TextInput
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <div>{errors.start_date}</div>}
                            </div>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* Position */}
                            <div className="flex flex-col">
                                <label>Position</label>
                                <TextInput
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                />
                                {errors.position && <div>{errors.position}</div>}
                            </div>

                            {/* Department */}
                            <div className="flex flex-col">
                                <label>Department</label>
                                <TextInput
                                    type="text"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                />
                                {errors.department && <div>{errors.department}</div>}
                            </div>
                        </div>

                        <div className="flex gap-5 p-2">
                            <div className="">
                                {/* Classification */}
                                <div className="flex flex-col">
                                    <label>Classification</label>
                                    <select
                                        value={data.classification}
                                        onChange={(e) => setData('classification', e.target.value)}
                                    >
                                        <option value="">Select Classification</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Casual">Casual</option>
                                        <option value="OJ/Job Order">OJ/Job Order</option>
                                        <option value="COS/Contract of Service">
                                            COS/Contract of Service
                                        </option>
                                    </select>
                                    {errors.classification && <div>{errors.classification}</div>}
                                </div>
                            </div>

                            {/* Employment Type */}
                            <div className="flex flex-col">
                                <label>Employment Type</label>
                                <select
                                    value={data.employment_type}
                                    onChange={(e) => setData('employment_type', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                {errors.employment_type && <div>{errors.employment_type}</div>}
                            </div>

                            {/* Salary */}
                            <div className="flex flex-col">
                                <label>Salary Grade</label>
                                <select
                                    value={data.salary_grade_id}
                                    onChange={(e) =>
                                        setData({ ...data, salary_grade_id: e.target.value })
                                    }
                                >
                                    <option value="">Select Salary Grade</option>
                                    {salaryGrades &&
                                        salaryGrades.map((grade) => (
                                            <option key={grade.id} value={grade.id}>
                                                {grade.grade} - Step {grade.step} (₱
                                                {grade.monthly_salary})
                                            </option>
                                        ))}
                                </select>
                                {errors.salary_grade_id && <div>{errors.salary_grade_id}</div>}
                            </div>
                        </div>

                        {/* Submit PrimaryButton */}
                        <div className="flex justify-end p-2">
                            <PrimaryButton
                                type="submit"
                                className="w-full rounded-md bg-high p-2 font-bold"
                            >
                                Save Changes
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
