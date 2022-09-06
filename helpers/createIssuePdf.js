const { jsPDF } = require('jspdf');
const { legalWords } = require('./legalWords');
const fs = require('fs');

exports.createIssuePdf = (data, pdfFileName) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter',
    });
    const today = new Date();
    const fullName = `${data.firstName} ${data.lastName}`;
    const address = `${data.street} ${data.city} ${data.state}, ${data.zip}`;
    const customerInfoStrings = [
        today.toLocaleDateString(),
        `Name: ${fullName}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Address: ${address}`,
        `Issue: ${data.issue}`,
    ];
    if (data.accessories) {
        customerInfoStrings.push('Left accessories');
    }
    doc.setLineHeightFactor(1.5);
    doc.setFontSize(22);
    doc.text('FastFix Computer Repair', 10, 10);
    doc.setFontSize(16);
    doc.text(customerInfoStrings, 10, 30);

    doc.addPage();
    doc.setFontSize(8);
    const legalText = [];
    for (const section in legalWords) {
        legalText.push(legalWords[section]);
    }
    doc.text(legalText, 10, 10, { maxWidth: 195 });
    doc.setFontSize(16);
    doc.text(today.toLocaleDateString(), 10, 200);
    doc.addImage(data.signature, 10, 210);

    //save pdf and move into folder
    const fileName = pdfFileName + '.pdf';
    doc.save(fileName);
    if (!fs.existsSync(process.env.PDF_SAVE_PATH)) {
        fs.mkdirSync(process.env.PDF_SAVE_PATH);
    }
    const oldPath = `./${fileName}`;
    const newPath = process.env.PDF_SAVE_PATH + `/${fileName}`;
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
    });
};
