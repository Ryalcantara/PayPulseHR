<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'first_name',
        'last_name',
        'middle_name',
        'birthdate',
        'sex',
        'civil_status',
        'nationality',
        'address',
        'phone',
        'email',
        'position',
        'department',
        'start_date',
        'employment_type',
        'salary_grade_id',
        'role',
        'termination_date',
        'termination_reason',
        'photo_url',
        'user_id',


        'classification',
        'gsis_no',
        'hdmf_no',
        'phic_no',
        'bir_tin_no',
    ];

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(Leave::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function loans()
    {
        return $this->hasMany(EmployeeLoan::class, 'employee_id');
    }

    public function salaryGrade()
    {
        return $this->belongsTo(SalaryGrade::class, 'salary_grade_id');
    }

    public function benefits()
    {
        return $this->belongsToMany(Benefit::class, 'employee_benefit')
                    ->withPivot('amount')
                    ->withTimestamps();
    }

    public function employeeBenefits()
    {
        return $this->hasMany(EmployeeBenefit::class);
    }

    public function contributions()
    {
        return $this->belongsToMany(Contribution::class, 'employee_contribution')
                    ->withPivot('amount')
                    ->withTimestamps();
    }
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function hasAnyRole($roles)
    {
        if (is_array($roles)) {
            return in_array($this->role, $roles);
        }
        return $this->hasRole($roles);
    }

}
