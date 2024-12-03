import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// interface PdfDocumentProps {
//   content: string;
// }

export const PdfDocument = () => {
  const styles = StyleSheet.create({
    section: {
      marginBottom: 10,
      padding: 10,
      border: "1px solid #ddd",
      borderRadius: 8,
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
  });

  return (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text style={styles.text}>example</Text>
        </View>
      </Page>
    </Document>
  );
};
