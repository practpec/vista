import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 12,
  },
  section: {
    margin: 0,
    padding: 5,
  },
  centered: {
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    marginVertical: 20,
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #000000',
  },
  tableCell: {
    border: '0.5pt solid #000000',
    padding: 5,
    fontSize: 9,
    textAlign: 'center',
    flex: 1,
    minWidth: 60,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    minWidth: 60,
  },
  headerCell4: {
    flex: 2,
    textAlign: 'center',
    minWidth: 100,
  },
  headerCellCombined: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 10,
    border: '0.5pt solid #000000',
    padding: 5,
  },
  horizontalLine: {
    borderBottom: '0.5pt solid #d3d3d3',
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  summarySection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  summaryItem: {
    width: '50%',
    padding: 0,
  },
  summaryLabel: {
    fontWeight: 'bold',
  },
  summaryValue: {
    textAlign: 'right',
  },
});

const MyDocument = ({ analysis }) => {
  const currentDate = new Date().toLocaleDateString();
  console.log('Datos recibidos en MyDocument:', analysis);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.centered}>Análisis de Suelo</Text>
          <Text style={styles.centered}>Terratest</Text>
          <Text style={styles.centered}>Fecha: {currentDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.centered}>Cliente</Text>
          <Text>Nombre: {analysis.cliente.name}</Text>
          <Text>Número de teléfono: {analysis.cliente.number_contact}</Text>
          <Text>Dirección: {analysis.datos.locate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.centered}>Detalles del Análisis</Text>
          <Text>Nombre: {analysis.datos.name}</Text>
          <Text>Descripción: {analysis.datos.content}</Text>
          <Text>Ubicación: {analysis.datos.locate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.centered}>Detalle General del Análisis</Text>
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Humedad (%RH): {analysis.resultados_general.data_analysis[0].humidity}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Temperatura (°C): {analysis.resultados_general.data_analysis[0].temperature}</Text>
            </View>
          </View>
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Conductividad (µS/cm): {analysis.resultados_general.data_analysis[0].conductivity}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>pH: {analysis.resultados_general.data_analysis[0].ph}</Text>
            </View>
          </View>
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Nitrógeno (mg/kg): {analysis.resultados_general.data_analysis[0].nitrogen}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Fósforo (mg/kg): {analysis.resultados_general.data_analysis[0].phosphorus}</Text>
            </View>
          </View>
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Potasio (mg/kg): {analysis.resultados_general.data_analysis[0].potassium}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCellCombined}>Detalles de los Análisis por Zona</Text>
          </View>
          <View style={styles.tableRow}>
            {['Descripción de la Zona', 'Profundidad (cm)', 'pH', 'Temperatura', 'Humedad', 'Electroconductividad', 'Nitrógeno', 'Potasio', 'Fósforo'].map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.tableHeader, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>
          {Object.values(analysis.zonas).map((zona, zoneIndex) => (
            <View key={zoneIndex} style={styles.tableRow}>
              <Text style={styles.tableCell}>{zona.indications}</Text>
              <Text style={styles.tableCell}>{zona.depth}</Text>
              <Text style={styles.tableCell}>{zona.data[0].ph || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].temperature || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].humidity || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].conductivity || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].nitrogen || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].potassium || 'N/A'}</Text>
              <Text style={styles.tableCell}>{zona.data[0].phosphorus || 'N/A'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCellCombined}>Compatibilidad de los Cultivos</Text>
          </View>
          <View style={styles.tableRow}>
            {['Cultivo', 'Detalles'].map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.tableHeader, styles.headerCell4]}>
                {header}
              </Text>
            ))}
          </View>
          {Object.values(analysis.resultados_general.resultados_analysis).map((cultivo, cultivoIndex) => (
            <View key={cultivoIndex} style={styles.tableRow}>
              <Text style={styles.tableCell}>{cultivo.cultivo}</Text>
              <Text style={styles.tableCell}>{cultivo.detalles}</Text>
            </View>
          ))}
        </View>

        <View style={styles.horizontalLine} />
      </Page>
    </Document>
  );
};

const GeneratePdf = ({ analysis }) => (
  <div>
    <PDFDownloadLink document={<MyDocument analysis={analysis} />} fileName="tables.pdf">
      {({ loading }) => (loading ? 'Generando PDF...' : 'Generar PDF')}
    </PDFDownloadLink>
  </div>
);

export default GeneratePdf;
