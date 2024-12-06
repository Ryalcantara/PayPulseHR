<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FundClusterController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\SalaryGradeController;

use App\Http\Controllers\LoanProgramController;
use App\Http\Controllers\LoanTypeController;
use App\Http\Controllers\EmployeeLoanController;
use App\Http\Controllers\EmployeeBenefitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BenefitController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\RolesAndPermissionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboards', [HomeController::class, 'landingPage'])->name('dashboards');




    Route::get('/admin/unassigned-users', [UserController::class, 'unassignedUsers'])->name('users.unassigned');
    Route::get('/admin/employees/create/{userId}', [EmployeeController::class, 'register'])->name('admin.employees.create');
    Route::post('/admin/employees/create/{userId}', [EmployeeController::class, 'storeNew'])->name('employees.stores');



    //Accounting
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/voucher', VoucherController::class);
    Route::get('/voucher/{voucher}', [VoucherController::class, 'show'])->name('voucher.show');
    Route::get('/voucher/create', [VoucherController::class, 'create'])->name('voucher.add');
    // Route::get('/voucher/create',[VoucherController::class, 'create'])->name('voucher.add')->middleware('permission:Voucher');
    Route::get('autoIncrement', [VoucherController::class, 'getAutoIncrement']);
    Route::get('/fClusters', [VoucherController::class, 'fCluster']);
    Route::post('/voucher/{id}/complete', [VoucherController::class, 'complete'])->name('voucher.complete');


    // TESTING FOR MIDDLEWARES NI ASSUME KO NA TO AS HR 
    Route::middleware(['hr'])->group(function () {
        //HR
        //Leave Management
        Route::get('/leaveRequestForm', [LeaveController::class, 'LeaveRequestForm'])->name('leaveRequestForm');
        Route::post('/leaveRequestForm', [LeaveController::class, 'store'])->name('LeaveRequstForm.store');

        Route::get('/leaveRequest', [LeaveController::class, 'LeaveRequest'])->name('LeaveRequest');
        Route::get('/leaveRequest/show/{id}', [LeaveController::class, 'leaveRequestShow'])->name('LeaveRequest.show');
        Route::get('/appLeaveForm/{id}', [LeaveController::class, 'AppLeaveForm'])->name('Appleave');


        //Employee Records
        Route::get('/employees', [EmployeeController::class, 'EmployeeList'])->name('employees.index');
        Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
        Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
        Route::get('/employees/{employee}', [EmployeeController::class, 'EmployeeInfo'])->name('employees.info');
        Route::post('/employees/{id}/terminate', [EmployeeController::class, 'terminate'])->name('employees.terminate');

        Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
        Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    });

    //Employee Loans
    Route::get('/my_loans', [EmployeeLoanController::class, 'myLoans'])->name('my.loans');

    // Salary Grade
    Route::get('/salary_grades', [SalaryGradeController::class, 'index'])->name('salary_grades.index');
    Route::get('/salary_grades/create', [SalaryGradeController::class, 'create'])->name('salary_grades.create');
    Route::post('/salary_grades', [SalaryGradeController::class, 'store'])->name('salary_grades.store');
    Route::get('/salary_grades/{salaryGrade}/edit', [SalaryGradeController::class, 'edit'])->name('salary_grades.edit');
    Route::put('/salary_grades/{salaryGrade}', [SalaryGradeController::class, 'update'])->name('salary_grades.update');

    Route::post('/salary_grades/bulk_update', [SalaryGradeController::class, 'bulkUpdate'])->name('salary_grades.bulk_update');

    //Payroll
    Route::post('/transactions', [TransactionController::class, 'store'])->name('PayrollSaved');

    Route::get('/payroll/data', [PayrollController::class, 'payrollData'])->name('payrollData');

    // Route::get('/payroll/general', [PayrollController::class, 'generalPayroll'])->name('generalPayroll');
    // Route::get('/payroll/computation', [PayrollController::class, 'computation'])->name('computation');
    // Route::get('/payroll', [PayrollController::class, 'payroll'])->name('payroll');

    //Loans

    //Dashboard for loans
    Route::get('/loans', [LoanController::class, 'Loans'])->name('loans.view');

    //Loan Programs
    // Route::get('/loanPrograms', [LoanProgramController::class, 'index'])->name('loan-programs.index'); //For Troubleshoot
    Route::post('/loanPrograms', [LoanProgramController::class, 'store'])->name('loan-programs.store');
    Route::put('/loanPrograms/{id}', [LoanProgramController::class, 'update'])->name('loan-programs.update');

    //Loan Types
    // Route::get('loanTypes', [LoanTypeController::class, 'index'])->name('loanTypes.index'); //For Troubleshoot
    Route::post('loanTypes', [LoanTypeController::class, 'store'])->name('loanTypes.store');
    Route::put('loanTypes/{loanType}', [LoanTypeController::class, 'update'])->name('loanTypes.update');

    //Employee Loans
    // Route::get('/employeeLoans/create', [EmployeeLoanController::class, 'create'])->name('employee_loans.create'); //For Troubleshoot
    Route::post('/employee-loans/{employeeLoan}/add-payment', [EmployeeLoanController::class, 'addPayment'])->name('employee-loans.add-payment');
    Route::post('/employee_loans', [EmployeeLoanController::class, 'store'])->name('employee_loans.store');
    Route::get('/employee_loans/{employeeLoan}/edit', [EmployeeLoanController::class, 'edit'])->name('employee_loans.edit');
    Route::put('/employee_loans/{employeeLoan}', [EmployeeLoanController::class, 'update'])->name('employee_loans.update');

    //Loan Details
    Route::get('/employee_loans/{employeeLoan}', [EmployeeLoanController::class, 'show'])->name('loan.details');

    //Benefits / Gross Earning
    Route::get('/employee_benefits', [EmployeeBenefitController::class, 'index'])->name('employee_benefits.index');
    Route::post('/employee_benefits', [EmployeeBenefitController::class, 'store'])->name('employee_benefits.store');
    // Route::post('/employee_benefits', [EmployeeBenefitController::class, 'submitLWOP'])->name('employee_benefits.store');

    Route::post('/employee-benefits/bulkUpdate', [EmployeeBenefitController::class, 'bulkUpdate'])->name('employee_benefits.bulkUpdate');

    Route::post('/benefits/store', [BenefitController::class, 'store'])->name('benefits.store');

    //Contribution / Deduction
    Route::get('/contributions', [ContributionController::class, 'index'])->name('contributions.index');
    Route::post('/contributions', [ContributionController::class, 'store'])->name('contributions.store');

    // Route::get('/contributions/{contribution}', [ContributionController::class, 'show'])->name('contributions.show');
    // Route::put('/contributions/{contribution}', [ContributionController::class, 'update'])->name('contributions.update');




});

// for the User Profit
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
