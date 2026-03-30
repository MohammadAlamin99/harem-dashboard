
import PageHeader from '../../common-component/PageHeader'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation';
import ServicesForm from './ServicesForm';
import MembersRequired from './MembersRequired';
import IconPicker from './IconPicker';

export default function AddServiceContent() {
    const router = useRouter();
    return (
        <div>
            <PageHeader title="Add Service"
                onBack={() => router.back()}
                breadcrumb={[{ label: "Services", active: true }]}
                HomeIcon={<Home size={18} />}
            />
            <ServicesForm />
            <div className='mt-6'>
                <MembersRequired />
            </div>
            <div className='mt-6 mb-6'>
                <IconPicker />
            </div>
            <div className='flex justify-end'>
                <button className="px-4 py-2.5 bg-[#635BFF] text-white rounded-lg font-medium font-manrope text-sm cursor-pointer">
                    Save Changes
                </button>
            </div>
        </div>
    )
}
