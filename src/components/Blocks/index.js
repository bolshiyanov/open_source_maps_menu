import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import history from 'utils/history';
import {__} from 'utils/translation';
import { EDIT_BLOCK, REMOVE_BLOCK, ROTATE_BLOCK } from 'constants/actions';

import BlockSettings from './BlockSettings';
import Block from './Block';

import './index.scss';

const emptySettings = {
  guid: null,
  type: 'preview-text',
  order: null,
  link: '',
  text: '',
  image: '',
  animation: false
};

const Blocks = ({ data }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [blockData, setBlockData] = useState(emptySettings);

  const closeBlocksSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenBlockSettings = (blockId) => {
    setSettingsOpened(blockId);
  };

  const dispatch = useDispatch();
  const submitSettings = () => {
    if (blockData.text || blockData.image)
      dispatch({ type: EDIT_BLOCK, payload: blockData });
    closeBlocksSettings();
  };

  const removeSettings = () => {
    dispatch({ type: REMOVE_BLOCK, guid: blockData.guid });
    closeBlocksSettings();
  };

  const { active, paymentData } = useSelector((state) => state.config.account);

  const { blocks } = useSelector((state) => state.config.data);

  useEffect(() => {
    const currentBlock = blocks.find((block) => block.guid === settingsOpened);
    const settings = currentBlock || { ...emptySettings };
    if (!settings.guid)
      settings.guid = uuid();
    setBlockData({ ...settings });
  }, [settingsOpened, blocks]);

  const onRotate = (guid, order) => {
    dispatch({ type: ROTATE_BLOCK, guid, order });
  };

  blocks.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
      <div className="blocks">
          <Button
            key="add-button"
            onClick={() => onOpenBlockSettings('')}
            className={classnames(['block-button', 'tech-button'])}
          >
            <Icon type="plus" />
            <span>{__("Контент")}</span>
          </Button>

        {
          data.map((block) => <Block onClick={() => onOpenBlockSettings(block.guid)} key={block.guid} {...block} />)
        }
      </div>

      <Slider
        opened={settingsOpened !== null}
        onClose={closeBlocksSettings}
        title={__("Настройка контента и ссылок")}
        subtitle={__("В этом разделе можно настроить cбор отзывов в карте Google, TripAdvisor отзывы, Facebook, бронирование столика, ссылку на GoogleMap, то форму для сбора заявок или указать расписание работы, вставить ссылку на видео из Ютуб, показать фотографии команды, описание акций и подключить более 80 разных виджетов. Смотрите видео инструкции.")}
        onRemove={removeSettings}
        onSubmit={submitSettings}
      >
        <BlockSettings {...blockData}  onRotate={onRotate} onChange={(settings) => setBlockData({ ...blockData, ...settings })} />
      </Slider>

    </React.Fragment >
  );
};

Blocks.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

Blocks.defaultProps = {
  data: []
};

export default Blocks;
