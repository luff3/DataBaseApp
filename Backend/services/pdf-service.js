const PDFDocument = require('pdfkit');

function buildPDF(text, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(20).text(`A heading`);

    doc
        .fontSize(12)
        .text(text);
    doc.end();
}

module.exports = { buildPDF };