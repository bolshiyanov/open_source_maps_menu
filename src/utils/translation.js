import translates from "constants/translation.json";
import { uuid } from 'uuidv4';
import API from 'utils/api';
import { getSearchString } from 'utils/url';

let lang = null;
let translationType = null;

export const supportedLanguages = [ "en", "ru", "es", "fr", "de", "it", "zh" ];

export const __ = (text) => {
    text = text.toLowerCase();
    const defaultLang = getDefaultLanguage();

    const items = translates.filter(e => e.code.toLowerCase() === text || e.ru.toLowerCase() === text || e.en.toLowerCase() === text);
    if (items.length === 0) {
        return "{{" + text + ":" + (lang ?? defaultLang) + "}}";
    }

    return items[0][lang ?? defaultLang] ?? items[0].en;
};

export const translatedProperty = (props, propName, language, isEdit = false) => {
    const defaultLang = (language ?? lang) ?? getDefaultLanguage();
    const propPostfix = defaultLang[0].toUpperCase() + defaultLang[1];
    const localizedPropName = propName + propPostfix;
    let result = props[localizedPropName];
    if (result || isEdit) {
        return result ?? "";
    }
    result = props[propName];
    if (result) {
        return result;
    }
    return "";
};

export const translatedPropertyName = (propName, language) => {
    const defaultLang = (language ?? lang) ?? getDefaultLanguage();
    return propName + defaultLang[0].toUpperCase() + defaultLang[1];
};

export const setLocalizationLang = (value) => {
    lang = value?.toLowerCase();
}

export const getLocalizationLang = () => {
    return lang;
}

export const getDefaultLanguage = () => {
    var language = (window.navigator.userLanguage || window.navigator.language)?.substring(0, 2)?.toLowerCase();

    if (supportedLanguages.indexOf(language) >= 0) {
        return language;
    }

    return supportedLanguages[0];
}

export const getTranslationType = () => {
    if (!translationType) {
        translationType = getSearchString(window.location.search, 'translation');
    }
    return translationType;
}
  
export const translate = async (text, textLang, prop) => {
    if (getTranslationType()?.toLowerCase() === "yandex") {
        return await translateYandex(text, textLang, prop)
    } else {
        return await translateGoogle(text, textLang, prop)
    }
}

const translateDocId = "14oCednoNSTuGBojxN5SW323z9pXh_5C01ibSDCbGO5M"
export const translateGoogle = async (text, textLang, prop) => {
    let isUppercase = text === text.toUpperCase();
    let isLowercase = text === text.toLowerCase();
    if (isUppercase && isLowercase) {
        isUppercase = false;
        isLowercase = false;
    }
    try {
        let sheet = await API.getGoogleSpreadSheetById(translateDocId, "0");
        const rowId = uuid()
        await sheet.addRow({
            id: rowId,
            text: text.toLowerCase(),
            lang: textLang,
        });
        const rows = await sheet.getRows();
        let addedIndex;
        rows.forEach((row, index) => {
            if (row.id === rowId) {
                addedIndex = index;
            }
        });
        await sheet.loadCells("A2:J" + (addedIndex + 2).toString())
  
        for (let i = 0; i < supportedLanguages.length; i++) {
            const exampleCell = sheet.getCell(1, i + 3);
            const valueCell = sheet.getCell(addedIndex + 1, i + 3);
            valueCell.formula = exampleCell.formula.replace(/2/g, (addedIndex + 2).toString())
        }
        await sheet.saveUpdatedCells()
        
        const updatedRows = await sheet.getRows();
        var translated = {}
        let updatedRow = updatedRows.filter(e => e.id === rowId)[0];
        supportedLanguages.filter(lang => lang !== textLang).forEach(lang => {
            const fieldName = translatedPropertyName("text", lang);
            const propName = translatedPropertyName(prop ?? "text", lang);
            if (updatedRow[fieldName]) {
                translated[propName] = isUppercase ? updatedRow[fieldName]?.toUpperCase() : 
                    isLowercase ? updatedRow[fieldName]?.toLowerCase() : 
                    updatedRow[fieldName];
            }
        })
        updatedRow.delete()
        return translated
    }
    catch (e) {
    console.log(e)
    }
    return {}
}

export const translateYandex = async (text, textLang, prop) => {
    var translated = {}
    for (var i = 0; i < supportedLanguages.length; i++) {
        const lang = supportedLanguages[i];
        const propName = translatedPropertyName(prop ?? "text", lang);
        const translateRes = await API.translate([text], textLang, lang);
        translated[propName] = translateRes[0];
    }
    return translated;
}