import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export function generateCertificateBuffer({ participantName, event, templatePath, signaturePath }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 40 });
    const chunks = [];
    doc.on('data', (d) => chunks.push(d));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    // Background template
    if (templatePath && fs.existsSync(templatePath)) {
      try {
        doc.image(templatePath, 0, 0, { width: doc.page.width, height: doc.page.height });
      } catch {}
    } else {
      // Minimalist background
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
      doc.fillColor('#1e40af').fontSize(18).text('Certificate of Participation', { align: 'center' });
    }

    // Content
    doc.moveDown(3);
    doc.fillColor('#111827').fontSize(28).text(participantName, { align: 'center' });
    doc.moveDown(1);
    doc.fillColor('#374151').fontSize(16).text(`for successfully attending ${event.title}`, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Date: ${new Date(event.endDateTime || event.startDateTime).toDateString()}`, { align: 'center' });

    // Signature
    if (signaturePath && fs.existsSync(signaturePath)) {
      const sigWidth = 180;
      const sigY = doc.page.height - 140;
      doc.image(signaturePath, doc.page.width / 2 - sigWidth / 2, sigY, { width: sigWidth });
      doc.fontSize(10).fillColor('#6b7280').text('Organizer', 0, sigY + 70, { align: 'center' });
    }

    doc.end();
  });
}
