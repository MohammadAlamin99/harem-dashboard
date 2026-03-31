import React from 'react'
import PageHeader from '../../common-component/PageHeader'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MembersRequired from '../add-service/MembersRequired'
import ServiceDetailCard from './Servicedetailcard'

export default function ViewServiceContent() {
    const router = useRouter()
    return (
        <div>
            <PageHeader title="View Service"
                onBack={() => router.back()}
                breadcrumb={[{ label: "Services", active: true }]}
                HomeIcon={<Home size={18} />}
            />

            <div className='mt-6'>
                <ServiceDetailCard
                    name="Haircut"
                    category="Category 1"
                    addToOnlineBookings={true}
                    defaultDuration="15 min"
                    postBreakMin="15 min"
                    priceType="Fixed"
                    price="€ 270"
                    vat="€ 70"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    onBookingToggle={(val) => console.log(val)}
                />
            </div>

            <div className='mt-6'>
                <MembersRequired />
            </div>
        </div>
    )
}
