import { useState } from 'react'
import InventoryHead from './InventoryHead'
import InventoryStockTable from './InventoryStockTable'
import AddMovementModal from './Addmovementmodal'

export default function InventoryStockContent() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <InventoryHead setShowModal={setShowModal} handleOptionClick={() => { }} />
            <InventoryStockTable />
            {showModal && <AddMovementModal onClose={() => setShowModal(false)} />}
        </div>
    )
}
