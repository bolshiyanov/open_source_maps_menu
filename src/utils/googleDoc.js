const gssPrefix = "https://docs.google.com/spreadsheets/d/";

export const getGDocId = (url) => {
    if (!(url?.startsWith(gssPrefix) ?? false)) {
        return null;
    }
  
    let docId = url.substring(gssPrefix.length);
    return docId.substring(0, docId.indexOf("/edit"));
}
