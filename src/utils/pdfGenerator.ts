import jsPDF from 'jspdf';
import { Question } from '../types';

export const generatePDF = (questions: Question[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Add logo
  const logoWidth = 200;
  const logoHeight = 40;
  const logoX = (pageWidth - logoWidth) / 2;
  doc.addImage(
    'src/assets/logo.png',
    'JPEG',
    logoX,
    yPosition,
    logoWidth,
    logoHeight
  );

  yPosition += logoHeight + 15;

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const header = 'New Question Paper';
  const headerWidth = doc.getTextWidth(header);
  doc.text(header, (pageWidth - headerWidth) / 2, yPosition);

  yPosition += 25;

  // Questions
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  questions.forEach((question, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }

    // Original question
    doc.setFont('helvetica', 'bold');
    doc.text(`Q${index + 1}. ${question.original}`, margin, yPosition);
    yPosition += 10;

    // Selected variations
    doc.setFont('helvetica', 'normal');
    question.selectedVariations.forEach((varIndex) => {
      const variation = question.variations[varIndex];
      
      // Word wrap for long variations
      const lines = doc.splitTextToSize(variation, pageWidth - 2 * margin);
      
      lines.forEach((line: string) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(`• ${line}`, margin + 5, yPosition);
        yPosition += 7;
      });
    });

    yPosition += 10;
  });

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const footer = 'By PaperDev';
  const footerWidth = doc.getTextWidth(footer);
  doc.text(footer, (pageWidth - footerWidth) / 2, 280);

  // Save the PDF
  doc.save('question-paper.pdf');
};