import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getInvoice } from "../../../api/invoiceApi";

import { FaDownload } from "react-icons/fa";

export default function InvoiceCertificate() {
  const quotationRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [buyerInfo, setBuyerInfo] = useState({
    address: "Plot: 1/1 to 1/4, Mannadipet Commune,",
    gstin: "34XXXXX1234X1XX",
    stateCode: "34",
    contact: "John Doe",
    mobile: "+91 9876543210",
  });

  const [voucherInfo, setVoucherInfo] = useState({
    voucherNo: "ASSE/25-26/8181",
    dated: "02/10/2025",
    paymentMode: "02 Days",
    buyerRef: "ASSE/25-26/8181",
    dispatchedThrough: "By Hand",
    destination: "Free Door Delivery",
    immediateDated: "Immediate",
  });

  const [declarationInfo, setDeclarationInfo] = useState({
    declarationText:
      "Product Quality: Tested by QMS, EMS, OHSAS. No Sales Involved. Payments will be received only in company name through Cheque. Goods once sold cannot be taken back in any circumstances.",
    bankName: "STATE BANK OF INDIA, VILLIYANUR",
    accountNo: "41331089375",
    branchIfsc: "SBIN0016854",
    AccountName:"TECHNOVAHUB"
  });

  // Filters
  const [searchDesc, setSearchDesc] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  // Fetch data
  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getInvoice();
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Unique batch options
  const batchOptions = ["All", ...Array.from(new Set(items.map(item => item.batch).filter(Boolean)))];

  // Filtered items
  const filteredItems = items.filter((row) => {
    const matchesDesc = row.desc.toLowerCase().includes(searchDesc.toLowerCase());
    const matchesBatch = batchFilter ? (row.batch || "") === batchFilter : true;
    return matchesDesc && matchesBatch;
  });

  // Total based on filtered items
  const total = filteredItems.reduce((acc, row) => {
    const qty = Number(row.qty) || 0;
    const rate = Number(row.rate) || 0;
    const discount = Number(row.discount) || 0;
    const gst = Number(row.gst) || 0;

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

  const handleDownload = async () => {
    if (!quotationRef.current) return;
    try {
      const clone = quotationRef.current.cloneNode(true);
      Object.assign(clone.style, {
        transform: "scale(1)",
        width: "210mm",
        minHeight: "297mm",
        position: "absolute",
        top: "-9999px",
        left: "0",
        background: "white",
        maxWidth: "100%",
        zoom: "1",
      });
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 210 * 4,
        windowHeight: 297 * 4,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Quotation_${voucherInfo.voucherNo}.pdf`);
      document.body.removeChild(clone);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh] ">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-8 px-2 md:px-4">
      {/* Download Button */}
      <div className="mb-6 w-full flex justify-center no-print px-2 md:px-0">
        <button
          onClick={handleDownload}
          className="shadow-lg p-3 rounded-md bg-blue-400 text-white flex items-center gap-2 text-sm md:text-base"
        >
          <FaDownload />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 w-full max-w-[1000px] px-2 md:px-0">
        <input
          type="text"
          placeholder="Search Description..."
          className="border border-blue-500 outline-none p-2 rounded w-1/2"
          value={searchDesc}
          onChange={(e) => setSearchDesc(e.target.value)}
        />

        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="border border-blue-500 outline-none p-2 rounded w-1/2"
        >
          {batchOptions.map((batch, idx) => (
            <option key={idx} value={batch === "All" ? "" : batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable container */}
      <div className="flex justify-center items-start w-full overflow-x-auto overflow-y-auto">
        <div className="origin-top w-[1000px] h-[400px] scale-[0.40] sm:w-[1000px] sm:h-[900px] sm:scale-[0.20] md:w-[190mm] md:scale-[0.95] lg:w-[210mm] lg:scale-[1]" style={{ transition: "transform 0.3s ease-in-out" }}>
          <div ref={quotationRef} className="relative bg-white text-black shadow-xl border-none  p-4 sm:p-6 overflow-hidden" style={{ width: "210mm", minHeight: "297mm", maxWidth: "100%", transformOrigin: "top center" }}>
            
            {/* --- HEADER --- */}
           



            {/* Title */}
            <div style={{color:"#3d7fe2ff"}} className="flex justify-center mb-5"><h1 className="font-bold text-md">INVOICE</h1></div>

              <div className="flex justify-between w-full gap-10 ">
                <p className="text-[11px]">No.48, First Floor,
                  
<br />
Lawspet Main Road, Puducherry - 605008</p>

<p className="text-[11px] text-right">Phone: 9360962810 | Email: technovahubcareer@gmail.com  <br /> GSTIN: 34ADXPA0879K1Z3 | State: 34-Puducherry</p>

              </div>

         <hr />


            {/* Buyer & Voucher Info */}
            <div    className="grid grid-cols-2 gap-10 mb-6 mt-6">
              <div className="">
                <h3 style={{color:"blue"}}  className="font-bold text-foreground mb-3">Invoice To</h3>
               <hr />
                <h3   className="font-medium mb-1 mt-2">GST IN</h3>
              <p contentEditable={true} className="text-sm" >
  34ADXPA0879K1Z3
</p>
                <hr />

                 <h3   className="font-medium mb-1 mt-2">Address</h3>
              <textarea className="w-full text-sm" contentEditable={true}  >
 38.39 2ND CROSS STREET GREEN GARDEN
</textarea>
                <hr />
              </div>

             <div >
  {/* Row 1 */}
  <div style={{ display: "flex", borderBottom: "1px solid #c4d6f1ff" }}>
    <div style={{ flex: 1, padding: "10px", border: "1px solid #c4d6f1ff" }} className="font-medium text-sm">Invoice #</div>
    <div style={{ flex: 1, padding: "10px" ,border: "1px solid #c4d6f1ff" }}>Row 1, Col 2</div>
  </div>

  {/* Row 2 */}
  <div style={{ display: "flex", borderBottom: "1px solid #c4d6f1ff" }}>
    <div style={{ flex: 1, padding: "10px", border: "1px solid #c4d6f1ff" }} className="font-medium text-sm">Date</div>
    <div style={{ flex: 1, padding: "10px" , border: "1px solid #c4d6f1ff"}}>Row 2, Col 2</div>
  </div>

  {/* Row 3 */}
  <div style={{ display: "flex" , borderBottom: "1px solid #c4d6f1ff" }}>
    <div style={{ flex: 1, padding: "10px", border: "1px solid #c4d6f1ff" }} className="font-medium text-sm">Due Date</div>
    <div style={{ flex: 1, padding: "10px" ,border: "1px solid #c4d6f1ff" }}>Row 3, Col 2</div>
  </div>
</div>

            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-6">
             <table
  className="w-full text-sm border border-collapse"
  style={{ backgroundColor: "white", borderColor: "#d1d5db" }}
>
  <thead>
    <tr
      style={{
        backgroundColor: "#3b82f6",
        color: "white",
        textAlign: "center",
      }}
    >
      <th style={{ border: "1px solid #d1d5db", padding: "6px" }}>Sl No.</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>Description</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px" }}>HSN</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px" }}>GST%</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px" }}>Due On</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>Qty</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>Rate</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>Unit</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>Disc%</th>
      <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>Amount</th>
    </tr>
  </thead>

  <tbody>
    {filteredItems.map((row, index) => {
      const qty = Number(row.qty) || 0;
      const rate = Number(row.rate) || 0;
      const discount = Number(row.discount) || 0;
      const gst = Number(row.gst) || 0;
      const amount = qty * rate;
      const afterDiscount = amount - (amount * discount) / 100;
      const finalAmt = afterDiscount + (afterDiscount * gst) / 100;

      return (
        <tr key={row.id} style={{ color: "#111827" }}>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "center" }}>
            {index + 1}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>
            {row.desc}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "center" }}>
            {row.hsn}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "center" }}>
            {gst}%
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "center" }}>
            {row.dueOn ? new Date(row.dueOn).toLocaleDateString() : "-"}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>
            {qty}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>
            {rate.toFixed(2)}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>
            {row.unit}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>
            {discount}
          </td>
          <td style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}>
            {finalAmt.toFixed(2)}
          </td>
        </tr>
      );
    })}
    <tr style={{ fontWeight: "bold", backgroundColor: "#f3f4f6" }}>
      <td
        colSpan={9}
        style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}
      >
        Total
      </td>
      <td
        style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "right" }}
      >
        {total.toFixed(2)}
      </td>
    </tr>
  </tbody>
</table>

            </div>

            <div className="flex justify-end ">

<div className="mt-2 text-[10px] mb-10">{amountWords}</div>
            </div>

            {/* Declaration + Bank */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded p-4">
                
                
                <h4 className="font-bold mt-6 text-foreground">Declaration</h4>
                <p className="mt-2 text-xs text-muted-foreground" contentEditable suppressContentEditableWarning={true} onInput={(e) => setDeclarationInfo({ ...declarationInfo, declarationText: e.currentTarget.textContent || "" })}>{declarationInfo.declarationText}</p>
              </div>

              <div className="border border-border rounded p-4">
                <h4 className="font-bold text-foreground mb-3">Company's Bank Details</h4>
                {[
                  { key: "bankName", label: "Bank Name:" },
                  { key: "accountNo", label: "A/c No.:" },
                  { key: "branchIfsc", label: "Branch & IFS Code:" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex justify-between items-center mt-2">
                    <h5 className="font-semibold text-sm text-foreground">{label}</h5>
                    <p className="text-sm text-foreground" contentEditable suppressContentEditableWarning={true} onInput={(e) => setDeclarationInfo({ ...declarationInfo, [key]: e.currentTarget.textContent || "" })}>{declarationInfo[key]}</p>
                  </div>
                ))}
                <div className="mt-6">
                  <h5 className="font-bold text-foreground">For TECHNOVAHUB</h5>
                </div>
                <div className="flex justify-end mt-8 font-bold text-foreground">
                  <h5>Authorized Signatory</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
