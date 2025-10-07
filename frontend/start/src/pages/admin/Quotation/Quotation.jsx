import React, { useEffect, useRef, useState } from 'react';
import { getQuotation } from '../../../api/quotationApi';
// import apiClient from '../../../api/apiClient';

export default function QuotationUI() {
  const quotationRef = useRef(null);
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [amountWords, setAmountWords] = useState('INR Zero Only');

  // Load items from API
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
          batch: it.batch || '',
          qty: it.qty || 0,
          rate: it.rate || 0,
          unit: it.unit || '',
          discount: it.discount || 0,
          amount: it.amount || 0
        }));
        setItems(mapped);
      } catch (err) {
        console.error('Error fetching quotations:', err);
        setItems([]);
      }
    }
    fetchItems();
  }, []);

  // Recalculate totals whenever items change
  useEffect(() => {
    let t = 0;
    const updatedItems = items.map(row => {
      const qty = parseFloat(row.qty) || 0;
      const rate = parseFloat(row.rate) || 0;
      const discount = parseFloat(row.discount) || 0;
      const gst = parseFloat(String(row.gst || '').replace('%', '').trim()) || 0;

      let amount = qty * rate;
      let discountAmt = amount * (discount / 100);
      let afterDiscount = amount - discountAmt;
      let gstAmt = afterDiscount * (gst / 100);
      let finalAmt = afterDiscount + gstAmt;

      t += finalAmt;

      return { ...row, amount: finalAmt.toFixed(2) };
    });
    setItems(updatedItems);
    setTotal(t);
    setAmountWords('INR ' + numberToWords(t));
  }, [items]);

  // Convert number to words
  function numberToWords(num) {
    if (!isFinite(num)) return 'Zero Only';
    if (num === 0) return 'Zero Only';
    const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
      "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const b = ["","", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);

    function convertNumber(n) {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n/10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n/100)] + " Hundred" + (n % 100 ? " " + convertNumber(n % 100) : "");
      if (n < 100000) return convertNumber(Math.floor(n/1000)) + " Thousand" + (n % 1000 ? " " + convertNumber(n % 1000) : "");
      if (n < 10000000) return convertNumber(Math.floor(n/100000)) + " Lakh" + (n % 100000 ? " " + convertNumber(n % 100000) : "");
      return convertNumber(Math.floor(n/10000000)) + " Crore" + (n % 10000000 ? " " + convertNumber(n % 10000000) : "");
    }

    let words = '';
    if (rupees > 0) words += convertNumber(rupees) + ' Rupee' + (rupees !== 1 ? 's' : '');
    if (paise > 0) words += (rupees > 0 ? ' And ' : '') + convertNumber(paise) + ' Paise';
    return (words || 'Zero') + ' Only';
  }

  // --- Row operations ---
  function addRow() {
    setItems(prev => [...prev, {
      id: Date.now(),
      sno: prev.length + 1,
      desc: '',
      hsn: '',
      gst: '',
      batch: '',
      qty: '',
      rate: '',
      unit: '',
      discount: '',
      amount: 0
    }]);
  }

  function removeRow(id) {
    setItems(prev => prev.filter(it => it.id !== id).map((it, idx) => ({ ...it, sno: idx + 1 })));
  }

  function updateField(id, field, value) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  }

  // --- Reset / PDF / Excel ---
  function resetAll() {
    if (!window.confirm('Are you sure? All data will be cleared.')) return;
    setItems([]);
    setTotal(0);
    setAmountWords('INR Zero Only');
  }

  function exportPDF() {
    const el = quotationRef.current;
    if (!el || !window.html2pdf) return alert('html2pdf not found!');
    window.html2pdf().set({
      margin: 0.2, filename: 'Quotation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(el).save();
  }

  function downloadExcel() {
    if (!window.XLSX) return alert('XLSX not found!');
    const wsData = [["Sl No.","Description","HSN/SAC","GST Rate","Due On","Qty","Rate","Unit","Disc %","Amount"]];
    items.forEach(it => wsData.push([it.sno,it.desc,it.hsn,it.gst,it.batch,it.qty,it.rate,it.unit,it.discount,it.amount]));
    const ws = window.XLSX.utils.aoa_to_sheet(wsData);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Quotation');
    window.XLSX.writeFile(wb, 'Quotation.xlsx');
  }

  function handleLoadExcel(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = new Uint8Array(ev.target.result);
      const workbook = window.XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const arr = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      arr.shift(); // remove header
      const formatted = arr.map((row, idx) => ({
        id: Date.now() + idx,
        sno: row[0] || idx+1,
        desc: row[1] || '',
        hsn: row[2] || '',
        gst: row[3] || '',
        batch: row[4] || '',
        qty: row[5] || 0,
        rate: row[6] || 0,
        unit: row[7] || '',
        discount: row[8] || 0,
        amount: row[9] || 0
      }));
      setItems(formatted);
      alert('Excel data loaded!');
    };
    reader.readAsArrayBuffer(file);
    e.target.value = null;
  }

  return (
    <div className="p-3 sm:p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center w-full max-w-5xl mb-4">
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={addRow}>Add Row</button>
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={exportPDF}>Download PDF</button>
        <button className="px-3 py-2 bg-gray-600 text-white rounded" onClick={resetAll}>Reset</button>
        <button className="px-3 py-2 bg-yellow-600 text-white rounded" onClick={() => fileInputRef.current.click()}>Load Excel</button>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={downloadExcel}>Download Excel</button>
        <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleLoadExcel} className="hidden" />
      </div>

      {/* Quotation Table */}
      <div ref={quotationRef} className="w-full max-w-5xl bg-white p-4 sm:p-6 shadow-lg border">
        <h1 className="text-center font-extrabold text-lg sm:text-xl mb-4">AROUN - QUOTATION</h1>
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
                <th className="border px-2 py-1">Unit</th>
                <th className="border px-2 py-1">Disc %</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">✕</th>
              </tr>
            </thead>
            <tbody>
              {items.map(row => (
                <tr key={row.id}>
                  <td className="border px-1 py-1 text-center">{row.sno}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'desc',e.currentTarget.innerText)}>{row.desc}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'hsn',e.currentTarget.innerText)}>{row.hsn}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'gst',e.currentTarget.innerText)}>{row.gst}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'batch',e.currentTarget.innerText)}>{row.batch}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'qty',e.currentTarget.innerText)}>{row.qty}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'rate',e.currentTarget.innerText)}>{row.rate}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'unit',e.currentTarget.innerText)}>{row.unit}</td>
                  <td contentEditable suppressContentEditableWarning className="border px-1 py-1" onInput={e => updateField(row.id,'discount',e.currentTarget.innerText)}>{row.discount}</td>
                  <td className="border px-1 py-1 text-right">{row.amount}</td>
                  <td className="border px-1 py-1 text-center"><button className="text-red-600 font-bold" onClick={() => removeRow(row.id)}>✕</button></td>
                </tr>
              ))}
              <tr className="font-bold">
                <td colSpan={9} className="text-right border px-2 py-1">Total</td>
                <td className="border px-2 py-1 text-right">{total.toFixed(2)}</td>
                <td className="border px-2 py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="border p-2 flex-1 text-xs sm:text-sm">
            <div><strong>Amount Chargeable (in words)</strong></div>
            <div className="mt-1">{amountWords}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
