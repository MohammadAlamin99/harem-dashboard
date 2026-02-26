import CommonHead from './CommonHead'
import { CircleCheck, FileText, View } from 'lucide-react'
import Image from 'next/image'

export default function NewUploadLayout() {
    return (
        <div>
            <CommonHead
                text='New Salary Upload'
            />
            <div className='p-7 border border-[#E0E6EB] bg-white rounded-xl mt-6'>
                {/* tabs */}
                <div className='flex items-center px-4 py-3 gap-4'>
                    {/* tab 01 */}
                    <div className='w-fit rounded-xl bg-[#DDDBFF] flex items-center px-4 py-3 gap-3'>
                        <div className='bg-[#635BFF] w-10 h-10 flex items-center justify-center rounded-[50%] text-white'>
                            <FileText width={24} height={24} />
                        </div>
                        <div>
                            <h4 className='font-manrope font-medium text-[16px] text-[#635BFF]'>Upload PDF</h4>
                            <p className='text-sm text-[#98A4AE] font-manrope font-semibold'>Upload pay slip files</p>
                        </div>
                    </div>
                    {/* tab 02 */}
                    <div className='w-fit rounded-xl flex items-center px-4 py-3 gap-3'>
                        <div className='bg-[#F6F7F9] w-10 h-10 flex items-center justify-center rounded-[50%] text-white'>
                            <View width={24} height={24} color='#29343D' />
                        </div>
                        <div>
                            <h4 className='font-manrope font-medium text-[16px] text-[#29343D]'>Extract & Review</h4>
                            <p className='text-sm text-[#98A4AE] font-manrope font-semibold'>Auto-extract and verify data</p>
                        </div>
                    </div>
                    {/* tab 03 */}
                    <div className='w-fit rounded-xl flex items-center px-4 py-3 gap-3'>
                        <div className='bg-[#F6F7F9] w-10 h-10 flex items-center justify-center rounded-[50%] text-white'>
                            <CircleCheck width={24} height={24} color='#29343D' />
                        </div>
                        <div>
                            <h4 className='font-manrope font-medium text-[16px] text-[#29343D]'>Finalize</h4>
                            <p className='text-sm text-[#98A4AE] font-manrope font-semibold'>Confirm and submit</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* upload input field */}
            <div className='bg-white rounded-xl shadow-[0_2px_4px_-1px_rgba(175,182,201,0.20)] mt-7 p-7'>
                <div className='border border-[#E0E6EB] py-10 px-6 rounded-xl flex items-center flex-col gap-4'>
                    <h4 className='text-[#29343D] font-manrope font-semibold text-2xl'>Drop PDF</h4>
                    <h5 className='text-[#526B7A] font-manrope text-sm font-normal'>You can upload multiple employees in one PDF file</h5>
                    <div className='w-[796px]  border border-[#635BFF] border-dashed rounded-xl py-4 px-6 flex items-center flex-col gap-3 cursor-pointer'>
                        <Image src='/images/uploadlogo.svg' alt='upload' width={64} height={64} />
                        <p className='text-[#635BFF] font-manrope text-sm font-normal'>Drop here or click to browse</p>
                    </div>

                    {/* tag */}
                    <div className='flex items-center gap-4'>
                        <p className='py-1.5 px-2.5 rounded-full text-[#0A2540] font-manrope text-sm font-normal bg-[#EFF4FA]'>PDF only</p>
                        <p className='py-1.5 px-2.5 rounded-full text-[#0A2540] font-manrope text-sm font-normal bg-[#EFF4FA]'>Max 50MB</p>
                        <p className='py-1.5 px-2.5 rounded-full text-[#0A2540] font-manrope text-sm font-normal bg-[#EFF4FA]'>Multiple employees supported</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
