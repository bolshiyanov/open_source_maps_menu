import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const AvatarBase = ({ 
    avatar, 
    avatarPreview, 
    avatarDefault, 
    wrapperImageClass, 
    wrapperVideoClass ,
    onClick
}) => {
  const [isVideoAvatar, setIsVideoAvatar] = useState(false);

  const detectIOs = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i, /iMac/i]; 
    return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  };

  useEffect(() => {
    setIsVideoAvatar((avatar?.endsWith(".mp4") ?? false) || (avatar?.startsWith("data:video") ?? false));
  }, [avatar]);

  const isIOs = detectIOs();

  return <React.Fragment>
    {isIOs && avatar && <div onClick={onClick} className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
    
    {!isIOs && isVideoAvatar && <div onClick={onClick} className={wrapperVideoClass ?? wrapperImageClass}>
      <video className="avatar-video-base" poster={avatarPreview} preload="auto" autoplay="true" loop="true" muted="muted">
        <source src={avatar} onError={() => setIsVideoAvatar(false)}></source>
      </video>
    </div>}
    {!isIOs && avatarPreview && !isVideoAvatar && <div onClick={onClick} className={wrapperImageClass} style={{ backgroundImage: `URL(${avatarPreview})` }} />}
    {!isIOs && !avatarPreview && avatar && !isVideoAvatar && <div onClick={onClick} className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
    
    {!avatar && <div onClick={onClick} className={wrapperImageClass} style={{ backgroundImage: `URL(${avatarDefault})` }} />}
  </React.Fragment>
};

AvatarBase.propTypes = {
  avatar: PropTypes.string,
  avatarPreview: PropTypes.string,
  avatarDefault: PropTypes.string
};

AvatarBase.defaultProps = {
  avatar: null,
  avatarPreview: null,
  avatarDefault: null
};

export default AvatarBase; 