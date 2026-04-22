
import EmployeePerformanceDashboard from "./EmployeePerformanceDashboard";
import EmployeeProductionDashboard from "./EmployeeProductionDashboard";
import EmployeeRemunerationDashboard from "./EmployeeRemunerationDashboard";
import EmployeeStatusHeader from "./EmployeeStatusHeader";

export default function StatEmployeePerformanceContent() {
    return (
        <div>
            <EmployeeStatusHeader />
            <EmployeeProductionDashboard />
            <EmployeePerformanceDashboard />
            <EmployeeRemunerationDashboard />
        </div>
    )
}
