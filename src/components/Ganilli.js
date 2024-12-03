import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/styles/Cartel.css';
import { useLocation } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';
import { toPng } from 'html-to-image';

export default function GraficaPH() {
  const location = useLocation();
  const { analysis } = location.state || {};
  console.log(analysis);

  const chartRef = useRef(null);

  const phGeneral = analysis?.resultados_general?.data_analysis[0]?.ph || 7; // Valor por defecto 7 si no se encuentra el dato
  const maxPhValue = 14;

  let phType = 'Neutro';
  let phMessage = 'El pH del suelo es neutro, lo cual es óptimo para la mayoría de los cultivos.';
  if (phGeneral <= 6) {
    phType = 'Ácido';
    phMessage = 'El pH del suelo es ácido, lo que puede dificultar el desarrollo de la mayoría de los cultivos y la retención de muchos nutrientes.';
  } else if (phGeneral >= 8) {
    phType = 'Alcalino';
    phMessage = 'El pH del suelo es alcalino, lo que puede dificultar el desarrollo de la mayoría de los cultivos y provocar clorosis férrica.';
  }

  const data = {
    labels: ['Ácido (0-6)', 'Neutro (6.1-7.9)', 'Alcalino (8-14)'],
    datasets: [
      {
        data: [6, 1.9, 6],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        borderColor: '#fff',
        borderWidth: 2,
        hoverBorderColor: '#000',
        hoverBorderWidth: 3
      },
      {
        data: [phGeneral, maxPhValue - phGeneral],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(0, 0, 0, 0)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(0, 0, 0, 0)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 12,
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        hoverBorderWidth: 12,
        cutout: '60%'
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14
          }
        }
      },
      datalabels: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    cutout: '60%', // Ajustamos el cutout para que el centro sea más grande
    rotation: 0,
    circumference: 360
  };

  const downloadPDF = async () => {
    const input = chartRef.current;

    const imgData = await toPng(input, { quality: 1.0 });
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const img = await pdfDoc.embedPng(imgData);
    const { width, height } = img.scale(0.5);

    page.drawImage(img, {
      x: page.getWidth() / 2 - width / 2,
      y: page.getHeight() / 2 - height / 2 + 50,
      width,
      height
    });

    page.drawText('TERRATEST', {
      x: page.getWidth() / 2 - 50,
      y: 20,
      size: 30,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'grafica-ph.pdf';
    link.click();
  };

  return (
    <div className="containertres">
      <h1>Gráfica de pH del Suelo</h1>
      <div className="content" ref={chartRef}>
        <div className="chart-container">
          <Doughnut data={data} options={options} />
          <div className="center-text">
            <span>pH General: {phGeneral}</span>
          </div>
        </div>
        <div className="ph-message">
          <p>{phMessage}</p>
        </div>
      </div>
      <button onClick={downloadPDF} className="download-button">Descargar PDF</button>
    </div>
  );
}
