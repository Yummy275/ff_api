const { jsPDF } = require('jspdf');

exports.createIssuePdf = (data, pdfFileName) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter',
    });
    const fullName = `${data.firstName} ${data.lastName}`;
    const address = `${data.street} ${data.city} ${data.state}, ${data.zip}`;
    const customerInfoStrings = [
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
    doc.setFontSize(20);
    doc.text('FastFix Computer Repair', 10, 10);
    doc.setFontSize(16);
    doc.text(customerInfoStrings, 10, 30);

    doc.save(pdfFileName);
};
