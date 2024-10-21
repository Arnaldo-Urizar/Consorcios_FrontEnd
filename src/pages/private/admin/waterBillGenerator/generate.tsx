import {
  Page,
  Document,
  View,
  Text,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import logo from "../../../../assets/img/water_drop_sky.png";

// Create styles
// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: { flexDirection: "row", marginTop: 24 },

  logo: { width: 90 },

  reportTitle: { fontSize: 16, textAlign: "center" },

  addressTitle: { fontSize: 11, fontStyle: "bold" },

  invoice: { fontWeight: "bold", fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: "bold" },

  address: { fontWeight: 400, fontSize: 10 },

  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },

  tbody2: { flex: 2, borderRightWidth: 1 },
  viewer: {
    width: "100%", // Hazlo responsive para que se ajuste al contenedor
    height: "100vh", // Ajusta la altura del visor
    position: "absolute",
    margin: 0,
  },
});

const InvoiceTitle = () => (
  // update InvoiceTitle component here
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Image style={styles.logo} src={logo} />
      <Text style={styles.reportTitle}>Consorcio Santa Maria del Oro</Text>
    </View>
  </View>
);

const Address = () => (
  // update Address component here
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Factura </Text>
        <Text style={styles.invoiceNumber}>Numero de Factura: 10 </Text>
      </View>
      <View>
        <Text style={styles.addressTitle}>Calle Sin Numero 123</Text>
        <Text style={styles.addressTitle}>Rivadavia</Text>
        <Text style={styles.addressTitle}>Mendoza, Argentina</Text>
      </View>
    </View>
  </View>
);

const UserAddress = () => (
  // update UserAddress component here
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View style={{ maxWidth: 200 }}>
        <Text style={styles.addressTitle}>Pago a</Text>
        <Text style={styles.address}>
          Consorcio de agua de Santa Maria del oro
        </Text>
      </View>
      <Text style={styles.addressTitle}>Date: 10/10/1010</Text>
    </View>
  </View>
);

const TableHead = () => (
  // update TableHead component here
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Mes</Text>
    </View>
    <View style={styles.theader}>
      <Text>Precio</Text>
    </View>
    <View style={styles.theader}>
      <Text>Cantidad</Text>
    </View>
    <View style={styles.theader}>
      <Text>Pago Total</Text>
    </View>
  </View>
);

const TableBody = () => (
  // update TableBody component here
  // podemos usar un map para poner mas datos
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={[styles.tbody, styles.tbody2]}>
      <Text>Noviembre</Text>
    </View>
    <View style={styles.tbody}>
      <Text>100.00</Text>
    </View>
    <View style={styles.tbody}>
      <Text>1</Text>
    </View>
    <View style={styles.tbody}>
      <Text>{(100.55 * 5).toFixed(2)}</Text>
    </View>
  </View>
);

const TableTotal = () => (
  // update TableTotal component here
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total</Text>
    </View>
    <View style={styles.tbody}>
      <Text>{(100.55 * 5).toFixed(2)}</Text>
    </View>
  </View>
);

export const PdfDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );
};

export const FacturaPDF = () => {
  return (
    <PDFViewer style={styles.viewer}>
      <PdfDocument />
    </PDFViewer>
  );
};
