import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getQuotation } from "../../../api/quotationApi";
import qr from "../../../assets/images/qrlogo.jpeg";
import qr2 from "../../../assets/images/iso.jpg";
import qr3 from "../../../assets/images/fsai.png";
import qr4 from "../../../assets/images/gmp.jpg";

export default function QuotationUI() {
  const quotationRef = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getQuotation();
        const mapped = data.map((it, idx) => ({
          id: it._id,
          sno: idx + 1,
          desc: it.desc,
          hsn: it.hsn,
          gst: it.gst,
          dueOn: it.dueOn,
          qty: it.qty || 0,
          rate: it.rate || 0,
          unit: it.unit || "",
          discount: it.discount || 0,
        }));
        setItems(mapped);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItems();
  }, []);

  // Total calculation
  const total = items.reduce((acc, row) => {
    const qty = parseFloat(row.qty) || 0;
    const rate = parseFloat(row.rate) || 0;
    const discount = parseFloat(row.discount) || 0;
    const gst = parseFloat(String(row.gst || "").replace("%", "").trim()) || 0;
    const amount = qty * rate;
    const afterDiscount = amount - (amount * discount) / 100;
    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;
    return acc + finalAmt;
  }, 0);

  const amountWords = "INR " + numberToWords(total);

  function numberToWords(num) {
    if (!isFinite(num) || num === 0) return "Zero Only";
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);

    function convertNumber(n) {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convertNumber(n % 100) : "");
      if (n < 100000)
        return convertNumber(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convertNumber(n % 1000) : "");
      if (n < 10000000)
        return convertNumber(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convertNumber(n % 100000) : "");
      return convertNumber(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convertNumber(n % 10000000) : "");
    }

    let words = "";
    if (rupees > 0) words += convertNumber(rupees) + " Rupee" + (rupees !== 1 ? "s" : "");
    if (paise > 0) words += (rupees > 0 ? " And " : "") + convertNumber(paise) + " Paise";
    return words + " Only";
  }

  // Download PDF
  const handleDownloadPDF = async () => {
    const element = quotationRef.current;

    const clone = element.cloneNode(true);
    clone.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.backgroundColor.includes("oklch") || style.backgroundColor.includes("lab") || style.backgroundColor.includes("lch")) {
        el.style.backgroundColor = "#ffffff";
      }
      if (style.color.includes("oklch") || style.color.includes("lab") || style.color.includes("lch")) {
        el.style.color = "#000000";
      }
    });

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Quotation.pdf");

    document.body.removeChild(wrapper);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start py-5 px-2 overflow-x-auto">
      {/* Auto-center + scale container */}
      <div className="flex justify-center items-start w-full overflow-x-auto">
        {/* Scale dynamically based on screen */}
        <div
          className="origin-top scale-[0.65] sm:scale-[0.8] md:scale-[0.95] lg:scale-[1]"
          style={{
            width: "210mm",
            minHeight: "297mm",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Quotation layout (A4 fixed) */}
          <div
            ref={quotationRef}
            className="relative bg-white text-black shadow-lg border p-4 sm:p-6 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "100%",
              transformOrigin: "top center",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 gap-10 mb-4">
              <div>
                <img src={qr} alt="logo" className="w-[290px] h-[50px]" />
              </div>
              <div>
                <h1 className="text-sm sm:text-lg font-bold">Aroun Systems & Safety Equipments</h1>
                <p className="text-[13px]">Manufacturer & Wholesalers For Fire & Safety Equipments</p>
                <p className="text-xs sm:text-sm mt-2">
                  GSTIN : 34ADXP... | Address : 38, 39, 2nd Cross Street, Green Garden, Lawspet Post, Puducherry - 605 008
                </p>
              </div>
              <div className="flex gap-2">
                <img src={qr2} alt="" className="w-[60px] h-[40px]" />
                <img src={qr3} alt="" className="w-[60px] h-[40px]" />
                <img src={qr4} alt="" className="w-[60px] h-[40px]" />
              </div>
            </div>

            <h1 className="text-center font-extrabold text-lg sm:text-xl mb-4">AROUN - QUOTATION</h1>

            {/* Buyer & Details */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="max-w-2xl p-3 border">
                <h2 className="font-bold">Buyer (Bill to)</h2>
                <p className="text-sm mt-3" contentEditable>Plot: 1/1 to 1/4, Mannadipet Commune,</p>
                <p className="text-sm mt-3" contentEditable>GSTIN/UIN :</p>
                <p className="text-sm mt-3" contentEditable>State Name : Code : 34</p>
                <p className="text-sm mt-3" contentEditable>Contact :</p>
                <p className="text-sm mt-3" contentEditable>Mobile :</p>
              </div>

              <div className="max-w-2xl p-3 border">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Voucher No.</h2>
                  <p className="text-sm mt-3" contentEditable>ASSE/25-26/8181</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Dated</h2>
                  <p className="text-sm mt-3" contentEditable>02/10/2025</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Mode/Terms of Payment</h2>
                  <p className="text-sm mt-3" contentEditable>02 Days</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Buyer's Ref./Order No.</h2>
                  <p className="text-sm mt-3" contentEditable>ASSE/25-26/8181</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Dispatched through</h2>
                  <p className="text-sm mt-3" contentEditable>By Hand</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Destination</h2>
                  <p className="text-sm mt-3" contentEditable>Free Door Delivery</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Dated</h2>
                  <p className="text-sm mt-3" contentEditable>Immediate</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-xs sm:text-sm border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Sl No.</th>
                    <th className="border px-2 py-1">Description</th>
                    <th className="border px-2 py-1">HSN</th>
                    <th className="border px-2 py-1">GST</th>
                    <th className="border px-2 py-1">Due On</th>
                    <th className="border px-2 py-1">Qty</th>
                    <th className="border px-2 py-1">Rate</th>
                    <th className="border px-2 py-1">Per</th>
                    <th className="border px-2 py-1">Disc %</th>
                    <th className="border px-2 py-1">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => {
                    const qty = parseFloat(row.qty) || 0;
                    const rate = parseFloat(row.rate) || 0;
                    const discount = parseFloat(row.discount) || 0;
                    const gst = parseFloat(String(row.gst || "").replace("%", "").trim()) || 0;
                    const amount = qty * rate;
                    const afterDiscount = amount - (amount * discount) / 100;
                    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;

                    return (
                      <tr key={row.id}>
                        <td className="border px-1 py-1 text-center">{row.sno}</td>
                        <td className="border px-1 py-1 text-left">{row.desc}</td>
                        <td className="border px-1 py-1 text-center">{row.hsn}</td>
                        <td className="border px-1 py-1 text-center">{row.gst}%</td>
                        <td className="py-2 px-4 border">
                          {row.dueOn ? new Date(row.dueOn).toLocaleDateString() : "-"}
                        </td>
                        <td className="border px-1 py-1 text-center">{row.qty}</td>
                        <td className="border px-1 py-1 text-right">{row.rate.toFixed(2)}</td>
                        <td className="border px-1 py-1 text-center">{row.unit}</td>
                        <td className="border px-1 py-1 text-center">{row.discount}</td>
                        <td className="border px-1 py-1 text-right">{finalAmt.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold">
                    <td colSpan={9} className="text-right border px-2 py-1">Total</td>
                    <td className="text-right border px-2 py-1">{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in Words + Bank Details */}
            <div className="grid grid-cols-2 gap-5 mt-4">
              <div className="border p-2 text-sm">
                <strong>Amount Chargeable (in words):</strong>
                <div>{amountWords}</div>
                <h1 className="font-bold mt-5">Declaration</h1>
                <p contentEditable>
                  Product Quality: Tested by QMS, EMS, OHSAS. No Sales Involved. Payments will be
                  received only in company name through Cheque... Goods once sold cannot taken back
                  in any Circumstances.
                </p>
              </div>

              <div className="border p-2 text-sm">
                <h1 className="font-bold">Company's Bank Details</h1>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Bank Name :</h2>
                  <p className="text-sm mt-3" contentEditable>HDFC BANK</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">A/c No. :</h2>
                  <p className="text-sm mt-3" contentEditable>50200000453361</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sm">Branch & IFS Code :</h2>
                  <p className="text-sm mt-3" contentEditable>45 FEET ROAD, & HDFC0001278</p>
                </div>
                <div>
                  <h1 className="ml-5 font-bold mt-3">
                    For Aroun Systems & Safety Equipments
                  </h1>
                </div>
                <div className="flex justify-end mt-7 font-bold">
                  <h1>Authorised Signatory</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
