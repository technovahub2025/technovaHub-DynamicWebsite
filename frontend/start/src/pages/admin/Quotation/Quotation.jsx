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
          dueOn:it.dueOn,
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

  // Calculate total
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

  // Convert number to words
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
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convertNumber(n % 100) : "");
      if (n < 100000) return convertNumber(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convertNumber(n % 1000) : "");
      if (n < 10000000) return convertNumber(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convertNumber(n % 100000) : "");
      return convertNumber(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convertNumber(n % 10000000) : "");
    }

    let words = "";
    if (rupees > 0) words += convertNumber(rupees) + " Rupee" + (rupees !== 1 ? "s" : "");
    if (paise > 0) words += (rupees > 0 ? " And " : "") + convertNumber(paise) + " Paise";
    return words + " Only";
  }

  // Download PDF (safe for Tailwind v4)
  const handleDownloadPDF = async () => {
    const element = quotationRef.current;

    // Clone element and fix oklch colors
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

    // Offscreen wrapper
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Render canvas
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
    <div className="p-3 sm:p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <div ref={quotationRef} className="w-full max-w-5xl p-4 sm:p-6 shadow-lg border bg-white text-black">
        {/* Header */}
        <div className="flex  justify-between items-center border-b pb-4 mb-4">
          <div>
            <img src={qr} alt="logo" className="w-[250px] h-[50px]" />
          </div>
          <div className="text-center">
            <h1 className="text-sm sm:text-lg font-bold">Aroun Systems & Safety Equipments</h1>
            <p className="text-xs sm:text-sm">Manufacturer & Wholesalers For Fire & Safety Equipments</p>
            <p className="text-xs sm:text-sm">
              GSTIN : 34ADXP... | Address : 38, 39, 2nd Cross Street, Green Garden, Lawspet Post, Puducherry - 605 008
            </p>
          </div>
          <div className="flex gap-2">
            <img src={qr2} alt="" className="w-[60px] h-[40px]" />
            <img src={qr3} alt="" className="w-[60px] h-[40px]" />
            <img src={qr4} alt="" className="w-[60px] h-[40px]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center font-extrabold text-lg sm:text-xl mb-4">AROUN - QUOTATION</h1>


        <div className="grid grid-cols-2 gap-10 mb-3 ">
            <div className="max-w-2xl p-3 border-1  ">
               <h2 className="font-bold">Buyer (Bill to)</h2>
               <p>Plot: 1/1 to 1/4, Mannadipet Commune,</p>
               <p>GSTIN/UIN :</p>
               <p>State Name : Code : 34</p>
               <p>Contact :</p>
               <p>Mobile :</p>
            </div>

            <div className="max-w-2xl p-3 border-1  ">
                <h2>Voucher No.</h2>
                <h2>Dated</h2>
                <h3></h3>
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

        {/* Amount in words */}
        <div className="mt-4 border p-2 text-sm">
          <strong>Amount Chargeable (in words):</strong> {amountWords}
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
