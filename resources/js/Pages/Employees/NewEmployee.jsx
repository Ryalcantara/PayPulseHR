import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

//Components
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';

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
export default function NewEmployee({ auth }) {
    const { data, setData, post, errors } = useForm({
        employee_id: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        birthdate: '',
        birthPlace: '',
        sex: '',
        civil_status: '',
        nationality: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
        position: '',
        department: '',
        start_date: '',
        employment_type: '',
        salary: '',
        vacation_days: 0,
        sick_days: 0,
        leave_balance: 0,
        photo: null,
    });

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Convert to base64 for preview
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                setData('photo', info.file.originFileObj); // Set the file for form data
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="">
                <h1 className="pb-10 text-center text-xl font-bold">Add New Employee</h1>
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
                                    {errors.birthdate && <div>{errors.birthPlace}</div>}
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

                            <div>
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="pb-2">
                            <label className="text-lg font-bold">Company Detials</label>
                        </div>

                        <div className="flex gap-5 p-2">
                            {/* Company ID */}
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
                            {/* Employment Type */}
                            <div className="flex flex-col">
                                <label>Employment Type</label>
                                <select
                                    value={data.employment_type}
                                    onChange={(e) => setData('employment_type', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                {errors.employment_type && <div>{errors.employment_type}</div>}
                            </div>

                            {/* Salary */}
                            <div className="flex flex-col">
                                <label>Salary</label>
                                <TextInput
                                    type="number"
                                    value={data.salary}
                                    onChange={(e) => setData('salary', e.target.value)}
                                />
                                {errors.salary && <div>{errors.salary}</div>}
                            </div>
                        </div>

                        <div className="flex gap-5 p-2">
                            <div className="flex flex-col">
                                <label>Position</label>
                                <TextInput
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                />
                                {errors.position && <div>{errors.position}</div>}
                            </div>

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
                        <div className="pt-10">
                            <div className="pb-2">
                                <label className="text-lg font-bold"> Account Details</label>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col p-2">
                                <label>Email</label>
                                <TextInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <div>{errors.email}</div>}
                            </div>
                            <div className="flex gap-5 p-2">
                                {/* Password */}
                                <div className="flex flex-col">
                                    <label>Password</label>
                                    <TextInput
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                    {errors.password && <div>{errors.password}</div>}
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col">
                                    <label>Confirm Password</label>
                                    <TextInput
                                        type="password"
                                        value={data.confirm_password}
                                        onChange={(e) =>
                                            setData('confirm_password', e.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                    />
                                    {errors.confirm_password && (
                                        <div>{errors.confirm_password}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-2">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-high p-2 font-bold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
