import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Pie } from 'react-chartjs-2';
import Modal from 'react-modal';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import '../assets/styles/Resultados.css';
import GeneratePdf from './GeneratoPdf';

Modal.setAppElement('#root'); // Ensure the modal is accessible

// Registrar el plugin de datalabels
Chart.register(ChartDataLabels);

export default function Resultados() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        hoverBorderColor: [],
        hoverBorderWidth: 3,
      }
    ]
  });
  const id_user = localStorage.getItem('id_user')
  const [activeTimers, setActiveTimers] = useState({});
  const zoneRefs = useRef({});
  const chartRef = useRef();

  const cultivosList = ['Café', 'Cacao', 'Maíz', 'Mango', 'Caña', 'Plátano', 'Frijol', 'Cacahuate', 'Calabaza', 'Cebolla', 'Aguacate'];

  const fetchAnalysis = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/results/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setAnalysis(data[id]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setError('Error fetching analysis');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();

    const intervalId = setInterval(fetchAnalysis, 5000); // Check for updates every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [id]);

  const showAutoCloseAlert = (timer) => {
    let timerInterval;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: timer,
      timerProgressBar: true,
      allowOutsideClick: false, // Prevent closing by clicking outside
      allowEscapeKey: false, // Prevent closing with the escape key
      allowEnterKey: false, // Prevent closing with the enter key
      didOpen: () => {
        Swal.showLoading();
        const timerElement = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          timerElement.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  const handleStartAnalysis = async (zoneId) => {
    Swal.fire({
      title: '<span class="swal-title">¿Estás seguro?</span>',
      html: '<span class="swal-text">Asegúrate de que los sensores estén conectados.</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span class="swal-confirm-button">Sí, iniciar análisis</span>',
      cancelButtonText: '<span class="swal-cancel-button">Cancelar</span>',
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsStarting(true);
        try {
          const response = await fetch('http://localhost:3000/mqtt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_analysis: id, id_zone: zoneId, id_user: id_user}),
          });
  
          if (!response.ok) {
            throw new Error('Error starting analysis');
          }
  
          const result = await response.json();
          console.log('Analysis started successfully:', result);
          Swal.fire('Iniciado', 'El análisis ha comenzado con éxito.', 'success');

          setActiveTimers((prev) => ({
            ...prev,
            [zoneId]: 120,
          }));
  
          const interval = setInterval(() => {
            setActiveTimers((prev) => {
              const newTimers = { ...prev };
              if (newTimers[zoneId] > 1) {
                newTimers[zoneId] -= 1;
              } else {
                clearInterval(interval);
                delete newTimers[zoneId]; 
              }
              return newTimers;
            });
          }, 1000); 
        } catch (error) {
          console.error('Error starting analysis:', error);
          Swal.fire('Error', 'Hubo un problema al iniciar el análisis.', 'error');
        } finally {
          setIsStarting(false);
        }
      }
    });
  };
  

  const handleStartGeneralAnalysis = async () => {
    Swal.fire({
      title: '<span class="swal-title">¿Estás seguro?</span>',
      html: '<span class="swal-text">Asegúrate de que los sensores estén conectados</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span class="swal-confirm-button">Sí, iniciar análisis general</span>',
      cancelButtonText: '<span class="swal-cancel-button">Cancelar</span>',
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsStarting(true);
        try {
          const response = await fetch('http://localhost:3000/mqtt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_analysis: id , id_user: id_user})
          });

          if (!response.ok) {
            throw new Error('Error starting general analysis');
          }

          const result = await response.json();
          console.log('General analysis started successfully:', result);
          Swal.fire('Iniciado', 'El análisis general ha comenzado con éxito.', 'success');

          showAutoCloseAlert(2000);

        } catch (error) {
          console.error('Error starting general analysis:', error);
          Swal.fire('Error', 'Hubo un problema al iniciar el análisis general.', 'error');
        } finally {
          setIsStarting(false);
        }
      }
    });
  };

  const handleGenerateGraph = (zoneId) => {
    const zone = analysis.zonas[zoneId];
    const cultivos = Object.values(zone.resultados_cultivos).filter(cultivo => cultivosList.includes(cultivo.cultivo));
    const aptos = cultivos.filter(cultivo => cultivo.porcentaje > 0);
    const noAptos = cultivos.length - aptos.length;

    setChartData({
      labels: [
        `Aptos (${aptos.map(cultivo => cultivo.cultivo).join(', ')})`,
        'No Aptos'
      ],
      datasets: [
        {
          data: [aptos.length, noAptos],
          backgroundColor: ['#1abc9c', '#e74c3c'],
          hoverBackgroundColor: ['#16a085', '#c0392b'],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverBorderColor: '#000000',
          hoverBorderWidth: 3,
        }
      ]
    });

    setIsModalOpen(true);
  };

  const handleDownloadPdf = async (zoneId) => {
    const zone = analysis.zonas[zoneId];
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(`Resultados de Cultivos - Zona ${zoneId + 1}`, 10, 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Indicaciones: ${zone.indications}`, 10, 20);
    doc.text(`Profundidad: ${zone.depth}`, 10, 30);

    const zoneElement = zoneRefs.current[zoneId];
    const buttons = zoneElement.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    const canvas = await html2canvas(zoneElement);
    const imgData = canvas.toDataURL('image/png');

    doc.addImage(imgData, 'PNG', 10, 40, 280, 160);
    doc.save(`Resultados_Zona_${zoneId + 1}.pdf`);

    buttons.forEach(button => button.style.display = 'block');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadChartPdf = async () => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF('landscape', 'mm', 'a4');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Gráfica de Resultados', 10, 10);

    doc.addImage(imgData, 'PNG', 10, 20, 280, 160);
    doc.save('Grafica_Resultados.pdf');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  const hasData =
    analysis.resultados_general.data_analysis.length > 0 ||
    Object.keys(analysis.resultados_general.resultados_analysis).length > 0;

  const isResultsAvailable = analysis && analysis.zonas && Object.keys(analysis.zonas).length > 0;
  const isGeneralResultsAvailable = analysis && analysis.resultados_general && Object.keys(analysis.resultados_general.resultados_analysis).length > 0;

  return (
    <div className="mycontainer">
      <h1 className="heading">Resultados del Análisis</h1>
      {analysis && (
        <div className="mycard">
          <h2>{analysis.datos.name}</h2>
          <p className="analysis-content">{analysis.datos.content}</p>
          <p><strong>Ubicación del Análisis:</strong> {analysis.datos.locate}</p>
          <button 
            className="start-analysis-button" 
            onClick={handleStartGeneralAnalysis}
            disabled={isStarting}
          >
            {isStarting ? 'Iniciando...' : 'Iniciar análisis general'}
          </button>
          <button 
            onClick={() => navigate('/ganilli', { state: { analysis } })}
            className="generate-graph-button"

          >
            Generar gráfica general
          </button>
          {hasData ? (
        <GeneratePdf analysis={analysis} />
      ) : (
        <p>No hay datos disponibles para generar el PDF</p>
      )}
          <div>
            <h3>Resultados Generales:</h3>
            {Object.keys(analysis.resultados_general.resultados_analysis).length > 0 ? (
              Object.keys(analysis.resultados_general.resultados_analysis).map((key, index) => (
                <div key={index} className="general-result">
                  <p><strong>Cultivo:</strong> {analysis.resultados_general.resultados_analysis[key].cultivo}</p>
                  <p><strong>Detalles:</strong> {analysis.resultados_general.resultados_analysis[key].detalles}</p>
                  <p><strong>Porcentaje:</strong> {analysis.resultados_general.resultados_analysis[key].porcentaje}%</p>
                </div>
              ))
            ) : (
              <p>No hay datos generales disponibles</p>
            )}
          </div>
          {analysis.zonas && Object.keys(analysis.zonas).length > 0 && (
            <div className="zones">
              <h3>Zonas:</h3>
              {Object.keys(analysis.zonas).map((key, index) => (
                <div className="zone" key={index} ref={el => zoneRefs.current[key] = el}>
                  <h4>Zona {index + 1}</h4>
                  <p><strong>Indicaciones:</strong> {analysis.zonas[key].indications}</p>
                  <p><strong>Profundidad:</strong> {analysis.zonas[key].depth}</p>
                  <div className="zone-buttons">
                    <button 
                      className="start-analysis-button" 
                      onClick={() => handleStartAnalysis(analysis.zonas[key].id)}
                      disabled={isStarting}
                    >
                      {isStarting ? 'Iniciando...' : 'Iniciar análisis'}
                    </button>
                    <button 
                      className="generate-graph-button"
                      onClick={() => handleGenerateGraph(key)}
                      disabled={!analysis.zonas[key].resultados_cultivos || Object.keys(analysis.zonas[key].resultados_cultivos).length === 0}
                    >
                      Generar gráfica
                    </button>
                    <button 
                      className="generate-pdf-button"
                      onClick={() => handleDownloadPdf(key)}
                      disabled={!analysis.zonas[key].resultados_cultivos || Object.keys(analysis.zonas[key].resultados_cultivos).length === 0}
                    >
                      Generar PDF
                    </button>
                  </div>
                  <div className="zone-content">
                    <h4>Resultados Cultivos:</h4>
                    {Object.keys(analysis.zonas[key].resultados_cultivos).length > 0 ? (
                      Object.keys(analysis.zonas[key].resultados_cultivos).sort((a, b) => analysis.zonas[key].resultados_cultivos[b].porcentaje - analysis.zonas[key].resultados_cultivos[a].porcentaje).map((cultivoKey, cultivoIndex) => (
                        <div key={cultivoIndex} className="cultivo-result">
                          <p><strong>{analysis.zonas[key].resultados_cultivos[cultivoKey].cultivo}:</strong></p>
                          <p>{analysis.zonas[key].resultados_cultivos[cultivoKey].detalles}</p>
                          <p><strong>Porcentaje:</strong> {analysis.zonas[key].resultados_cultivos[cultivoKey].porcentaje}%</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay resultados de cultivos disponibles</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Gráfica de Cultivos"
        className="mymodal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <span className="close-x" onClick={closeModal}>×</span>
          <button className="download-chart-button" onClick={handleDownloadChartPdf}>Descargar Gráfica</button>
        </div>
        <h2 className="modal-title">GRÁFICA DE CULTIVOS</h2>
        <div className="chart-box" ref={chartRef}>
          <div className="chart-container">
            {chartData && (
              <Pie 
                data={chartData}
                options={{
                  plugins: {
                    datalabels: {
                      formatter: (value, context) => {
                        const percentage = (value / (chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                        return `${percentage}%`;
                      },
                      color: '#fff',
                      font: {
                        weight: 'bold'
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
                          const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                          const currentValue = dataset.data[tooltipItem.dataIndex];
                          const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                          return percentage + "%";
                        }
                      }
                    }
                  },
                  interaction: {
                    mode: 'nearest',
                    intersect: true,
                  },
                  hover: {
                    mode: 'nearest',
                    intersect: true,
                    animationDuration: 400,
                    onHover: (event, chartElement) => {
                      if (chartElement.length) {
                        event.native.target.style.cursor = 'pointer';
                      } else {
                        event.native.target.style.cursor = 'default';
                      }
                    }
                  },
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
