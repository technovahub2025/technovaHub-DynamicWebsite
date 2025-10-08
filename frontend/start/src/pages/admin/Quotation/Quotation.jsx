import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getQuotation } from "../../../api/quotationApi";
import qr from "../../../assets/images/qrlogo.jpeg";
import qr2 from "../../../assets/images/iso.jpg";
import qr3 from "../../../assets/images/fsai.png";
import qr4 from "../../../assets/images/gmp.jpg";
import { FaDownload } from "react-icons/fa";

export default function QuotationUI() {
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
    bankName: "HDFC BANK",
    accountNo: "50200000453361",
    branchIfsc: "45 FEET ROAD, & HDFC0001278",
  });

  // Fetch data from API
  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getQuotation();
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Total calculation
  const total = items.reduce((acc, row) => {
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
    // Step 1: Clone the quotation element
    const clone = quotationRef.current.cloneNode(true);

    // Step 2: Apply A4 dimensions and remove scaling
    Object.assign(clone.style, {
      transform: "scale(1)",
      width: "210mm",
      minHeight: "297mm",
      position: "absolute",
      top: "-9999px",
      left: "0",
      background: "white",
      maxWidth: "100%",
      zoom: "1", // ensure normal scale
    });

    // Step 3: Append clone off-screen (not visible)
    document.body.appendChild(clone);

    // Step 4: Generate canvas from unscaled clone
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 210 * 4, // ensures high-res A4 capture
      windowHeight: 297 * 4,
    });

    // Step 5: Convert canvas to image and add to PDF
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

    // Step 6: Remove temporary clone
    document.body.removeChild(clone);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};



  if (loading) return <div className="flex justify-center items-center  h-[100vh]">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-8 px-2 md:px-4">
      {/* Download Button */}
      <div className="mb-6 w-full flex justify-end no-print px-2 md:px-0">
        <button
          onClick={handleDownload}
          className="shadow-lg p-2 bg-green-200 flex items-center gap-2 text-sm md:text-base"
        >
          <FaDownload />
          <span>Download Quotation</span>
        </button>
      </div>

      {/* Scrollable scalable container */}
      <div className="flex justify-center items-start w-full overflow-x-auto overflow-y-auto">
        <div
          className="
            origin-top
            w-[1000px] h-[400px] scale-[0.40]
            sm:w-[1000px] sm:h-[900px] sm:scale-[0.20]
            md:w-[190mm] md:scale-[0.95]
            lg:w-[210mm] lg:scale-[1]
          "
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          {/* Quotation layout (A4 fixed) */}
          <div
            ref={quotationRef}
            className="relative bg-white text-black shadow-lg border p-4 sm:p-6 overflow-hidden"
            style={{ width: "210mm", minHeight: "297mm", maxWidth: "100%", transformOrigin: "top center" }}
          >
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center border-b pb-4 gap-10 mb-4">
              <div>
                <img src={qr} alt="logo" className="md:w-[290px] md:h-[50px]" />
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

            {/* Title */}
            <div className="flex justify-center mb-5">
              <h1 className="font-extrabold text-xl">AROUN - QUOTATION</h1>
            </div>

            {/* Buyer & Voucher Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border border-border rounded">
                <h3 className="font-bold text-foreground mb-3">Buyer (Bill to)</h3>
                {Object.entries(buyerInfo).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-sm mt-2 text-foreground"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setBuyerInfo({ ...buyerInfo, [key]: e.currentTarget.textContent || "" })}
                  >
                    {key === "gstin" ? `GSTIN/UIN: ${value}` :
                     key === "stateCode" ? `State Code: ${value}` :
                     key === "contact" ? `Contact: ${value}` :
                     key === "mobile" ? `Mobile: ${value}` :
                     value
                    }
                  </p>
                ))}
              </div>

              <div className="p-4 border border-border rounded">
                {Object.entries(voucherInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center mt-2">
                    <h4 className="font-semibold text-sm text-foreground">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </h4>
                    <p
                      className="text-sm text-foreground"
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={(e) => setVoucherInfo({ ...voucherInfo, [key]: e.currentTarget.textContent || "" })}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border border-collapse">
                <thead>
                  <tr className="bg-muted text-center">
                    <th className="px-2 py-1 border border-border">Sl No.</th>
                    <th className="px-2 py-1 border border-border text-left">Description</th>
                    <th className="px-2 py-1 border border-border">HSN</th>
                    <th className="px-2 py-1 border border-border">GST%</th>
                    <th className="px-2 py-1 border border-border">Due On</th>
                    <th className="px-2 py-1 border border-border text-right">Qty</th>
                    <th className="px-2 py-1 border border-border text-right">Rate</th>
                    <th className="px-2 py-1 border border-border text-left">Unit</th>
                    <th className="px-2 py-1 border border-border text-right">Disc%</th>
                    <th className="px-2 py-1 border border-border text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, index) => {
                    const qty = Number(row.qty) || 0;
                    const rate = Number(row.rate) || 0;
                    const discount = Number(row.discount) || 0;
                    const gst = Number(row.gst) || 0;
                    const amount = qty * rate;
                    const afterDiscount = amount - (amount * discount) / 100;
                    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;

                    return (
                      <tr key={row.id} className="text-sm text-foreground">
                        <td className="px-2 py-1 border border-border text-center">{index+1}</td>
                        <td className="px-2 py-1 border border-border text-left">{row.desc}</td>
                        <td className="px-2 py-1 border border-border text-center">{row.hsn}</td>
                        <td className="px-2 py-1 border border-border text-center">{gst}%</td>
                        <td className="px-2 py-1 border border-border text-center">{row.dueOn ? new Date(row.dueOn).toLocaleDateString() : "-"}</td>
                        <td className="px-2 py-1 border border-border text-right">{qty}</td>
                        <td className="px-2 py-1 border border-border text-right">{rate.toFixed(2)}</td>
                        <td className="px-2 py-1 border border-border text-left">{row.unit}</td>
                        <td className="px-2 py-1 border border-border text-right">{discount}</td>
                        <td className="px-2 py-1 border border-border text-right">{finalAmt.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold text-right bg-muted">
                    <td colSpan={9} className="px-2 py-1 border border-border text-right">Total</td>
                    <td className="px-2 py-1 border border-border text-right">{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Declaration + Bank Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded p-4">
                <strong className="text-foreground">Amount Chargeable (in words):</strong>
                <div className="mt-2 text-sm text-foreground">{amountWords}</div>
                <h4 className="font-bold mt-6 text-foreground">Declaration</h4>
                <p
                  className="mt-2 text-xs text-muted-foreground"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={(e) =>
                    setDeclarationInfo({ ...declarationInfo, declarationText: e.currentTarget.textContent || "" })
                  }
                >
                  {declarationInfo.declarationText}
                </p>
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
                    <p
                      className="text-sm text-foreground"
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={(e) =>
                        setDeclarationInfo({ ...declarationInfo, [key]: e.currentTarget.textContent || "" })
                      }
                    >
                      {declarationInfo[key]}
                    </p>
                  </div>
                ))}
                <div className="mt-6">
                  <h5 className="font-bold text-foreground">For Aroun Systems & Safety Equipments</h5>
                </div>
                <div className="flex justify-end mt-8 font-bold text-foreground">
                  <h5>Authorised Signatory</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
