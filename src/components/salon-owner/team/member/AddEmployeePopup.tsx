import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

interface GeneralData {
    firstName: string
    lastName: string
    dob: string
    address: string
    city: string
    province: string
    cap: string
}

interface ContactData {
    email: string
    phone: string
    emergency: string
    emergencyPhone: string
}

interface ContractData {
    contractType: string
    taxId: string
    iban: string
    startDate: string
    endDate: string
    role: string
    remunerationType: string
}

type GeneralDataKey = keyof GeneralData
type ContactDataKey = keyof ContactData
type ContractDataKey = keyof ContractData

const STEPS = [
    { id: 1, label: "General Info" },
    { id: 2, label: "Contact information" },
    { id: 3, label: "Contract" },
    { id: 4, label: "Services" },
]

const PROVINCES = [
    "Agrigento", "Alessandria", "Ancona", "Aosta", "Arezzo",
    "Ascoli Piceno", "Asti", "Avellino", "Bari", "Barletta",
    "Belluno", "Benevento", "Bergamo", "Biella", "Bologna",
    "Bolzano", "Brescia", "Brindisi", "Cagliari", "Caltanissetta",
    "Milan", "Rome", "Naples", "Turin", "Florence",
]


function StepGeneralInfo({ data, onChange }: { data: GeneralData; onChange: (k: GeneralDataKey, v: string) => void }) {
    return (
        <div className="flex flex-col gap-5">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        First Name <span className="text-[#29343D]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.firstName}
                        onChange={e => onChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Last Name <span className="text-[#29343D]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.lastName}
                        onChange={e => onChange("lastName", e.target.value)}
                        placeholder="Enter last name *"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">
                    Date of birth <span className="text-[#29343D]">*</span>
                </label>
                <div className="relative w-full sm:w-1/2 border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 focus-within:border-[#6366F1] transition-colors">
                    <input
                        type="date"
                        value={data.dob}
                        onChange={e => onChange("dob", e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <span className="text-sm text-[#9CA3AF] pointer-events-none select-none">
                        {data.dob || "Enter date of birth"}
                    </span>
                </div>
            </div>

            {/* Address + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Address <span className="text-[#29343D]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={e => onChange("address", e.target.value)}
                        placeholder="Enter address"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        City <span className="text-[#29343D]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.city}
                        onChange={e => onChange("city", e.target.value)}
                        placeholder="Enter city"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
            </div>

            {/* Province + CAP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Province <span className="text-[#29343D]">*</span>
                    </label>
                    <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 focus-within:border-[#6366F1] transition-colors">
                        <select
                            value={data.province}
                            onChange={e => onChange("province", e.target.value)}
                            className="appearance-none w-full py-2.5 text-sm bg-transparent outline-none cursor-pointer text-[#29343D]"
                        >
                            <option value="" disabled>Select province</option>
                            {PROVINCES.map(p => <option key={p}>{p}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        CAP <span className="text-[#29343D]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.cap}
                        onChange={e => onChange("cap", e.target.value)}
                        placeholder="Enter CAP"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
            </div>
        </div>
    )
}

function StepContactInfo({ data, onChange }: { data: ContactData; onChange: (k: ContactDataKey, v: string) => void }) {
    return (
        <div className="flex flex-col gap-5">
            {/* Email - full width */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">
                    E-mail <span className="text-[#6366F1]">*</span>
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={e => onChange("email", e.target.value)}
                    placeholder="Enter email"
                    className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                />
            </div>

            {/* Emergency Contact Name + Telephone - side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">Emergency Contact (Name)</label>
                    <input
                        type="text"
                        value={data.emergency}
                        onChange={e => onChange("emergency", e.target.value)}
                        placeholder="Enter emergency contact (name)"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">Emergency Contact (Telephone)</label>
                    <input
                        type="tel"
                        value={data.emergencyPhone}
                        onChange={e => onChange("emergencyPhone", e.target.value)}
                        placeholder="Enter emergency contact (telephone)"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
            </div>
        </div>
    )
}

const CONTRACT_TYPES = ["Permanent", "Fixed-term", "Freelance", "Internship"]
const ROLES = ["Manager", "Staff", "Owner", "Collaborator", "Guest"]
const REMUNERATION_TYPES = ["Monthly", "Hourly", "Commission", "Fixed"]

function StepContract({ data, onChange }: { data: ContractData; onChange: (k: ContractDataKey, v: string) => void }) {
    const [showEndDate, setShowEndDate] = useState(false)

    return (
        <div className="flex flex-col gap-5">
            {/* Contract Type + Tax ID Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Contract Type <span className="text-[#6366F1]">*</span>
                    </label>
                    <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 focus-within:border-[#6366F1] transition-colors">
                        <select
                            value={data.contractType}
                            onChange={e => onChange("contractType", e.target.value)}
                            className="appearance-none w-full py-2.5 text-sm bg-transparent outline-none cursor-pointer text-[#29343D]"
                        >
                            <option value="" disabled>Permanent</option>
                            {CONTRACT_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Tax ID Code <span className="text-[#6366F1]">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.taxId}
                        onChange={e => onChange("taxId", e.target.value)}
                        placeholder="Enter tax ID code"
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>
            </div>

            {/* IBAN - full width */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">IBAN</label>
                <input
                    type="text"
                    value={data.iban}
                    onChange={e => onChange("iban", e.target.value)}
                    placeholder="Enter IBAN for salary payments"
                    className="border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 text-sm text-[#29343D] placeholder-[#9CA3AF] outline-none focus:border-[#6366F1] transition-colors"
                />
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">
                    Start Date <span className="text-[#6366F1]">*</span>
                </label>
                <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 focus-within:border-[#6366F1] transition-colors">
                    <input
                        type="date"
                        value={data.startDate}
                        onChange={e => onChange("startDate", e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <span className="text-sm text-[#9CA3AF] pointer-events-none select-none">
                        {data.startDate || "Enter start date"}
                    </span>
                </div>

                {/* Set an end date toggle */}
                {!showEndDate ? (
                    <button
                        onClick={() => setShowEndDate(true)}
                        className="cursor-pointer text-[#6366F1] text-sm font-medium text-left hover:underline w-fit"
                    >
                        Set an end date
                    </button>
                ) : (
                    <div className="flex flex-col gap-2">
                        <label className="text-[#29343D] text-sm font-semibold">End Date</label>
                        <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 py-2.5 focus-within:border-[#6366F1] transition-colors">
                            <input
                                type="date"
                                value={data.endDate}
                                onChange={e => onChange("endDate", e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <span className="text-sm text-[#9CA3AF] pointer-events-none select-none">
                                {data.endDate || "Enter end date"}
                            </span>
                        </div>
                        <button
                            onClick={() => { setShowEndDate(false); onChange("endDate", "") }}
                            className="cursor-pointer text-[#9CA3AF] text-sm font-medium text-left hover:text-[#29343D] w-fit"
                        >
                            Remove end date
                        </button>
                    </div>
                )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">
                    Role <span className="text-[#6366F1]">*</span>
                </label>
                <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 focus-within:border-[#6366F1] transition-colors">
                    <select
                        value={data.role}
                        onChange={e => onChange("role", e.target.value)}
                        className="appearance-none w-full py-2.5 text-sm bg-transparent outline-none cursor-pointer text-[#29343D]"
                    >
                        <option value="" disabled>Select role</option>
                        {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none" />
                </div>
            </div>

            {/* Remuneration Type */}
            <div className="flex flex-col gap-2">
                <label className="text-[#29343D] text-sm font-semibold">
                    Remmuneration Type <span className="text-[#6366F1]">*</span>
                </label>
                <div className="relative border border-[#E0E6EB] rounded-[4px] px-4 focus-within:border-[#6366F1] transition-colors">
                    <select
                        value={data.remunerationType}
                        onChange={e => onChange("remunerationType", e.target.value)}
                        className="appearance-none w-full py-2.5 text-sm bg-transparent outline-none cursor-pointer text-[#29343D]"
                    >
                        <option value="" disabled>Select type</option>
                        {REMUNERATION_TYPES.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none" />
                </div>
            </div>
        </div>
    )
}

const ALL_SERVICES = ["Haircut", "Hair Coloring", "Manicure", "Pedicure", "Facial", "Massage", "Waxing", "Eyebrow Shaping"]

function StepServices({ data, onToggle }: { data: string[]; onToggle: (s: string) => void }) {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-[#29343D] text-sm font-semibold">Assign Services</p>
            <div className="grid grid-cols-2 gap-3">
                {ALL_SERVICES.map(service => {
                    const active = data.includes(service)
                    return (
                        <button key={service} onClick={() => onToggle(service)}
                            className={`cursor-pointer text-left px-4 py-3 rounded-[4px] border text-sm font-medium transition-colors ${active ? "border-[#6366F1] bg-[#EEF2FF] text-[#6366F1]" : "border-[#E0E6EB] text-[#29343D] hover:bg-[#F8FAFC]"}`}>
                            {service}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

//  Stepper
function Stepper({ current }: { current: number }) {
    return (
        <div className="flex items-start justify-between mb-8 relative">
            {/* full grey line — inset by half a circle width (18px) on each side */}
            <div className="absolute top-[18px] left-[18px] right-[18px] h-[1px] bg-[#E0E6EB] z-0" />
            {/* purple progress line */}
            <div
                className="absolute top-[18px] left-[18px] h-[1px] bg-[#6366F1] z-0 transition-all duration-500"
                style={{ width: `calc((100% - 36px) * ${(current - 1) / (STEPS.length - 1)})` }}
            />
            {STEPS.map(step => {
                const done = step.id < current
                const active = step.id === current
                return (
                    <div key={step.id} className="flex flex-col items-center gap-2 z-10">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                            ${active ? "bg-[#6366F1] border-[#6366F1] text-white"
                                : done ? "bg-[#6366F1] border-[#6366F1] text-white"
                                    : "bg-[#3D4E5C] border-[#3D4E5C] text-white"}`}>
                            {step.id}
                        </div>
                        <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-[#29343D]" : "text-[#9CA3AF]"}`}>
                            {step.label}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default function AddEmployeeModal({ onClose }: { onClose?: () => void }) {
    const [step, setStep] = useState(1)

    const [generalData, setGeneralData] = useState<GeneralData>({ firstName: "", lastName: "", dob: "", address: "", city: "", province: "", cap: "" })
    const [contactData, setContactData] = useState<ContactData>({ email: "", phone: "", emergency: "", emergencyPhone: "" })
    const [contractData, setContractData] = useState<ContractData>({ contractType: "", taxId: "", iban: "", startDate: "", endDate: "", role: "", remunerationType: "" })
    const [services, setServices] = useState<string[]>([])

    function handleGeneralChange(k: GeneralDataKey, v: string) { setGeneralData(prev => ({ ...prev, [k]: v })) }
    function handleContactChange(k: ContactDataKey, v: string) { setContactData(prev => ({ ...prev, [k]: v })) }
    function handleContractChange(k: ContractDataKey, v: string) { setContractData(prev => ({ ...prev, [k]: v })) }
    function handleToggleService(s: string) {
        setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
    }

    function handleNext() { if (step < 4) setStep(s => s + 1) }
    function handleBack() { if (step > 1) setStep(s => s - 1) }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white border border-[#E0E6EB] shadow-2xl w-full max-w-[746px] p-6 rounded-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-[#29343D] font-bold text-xl">Add Employee</h2>
                    <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#29343D] transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Stepper */}
                <Stepper current={step} />

                {/* Step Content */}
                <div className="min-h-[260px] max-h-[420px] overflow-y-auto pr-1">
                    {step === 1 && <StepGeneralInfo data={generalData} onChange={handleGeneralChange} />}
                    {step === 2 && <StepContactInfo data={contactData} onChange={handleContactChange} />}
                    {step === 3 && <StepContract data={contractData} onChange={handleContractChange} />}
                    {step === 4 && <StepServices data={services} onToggle={handleToggleService} />}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8">
                    {step > 1 ? (
                        <button onClick={handleBack}
                            className="cursor-pointer border border-[#E0E6EB] text-[#29343D] text-sm font-semibold px-4 py-2.5 rounded-[12px] hover:bg-[#F8FAFC] transition-colors">
                            Back
                        </button>
                    ) : <div />}

                    <button
                        onClick={step === 4 ? onClose : handleNext}
                        className="cursor-pointer bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2.5 rounded-[12px] transition-colors"
                    >
                        {step === 4 ? "Save" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    )
}