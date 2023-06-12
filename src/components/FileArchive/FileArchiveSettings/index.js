import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from 'components/common/Textarea';

import { __ } from 'utils/translation';

import { UPDATE_ALL_DATA } from 'constants/actions';

import './index.scss';

const FileArchiveSettings = () => {

  const { data = {} } = useSelector((state) => state.config);  
  const data2 = "";
  let json = JSON.stringify(data, null, 2);
  let newDataJson = encodeURIComponent(json.trim())
  let dataURL = `data:application/json,${newDataJson}`;
  
  const onChange = () => {
      };


  return (
    <React.Fragment>
      <a download="My_Sweety_Backup_Copy.json" href={dataURL}><div className="filearchivesettings-export">{__("Экспортировать")}</div></a>

      <Textarea
        className="block-settings__settings__input"
        value={data2}
        placeholder={__("Вставь готовый текст")}
        onChange={(value) => onChange(data2, value)}
      />

    </React.Fragment>
  );
};



export default FileArchiveSettings;