import BreadcrumbIcon from "@/app/account-protal/svg/BreadcrumbIcon";
import PageHeader from "../../common-component/PageHeader";
import { useRouter } from "next/navigation";
import PaymentSettings from "./PaymentSettings";
export default function SetAutomationContent() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="Set Automations"
        onBack={() => router.back()}
        breadcrumb={[{ label: "Payments", active: true }]}
        HomeIcon={<BreadcrumbIcon />}
      />

      <PaymentSettings />
    </div>
  );
}
