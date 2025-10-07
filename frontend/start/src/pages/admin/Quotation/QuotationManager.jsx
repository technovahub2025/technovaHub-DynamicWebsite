import React, { useState } from "react";
import QuotationForm from "./QuotationForm";
import QuotationTable from "./QuotationTable";

const QuotationManager = () => {
  const [editData, setEditData] = useState(null);

  return (
    <div>
      <QuotationForm
        editData={editData}
        onUpdateComplete={() => setEditData(null)} 
      />
      <div className="px-10 mt-6">
        <QuotationTable
          onEdit={(quotation) => setEditData(quotation)}
        />
      </div>
    </div>
  );
};

export default QuotationManager;
