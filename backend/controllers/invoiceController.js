import Invoice from "../models/Invoice.js";
import Client from "../models/Client.js";
import PDFDocument from "pdfkit";


// GET ALL INVOICES
export const getInvoices = async (req,res)=>{
  try{
    const invoices = await Invoice.find().populate("clientId","name phone email").sort({createdAt:-1});
    res.json(invoices);
  }catch(error){
    res.status(500).json({error:error.message});
  }
};


// CREATE INVOICE
export const createInvoice = async (req,res)=>{

try{

const {clientId,projectName,price,advance} = req.body;

const remaining = price - advance;

const invoiceNumber = "INV-" + Date.now();

const invoice = new Invoice({
clientId,
projectName,
price,
advance,
remaining,
invoiceNumber
});

await invoice.save();

res.json({
message:"Invoice created",
invoice
});

}catch(error){

res.status(500).json({error:error.message});

}

};




// DOWNLOAD INVOICE PDF
export const downloadInvoice = async (req,res)=>{
  try{
    const invoice = await Invoice.findById(req.params.id).populate("clientId");
    if(!invoice){
      return res.status(404).json({message:"Invoice not found"});
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type","application/pdf");
    doc.pipe(res);

    // Document styling variables
    const primaryColor = '#4f46e5';
    const textColor = '#333333';
    const mutedColor = '#666666';

    // ── Header ──
    doc.fillColor(primaryColor)
       .fontSize(28)
       .text("CODESPARK", 50, 50);
       
    doc.fillColor(mutedColor)
       .fontSize(10)
       .text("Web Design & Development Agency", 50, 80)
       .text("contact@codespark.com | +91 98765 43210", 50, 95);

    // ── Invoice Title & Meta ──
    doc.fillColor(textColor)
       .fontSize(20)
       .text("INVOICE", 50, 140, { align: 'right' });
       
    doc.fillColor(mutedColor)
       .fontSize(10)
       .text(`Invoice No: ${invoice.invoiceNumber || invoice._id.toString().slice(-6).toUpperCase()}`, 50, 165, { align: 'right' })
       .text(`Date: ${new Date(invoice.createdAt || invoice.date).toLocaleDateString()}`, 50, 180, { align: 'right' })
       .text(`Status: ${invoice.remaining === 0 ? 'PAID' : 'DUE'}`, 50, 195, { align: 'right' });

    // ── Billed To ──
    doc.fillColor(primaryColor).fontSize(12).text("BILLED TO", 50, 150);
    doc.fillColor(textColor).fontSize(14).text(invoice.clientId.name || 'Client Name', 50, 170);
    doc.fillColor(mutedColor).fontSize(10);
    if(invoice.clientId.company) doc.text(invoice.clientId.company, 50, 188);
    if(invoice.clientId.email) doc.text(invoice.clientId.email, 50, 203);
    if(invoice.clientId.phone) doc.text(invoice.clientId.phone, 50, 218);

    // ── Line ──
    doc.moveTo(50, 260).lineTo(550, 260).lineWidth(1).strokeColor('#e5e7eb').stroke();

    // ── Project Details Title ──
    doc.fillColor(primaryColor).fontSize(12).text("PROJECT DETAILS", 50, 290);
    
    // ── Table Header ──
    doc.fillColor('#f9fafb').rect(50, 320, 500, 30).fill();
    doc.fillColor(textColor).fontSize(10).font('Helvetica-Bold')
       .text("Description", 60, 330)
       .text("Total", 450, 330, { width: 90, align: 'right' });

    // ── Table Body ──
    doc.font('Helvetica').fillColor(textColor)
       .text(invoice.projectName || 'Project Service', 60, 365)
       .text(`Rs. ${invoice.price.toLocaleString()}`, 450, 365, { width: 90, align: 'right' });

    doc.moveTo(50, 395).lineTo(550, 395).strokeColor('#e5e7eb').stroke();

    // ── Calculations ──
    let currentY = 415;
    doc.fontSize(10).fillColor(mutedColor);
    doc.text("Subtotal", 350, currentY);
    doc.fillColor(textColor).text(`Rs. ${invoice.price.toLocaleString()}`, 450, currentY, { width: 90, align: 'right' });

    currentY += 20;
    doc.fillColor(mutedColor).text("Advance Paid", 350, currentY);
    doc.fillColor('#10b981').text(`- Rs. ${invoice.advance.toLocaleString()}`, 450, currentY, { width: 90, align: 'right' });

    currentY += 25;
    doc.fillColor('#ef4444').font('Helvetica-Bold').fontSize(12);
    doc.text("Balance Due", 350, currentY);
    doc.text(`Rs. ${invoice.remaining.toLocaleString()}`, 450, currentY, { width: 90, align: 'right' });

    // ── Footer ──
    doc.fillColor(mutedColor).fontSize(10).font('Helvetica');
    doc.text("Thank you for your business!", 50, 680, { align: 'center' });
    doc.text("If you have any questions concerning this invoice, contact us.", 50, 695, { align: 'center' });

    doc.end();

  }catch(error){
    console.log(error);
    res.status(500).json({error:error.message});
  }
};

// DELETE INVOICE
export const deleteInvoice = async (req,res)=>{

try{

const invoice = await Invoice.findByIdAndDelete(req.params.id);

if(!invoice){
return res.status(404).json({message:"Invoice not found"});
}

res.json({
message:"Invoice deleted successfully"
});

}catch(error){

res.status(500).json({error:error.message});

}

};