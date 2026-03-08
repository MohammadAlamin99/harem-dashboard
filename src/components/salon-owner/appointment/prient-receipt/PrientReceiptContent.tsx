"use client";
import InvoiceHead from "./InvoiceHead";
import ReceiptNav from "./ReceiptNav";
import Transfer from "./Transfer";

export default function PrientReceiptContent() {
  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] font-manrope">
      {/* Top Nav */}
      <ReceiptNav />
      {/* Page Content */}
      <div className="w-full space-y-5">
        {/* Electronic Invoice */}
        <InvoiceHead />
        {/* transfer */}
        <Transfer />

        {/* ── Service Description ─────────────────────────────────── */}
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-6">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Service Description
          </h2>
          <div className="border border-[#EFF4FA] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F3F3FF]">
                  <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA]">
                    Name
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA] whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA] whitespace-nowrap">
                    Unit Price
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA] whitespace-nowrap">
                    VAT Rate
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#EFF4FA]">
                  <td className="px-4 py-4 text-sm font-manrope text-[#29343D] border-r border-[#EFF4FA]">
                    Haircut
                  </td>
                  <td className="px-4 py-4 text-sm font-manrope text-[#526B7A] border-r border-[#EFF4FA]">
                    1
                  </td>
                  <td className="px-4 py-4 text-sm font-manrope text-[#526B7A] border-r border-[#EFF4FA]">
                    € 245.08
                  </td>
                  <td className="px-4 py-4 text-sm font-manrope text-[#526B7A] border-r border-[#EFF4FA]">
                    22%
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold font-manrope text-[#29343D]">
                    € 245.08
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── VAT Summary + Document Totals ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* VAT Summary */}
          <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-6">
            <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
              VAT Summary
            </h2>
            <div className="border border-[#EFF4FA] rounded-[10px] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F3F3FF]">
                    <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA]">
                      Rate
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D] border-r border-[#EFF4FA]">
                      Taxable
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold font-manrope text-[#29343D]">
                      IVA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EFF4FA]">
                    <td className="px-4 py-4 text-sm font-manrope text-[#29343D] border-r border-[#EFF4FA]">
                      22%
                    </td>
                    <td className="px-4 py-4 text-sm font-manrope text-[#526B7A] border-r border-[#EFF4FA]">
                      € 245.08
                    </td>
                    <td className="px-4 py-4 text-sm font-manrope text-[#526B7A]">
                      € 53.92
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Document Totals */}
          <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-6">
            <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
              Document Totals
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-manrope text-[#98A4AE]">
                  Total Taxable Amount
                </p>
                <p className="text-sm font-semibold font-manrope text-[#29343D]">
                  € 245.08
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-manrope text-[#98A4AE]">Total VAT</p>
                <p className="text-sm font-semibold font-manrope text-[#29343D]">
                  € 245.08
                </p>
              </div>
              <div className="border-t border-[#EFF4FA] pt-3 flex items-center justify-between">
                <p className="text-sm font-manrope text-[#98A4AE]">
                  Document Total
                </p>
                <p className="text-xl font-bold font-manrope text-[#29343D]">
                  € 299.00
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Payment Methods ─────────────────────────────────────── */}
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-6">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Payment Methods
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
            <div>
              <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
                Mode
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                Credit Card
              </p>
            </div>
            <div>
              <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
                Payment Date
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                12/02/2024
              </p>
            </div>
            <div>
              <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
                Deadline
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                12/14/2024
              </p>
            </div>
            <div>
              <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
                Amount Paid
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                € 299.00
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-manrope text-[#98A4AE] mb-1">
              Status
            </p>
            <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#EBFAF0] text-[#36C76C] text-xs font-semibold font-manrope">
              Paid
            </span>
          </div>
        </section>

        {/* ── Legal Notes ─────────────────────────────────────────── */}
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-6">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Legal Notes
          </h2>
          <ul className="space-y-2.5">
            {[
              "Invoice issued pursuant to art. 21 of Presidential Decree 26 October 1972, n. 633 and subsequent amendments.",
              "VAT paid by the purchaser pursuant to art. 17, paragraph 6, of Presidential Decree 26 October 1972, n. 633.",
              "Digitally signed electronic document pursuant to Legislative Decree 82/2005.",
              "Replacement storage of documents pursuant to the Ministerial Decree of 17 June 2014.",
              "Competent court: Milan. Applicable law: Italian.",
              "Company subject to the management and coordination of [Holding Company].",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs font-manrope text-[#526B7A] leading-relaxed">
                  • {note}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="bg-white rounded-[14px] border border-[#EFF4FA] px-6 py-5 text-center">
          <p className="text-xs font-manrope text-[#98A4AE] leading-relaxed">
            SalonFlow Srl · Via Roma, 123 · 20121 Milan (MI) · VAT number:
            IT12345678901
          </p>
          <p className="text-xs font-manrope text-[#98A4AE] leading-relaxed">
            Share Capital: € 10,000.00 iv · REA MI-1234567 · SDI Code: XXXXXXX
          </p>
          <p className="text-xs font-manrope text-[#98A4AE] leading-relaxed">
            www.salonflow.it · info@salonflow.it · Tel: +39 02 1234567
          </p>
        </footer>
      </div>
    </div>
  );
}
