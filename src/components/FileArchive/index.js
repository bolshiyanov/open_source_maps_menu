import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_ALL_DATA} from 'constants/actions';
import FileArchiveSettings from 'components/FileArchive/FileArchiveSettings';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import './index.scss';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';

const FileArchive = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  
  const closeTitleSettings = useCallback(() => setSettingsOpened(false), [setSettingsOpened]);
  
  const submitSettings = () => {
    closeTitleSettings();
  }; 

  

  return (
    <React.Fragment>
      <Button onClick={() => setSettingsOpened(true)} isInline className="icon-header-padding">
      <Icon type="fileArchive" />
      </Button>
      <Slider
        opened={settingsOpened}
        onClose={closeTitleSettings}
        onSubmit={submitSettings}
        title={__("Резервное копирование и восстановление приложения")}
        subtitle= {__("Скачайте резервную копию вашего приложения, чтобы при необходимости восстановить существующие настройки. Вы можете загрузить эту резервную копию вашего приложения в новый ресторан. Таким образом можно создать копию и  быстро редактировать. Для этого вставьте текст из файла резервной копии в поле ввода.")}
      >

        <FileArchiveSettings />
      </Slider>
    </React.Fragment>
  );
};

export default FileArchive;