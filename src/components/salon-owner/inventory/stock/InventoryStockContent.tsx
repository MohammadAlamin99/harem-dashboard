import React from 'react'
import InventoryHead from './InventoryHead'
import InventoryStockTable from './InventoryStockTable'

export default function InventoryStockContent() {
    return (
        <div>
            <InventoryHead handleOptionClick={() => { }} />
            <InventoryStockTable />
        </div>
    )
}
